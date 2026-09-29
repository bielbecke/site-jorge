const MAX_PDF_SIZE = 10 * 1024 * 1024
const DEFAULT_SESSION_TTL = 7 * 24 * 60 * 60
const SESSION_COOKIE = '__Host-jorge_session'

const json = (data, status = 200, headers = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', ...headers },
  })

const error = (message, status = 400) => json({ error: message }, status)

const nowIso = () => new Date().toISOString()

function cookieOptions(maxAge) {
  return `${SESSION_COOKIE}=; Max-Age=${maxAge}; Path=/; HttpOnly; Secure; SameSite=Strict`
}

function withCookie(response, value, maxAge) {
  const headers = new Headers(response.headers)
  headers.set(
    'set-cookie',
    `${SESSION_COOKIE}=${value}; Max-Age=${maxAge}; Path=/; HttpOnly; Secure; SameSite=Strict`,
  )
  return new Response(response.body, { status: response.status, headers })
}

function getCookie(request, name) {
  const cookies = request.headers.get('cookie') || ''
  const match = cookies.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`))
  return match ? decodeURIComponent(match[1]) : null
}

function toBase64Url(bytes) {
  let value = ''
  for (const byte of bytes) value += String.fromCharCode(byte)
  return btoa(value).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function fromBase64Url(value) {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/')
  const padded = normalized + '='.repeat((4 - (normalized.length % 4)) % 4)
  const binary = atob(padded)
  return Uint8Array.from(binary, (char) => char.charCodeAt(0))
}

async function sha256(value) {
  const data = typeof value === 'string' ? new TextEncoder().encode(value) : value
  return new Uint8Array(await crypto.subtle.digest('SHA-256', data))
}

async function hashToken(token) {
  return toBase64Url(await sha256(token))
}

function constantTimeEqual(left, right) {
  if (left.length !== right.length) return false
  let result = 0
  for (let index = 0; index < left.length; index += 1) {
    result |= left.charCodeAt(index) ^ right.charCodeAt(index)
  }
  return result === 0
}

async function verifyPassword(password, env) {
  const stored = env.ADMIN_PASSWORD_HASH || ''

  if (stored.startsWith('pbkdf2$')) {
    const [, iterationsText, saltText, hashText] = stored.split('$')
    const iterations = Number(iterationsText)
    if (
      !Number.isSafeInteger(iterations) ||
      iterations < 100000 ||
      !saltText ||
      !hashText
    ) {
      return false
    }

    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(password),
      'PBKDF2',
      false,
      ['deriveBits'],
    )
    const bits = await crypto.subtle.deriveBits(
      { name: 'PBKDF2', salt: fromBase64Url(saltText), iterations, hash: 'SHA-256' },
      key,
      256,
    )
    return constantTimeEqual(toBase64Url(new Uint8Array(bits)), hashText)
  }

  return Boolean(env.ADMIN_PASSWORD) && constantTimeEqual(password, env.ADMIN_PASSWORD)
}

function sessionTtl(env) {
  const configured = Number(env.SESSION_TTL_SECONDS)
  return Number.isSafeInteger(configured) && configured > 0
    ? Math.min(configured, 30 * 24 * 60 * 60)
    : DEFAULT_SESSION_TTL
}

async function createSession(env, email) {
  const token = toBase64Url(crypto.getRandomValues(new Uint8Array(32)))
  const expiresAt = Math.floor(Date.now() / 1000) + sessionTtl(env)
  await env.DB.prepare(
    'INSERT INTO sessions (token_hash, email, expires_at, created_at) VALUES (?, ?, ?, ?)',
  )
    .bind(await hashToken(token), email, expiresAt, Math.floor(Date.now() / 1000))
    .run()
  return { token, expiresAt }
}

async function getSession(request, env) {
  const token = getCookie(request, SESSION_COOKIE)
  if (!token) return null
  const tokenHash = await hashToken(token)
  const result = await env.DB.prepare(
    'SELECT token_hash, email, expires_at FROM sessions WHERE token_hash = ? AND expires_at > ?',
  )
    .bind(tokenHash, Math.floor(Date.now() / 1000))
    .first()
  return result ? { ...result, tokenHash } : null
}

async function requireSession(request, env) {
  const session = await getSession(request, env)
  return session || false
}

function projectFromRow(row, origin) {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    published: Boolean(row.published),
    pdfName: row.pdf_name || null,
    pdfSize: row.pdf_size || null,
    pdfUrl: row.pdf_key ? `${origin}/api/projects/${encodeURIComponent(row.id)}/pdf` : null,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

function validateProjectInput(body) {
  const title = typeof body.title === 'string' ? body.title.trim() : ''
  const description = typeof body.description === 'string' ? body.description.trim() : ''
  if (!title || title.length > 200) return { error: 'O título deve ter entre 1 e 200 caracteres.' }
  if (description.length > 100000) return { error: 'A descrição é muito longa.' }
  return { title, description, published: body.published === true }
}

async function parseJson(request) {
  try {
    return await request.json()
  } catch {
    return null
  }
}

async function projectById(env, id) {
  return env.DB.prepare('SELECT * FROM projects WHERE id = ?').bind(id).first()
}

async function handleAuth(request, env) {
  const url = new URL(request.url)

  if (url.pathname === '/api/auth/me' && request.method === 'GET') {
    const session = await getSession(request, env)
    return session
      ? json({ authenticated: true, email: session.email })
      : json({ authenticated: false }, 401)
  }

  if (url.pathname === '/api/auth/login' && request.method === 'POST') {
    const body = await parseJson(request)
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : ''
    const password = typeof body?.password === 'string' ? body.password : ''
    const configuredEmail = (env.ADMIN_EMAIL || '').trim().toLowerCase()
    if (
      !configuredEmail ||
      !email ||
      email !== configuredEmail ||
      !(await verifyPassword(password, env))
    ) {
      return error('E-mail ou senha inválidos.', 401)
    }

    const session = await createSession(env, configuredEmail)
    return withCookie(
      json({ authenticated: true, email: configuredEmail }),
      session.token,
      sessionTtl(env),
    )
  }

  if (url.pathname === '/api/auth/logout' && request.method === 'POST') {
    const session = await getSession(request, env)
    if (session) {
      await env.DB.prepare('DELETE FROM sessions WHERE token_hash = ?').bind(session.tokenHash).run()
    }
    const response = json({ authenticated: false })
    const headers = new Headers(response.headers)
    headers.set('set-cookie', cookieOptions(0))
    return new Response(response.body, { status: response.status, headers })
  }

  return null
}

async function handlePublicProjects(request, env) {
  const url = new URL(request.url)
  const match = url.pathname.match(/^\/api\/projects\/([^/]+)(?:\/pdf)?$/)
  const id = match ? decodeURIComponent(match[1]) : null

  if (request.method === 'GET' && url.pathname === '/api/projects') {
    const result = await env.DB.prepare(
      'SELECT * FROM projects WHERE published = 1 ORDER BY updated_at DESC',
    ).all()
    return json({ projects: result.results.map((row) => projectFromRow(row, url.origin)) })
  }

  if (request.method === 'GET' && id) {
    const row = await projectById(env, id)
    if (!row || !row.published) return error('Projeto não encontrado.', 404)
    if (url.pathname.endsWith('/pdf')) return servePdf(row, env)
    return json(projectFromRow(row, url.origin))
  }

  return null
}

async function servePdf(row, env) {
  if (!row.pdf_key || !env.PROJECT_FILES) return error('PDF não encontrado.', 404)
  const object = await env.PROJECT_FILES.get(row.pdf_key)
  if (!object) return error('PDF não encontrado.', 404)
  const headers = new Headers()
  object.writeHttpMetadata(headers)
  headers.set('content-type', 'application/pdf')
  headers.set('content-disposition', `inline; filename="${(row.pdf_name || 'projeto.pdf').replace(/["\r\n]/g, '')}"`)
  headers.set('cache-control', 'public, max-age=3600')
  return new Response(object.body, { headers })
}

async function handleAdminProjects(request, env) {
  const url = new URL(request.url)
  const session = await requireSession(request, env)
  if (!session) return error('Autenticação necessária.', 401)
  const idMatch = url.pathname.match(/^\/api\/admin\/projects\/([^/]+)(?:\/pdf)?$/)
  const id = idMatch ? decodeURIComponent(idMatch[1]) : null

  if (request.method === 'GET' && url.pathname === '/api/admin/projects') {
    const result = await env.DB.prepare('SELECT * FROM projects ORDER BY updated_at DESC').all()
    return json({ projects: result.results.map((row) => projectFromRow(row, url.origin)) })
  }

  if (request.method === 'POST' && url.pathname === '/api/admin/projects') {
    const body = await parseJson(request)
    const input = validateProjectInput(body || {})
    if (input.error) return error(input.error)
    const projectId = crypto.randomUUID()
    const timestamp = nowIso()
    await env.DB.prepare(
      'INSERT INTO projects (id, title, description, published, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)',
    )
      .bind(projectId, input.title, input.description, input.published ? 1 : 0, timestamp, timestamp)
      .run()
    const row = await projectById(env, projectId)
    return json(projectFromRow(row, url.origin), 201)
  }

  if (!id) return error('Rota não encontrada.', 404)
  const row = await projectById(env, id)
  if (!row) return error('Projeto não encontrado.', 404)

  if (request.method === 'GET' && url.pathname.endsWith('/pdf')) return servePdf(row, env)

  if (request.method === 'POST' && url.pathname.endsWith('/pdf')) {
    if (!env.PROJECT_FILES) return error('Armazenamento de arquivos não configurado.', 503)
    const contentLength = Number(request.headers.get('content-length') || 0)
    if (contentLength > MAX_PDF_SIZE + 1024 * 1024) return error('O PDF deve ter no máximo 10 MB.', 413)
    let form
    try {
      form = await request.formData()
    } catch {
      return error('Envie o PDF como multipart/form-data.')
    }
    const file = form.get('file')
    if (!file || typeof file.arrayBuffer !== 'function') return error('O campo file é obrigatório.')
    if (file.type !== 'application/pdf' || !String(file.name || '').toLowerCase().endsWith('.pdf')) {
      return error('Envie um arquivo PDF válido.')
    }
    const bytes = await file.arrayBuffer()
    if (bytes.byteLength > MAX_PDF_SIZE) return error('O PDF deve ter no máximo 10 MB.', 413)
    const signature = new Uint8Array(bytes.slice(0, 5))
    if (new TextDecoder().decode(signature) !== '%PDF-') return error('O arquivo não parece ser um PDF válido.')
    const key = `projects/${id}/${crypto.randomUUID()}.pdf`
    await env.PROJECT_FILES.put(key, bytes, {
      httpMetadata: { contentType: 'application/pdf' },
    })
    if (row.pdf_key) await env.PROJECT_FILES.delete(row.pdf_key)
    await env.DB.prepare(
      'UPDATE projects SET pdf_key = ?, pdf_name = ?, pdf_size = ?, updated_at = ? WHERE id = ?',
    )
      .bind(key, String(file.name).slice(0, 255), bytes.byteLength, nowIso(), id)
      .run()
    return json(projectFromRow(await projectById(env, id), url.origin))
  }

  if (request.method === 'DELETE' && url.pathname.endsWith('/pdf')) {
    if (row.pdf_key && env.PROJECT_FILES) await env.PROJECT_FILES.delete(row.pdf_key)
    await env.DB.prepare(
      'UPDATE projects SET pdf_key = NULL, pdf_name = NULL, pdf_size = NULL, updated_at = ? WHERE id = ?',
    )
      .bind(nowIso(), id)
      .run()
    return json(projectFromRow(await projectById(env, id), url.origin))
  }

  if (request.method === 'PUT' || request.method === 'PATCH') {
    const body = await parseJson(request)
    const input = validateProjectInput(body || {})
    if (input.error) return error(input.error)
    await env.DB.prepare(
      'UPDATE projects SET title = ?, description = ?, published = ?, updated_at = ? WHERE id = ?',
    )
      .bind(input.title, input.description, input.published ? 1 : 0, nowIso(), id)
      .run()
    return json(projectFromRow(await projectById(env, id), url.origin))
  }

  if (request.method === 'DELETE') {
    if (row.pdf_key && env.PROJECT_FILES) await env.PROJECT_FILES.delete(row.pdf_key)
    await env.DB.prepare('DELETE FROM projects WHERE id = ?').bind(id).run()
    return json({ deleted: true })
  }

  return error('Método não permitido.', 405)
}

async function handleApi(request, env) {
  const authResponse = await handleAuth(request, env)
  if (authResponse) return authResponse
  if (new URL(request.url).pathname.startsWith('/api/admin/')) {
    return handleAdminProjects(request, env)
  }
  const publicResponse = await handlePublicProjects(request, env)
  return publicResponse || error('Rota não encontrada.', 404)
}

async function serveAssets(request, env) {
  const response = await env.ASSETS.fetch(request)
  if (response.status !== 404 || request.method !== 'GET') return response
  const fallback = new URL(request.url)
  fallback.pathname = '/'
  return env.ASSETS.fetch(new Request(fallback, request))
}

export default {
  async fetch(request, env) {
    try {
      if (new URL(request.url).pathname.startsWith('/api/')) {
        return handleApi(request, env)
      }
      return serveAssets(request, env)
    } catch (caught) {
      console.error(caught)
      return error('Erro interno do servidor.', 500)
    }
  },
}

export { MAX_PDF_SIZE, constantTimeEqual, projectFromRow, validateProjectInput }

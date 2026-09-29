import { useEffect, useState } from 'react'
import Seo from '../components/Seo.jsx'
import { apiRequest } from '../lib/api.js'

const emptyForm = { title: '', description: '', published: false }

function ProjectForm({ project, onSaved, onCancel }) {
  const [form, setForm] = useState(
    project
      ? { title: project.title, description: project.description, published: project.published }
      : emptyForm,
  )
  const [pdf, setPdf] = useState(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }))

  const submit = async (event) => {
    event.preventDefault()
    setSaving(true)
    setMessage('')
    try {
      const saved = await apiRequest(
        project ? `/api/admin/projects/${project.id}` : '/api/admin/projects',
        { method: project ? 'PUT' : 'POST', body: JSON.stringify(form) },
      )
      if (pdf) {
        const data = new FormData()
        data.append('file', pdf)
        await apiRequest(`/api/admin/projects/${saved.id}/pdf`, { method: 'POST', body: data })
      }
      onSaved()
    } catch (error) {
      setMessage(error.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={submit} className="rounded-sm border border-soil-light/40 bg-paper p-6 shadow-sm">
      <h2 className="font-display text-2xl text-forest">
        {project ? 'Editar projeto' : 'Novo projeto'}
      </h2>
      <div className="mt-5 space-y-4">
        <label className="block text-sm font-semibold text-forest">
          Título
          <input
            required
            maxLength={200}
            value={form.title}
            onChange={(event) => update('title', event.target.value)}
            className="mt-2 w-full rounded-sm border border-soil-light/60 bg-sand px-4 py-3 font-normal text-ink outline-none focus:border-forest"
          />
        </label>
        <label className="block text-sm font-semibold text-forest">
          Descrição
          <textarea
            rows={6}
            value={form.description}
            onChange={(event) => update('description', event.target.value)}
            className="mt-2 w-full resize-y rounded-sm border border-soil-light/60 bg-sand px-4 py-3 font-normal text-ink outline-none focus:border-forest"
          />
        </label>
        <label className="block text-sm font-semibold text-forest">
          PDF (opcional, máximo 10 MB)
          <input
            type="file"
            accept="application/pdf,.pdf"
            onChange={(event) => setPdf(event.target.files?.[0] || null)}
            className="mt-2 block w-full rounded-sm border border-soil-light/60 bg-sand px-3 py-2 text-sm font-normal"
          />
        </label>
        <label className="flex items-center gap-3 text-sm font-semibold text-forest">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(event) => update('published', event.target.checked)}
            className="h-4 w-4 accent-forest"
          />
          Publicar na página de projetos
        </label>
      </div>
      {message && <p className="mt-4 text-sm text-red-700">{message}</p>}
      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={saving}
          className="button-animate rounded-sm bg-forest px-5 py-2.5 text-sm font-semibold text-sand hover:bg-forest-deep disabled:opacity-60"
        >
          {saving ? 'Salvando…' : 'Salvar projeto'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="button-animate rounded-sm border border-soil-light/60 px-5 py-2.5 text-sm font-semibold text-ink/75 hover:bg-sand-deep"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(null)
  const [projects, setProjects] = useState([])
  const [editing, setEditing] = useState(null)
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [loginError, setLoginError] = useState('')
  const [loading, setLoading] = useState(true)

  const loadProjects = async () => {
    const result = await apiRequest('/api/admin/projects')
    setProjects(result.projects)
  }

  useEffect(() => {
    apiRequest('/api/auth/me')
      .then(() => {
        setAuthenticated(true)
        return loadProjects()
      })
      .catch(() => setAuthenticated(false))
      .finally(() => setLoading(false))
  }, [])

  const login = async (event) => {
    event.preventDefault()
    setLoginError('')
    try {
      await apiRequest('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      })
      setAuthenticated(true)
      await loadProjects()
    } catch (error) {
      setLoginError(error.message)
    }
  }

  const remove = async (project) => {
    if (!window.confirm(`Excluir “${project.title}”?`)) return
    try {
      await apiRequest(`/api/admin/projects/${project.id}`, { method: 'DELETE' })
      await loadProjects()
    } catch (error) {
      window.alert(error.message)
    }
  }

  const togglePublished = async (project) => {
    try {
      await apiRequest(`/api/admin/projects/${project.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ ...project, published: !project.published }),
      })
      await loadProjects()
    } catch (error) {
      window.alert(error.message)
    }
  }

  const removePdf = async (project) => {
    try {
      await apiRequest(`/api/admin/projects/${project.id}/pdf`, { method: 'DELETE' })
      await loadProjects()
    } catch (error) {
      window.alert(error.message)
    }
  }

  if (loading) {
    return <p className="mx-auto max-w-6xl px-6 py-20 text-ink/70">Carregando área administrativa…</p>
  }

  if (!authenticated) {
    return (
      <>
        <Seo title="Administração" description="Área administrativa dos projetos do Jorge." />
        <section className="mx-auto max-w-md px-6 py-16 md:py-24">
          <p className="font-display text-sm italic text-soil">Acesso restrito</p>
          <h1 className="mt-3 font-display text-5xl text-forest">Administração</h1>
          <form onSubmit={login} className="mt-8 rounded-sm border border-soil-light/40 bg-paper p-6 shadow-sm">
            <label className="block text-sm font-semibold text-forest">
              E-mail
              <input
                required
                type="email"
                autoComplete="username"
                value={credentials.email}
                onChange={(event) => setCredentials({ ...credentials, email: event.target.value })}
                className="mt-2 w-full rounded-sm border border-soil-light/60 bg-sand px-4 py-3 font-normal text-ink outline-none focus:border-forest"
              />
            </label>
            <label className="mt-4 block text-sm font-semibold text-forest">
              Senha
              <input
                required
                type="password"
                autoComplete="current-password"
                value={credentials.password}
                onChange={(event) => setCredentials({ ...credentials, password: event.target.value })}
                className="mt-2 w-full rounded-sm border border-soil-light/60 bg-sand px-4 py-3 font-normal text-ink outline-none focus:border-forest"
              />
            </label>
            {loginError && <p className="mt-4 text-sm text-red-700">{loginError}</p>}
            <button type="submit" className="button-animate mt-6 rounded-sm bg-forest px-5 py-2.5 text-sm font-semibold text-sand hover:bg-forest-deep">
              Entrar
            </button>
          </form>
        </section>
      </>
    )
  }

  return (
    <>
      <Seo title="Administração" description="Gerencie os projetos publicados no site do Jorge." />
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="font-display text-sm italic text-soil">Acesso restrito</p>
            <h1 className="mt-3 font-display text-5xl text-forest">Projetos</h1>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setEditing({})}
              className="button-animate rounded-sm bg-forest px-5 py-2.5 text-sm font-semibold text-sand hover:bg-forest-deep"
            >
              Novo projeto
            </button>
            <button
              type="button"
              onClick={async () => {
                await apiRequest('/api/auth/logout', { method: 'POST' })
                setAuthenticated(false)
              }}
              className="button-animate rounded-sm border border-soil-light/60 px-5 py-2.5 text-sm font-semibold text-ink/75 hover:bg-sand-deep"
            >
              Sair
            </button>
          </div>
        </div>
        {editing && (
          <div className="mt-8">
            <ProjectForm
              project={editing.id ? editing : null}
              onSaved={async () => {
                setEditing(null)
                await loadProjects()
              }}
              onCancel={() => setEditing(null)}
            />
          </div>
        )}
        <div className="mt-10 space-y-4">
          {projects.length === 0 && <p className="text-ink/70">Nenhum projeto cadastrado.</p>}
          {projects.map((project) => (
            <article key={project.id} className="flex flex-wrap items-center justify-between gap-4 rounded-sm border border-soil-light/40 bg-paper p-5 shadow-sm">
              <div>
                <h2 className="font-display text-2xl text-forest">{project.title}</h2>
                <p className="mt-1 text-sm text-ink/65">
                  {project.published ? 'Publicado' : 'Rascunho'}
                  {project.pdfName ? ` · ${project.pdfName}` : ''}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => togglePublished(project)} className="rounded-sm border border-soil-light/60 px-3 py-2 text-sm font-semibold text-forest hover:bg-sand-deep">
                  {project.published ? 'Despublicar' : 'Publicar'}
                </button>
                <button type="button" onClick={() => setEditing(project)} className="rounded-sm border border-soil-light/60 px-3 py-2 text-sm font-semibold text-forest hover:bg-sand-deep">
                  Editar
                </button>
                {project.pdfName && (
                  <button type="button" onClick={() => removePdf(project)} className="rounded-sm border border-soil-light/60 px-3 py-2 text-sm font-semibold text-ink/75 hover:bg-sand-deep">
                    Remover PDF
                  </button>
                )}
                <button type="button" onClick={() => remove(project)} className="rounded-sm border border-red-200 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50">
                  Excluir
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

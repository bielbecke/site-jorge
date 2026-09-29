# Jorge — site institucional

Site institucional do Projeto Jorge, construído com **React + Vite + Tailwind
CSS v4**. A página de projetos usa um backend sem custo fixo na Cloudflare:
Workers para a API, D1 para os dados e R2 para os PDFs.

## Rodando localmente (frontend)

```bash
npm install
npm run dev       # ambiente de desenvolvimento, com hot reload
npm run build     # gera a versão de produção em /dist
npm run preview   # serve a versão de produção localmente
```

Requer Node.js 22.12 ou superior. O frontend pode ser desenvolvido sem
Cloudflare; nesse caso, a página `/projetos-externos` mostra a mensagem de
indisponibilidade da API até que o Worker esteja sendo executado.

## Backend Cloudflare

### Recursos

- `GET /api/projects`: lista apenas projetos publicados.
- `GET /api/projects/:id` e `/api/projects/:id/pdf`: detalhes e PDF público.
- `POST /api/auth/login`, `POST /api/auth/logout` e `GET /api/auth/me`.
- CRUD autenticado em `/api/admin/projects`.
- Upload e remoção de PDF em
  `/api/admin/projects/:id/pdf`, validado como PDF e limitado a **10 MB**.
- Sessões aleatórias armazenadas como hash no D1, com cookie `HttpOnly`,
  `Secure` e `SameSite=Strict`.

O banco e o bucket são configurados em `wrangler.jsonc`. Crie-os uma vez e
substitua `replace-with-your-d1-database-id` pelo ID real:

```bash
npx wrangler d1 create jorge-projects
npx wrangler r2 bucket create jorge-project-files
npx wrangler d1 migrations apply jorge-projects --remote
```

Configure as credenciais administrativas como secrets (não as versionem):

```bash
npx wrangler secret put ADMIN_EMAIL
npx wrangler secret put ADMIN_PASSWORD
```

`ADMIN_PASSWORD_HASH` também é aceito no formato
`pbkdf2$<iterações>$<salt-base64url>$<hash-base64url>` (SHA-256, no mínimo
100.000 iterações). Ele é preferível para instalações em produção. Se o hash
não estiver definido, `ADMIN_PASSWORD` continua sendo uma opção simples para
o primeiro deploy. Para gerar um hash localmente, sem instalar dependências:

```bash
npm run hash-password -- "uma senha forte"
npx wrangler secret put ADMIN_PASSWORD_HASH
```

Para publicar:

```bash
npm run build
npx wrangler deploy
```

A área administrativa fica em `/admin`; a página pública fica em
`/projetos-externos`. O Worker serve o `dist` como assets e encaminha as rotas
do React para `index.html`.

## Estrutura

```
src/
  components/   Navbar, Footer, Layout, ilustração do hero, avatar placeholder
  pages/        Páginas públicas, projetos e área administrativa
  lib/          Cliente da API
worker/
  index.js      API do Worker, autenticação, CRUD e upload R2
migrations/
  0001_initial.sql
src/index.css  tokens de design (cores, fontes) e estilos globais
```

As rotas são gerenciadas por `react-router-dom` em `src/App.jsx`.

## Design

- **Cores**: verde-floresta (`--color-forest`), verde-musgo (`--color-moss`),
  terra (`--color-soil`), areia (`--color-sand`) e um acento dourado-colheita
  (`--color-wheat`). Todos definidos em `src/index.css` dentro do bloco
  `@theme`, e disponíveis como classes Tailwind normais (`bg-forest`,
  `text-soil`, etc.).
- **Tipografia**: Fraunces (serifada, títulos) + Work Sans (textos corridos),
  carregadas via Google Fonts em `index.html`.

## Adicionando as fotos da equipe

A página `/equipe` usa `PlaceholderAvatar` (círculo colorido com as iniciais)
como espaço reservado. Para trocar por fotos reais:

1. Coloque os arquivos de imagem em `src/assets/team/` (ex.:
   `matheus.jpg`).
2. Em `src/pages/Equipe.jsx`, importe a imagem e troque
   `<PlaceholderAvatar ... />` por um `<img src={matheus} alt="Foto de Matheus" className="h-20 w-20 rounded-full object-cover" />`.

## Próximos passos sugeridos

- Adicionar uma seção de roadmap simplificada, quando o cronograma do
  projeto estiver mais definido para apresentação pública.
- Preparar a página "O projeto" para receber conteúdo dinâmico (ex.: vindo
  de um CMS ou arquivo de dados) quando a plataforma real começar a ser
  construída.
- Substituir os avatares de iniciais por fotos reais da equipe.
- Se o formulário de contato precisar funcionar de verdade, conectá-lo a um
  serviço de envio de e-mail (ex.: Formspree, Resend) ou a um backend
  próprio — hoje ele é só uma demonstração client-side.

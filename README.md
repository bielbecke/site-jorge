# Jorge — site institucional

Site institucional/landing page do Projeto Jorge, construído com **React +
Vite + Tailwind CSS v4**. Apresenta o projeto (propósito, funcionamento e
equipe) sem implementar a plataforma real, que ainda está em
desenvolvimento.

## Rodando localmente

```bash
npm install
npm run dev       # ambiente de desenvolvimento, com hot reload
npm run build     # gera a versão de produção em /dist
npm run preview   # serve a versão de produção localmente
```

Requer Node.js 18 ou superior.

## Estrutura

```
src/
  components/   Navbar, Footer, Layout, ilustração do hero, avatar placeholder
  pages/        Início, O projeto, Como funciona, Equipe, Contato, 404
  index.css     tokens de design (cores, fontes) e estilos globais
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

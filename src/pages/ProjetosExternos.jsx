import { useEffect, useState } from 'react'
import Seo from '../components/Seo.jsx'
import { apiRequest } from '../lib/api.js'

export default function ProjetosExternos() {
  const [projects, setProjects] = useState([])
  const [status, setStatus] = useState('loading')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    apiRequest('/api/projects')
      .then((result) => {
        setProjects(result.projects)
        setStatus('ready')
      })
      .catch((error) => {
        setErrorMessage(error.message)
        setStatus('error')
      })
  }, [])

  return (
    <>
      <Seo title="Documentação" description="Consulte a documentação publicada pelo Jorge." />

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <p className="font-display text-sm italic text-soil">Materiais do projeto</p>
        <h1 className="mt-3 font-display text-5xl leading-tight text-forest sm:text-6xl">Documentação</h1>
        <p className="mt-6 max-w-3xl text-[17px] leading-relaxed text-ink/80">
          Consulte os documentos publicados pela equipe do projeto Jorge.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20 md:pb-28">
        {status === 'loading' && <p className="text-ink/70">Carregando projetos…</p>}
        {status === 'error' && (
          <p role="alert" className="rounded-sm border border-red-200 bg-red-50 p-4 text-red-800">
            {errorMessage}
          </p>
        )}
        {status === 'ready' && projects.length === 0 && (
          <div className="rounded-sm border border-soil-light/40 bg-paper p-8 text-center">
            <h2 className="font-display text-2xl text-forest">Ainda não há documentos publicados</h2>
            <p className="mt-2 text-ink/70">Volte em breve para consultar os novos materiais.</p>
          </div>
        )}
        <div className="space-y-6">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="card-hover reveal-on-load overflow-hidden rounded-sm border border-soil-light/40 bg-paper shadow-sm"
            >
              <div className="border-b border-soil-light/40 bg-sand-deep px-6 py-4">
                <p className="text-[10px] uppercase tracking-[0.16em] text-soil">{index + 1}. Projeto</p>
                <h2 className="mt-2 font-display text-2xl text-forest">{project.title}</h2>
              </div>
              <div className="p-6">
                <p className="whitespace-pre-wrap text-[17px] leading-relaxed text-ink/80">
                  {project.description || 'Este projeto ainda não possui uma descrição.'}
                </p>
                {project.pdfUrl && (
                  <a
                    href={project.pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="button-animate mt-5 inline-flex items-center gap-2 rounded-sm border border-forest bg-forest/5 px-4 py-2 text-sm font-semibold text-forest transition-colors hover:bg-forest hover:text-sand"
                  >
                    <span aria-hidden="true">📄</span>
                    Abrir {project.pdfName || 'PDF do projeto'}
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

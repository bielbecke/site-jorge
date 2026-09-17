import { useEffect, useState } from 'react'
import Seo from '../components/Seo.jsx'

const STORAGE_KEY = 'jorge-projetos-salvos'

const listaInicial = [
  { id: 'escopo', nome: 'Gestão de Escopo', texto: '', pdfUrl: '', pdfNome: '' },
  { id: 'tempo', nome: 'Gestão de Tempo', texto: '', pdfUrl: '', pdfNome: '' },
  { id: 'qualidade', nome: 'Gestão de Qualidade', texto: '', pdfUrl: '', pdfNome: '' },
  { id: 'recursos', nome: 'Gestão de Recursos', texto: '', pdfUrl: '', pdfNome: '' },
  { id: 'custo', nome: 'Gestão de Custo', texto: '', pdfUrl: '', pdfNome: '' },
  { id: 'comunicacoes', nome: 'Gestão de Comunicações', texto: '', pdfUrl: '', pdfNome: '' },
  { id: 'riscos', nome: 'Gestão de Riscos', texto: '', pdfUrl: '', pdfNome: '' },
  { id: 'prince2', nome: 'Prince2', texto: '', pdfUrl: '', pdfNome: '' },
  { id: 'aquisicoes', nome: 'Gestão de Aquisições', texto: '', pdfUrl: '', pdfNome: '' },
  { id: 'partes', nome: 'Partes Interessadas e Integração', texto: '', pdfUrl: '', pdfNome: '' },
]

export default function ProjetosExternos() {
  const [projetos, setProjetos] = useState(() => {
    const salvo = localStorage.getItem(STORAGE_KEY)
    if (!salvo) return listaInicial

    try {
      const dados = JSON.parse(salvo)
      return Array.isArray(dados) && dados.length ? dados : listaInicial
    } catch {
      return listaInicial
    }
  })

  const [salvo, setSalvo] = useState(true)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projetos))
    setSalvo(true)
  }, [projetos])

  const atualizarTexto = (id, texto) => {
    setSalvo(false)
    setProjetos((prev) =>
      prev.map((projeto) =>
        projeto.id === id ? { ...projeto, texto } : projeto,
      ),
    )
  }

  const atualizarPdf = (id, file) => {
    if (!file) return

    if (file.type !== 'application/pdf') {
      window.alert('Selecione um arquivo PDF válido.')
      return
    }

    setSalvo(false)

    const reader = new FileReader()
    reader.onload = () => {
      setProjetos((prev) =>
        prev.map((projeto) =>
          projeto.id === id
            ? {
                ...projeto,
                pdfUrl: String(reader.result),
                pdfNome: file.name,
              }
            : projeto,
        ),
      )
    }
    reader.readAsDataURL(file)
  }

  const limparPdf = (id) => {
    setSalvo(false)
    setProjetos((prev) =>
      prev.map((projeto) =>
        projeto.id === id ? { ...projeto, pdfUrl: '', pdfNome: '' } : projeto,
      ),
    )
  }

  return (
    <>
      <Seo
        title="Projetos"
        description="Lista dos projetos com armazenamento local e PDF."
      />

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <p className="font-display text-sm italic text-soil">
          Organização por tema
        </p>
        <h1 className="mt-3 font-display text-5xl leading-tight text-forest sm:text-6xl">
          Projetos
        </h1>
        <p className="mt-6 max-w-3xl text-[17px] leading-relaxed text-ink/80">
          Escreva o texto do projeto e anexe o PDF correspondente. Tudo fica salvo no navegador.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20 md:pb-28">
        <div className="space-y-6">
          {projetos.map((projeto, index) => {
            const temTexto = (projeto.texto || '').trim().length > 0
            const temPdf = Boolean(projeto.pdfUrl)
            const podeSalvar = !salvo && (temTexto || temPdf)

            return (
              <article
                key={projeto.id}
                className="card-hover reveal-on-load overflow-hidden rounded-sm border border-soil-light/40 bg-paper shadow-sm"
              >
                <div className="flex flex-col gap-3 border-b border-soil-light/40 bg-sand-deep px-6 py-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.16em] text-soil">
                      {index + 1}. Projeto
                    </p>
                    <h2 className="mt-2 font-display text-2xl text-forest">
                      {projeto.nome}
                    </h2>
                  </div>
                </div>

                <div className="grid gap-6 p-6 md:grid-cols-[1.2fr_0.8fr]">
                  <div>
                    <label className="block text-sm font-semibold uppercase tracking-[0.12em] text-forest/80">
                      Descrição do projeto
                    </label>
                    <textarea
                      value={projeto.texto}
                      onChange={(event) => atualizarTexto(projeto.id, event.target.value)}
                      rows={6}
                      placeholder="Escreva aqui sobre o projeto..."
                      className="mt-3 w-full resize-none rounded-sm border border-soil-light/60 bg-sand px-4 py-3 text-[15px] text-ink/80 outline-none transition focus:border-forest"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold uppercase tracking-[0.12em] text-forest/80">
                      PDF do projeto
                    </label>

                    <label className="button-animate mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-sm border border-dashed border-soil-light/70 bg-sand px-3 py-4 text-sm font-semibold text-forest transition-all hover:border-forest hover:bg-forest/5">
                      <span aria-hidden="true">📎</span>
                      Escolher arquivo PDF
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={(event) => atualizarPdf(projeto.id, event.target.files?.[0])}
                        className="hidden"
                      />
                    </label>

                    <div className="mt-4 rounded-sm border border-soil-light/40 bg-sand px-3 py-3 text-sm text-ink/70">
                      {projeto.pdfNome ? (
                        <>
                          <span className="font-medium text-forest">Arquivo:</span>{' '}
                          {projeto.pdfNome}
                        </>
                      ) : (
                        'Nenhum PDF selecionado ainda.'
                      )}
                    </div>

                    {temPdf && (
                      <div className="mt-4 flex flex-wrap gap-3">
                        <a
                          href={projeto.pdfUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="button-animate inline-flex items-center gap-2 rounded-sm border border-forest bg-forest/5 px-4 py-2 text-sm font-semibold text-forest transition-colors hover:bg-forest hover:text-sand"
                        >
                          <span aria-hidden="true">📄</span>
                          PDF anexado — clique para abrir
                        </a>

                        <button
                          type="button"
                          onClick={() => limparPdf(projeto.id)}
                          className="button-animate inline-flex rounded-sm border border-soil-light/60 bg-sand px-4 py-2 text-sm font-semibold text-ink/70 hover:bg-sand-deep"
                        >
                          Remover PDF
                        </button>
                      </div>
                    )}

                    {podeSalvar && (
                      <button
                        type="button"
                        onClick={() => {
                          localStorage.setItem(STORAGE_KEY, JSON.stringify(projetos))
                          setSalvo(true)
                        }}
                        className="button-animate mt-5 inline-flex rounded-sm bg-forest px-5 py-2.5 text-sm font-semibold text-sand hover:bg-forest-deep"
                      >
                        Salvar alterações
                      </button>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </>
  )
}

import { useState } from 'react'
import Seo from '../components/Seo.jsx'

export default function Contato() {
  const [enviado, setEnviado] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setEnviado(true)
  }

  return (
    <>
      <Seo
        title="Contato"
        description="Fale sobre o projeto Jorge. Página institucional de um projeto acadêmico em desenvolvimento."
      />

      <section className="mx-auto grid max-w-5xl gap-14 px-6 py-16 md:grid-cols-[1fr_1.1fr] md:py-24">
        <div>
          <h1 className="font-display text-4xl leading-tight text-forest">
            Vamos conversar sobre o Jorge
          </h1>
          <p className="mt-6 text-[17px] leading-relaxed text-ink/80">
            O Jorge ainda é um projeto acadêmico em desenvolvimento — não há,
            por enquanto, um cadastro aberto ou uma plataforma disponível
            para uso. Mas se você quer entender melhor a proposta, sugerir
            algo ou trocar uma ideia, deixe sua mensagem abaixo.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-ink/60">
            Este formulário é uma demonstração da página e não envia a
            mensagem a nenhum destino real.
          </p>
        </div>

        <div className="rounded-sm border border-soil-light/40 bg-paper p-8">
          {enviado ? (
            <div className="flex h-full flex-col items-center justify-center py-10 text-center">
              <p className="font-display text-2xl text-forest">Mensagem registrada.</p>
              <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-ink/70">
                Em uma versão futura, esta mensagem chegaria até a equipe do
                Jorge. Por agora, esta é só uma demonstração da página.
              </p>
              <button
                type="button"
                onClick={() => setEnviado(false)}
                className="mt-6 text-sm font-semibold text-forest underline decoration-wheat decoration-2 underline-offset-4"
              >
                Enviar outra mensagem
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="nome" className="block text-sm font-semibold text-forest">
                  Nome
                </label>
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  required
                  className="mt-2 w-full rounded-sm border border-soil-light/50 bg-sand px-4 py-2.5 text-[15px] outline-none focus:border-forest"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-forest">
                  E-mail
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-2 w-full rounded-sm border border-soil-light/50 bg-sand px-4 py-2.5 text-[15px] outline-none focus:border-forest"
                />
              </div>

              <div>
                <label htmlFor="mensagem" className="block text-sm font-semibold text-forest">
                  Mensagem
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  rows={4}
                  required
                  className="mt-2 w-full rounded-sm border border-soil-light/50 bg-sand px-4 py-2.5 text-[15px] outline-none focus:border-forest"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-sm bg-forest px-6 py-3 text-sm font-semibold text-sand transition-colors hover:bg-forest-deep"
              >
                Enviar mensagem
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}

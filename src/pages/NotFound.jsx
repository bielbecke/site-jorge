import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'

export default function NotFound() {
  return (
    <>
      <Seo title="Página não encontrada" />
      <section className="mx-auto max-w-3xl px-6 py-24">
        <div className="reveal-on-load overflow-hidden rounded-sm border border-soil-light/40 bg-paper shadow-sm">
          <div className="bg-gradient-to-br from-forest via-forest to-forest-deep p-8 text-center text-sand">
            <p className="text-[10px] uppercase tracking-[0.18em] text-sand/75">
              Jorge
            </p>
            <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
              Essa terra ainda não foi arada.
            </h1>
          </div>

          <div className="p-8 text-center">
            <p className="text-[17px] leading-relaxed text-ink/75">
              A página que você procurava não existe ou foi movida para outro caminho.
            </p>
            <Link
              to="/"
              className="mt-8 inline-flex rounded-sm bg-forest px-6 py-3 text-sm font-semibold text-sand transition-colors hover:bg-forest-deep"
            >
              Voltar para o início
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

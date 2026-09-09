import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'

export default function NotFound() {
  return (
    <>
      <Seo title="Página não encontrada" />
      <section className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="font-display text-4xl text-forest">Essa terra ainda não foi arada.</h1>
        <p className="mt-4 text-[17px] leading-relaxed text-ink/75">
          A página que você procurava não existe ou foi movida.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-sm bg-forest px-6 py-3 text-sm font-semibold text-sand hover:bg-forest-deep"
        >
          Voltar para o início
        </Link>
      </section>
    </>
  )
}

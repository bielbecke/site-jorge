import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import FieldIllustration from '../components/FieldIllustration.jsx'

const pillars = [
  {
    title: 'Organização financeira',
    text: 'Custos, receitas e insumos num só lugar, para o produtor ver com clareza se cada cultivo está dando lucro.',
  },
  {
    title: 'Leitura do território e do clima',
    text: 'Solo, relevo, chuva e pragas da região entram na conta, porque a terra de cada propriedade é diferente.',
  },
  {
    title: 'Decisões com mais segurança',
    text: 'Preço de venda, troca de cultivo, novo investimento: recomendações baseadas em dados reais, não em achismo.',
  },
]

export default function Home() {
  return (
    <>
      <Seo
        title="Início"
        description="Jorge é um sistema de informação que ajuda pequenos produtores rurais a organizar custos, receitas e decisões de cultivo com dados."
      />

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1.1fr_1fr] md:items-center md:py-24">
        <div>
          <h1 className="font-display text-4xl leading-[1.1] text-forest sm:text-5xl">
            Jorge cuida dos números para que você cuide da terra.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/80">
            Um sistema pensado para pequenos produtores rurais e agricultores
            familiares organizarem custos, receitas e safras — e tomarem
            decisões com a mesma clareza que os grandes produtores já têm.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              to="/projeto"
              className="rounded-sm bg-forest px-6 py-3 text-sm font-semibold text-sand transition-colors hover:bg-forest-deep"
            >
              Conhecer o projeto
            </Link>
            <Link
              to="/equipe"
              className="rounded-sm border border-soil px-6 py-3 text-sm font-semibold text-soil transition-colors hover:bg-sand-deep"
            >
              Quem está por trás
            </Link>
          </div>
        </div>

        <div className="reveal-on-load order-first md:order-last">
          <FieldIllustration className="w-full max-w-md md:max-w-none" />
        </div>
      </section>

      <div className="furrow" />

      {/* Problem statement */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          <h2 className="font-display text-3xl leading-tight text-forest">
            O grande produtor compra mais barato e vende mais caro. Não por
            sorte — por informação.
          </h2>
          <div className="space-y-4 text-[17px] leading-relaxed text-ink/80">
            <p>
              Pequenos produtores rurais tomam decisões importantes — o que
              plantar, quando vender, quanto investir — sem ter à mão dados
              consolidados sobre seus próprios custos, sua produção e o
              mercado ao redor.
            </p>
            <p>
              Essa falta de informação tem um preço: insumos comprados mais
              caros, produção vendida por menos, e erros que, para uma
              família rural, custam caro demais para se repetir.
            </p>
            <p className="text-forest font-medium">
              Jorge existe para reduzir essa distância — com uma ferramenta de
              gestão acessível, e não com mais uma consultoria cara.
            </p>
          </div>
        </div>
      </section>

      <div className="furrow" />

      {/* Pillars preview */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="max-w-xl">
          <h2 className="font-display text-3xl text-forest">
            Como o Jorge ajuda, na prática
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-ink/75">
            Três frentes que crescem junto com o produtor, conforme mais
            dados da propriedade vão sendo inseridos.
          </p>
        </div>

        <div className="mt-10 grid gap-px overflow-hidden rounded-sm border border-soil-light/40 bg-soil-light/40 md:grid-cols-3">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="bg-paper p-7">
              <h3 className="font-display text-xl text-forest">{pillar.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink/75">
                {pillar.text}
              </p>
            </div>
          ))}
        </div>

        <Link
          to="/como-funciona"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-forest underline decoration-wheat decoration-2 underline-offset-4 hover:text-forest-deep"
        >
          Ver como isso funciona em detalhe
        </Link>
      </section>
    </>
  )
}

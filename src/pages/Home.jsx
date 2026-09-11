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
        title="Home"
        description="Projeto Jorge, apresentando a proposta, o contexto e a equipe por trás da solução."
      />

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1.1fr_1fr] md:items-center md:py-24">
        <div className="order-2 md:order-1">
          <h1 className="font-display text-5xl leading-[0.95] text-forest sm:text-6xl lg:text-7xl">
            Jorge
          </h1>
          <p className="mt-4 max-w-2xl text-xl leading-relaxed text-ink/80 sm:text-2xl">
            Projeto de gestão para pequenos produtores rurais, pensado para
            organizar dados, entender custos e apoiar decisões com mais
            clareza.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              to="/projeto"
              className="rounded-sm bg-forest px-6 py-3 text-sm font-semibold text-sand transition-colors hover:bg-forest-deep"
            >
              Sobre o projeto
            </Link>
            <Link
              to="/equipe"
              className="rounded-sm border border-soil px-6 py-3 text-sm font-semibold text-soil transition-colors hover:bg-sand-deep"
            >
              Sobre nós
            </Link>
          </div>
        </div>

        <div className="order-1 md:order-2">
          <FieldIllustration className="w-full max-w-md md:max-w-none" />
        </div>
      </section>

      <div className="furrow" />

      {/* Problem statement */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          <h2 className="font-display text-3xl leading-tight text-forest">
            O contexto do projeto Jorge
          </h2>
          <div className="space-y-4 text-[17px] leading-relaxed text-ink/80">
            <p>
              O projeto nasceu a partir da percepção de que pequenos produtores
              rurais frequentemente tomam decisões importantes sem acesso a
              uma visão clara de custos, produção e rentabilidade. Em muitos
              casos, a dificuldade não está na vontade de produzir, mas na
              falta de organização e informação para planejar melhor.
            </p>
            <p>
              Por isso, o Jorge foi pensado como uma proposta acadêmica que
              reúne tecnologia, gestão e análise para apoiar a atividade rural
              com mais inteligência e autonomia.
            </p>
            <p className="text-forest font-medium">
              A ideia central do projeto é demonstrar como soluções digitais
              podem contribuir para a tomada de decisão no campo, em um
              contexto de inovação e desenvolvimento acadêmico.
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
          to="/projeto"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-forest underline decoration-wheat decoration-2 underline-offset-4 hover:text-forest-deep"
        >
          Conhecer mais sobre o projeto
        </Link>
      </section>
    </>
  )
}

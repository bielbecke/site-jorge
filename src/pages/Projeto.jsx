import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'

const publico = [
  'Pequenos produtores rurais',
  'Agricultores familiares',
  'Empreendedores rurais iniciantes',
  'Cooperativas e associações',
]

export default function Projeto() {
  return (
    <>
      <Seo
        title="Sobre o projeto"
        description="Conheça o projeto Jorge, seu contexto, proposta e público-alvo."
      />

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <p className="font-display text-sm italic text-soil">
              Geōrgios, do grego — aquele que trabalha a terra.
            </p>
            <h1 className="mt-3 font-display text-5xl leading-tight text-forest sm:text-6xl">
              Sobre o projeto Jorge
            </h1>

            <div className="mt-8 space-y-6 text-[17px] leading-relaxed text-ink/85">
              <p>
                O Jorge é um projeto acadêmico desenvolvido por estudantes de
                Sistemas de Informação com o objetivo de apresentar uma solução
                digital para apoiar pequenos produtores rurais na organização,
                análise e tomada de decisão relacionadas à gestão da produção.
              </p>
              <p>
                A proposta do projeto é mostrar como ferramentas digitais podem
                ajudar no planejamento, no controle de informações e na
                compreensão dos resultados da atividade rural.
              </p>
            </div>
          </div>

          <div className="rounded-sm border border-soil-light/40 bg-paper p-4 shadow-sm">
            <div className="relative overflow-hidden rounded-sm bg-gradient-to-br from-forest via-forest to-forest-deep p-5 text-sand">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute -right-10 -top-8 h-36 w-36 rounded-full bg-wheat" />
                <div className="absolute bottom-0 left-0 h-28 w-28 rounded-full bg-sand/20" />
                <div className="absolute right-10 top-16 h-20 w-20 rounded-full border border-sand/40" />
              </div>

              <div className="relative">
                <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.14em] text-sand/80">
                  <span>Jorge</span>
                  <span>Projeto</span>
                </div>

                <div className="mt-8 rounded-xl border border-sand/20 bg-sand/5 p-4 backdrop-blur-sm">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-sand/70">
                    Descrição geral
                  </p>
                  <h3 className="mt-3 text-3xl font-semibold leading-tight text-sand">
                    Solução para gestão rural mais organizada
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-sand/80">
                    O Jorge é um projeto pensado para reunir informações,
                    apoiar o planejamento e facilitar a compreensão dos
                    resultados da atividade rural.
                  </p>
                </div>

                <div className="mt-5 rounded-lg bg-sand/10 p-3">
                  <p className="text-[10px] uppercase tracking-[0.12em] text-sand/70">
                    Objetivos
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-sand/80">
                    Demonstrar como a tecnologia pode ajudar produtores a
                    organizar dados, melhorar a tomada de decisão e ampliar a
                    visão sobre a produção e os resultados.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-sm border border-soil-light/30 bg-sand px-3 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-soil">
                  Contexto
                </p>
                <p className="mt-1 text-sm text-ink/75">Gestão rural com poucos dados</p>
              </div>
              <div className="rounded-sm border border-soil-light/30 bg-sand px-3 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-soil">
                  Objetivo
                </p>
                <p className="mt-1 text-sm text-ink/75">Organizar e orientar decisões</p>
              </div>
              <div className="rounded-sm border border-soil-light/30 bg-sand px-3 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-soil">
                  Valor
                </p>
                <p className="mt-1 text-sm text-ink/75">Mais clareza e autonomia</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="furrow" />

      <section className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <h2 className="font-display text-2xl text-forest">Contexto e problema</h2>
        <div className="mt-6 space-y-5 text-[17px] leading-relaxed text-ink/85">
          <p>
            O projeto parte de uma realidade comum no campo: muitos pequenos
            produtores possuem experiência e conhecimento prático, mas ainda
            enfrentam dificuldades para organizar de forma eficiente custos,
            receitas, produção e planejamento financeiro.
          </p>
          <p>
            A partir dessa observação, o Jorge foi idealizado como uma
            proposta de solução acadêmica que busca mostrar como ferramentas
            digitais podem auxiliar a gestão rural com maior organização,
            previsibilidade e apoio à decisão.
          </p>
        </div>
      </section>

      <div className="furrow" />

      <section className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <h2 className="font-display text-2xl text-forest">Nossa proposta</h2>
        <p className="mt-6 text-[17px] leading-relaxed text-ink/85">
          O Jorge propõe uma maneira acessível e organizada de pensar a
          gestão rural por meio de tecnologia. Em vez de substituir o
          conhecimento do produtor, o projeto busca complementar esse
          conhecimento com informações estruturadas, facilitando o controle,
          a análise e a compreensão dos resultados obtidos.
        </p>

        <div className="mt-10 rounded-sm border border-soil-light/50 bg-paper p-7">
          <h3 className="font-display text-lg text-forest">Para quem é o Jorge</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {publico.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[15px] text-ink/80">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-wheat" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-10 text-[15px] leading-relaxed text-ink/65">
          Esta página apresenta a visão geral do projeto, o contexto de
          criação e a proposta de valor do Jorge como trabalho acadêmico.
        </p>

        <Link
          to="/equipe"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-forest underline decoration-wheat decoration-2 underline-offset-4 hover:text-forest-deep"
        >
          Conhecer a equipe por trás do projeto
        </Link>
      </section>
    </>
  )
}

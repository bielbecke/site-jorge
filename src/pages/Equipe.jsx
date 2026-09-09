import Seo from '../components/Seo.jsx'
import PlaceholderAvatar from '../components/PlaceholderAvatar.jsx'

const equipe = [
  { nome: 'Matheus Gustavo Machado da Pedra' },
  { nome: 'Yuri Rosante Pontuschka' },
  { nome: 'Gabriel Basílio Beckedorff' },
  { nome: 'André Morales de Oliveira Carneiro' },
]

export default function Equipe() {
  return (
    <>
      <Seo
        title="Equipe"
        description="Conheça o grupo de estudantes universitários por trás do projeto Jorge."
      />

      <section className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <h1 className="font-display text-4xl leading-tight text-forest sm:text-5xl">
          Quem está por trás do Jorge
        </h1>
        <p className="mt-6 text-[17px] leading-relaxed text-ink/80">
          Somos um grupo de estudantes universitários de Sistemas de
          Informação. O Jorge nasceu como trabalho acadêmico, a partir de uma
          pergunta simples: por que a gestão rural inteligente ainda é
          privilégio de quem já tem escala?
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-20 md:pb-28">
        <div className="grid gap-6 sm:grid-cols-2">
          {equipe.map((pessoa, i) => (
            <div
              key={pessoa.nome}
              className="flex items-center gap-5 rounded-sm border border-soil-light/40 bg-paper p-6"
            >
              <PlaceholderAvatar name={pessoa.nome} index={i} className="h-20 w-20 shrink-0" />
              <div>
                <p className="font-display text-lg text-forest">{pessoa.nome}</p>
                <p className="mt-1 text-sm text-ink/65">Integrante do projeto Jorge</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 max-w-xl text-[15px] leading-relaxed text-ink/65">
          Os espaços acima estão reservados para as fotos da equipe. Para
          adicioná-las, coloque os arquivos de imagem em{' '}
          <code className="rounded bg-sand-deep px-1.5 py-0.5 text-[13px]">
            src/assets/team/
          </code>{' '}
          e troque o componente de iniciais por uma tag de imagem em{' '}
          <code className="rounded bg-sand-deep px-1.5 py-0.5 text-[13px]">
            src/pages/Equipe.jsx
          </code>
          .
        </p>
      </section>
    </>
  )
}

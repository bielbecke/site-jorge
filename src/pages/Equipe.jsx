import Seo from '../components/Seo.jsx'

const equipe = [
  { nome: 'Matheus Gustavo Machado da Pedra', foto: '/src/assets/team/matheus.jpeg' },
  { nome: 'Yuri Rosante Pontuschka', foto: '/src/assets/team/yuri.jpeg' },
  { nome: 'Gabriel Basílio Beckedorff', foto: '/src/assets/team/gabriel.jpeg' },
  { nome: 'André Morales de Oliveira Carneiro', foto: '/src/assets/team/andre.jpeg' },
]

export default function Equipe() {
  return (
    <>
      <Seo
        title="Sobre nós"
        description="Conheça o grupo de estudantes universitários por trás do projeto de faculdade Jorge."
      />

      <section className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <h1 className="font-display text-4xl leading-tight text-forest sm:text-5xl">
          Sobre nós
        </h1>
        <p className="mt-6 text-[17px] leading-relaxed text-ink/80">
          Somos um grupo de estudantes universitários de Sistemas de
          Informação responsável pelo desenvolvimento do projeto Jorge como
          apresentação acadêmica. O trabalho nasce da busca por soluções
          digitais úteis, acessíveis e voltadas a desafios reais do campo.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20 md:pb-28">
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {equipe.map((pessoa, i) => (
            <article
              key={pessoa.nome}
              className="overflow-hidden rounded-sm border border-soil-light/40 bg-paper shadow-sm transition-transform duration-200 hover:-translate-y-1"
            >
              <div className="flex h-56 items-center justify-center border-b border-soil-light/40 bg-sand-deep">
                {pessoa.foto ? (
                  <img
                    src={pessoa.foto}
                    alt={pessoa.nome}
                    className="h-full w-full object-cover object-top"
                  />
                ) : (
                  <div className="flex h-28 w-28 items-center justify-center rounded-[1.25rem] bg-forest text-2xl font-display text-sand">
                    {pessoa.nome
                      .split(' ')
                      .map((parte) => parte[0])
                      .slice(0, 2)
                      .join('')
                      .toUpperCase()}
                  </div>
                )}
              </div>

              <div className="flex min-h-[170px] flex-col justify-between p-6">
                <div>
                  <p className="font-display text-xl leading-tight text-forest">{pessoa.nome}</p>
                  <p className="mt-2 text-sm uppercase tracking-[0.12em] text-soil">
                    Integrante
                  </p>
                </div>

                <p className="mt-5 text-[15px] leading-relaxed text-ink/70">
                  Membro do projeto Jorge, contribuindo com o desenvolvimento,
                  a organização e a apresentação da proposta acadêmica.
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

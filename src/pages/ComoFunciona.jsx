import Seo from '../components/Seo.jsx'

const estagios = [
  {
    nome: 'A propriedade, organizada',
    resumo:
      'Tudo começa com o básico: onde fica a propriedade, qual o tamanho do terreno, o que se planta e quais recursos já estão disponíveis. Depois, os custos e receitas do dia a dia — insumos, mão de obra, máquinas — para o produtor ver, pela primeira vez, o retorno real de cada cultivo.',
  },
  {
    nome: 'A terra e o clima entram na conta',
    resumo:
      'Nem toda terra se comporta igual. O Jorge incorpora dados de solo, relevo, temperatura, chuva e pragas da região, para que as estimativas de rentabilidade façam sentido para aquela propriedade específica — não para uma média nacional.',
  },
  {
    nome: 'Mercado, fornecedores e logística',
    resumo:
      'Com custo e produção mapeados, o passo seguinte é olhar para fora: quem são os fornecedores, como estão os preços de insumos, para onde e como escoar a produção. É aqui que a distância até o comprador passa a pesar na decisão.',
  },
  {
    nome: 'Recomendações mais inteligentes',
    resumo:
      'Com dados suficientes acumulados, o Jorge passa a cruzar tudo isso — clima, custo, mercado — para sugerir preços, comparar alternativas de cultivo e investimento, simular cenários e avisar o produtor antes que um problema vire prejuízo.',
  },
]

export default function ComoFunciona() {
  return (
    <>
      <Seo
        title="Como funciona"
        description="Os estágios de evolução do Jorge: da organização básica da propriedade até recomendações inteligentes baseadas em dados."
      />

      <section className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <h1 className="font-display text-4xl leading-tight text-forest sm:text-5xl">
          Cresce junto com quem usa.
        </h1>
        <p className="mt-6 text-[17px] leading-relaxed text-ink/80">
          O Jorge não exige que o produtor chegue com uma planilha perfeita.
          A plataforma foi pensada para acompanhar o ritmo de cada
          propriedade: quanto mais informação entra, mais afiadas ficam as
          análises. Estas são as quatro frentes em que ela trabalha.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-20 md:pb-28">
        <ol className="relative space-y-12 border-l border-soil-light/50 pl-8">
          {estagios.map((estagio, i) => (
            <li key={estagio.nome} className="relative">
              <span
                aria-hidden="true"
                className={`absolute -left-[38px] top-1 h-4 w-4 rounded-full border-2 border-forest ${
                  i === estagios.length - 1 ? 'bg-wheat' : 'bg-sand'
                }`}
              />
              <h2 className="font-display text-2xl text-forest">{estagio.nome}</h2>
              <p className="mt-3 text-[16px] leading-relaxed text-ink/80">
                {estagio.resumo}
              </p>
            </li>
          ))}
        </ol>

        <p className="mt-14 max-w-xl text-[15px] leading-relaxed text-ink/65">
          Essas quatro frentes estão em desenvolvimento como parte de um
          projeto acadêmico. Esta página descreve o raciocínio por trás do
          Jorge — não uma plataforma já disponível para uso.
        </p>
      </section>
    </>
  )
}

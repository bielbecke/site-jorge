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
        title="O projeto"
        description="Conheça o Jorge: origem do nome, o problema que ele resolve e a proposta de valor para pequenos produtores rurais."
      />

      <section className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <p className="font-display text-sm italic text-soil">
          Geōrgios, do grego — aquele que trabalha a terra.
        </p>
        <h1 className="mt-3 font-display text-4xl leading-tight text-forest sm:text-5xl">
          Um nome brasileiro, para um problema muito brasileiro.
        </h1>

        <div className="mt-10 space-y-6 text-[17px] leading-relaxed text-ink/85">
          <p>
            Jorge é um sistema de informação em desenvolvimento por um grupo
            de estudantes universitários, voltado à gestão operacional e
            financeira de pequenos produtores rurais e agricultores
            familiares.
          </p>
          <p>
            A ideia é simples de descrever e difícil de fazer bem: pegar os
            dados que o próprio produtor já tem — ou que passa a registrar
            pouco a pouco — somá-los a dados externos, como clima e mercado,
            e devolver isso em forma de análises e recomendações que
            realmente ajudem a decidir melhor.
          </p>
        </div>
      </section>

      <div className="furrow" />

      <section className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <h2 className="font-display text-2xl text-forest">O problema</h2>
        <div className="mt-6 space-y-5 text-[17px] leading-relaxed text-ink/85">
          <p>
            No campo, o pequeno produtor concorre com o grande produtor em
            desvantagem — não porque produza pior, mas porque decide sem a
            mesma informação. Falta um controle claro de custos, de
            rentabilidade por cultivo, de como a logística e o mercado local
            afetam o resultado final.
          </p>
          <p>
            Isso gera uma assimetria conhecida: insumos comprados mais caros,
            produção vendida mais barata, e decisões tomadas por intuição em
            situações que pediam números. Ferramentas de gestão, mesmo
            simples, já fazem diferença real na sustentabilidade econômica
            dessas famílias.
          </p>
        </div>
      </section>

      <div className="furrow" />

      <section className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <h2 className="font-display text-2xl text-forest">Nossa proposta</h2>
        <p className="mt-6 text-[17px] leading-relaxed text-ink/85">
          Oferecer inteligência de gestão rural acessível — para que o
          produtor tome decisões melhores sem precisar contratar uma
          consultoria cara. Nada de substituir o conhecimento de quem já
          trabalha a terra: o papel do Jorge é organizar os números e trazer
          clareza para decisões que hoje são tomadas no escuro.
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
          A plataforma completa — com cadastro, motor de IA e painéis de
          análise — ainda está em desenvolvimento. Esta página apresenta o
          propósito do projeto, não a implementação técnica.
        </p>

        <Link
          to="/como-funciona"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-forest underline decoration-wheat decoration-2 underline-offset-4 hover:text-forest-deep"
        >
          Entender como o Jorge funciona na prática
        </Link>
      </section>
    </>
  )
}

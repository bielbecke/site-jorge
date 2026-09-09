import { Link } from 'react-router-dom'
import JorgeMark from './JorgeMark.jsx'

export default function Footer() {
  return (
    <footer className="bg-forest text-sand">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <JorgeMark className="h-9 w-9" />
              <span className="font-display text-xl">Jorge</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-sand/75">
              Do grego <em>Geōrgios</em>, "aquele que trabalha a terra". Um
              projeto acadêmico que estuda como dar ao pequeno produtor rural
              a mesma clareza de números que o grande produtor já tem.
            </p>
          </div>

          <div>
            <p className="font-display text-lg text-wheat-light">
              Navegação
            </p>
            <ul className="mt-4 space-y-2 text-sm text-sand/80">
              <li><Link to="/projeto" className="hover:text-wheat-light">O projeto</Link></li>
              <li><Link to="/como-funciona" className="hover:text-wheat-light">Como funciona</Link></li>
              <li><Link to="/equipe" className="hover:text-wheat-light">Equipe</Link></li>
              <li><Link to="/contato" className="hover:text-wheat-light">Contato</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-display text-lg text-wheat-light">
              Sobre esta página
            </p>
            <p className="mt-4 text-sm leading-relaxed text-sand/75">
              Site institucional de apresentação do projeto Jorge, um
              trabalho acadêmico em Sistemas de Informação. A plataforma
              descrita aqui ainda está em desenvolvimento.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-sand/15 pt-6 text-xs text-sand/60">
          © {new Date().getFullYear()} Projeto Jorge — projeto acadêmico, sem fins comerciais.
        </div>
      </div>
    </footer>
  )
}

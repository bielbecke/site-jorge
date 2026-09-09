import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import JorgeMark from './JorgeMark.jsx'

const links = [
  { to: '/', label: 'Início' },
  { to: '/projeto', label: 'O projeto' },
  { to: '/como-funciona', label: 'Como funciona' },
  { to: '/equipe', label: 'Equipe' },
  { to: '/contato', label: 'Contato' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-sand/95 backdrop-blur border-b border-soil-light/30">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <NavLink
          to="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <JorgeMark className="h-10 w-10" />
          <span className="font-display text-2xl text-forest">Jorge</span>
        </NavLink>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-[15px] transition-colors ${
                  isActive
                    ? 'text-forest font-semibold'
                    : 'text-ink/70 hover:text-forest'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`block h-[2px] w-6 bg-forest transition-transform ${open ? 'translate-y-[7px] rotate-45' : ''}`}
          />
          <span
            className={`block h-[2px] w-6 bg-forest transition-opacity ${open ? 'opacity-0' : ''}`}
          />
          <span
            className={`block h-[2px] w-6 bg-forest transition-transform ${open ? '-translate-y-[7px] -rotate-45' : ''}`}
          />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-soil-light/30 bg-sand px-6 py-4 md:hidden">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `rounded px-2 py-2.5 text-[15px] ${
                  isActive ? 'bg-sand-deep text-forest font-semibold' : 'text-ink/70'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}

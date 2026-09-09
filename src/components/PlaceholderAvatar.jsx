const palette = [
  { bg: 'var(--color-forest)', fg: 'var(--color-sand)' },
  { bg: 'var(--color-soil)', fg: 'var(--color-sand)' },
  { bg: 'var(--color-moss)', fg: 'var(--color-paper)' },
  { bg: 'var(--color-wheat)', fg: 'var(--color-forest-deep)' },
]

function initials(name) {
  const parts = name.trim().split(/\s+/)
  const first = parts[0]?.[0] ?? ''
  const last = parts.length > 1 ? parts[parts.length - 1][0] : ''
  return (first + last).toUpperCase()
}

// Placeholder headshot: shows initials on a soft earthy background.
// To use a real photo instead, replace this component's usage in Equipe.jsx
// with a normal <img src={...} alt="..." /> pointing to a file in
// src/assets/team/.
export default function PlaceholderAvatar({ name, index = 0, className = 'h-28 w-28' }) {
  const { bg, fg } = palette[index % palette.length]
  return (
    <div
      className={`flex items-center justify-center rounded-full ${className}`}
      style={{ backgroundColor: bg }}
      role="img"
      aria-label={`Foto de ${name} (ainda não adicionada)`}
    >
      <span className="font-display text-2xl" style={{ color: fg }}>
        {initials(name)}
      </span>
    </div>
  )
}

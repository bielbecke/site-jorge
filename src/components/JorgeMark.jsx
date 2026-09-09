export default function JorgeMark({ className = 'h-8 w-8' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect width="64" height="64" rx="12" fill="var(--color-forest)" />
      <path d="M20 44c0-14 8-24 22-26-2 14-9 23-22 26z" fill="var(--color-wheat)" />
      <path
        d="M20 44c6-1 12-5 16-11"
        stroke="var(--color-sand)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function FieldIllustration({ className = 'w-full h-auto' }) {
  return (
    <svg
      viewBox="0 0 520 460"
      className={className}
      role="img"
      aria-label="Ilustração de terras cultivadas em curvas de nível, com pequenos pontos representando dados coletados na propriedade"
    >
      <rect x="0" y="0" width="520" height="460" fill="none" />

      {/* sky/backdrop circle - sun */}
      <circle cx="410" cy="90" r="46" fill="var(--color-wheat-light)" opacity="0.55" />

      {/* terraced bands */}
      <path d="M0 460 L0 330 Q160 300 520 340 L520 460 Z" fill="var(--color-forest)" />
      <path d="M0 340 L0 250 Q180 215 520 255 L520 340 Q160 300 0 340 Z" fill="var(--color-moss)" />
      <path d="M0 250 L0 175 Q170 145 520 180 L520 255 Q180 215 0 250 Z" fill="var(--color-soil-light)" opacity="0.9" />
      <path d="M0 175 L0 110 Q190 85 520 110 L520 180 Q170 145 0 175 Z" fill="var(--color-sand-deep)" />

      {/* rows within lowest, largest band suggesting planted furrows */}
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={`M0 ${400 + i * 12} Q160 ${372 + i * 12} 520 ${408 + i * 12}`}
          stroke="var(--color-forest-deep)"
          strokeOpacity="0.25"
          strokeWidth="2"
          fill="none"
        />
      ))}

      {/* data points scattered across the terraces */}
      {[
        [90, 380], [230, 368], [365, 392], [140, 300], [300, 288],
        [420, 300], [70, 215], [250, 205], [400, 220], [190, 145], [340, 150],
      ].map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={i % 3 === 0 ? 6 : 4}
          fill="var(--color-wheat)"
          stroke="var(--color-paper)"
          strokeWidth="1.5"
        />
      ))}
    </svg>
  )
}

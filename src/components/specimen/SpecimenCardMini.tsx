interface Props {
  archiveNumber: string
  category: string
  title: string
  location: string
  year: string
}

export function SpecimenCardMini({ archiveNumber, category, title, location, year }: Props) {
  return (
    <div
      className="bg-card cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
      style={{ border: 'var(--specimen-border)' }}
    >
      {/* Hero image placeholder — replaced with next/image in Phase 3 */}
      <div className="aspect-[4/3] bg-ink-faint" />

      <div className="p-4" style={{ paddingBottom: 'var(--space-md)' }}>
        <div className="flex items-baseline gap-2 mb-2">
          <span className="font-label text-[10px] tracking-[0.15em] uppercase text-ink-muted">
            {category}
          </span>
          <span className="font-value text-[10px] text-ink-muted">
            {archiveNumber}
          </span>
        </div>
        <h3 className="font-value text-sm text-ink mb-1 lowercase">{title}</h3>
        <p className="font-label text-[10px] tracking-[0.12em] uppercase text-ink-muted">
          {location} · {year}
        </p>
      </div>
    </div>
  )
}

export function Footer() {
  return (
    <footer
      className="mx-auto px-8 py-6 max-w-[1200px] flex items-center justify-between"
      style={{ borderTop: 'var(--specimen-border)' }}
    >
      <span className="font-wordmark text-[12px] text-ink-muted" style={{ letterSpacing: '-0.02em' }}>
        notesbyshin
      </span>
      <span className="font-label text-[10px] tracking-[0.15em] uppercase text-ink-muted">
        new york
      </span>
    </footer>
  )
}

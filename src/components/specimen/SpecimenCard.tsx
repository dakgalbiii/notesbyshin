import { SpecimenField } from './SpecimenField'

export interface SpecimenFieldData {
  label: string
  value: string
}

interface Props {
  title?: string
  subtitle?: string
  fields: SpecimenFieldData[]
  footer?: string
  size?: 'full' | 'mini'
}

export function SpecimenCard({ title, subtitle, fields, footer, size = 'full' }: Props) {
  return (
    <div
      className={`bg-card ${size === 'full' ? 'max-w-[560px]' : ''}`}
      style={{
        padding: 'var(--specimen-padding)',
        border: 'var(--specimen-border)',
      }}
    >
      {title && (
        <h2 className="font-display text-2xl tracking-[0.15em] uppercase text-ink mb-1">
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="font-value text-xs text-ink-muted mb-6 italic leading-relaxed">
          {subtitle}
        </p>
      )}

      <div className="flex flex-col" style={{ gap: 'var(--specimen-field-gap)' }}>
        {fields.map((field) => (
          <SpecimenField key={field.label} label={field.label} value={field.value} />
        ))}
      </div>

      {footer && (
        <p className="font-label text-[10px] tracking-[0.15em] uppercase text-ink-muted mt-8">
          {footer}
        </p>
      )}
    </div>
  )
}

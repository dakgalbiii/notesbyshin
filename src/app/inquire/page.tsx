'use client'

import { useState } from 'react'

const FIELD: React.CSSProperties = {
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  fontSize: '0.8rem',
  letterSpacing: '-0.01em',
  color: 'var(--color-ink)',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid var(--color-ink-faint)',
  outline: 'none',
  width: '100%',
  padding: '0.5rem 0',
  lineHeight: 1.5,
}

const LABEL: React.CSSProperties = {
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  fontSize: '0.65rem',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: 'var(--color-ink-muted)',
  display: 'block',
  marginBottom: '0.25rem',
}

const PROJECT_TYPES = ['Wedding', 'Portrait', 'Event', 'Editorial', 'Community', 'Videography', 'Video', 'Other']

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function InquirePage() {
  const [form, setForm] = useState({ name: '', email: '', projectType: '', date: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/inquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="flex flex-col items-start justify-center px-8 sm:px-16" style={{ minHeight: '60vh' }}>
        <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: '0.85rem', letterSpacing: '-0.01em', color: 'var(--color-ink)' }}>
          thank you, {form.name.split(' ')[0].toLowerCase()}. i&apos;ll be in touch soon.
        </p>
      </div>
    )
  }

  return (
    <div className="px-8 sm:px-16 py-12" style={{ maxWidth: '560px' }}>
      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div>
            <label style={LABEL}>Name</label>
            <input
              required
              type="text"
              placeholder="Alvin Shin"
              value={form.name}
              onChange={set('name')}
              style={FIELD}
            />
          </div>
          <div>
            <label style={LABEL}>Email</label>
            <input
              required
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={set('email')}
              style={FIELD}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div>
            <label style={LABEL}>Project Type</label>
            <select
              value={form.projectType}
              onChange={set('projectType')}
              style={{ ...FIELD, cursor: 'pointer' }}
            >
              <option value="">Select...</option>
              {PROJECT_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={LABEL}>Date / Timeframe</label>
            <input
              type="text"
              placeholder="June 2026, TBD..."
              value={form.date}
              onChange={set('date')}
              style={FIELD}
            />
          </div>
        </div>

        <div>
          <label style={LABEL}>Message</label>
          <textarea
            required
            rows={5}
            placeholder="Tell me about the project..."
            value={form.message}
            onChange={set('message')}
            style={{ ...FIELD, resize: 'none', lineHeight: 1.7 }}
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={status === 'sending'}
            style={{
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontSize: '0.8rem',
              letterSpacing: '-0.01em',
              color: status === 'sending' ? 'var(--color-ink-muted)' : 'var(--color-ink)',
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: status === 'sending' ? 'default' : 'pointer',
            }}
          >
            {status === 'sending' ? 'sending...' : status === 'error' ? 'something went wrong — try again' : '[send]'}
          </button>
        </div>

      </form>
    </div>
  )
}

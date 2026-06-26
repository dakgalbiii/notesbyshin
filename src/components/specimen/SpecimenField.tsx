'use client'

import { useEffect, useRef } from 'react'

interface Props {
  label: string
  value: string
}

export function SpecimenField({ label, value }: Props) {
  const valueRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = valueRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('underline-drawn')
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="flex items-baseline gap-3">
      <span className="font-label text-[11px] tracking-[0.12em] uppercase text-ink-muted shrink-0 w-[140px]">
        {label}
      </span>
      <span ref={valueRef} className="specimen-value font-value text-sm text-ink flex-1">
        {value}
      </span>
    </div>
  )
}

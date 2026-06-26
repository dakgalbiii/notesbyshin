'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CursorArrow } from '@/components/layout/CursorArrow'

export interface CollectionItem {
  url: string
  width: number
  height: number
  mediaType: 'photo' | 'video'
}

interface Props {
  title: string
  meta: string
  items: CollectionItem[]
}

const LABEL: React.CSSProperties = {
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  fontSize: '0.7rem',
  letterSpacing: '0.05em',
  lineHeight: 1,
}

function renderMedia(item: CollectionItem, label: string, priority: boolean) {
  const ratio = item.width / item.height
  if (item.mediaType === 'video') {
    return (
      <video
        src={item.url}
        autoPlay muted loop playsInline
        style={{ maxHeight: '62svh', maxWidth: '60vw', width: 'auto', height: 'auto', display: 'block' }}
      />
    )
  }
  return (
    <div style={{ position: 'relative', width: `min(60vw, calc(62svh * ${ratio}))`, aspectRatio: `${item.width} / ${item.height}` }}>
      <Image src={item.url} alt={label} fill className="object-cover" sizes="(max-width: 640px) 85vw, 60vw" priority={priority} />
    </div>
  )
}

export function CollectionViewer({ title, meta, items }: Props) {
  const router = useRouter()
  const scrollRef = useRef<HTMLDivElement>(null)
  const isScrolling = useRef(false)
  const [displayIndex, setDisplayIndex] = useState(1)
  const total = items.length

  // Extended array: [clone-of-last, ...real, clone-of-first]
  const loop = total > 0 ? [items[total - 1], ...items, items[0]] : items
  const loopTotal = loop.length

  // Start at index 1 (skip the prepended clone)
  useEffect(() => {
    const el = scrollRef.current
    if (el && total > 0) el.scrollLeft = el.clientWidth
  }, [total])

  const navigate = useCallback((direction: 1 | -1) => {
    const el = scrollRef.current
    if (!el || isScrolling.current) return
    isScrolling.current = true

    const next = el.scrollLeft + direction * el.clientWidth
    el.scrollTo({ left: next, behavior: 'smooth' })

    setTimeout(() => {
      const idx = Math.round(el.scrollLeft / el.clientWidth)
      if (idx <= 0) {
        el.scrollLeft = (loopTotal - 2) * el.clientWidth
        setDisplayIndex(total)
      } else if (idx >= loopTotal - 1) {
        el.scrollLeft = el.clientWidth
        setDisplayIndex(1)
      } else {
        setDisplayIndex(idx)
      }
      isScrolling.current = false
    }, 700)
  }, [loopTotal, total])

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX
      if (Math.abs(delta) < 10) return
      navigate(delta > 0 ? 1 : -1)
    }
    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [navigate])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') router.push('/collection')
      if (e.key === 'ArrowRight') navigate(1)
      if (e.key === 'ArrowLeft') navigate(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate, router])

  return (
    <div className="fixed inset-0 z-[60] bg-white flex flex-col">

      {/* Top bar */}
      <div className="flex items-center justify-between flex-shrink-0 px-8 h-16 bg-white">
        <div className="flex flex-row items-center justify-center gap-8">
          <Link href="/" className="text-[28px] font-medium tracking-[-0.02em] text-ink no-underline">notesbyshin</Link>
          <span className="font-medium text-ink opacity-60">{title}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-medium text-ink opacity-60">
            {displayIndex}&thinsp;|&thinsp;{total}
          </span>
          <Link href="/collection" className="font-medium text-ink no-underline opacity-60 transition-opacity hover:opacity-100">
            [close]
          </Link>
        </div>
      </div>

      {/* Slides */}
      <div className="flex-1 overflow-hidden" style={{ position: 'relative' }}>
        <CursorArrow containerRef={scrollRef} />
        <div
          ref={scrollRef}
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            overflowX: 'scroll',
            overflowY: 'hidden',
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            cursor: 'none',
          }}
        >
          {loop.map((item, i) => (
            <div
              key={i}
              style={{
                width: '100vw',
                height: '100%',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                scrollSnapAlign: 'start',
                position: 'relative',
              }}
            >
              {renderMedia(item, `${title} — ${i}`, i === 1)}
              <div onClick={() => navigate(-1)} style={{ position: 'absolute', left: 0, top: 0, width: '50%', height: '100%' }} />
              <div onClick={() => navigate(1)} style={{ position: 'absolute', right: 0, top: 0, width: '50%', height: '100%' }} />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      {meta && (
        <div className="flex-shrink-0 flex items-center px-8" style={{ height: '2.25rem' }}>
          <p style={{ ...LABEL, color: 'var(--color-ink-muted)' }}>{meta}</p>
        </div>
      )}
    </div>
  )
}

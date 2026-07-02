'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { client } from '@/lib/sanity/client'
import { SELECTED_WORKS_QUERY } from '@/lib/sanity/queries'
import { LoadingScreen } from '@/components/layout/LoadingScreen'
import { CursorArrow } from '@/components/layout/CursorArrow'

let appHasLoaded = false

export default function Home() {
  const [works, setWorks] = useState<any[]>([])
  const [loaded, setLoaded] = useState(appHasLoaded)
  const scrollRef = useRef<HTMLDivElement>(null)
  const isScrolling = useRef(false)

  useEffect(() => {
    client.fetch(SELECTED_WORKS_QUERY)
      .then((data) => {
        setWorks(data)
        appHasLoaded = true
      })
      .catch(() => {})
      .finally(() => setLoaded(true))
  }, [])

  const total = works.length
  // Extended array: [clone-of-last, ...real, clone-of-first]
  const loop = total > 0 ? [works[total - 1], ...works, works[0]] : works
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

    el.scrollTo({ left: el.scrollLeft + direction * el.clientWidth, behavior: 'smooth' })

    setTimeout(() => {
      const idx = Math.round(el.scrollLeft / el.clientWidth)
      if (idx <= 0) {
        el.scrollLeft = (loopTotal - 2) * el.clientWidth
      } else if (idx >= loopTotal - 1) {
        el.scrollLeft = el.clientWidth
      }
      isScrolling.current = false
    }, 700)
  }, [loopTotal])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') navigate(1)
      if (e.key === 'ArrowLeft') navigate(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate])

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

  return (
    <>
      <LoadingScreen isLoaded={loaded} />

      {loaded && total > 0 && (
        <main className="w-full bg-white h-screen flex flex-col -mt-17">
          <CursorArrow containerRef={scrollRef} />
          <div
            ref={scrollRef}
            style={{
              flex: 1,
              display: 'flex',
              overflowX: 'scroll',
              overflowY: 'hidden',
              scrollSnapType: 'x mandatory',
              scrollbarWidth: 'none',
              cursor: 'none',
            }}
          >
            {loop.map((work, i) => (
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
                  padding: '2rem',
                  position: 'relative',
                }}
              >
                {work.type === 'video' && work.videoUrl ? (
                  <video
                    src={work.videoUrl}
                    autoPlay muted loop playsInline
                    style={{ maxHeight: '60vh', maxWidth: '100%', width: 'auto', height: 'auto', display: 'block' }}
                  />
                ) : (
                  work.imageUrl && (
                    <img
                      src={work.imageUrl}
                      alt=""
                      style={{ maxHeight: '60vh', maxWidth: '100%', width: 'auto', height: 'auto', display: 'block' }}
                      loading="eager"
                    />
                  )
                )}
                <div onClick={() => navigate(-1)} style={{ position: 'absolute', left: 0, top: 0, width: '50%', height: '100%' }} />
                <div onClick={() => navigate(1)} style={{ position: 'absolute', right: 0, top: 0, width: '50%', height: '100%' }} />
              </div>
            ))}
          </div>
        </main>
      )}
    </>
  )
}

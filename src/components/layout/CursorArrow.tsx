'use client'

import { useEffect, useRef, useState } from 'react'

interface Props {
  containerRef: React.RefObject<HTMLDivElement | null>
}

export function CursorArrow({ containerRef }: Props) {
  const [pos, setPos] = useState({ x: -200, y: -200 })
  const [visible, setVisible] = useState(false)
  const [dir, setDir] = useState<'left' | 'right'>('right')
  const rafRef = useRef<number | null>(null)
  const target = useRef({ x: -200, y: -200 })
  const current = useRef({ x: -200, y: -200 })

  // Smooth follow via lerp
  useEffect(() => {
    const loop = () => {
      current.current.x += (target.current.x - current.current.x) * 0.12
      current.current.y += (target.current.y - current.current.y) * 0.12
      setPos({ x: current.current.x, y: current.current.y })
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY }
      const rect = el.getBoundingClientRect()
      setDir(e.clientX < rect.left + rect.width / 2 ? 'left' : 'right')
    }
    const onEnter = () => setVisible(true)
    const onLeave = () => setVisible(false)

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [containerRef])

  return (
    <div
      style={{
        position: 'fixed',
        left: pos.x,
        top: pos.y,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.2s ease',
        width: '52px',
        height: '52px',
        borderRadius: '50%',
        border: '1px solid rgba(26,22,18,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {dir === 'left' ? (
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
          <path d="M13 5H1M1 5L5 1M1 5L5 9" stroke="rgba(26,22,18,0.55)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ) : (
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
          <path d="M1 5H13M13 5L9 1M13 5L9 9" stroke="rgba(26,22,18,0.55)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </div>
  )
}

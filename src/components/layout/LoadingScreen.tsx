'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const INNER = 'Photographer & Digital Creative.'

function TypingText() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    // Start typing after the line fades in (0.35s delay + ~0.3s into fade)
    const start = setTimeout(() => {
      const id = setInterval(() => {
        setCount((c) => {
          if (c >= INNER.length) { clearInterval(id); return c }
          return c + 1
        })
      }, 25)
      return () => clearInterval(id)
    }, 800)
    return () => clearTimeout(start)
  }, [])

  return (
    <span>({INNER.slice(0, count)})</span>
  )
}

export function LoadingScreen({ isLoaded }: { isLoaded: boolean }) {
  const [isDone, setIsDone] = useState(false)

  if (isDone) return null

  return (
    <AnimatePresence onExitComplete={() => setIsDone(true)}>
      {!isLoaded && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{ backgroundColor: '#141516' }}
          exit={{ opacity: 0, transition: { duration: 1, delay: 2.5, ease: 'easeInOut' } }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1, ease: 'easeOut' } }}
            style={{
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif lowercase",
              fontSize: '4rem',
              letterSpacing: '-0.02em',
              color: '#fff',
              fontWeight: 'semibold',
              marginBottom: '-0.55rem',
            }}
          >
            notesbyshin
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.35, ease: 'easeOut' } }}
            style={{
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontSize: '1.5rem',
              letterSpacing: '-0.01em',
              color: '#fff',
            }}
          >
            (Photographer & Digital Creative.)
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

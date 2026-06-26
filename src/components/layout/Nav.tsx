'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

function NYClock() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString('en-US', {
          timeZone: 'America/New_York',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      )
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return <span className="font-medium">{time} New York</span>
}

export function Nav() {
  const pathname = usePathname()

  const linkClass = (href: string) => {
    const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
    return `font-medium text-ink no-underline transition-opacity ${active ? 'opacity-100' : 'opacity-60'}`
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">

      {/* Desktop */}
      <div className="hidden sm:flex items-center justify-between w-full px-8 h-16">
        <div className="flex flex-row items-center justify-center gap-50">
          <Link
            href="/"
            className="text-[28px] font-medium tracking-[-0.02em] text-ink no-underline"
          >
            notesbyshin
          </Link>
          <p className="capitalize font-medium">(photographer & digital creative.)</p>
        </div>
        <div className="flex flex-row items-center justify-center gap-16">
          <div className="flex items-center justify-center gap-4">
            <Link href="/" className={linkClass('/')}>[featured]</Link>
            <Link href="/collection" className={linkClass('/collection')}>[collection]</Link>
            <Link href="/inquire" className={linkClass('/inquire')}>[inquire]</Link>
          </div>
          <NYClock />
        </div>
      </div>

      {/* Mobile */}
      <div className="flex sm:hidden items-center justify-between w-full px-6 h-13">
        <Link
          href="/"
          className="text-[20px] font-medium tracking-[-0.02em] text-ink no-underline"
        >
          notesbyshin
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/" className={linkClass('/') + ' text-[12px]'}>[featured]</Link>
          <Link href="/collection" className={linkClass('/collection') + ' text-[12px]'}>[collection]</Link>
          <Link href="/inquire" className={linkClass('/inquire') + ' text-[12px]'}>[inquire]</Link>
        </div>
      </div>

    </header>
  )
}

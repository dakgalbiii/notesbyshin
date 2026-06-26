import type { Metadata } from 'next'
import { Courier_Prime } from 'next/font/google'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { PageTransition } from '@/components/layout/PageTransition'
import './globals.css'

const courierPrime = Courier_Prime({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-value',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'notesbyshin',
  description: 'reproduction of moments, light, and feeling from specific people and places.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={courierPrime.variable}>
      <body className="bg-white text-ink antialiased flex flex-col min-h-screen">
        <Nav />
        {/* pt offsets the fixed nav: desktop ~65px, mobile ~90px */}
        <main className="flex-1 pt-22.5 sm:pt-16.25">
          <PageTransition>{children}</PageTransition>
        </main>
        {/* <Footer /> */}
      </body>
    </html>
  )
}

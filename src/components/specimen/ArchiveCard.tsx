'use client'

import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface Props {
  archiveNumber: string   // "001"
  category: string        // "W—"
  title: string           // "sarah & james"
  location: string        // "hudson valley"
  year: string            // "2024"
  slug: string            // "sarah-james"
  heroImageUrl?: string
  aspectRatio?: 'portrait' | 'landscape' | 'square'
  className?: string
}

const aspectClasses = {
  portrait:  'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
  square:    'aspect-square',
}

export function ArchiveCard({
  archiveNumber,
  category,
  title,
  location,
  year,
  slug,
  heroImageUrl,
  aspectRatio = 'portrait',
  className,
}: Props) {
  return (
    <Link href={`/work/${slug}`} className={cn('group block', className)}>

      {/* Archive number — above the image */}
      <p className="font-label text-[10px] tracking-[0.15em] text-ink-muted mb-2 text-center">
        N° {archiveNumber}
      </p>

      {/* Image */}
      <div className={cn('relative overflow-hidden bg-ink-faint', aspectClasses[aspectRatio])}>
        {heroImageUrl ? (
          <Image
            src={heroImageUrl}
            alt={title}
            fill
            className="object-cover transition-opacity duration-500 group-hover:opacity-75"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
        ) : (
          /* Placeholder until real images are added */
          <div className="absolute inset-0 bg-ink-faint transition-opacity duration-500 group-hover:opacity-75" />
        )}

        {/* Hover reveal — slides up from bottom */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-card px-3 py-3">
          <p className="font-label text-[9px] tracking-[0.15em] uppercase text-ink-muted mb-0.5">
            {category}
          </p>
          <p className="font-value text-xs text-ink leading-snug lowercase">{title}</p>
          <p className="font-label text-[9px] tracking-[0.12em] uppercase text-ink-muted mt-1">
            {location} · {year}
          </p>
        </div>
      </div>

    </Link>
  )
}

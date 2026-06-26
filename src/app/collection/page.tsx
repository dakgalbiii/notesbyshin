'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/lib/sanity/client'
import { COLLECTION_QUERY } from '@/lib/sanity/queries'

interface Project {
  _id: string
  title: string
  slug: { current: string }
  category: string
  year: string
  heroImageUrl: string
  heroWidth: number
  heroHeight: number
}

const TITLE: React.CSSProperties = {
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  fontSize: '0.85rem',
  fontWeight: 600,
  letterSpacing: '-0.02em',
  lineHeight: 1.1,
}

const META: React.CSSProperties = {
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  fontSize: '0.75rem',
  letterSpacing: '-0.02em',
  lineHeight: 1.1,
}

export default function CollectionPage() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    client.fetch<Project[]>(COLLECTION_QUERY).then(setProjects)
  }, [])

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1.5rem',
        padding: '0 2rem',
      }}
      className="sm:grid-cols-4 grid-cols-2"
    >
      {projects.map((project) => (
        <Link
          key={project._id}
          href={`/collection/${project.slug?.current}`}
          className="block no-underline"
        >
          {project.heroImageUrl && (
            <div
              className="w-full relative"
              style={{ aspectRatio: `${project.heroWidth} / ${project.heroHeight}` }}
            >
              <Image
                src={project.heroImageUrl}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
            </div>
          )}
          <div style={{ padding: '0.5rem 0 1.25rem' }}>
            <p style={{ ...TITLE, color: 'var(--color-ink)', marginBottom: '0.2rem' }}>
              {project.title}
            </p>
            <p style={{ ...META, color: 'var(--color-ink-muted)' }}>
              {project.category}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}

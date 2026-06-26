'use client'

import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { ArchiveCard } from './ArchiveCard'

export interface Project {
  id: string
  archiveNumber: string
  category: string
  categoryCode: string    // "W—" | "P—" | "E—" | "V—" | "C—" | "K—"
  title: string
  location: string
  year: string
  slug: string
  heroImageUrl?: string
  aspectRatio?: 'portrait' | 'landscape' | 'square'
}

const CATEGORIES = [
  { value: 'all',        label: 'all' },
  { value: 'Wedding',    label: 'weddings' },
  { value: 'Portrait',   label: 'portraits' },
  { value: 'Event',      label: 'events' },
  { value: 'Videography',label: 'video' },
  { value: 'Editorial',  label: 'editorial' },
  { value: 'Community',  label: 'community' },
]

interface Props {
  projects: Project[]
}

export function ProjectGrid({ projects }: Props) {
  const [active, setActive] = useState('all')

  const filtered = active === 'all'
    ? projects
    : projects.filter((p) => p.category === active)

  return (
    <div>
      {/* Category filter */}
      <Tabs value={active} onValueChange={setActive}>
        <TabsList className="mb-12">
          {CATEGORIES.map(({ value, label }) => (
            <TabsTrigger key={value} value={value}>
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Grid — CSS columns for natural masonry stagger */}
        <TabsContent value={active}>
          <div
            className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5"
            style={{ columnGap: '2.5rem' }}
          >
            {filtered.map((project) => (
              <ArchiveCard
                key={project.id}
                archiveNumber={project.archiveNumber}
                category={project.categoryCode}
                title={project.title}
                location={project.location}
                year={project.year}
                slug={project.slug}
                heroImageUrl={project.heroImageUrl}
                aspectRatio={project.aspectRatio}
                className="mb-10 break-inside-avoid"
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

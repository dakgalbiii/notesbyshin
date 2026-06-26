import { client } from '@/lib/sanity/client'
import { PROJECT_BY_SLUG_QUERY } from '@/lib/sanity/queries'
import { CollectionViewer } from './CollectionViewer'

interface CollectionDoc {
  _id: string
  title: string
  category: string
  location: string
  year: string
  items: { url: string; width: number; height: number; mediaType: 'photo' | 'video' }[]
}

const LABEL: React.CSSProperties = {
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  fontSize: '0.7rem',
  letterSpacing: '0.04em',
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const doc = await client.fetch<CollectionDoc>(PROJECT_BY_SLUG_QUERY, { slug })

  if (!doc) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p style={{ ...LABEL, color: 'var(--color-ink-muted)' }}>collection not found.</p>
      </div>
    )
  }

  const meta = [doc.category, doc.location, doc.year].filter(Boolean).join(', ')

  return <CollectionViewer title={doc.title} meta={meta} items={doc.items ?? []} />
}

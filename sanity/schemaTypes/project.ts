import { defineField, defineType } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({ name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title' } }),
    defineField({
      name: 'category',
      type: 'string',
      title: 'Category',
      options: {
        list: ['Wedding', 'Portrait', 'Event', 'Videography', 'Editorial', 'Community', 'Video'],
      },
    }),
    defineField({ name: 'location', type: 'string', title: 'Location' }),
    defineField({ name: 'year', type: 'string', title: 'Year' }),
    defineField({ name: 'heroImage', type: 'image', title: 'Hero Image', options: { hotspot: true } }),
    defineField({
      name: 'images',
      type: 'array',
      title: 'Images',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({ name: 'featured', type: 'boolean', title: 'Featured on homepage?' }),
    defineField({ name: 'publishedAt', type: 'datetime', title: 'Published At' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'heroImage' },
  },
})

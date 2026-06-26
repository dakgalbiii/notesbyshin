import { defineField, defineType } from 'sanity'

export const collection = defineType({
  name: 'collection',
  title: 'Collection',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({ name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title' } }),
    defineField({
      name: 'category',
      type: 'string',
      title: 'Category',
      options: {
        list: ['Wedding', 'Portrait', 'Event', 'Editorial', 'Community', 'Videography', 'Video'],
      },
    }),
    defineField({ name: 'location', type: 'string', title: 'Location' }),
    defineField({ name: 'year', type: 'string', title: 'Year' }),
    defineField({
      name: 'coverImage',
      type: 'image',
      title: 'Cover Image',
      description: 'Shown in the collection grid',
      options: { hotspot: true },
    }),
    defineField({
      name: 'items',
      type: 'array',
      title: 'Items',
      description: 'Each item can be a photo or a video',
      of: [
        {
          type: 'object',
          name: 'collectionItem',
          title: 'Item',
          fields: [
            defineField({
              name: 'mediaType',
              type: 'string',
              title: 'Media Type',
              options: { list: ['photo', 'video'], layout: 'radio' },
              initialValue: 'photo',
            }),
            defineField({
              name: 'photo',
              type: 'image',
              title: 'Photo',
              options: { hotspot: true },
              hidden: ({ parent }) => parent?.mediaType !== 'photo',
            }),
            defineField({
              name: 'video',
              type: 'file',
              title: 'Video',
              options: { accept: 'video/*' },
              hidden: ({ parent }) => parent?.mediaType !== 'video',
            }),
            defineField({
              name: 'caption',
              type: 'string',
              title: 'Caption',
            }),
          ],
          preview: {
            select: { mediaType: 'mediaType', photo: 'photo', caption: 'caption' },
            prepare({ mediaType, photo, caption }) {
              return {
                title: caption ?? `(no caption)`,
                subtitle: mediaType,
                media: photo,
              }
            },
          },
        },
      ],
    }),
    defineField({ name: 'featured', type: 'boolean', title: 'Featured on homepage?' }),
    defineField({ name: 'publishedAt', type: 'datetime', title: 'Published At' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'coverImage' },
  },
})

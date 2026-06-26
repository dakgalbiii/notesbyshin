// sanity/schemaTypes/selectedWork.ts
import { defineField, defineType } from 'sanity'

export const selectedWork = defineType({
  name: 'selectedWork',
  title: 'Selected Works',
  type: 'document',
  fields: [
    defineField({
      name: 'type',
      type: 'string',
      title: 'Type',
      options: {
        list: ['image', 'video'],
        layout: 'radio',
      },
      initialValue: 'image',
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      options: { hotspot: true },
      hidden: ({ document }) => document?.type === 'video',
    }),
    defineField({
      name: 'video',
      type: 'file',
      title: 'Video',
      options: { accept: 'video/*' },
      hidden: ({ document }) => document?.type === 'image',
    }),
    defineField({
      name: 'order',
      type: 'number',
      title: 'Order',
    }),
  ],
  preview: {
    select: { media: 'image', title: 'order', type: 'type' },
    prepare({ media, title, type }) {
      return { title: `${type === 'video' ? '▶ Video' : '◻ Image'} #${title}`, media }
    },
  },
})
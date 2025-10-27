import {defineField, defineType} from 'sanity'
import {BlockElementIcon} from '@sanity/icons'
import {author} from '../documents/author'

export const artistCard = defineType({
  name: 'artistCard',
  title: 'Artist Card',
  type: 'object',
  icon: BlockElementIcon,

  fields: [
    defineField({
      name: 'artist',
      type: 'reference',
      title: 'Artist',
      to: [{type: 'author'}],
    }),
  ],
  preview: {
    select: {
      title: 'artist.name',
      media: 'artist.picture',
    },
    prepare(selection) {
      const {title, media} = selection

      return {
        title: title,
        subtitle: 'Artist Card',
        media: media,
      }
    },
  },
})

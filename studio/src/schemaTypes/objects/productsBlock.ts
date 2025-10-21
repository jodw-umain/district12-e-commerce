import {defineField, defineType} from 'sanity'
import {BlockElementIcon} from '@sanity/icons'

export const productsBlock = defineType({
  name: 'productsBlock',
  title: 'Products Block',
  type: 'object',
  icon: BlockElementIcon,

  fields: [
    defineField({
      name: 'heading',
      title: 'Heading for Product Block',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'product',
    },
    prepare(selection) {
      const {title} = selection

      return {
        title: title,
        subtitle: 'Products Block',
        media: BlockElementIcon,
      }
    },
  },
})

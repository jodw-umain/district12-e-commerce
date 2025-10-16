import {defineField, defineType} from 'sanity'
import {BlockElementIcon} from '@sanity/icons'

export const productCard = defineType({
  name: 'productCard',
  title: 'Product Card',
  type: 'object',
  icon: BlockElementIcon,

  fields: [
    defineField({
      name: 'product',
      type: 'reference',
      title: 'Product',
      to: [{type: 'product'}],
    }),
  ],
  preview: {
    select: {
      title: 'product.productName',
      subtitle: 'product.author.name',
      media: 'product.picture',
    },
    prepare(selection) {
      const {title, subtitle, media} = selection

      return {
        title: title,
        subtitle: subtitle,
        media: media,
      }
    },
  },
})

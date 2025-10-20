import {defineField, defineType} from 'sanity'
import {PackageIcon} from '@sanity/icons'

export const productDetails = defineType({
  name: 'productDetails',
  title: 'Product Details',
  type: 'object',
  icon: PackageIcon,
  fields: [
    defineField({
      name: 'product',
      title: 'Product',
      type: 'reference',
      to: [{type: 'product'}],
      description: 'Select which product to display details for.',
      validation: (Rule) => Rule.required(),
      options: {
        disableNew: false,
      },
    }),

    defineField({
      name: 'overrideTitle',
      title: 'Override Title',
      type: 'string',
      description: 'Optional — replace the product title in this section.',
    }),
    defineField({
      name: 'overrideDescription',
      title: 'Override Description',
      type: 'text',
      description: 'Optional — replace the product description in this section.',
    }),

    // Button configuration
    defineField({
      name: 'button',
      title: 'Button',
      type: 'object',
      fields: [
        defineField({
          name: 'link',
          title: 'Link',
          type: 'string',
          description: 'Internal or external URL the button points to',
        }),
        defineField({
          name: 'buttonText',
          title: 'Button Text',
          type: 'string',
          initialValue: 'Buy now',
        }),
        defineField({
          name: 'buttonVariant',
          title: 'Button Variant',
          type: 'string',
          options: {
            list: [
              {title: 'Default', value: 'default'},
              {title: 'Secondary', value: 'secondary'},
              {title: 'Ghost', value: 'ghost'},
              {title: 'Destructive', value: 'destructive'},
            ],
          },
          initialValue: 'primary',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'product.productName',
      media: 'product.picture',
      price: 'product.productPrice',
    },
    prepare({title, media, price}) {
      return {
        title: title || 'Unnamed product',
        subtitle: price ? `$${price}` : undefined,
        media,
      }
    },
  },
})

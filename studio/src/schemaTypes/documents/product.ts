import {defineField, defineType} from 'sanity'
import {PackageIcon} from '@sanity/icons'

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: PackageIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'productName',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'author'}],
    }),

    defineField({
      name: 'productDescription',
      title: 'Product Description',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'productPrice',
      title: 'Product Price',
      type: 'number',
      initialValue: 0,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'format',
      type: 'array',
      of: [{type: 'string'}],

      options: {
        list: [
          {title: 'Physical', value: 'physical'},
          {title: 'Digital', value: 'digital'},
        ],
        layout: 'list',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'category'}],
          options: {disableNew: true, disableEdit: true},
        },
      ],
      options: {
        layout: 'list',
      },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'picture',
      title: 'Picture',
      type: 'image',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          validation: (rule) => {
            return rule.custom((alt, context) => {
              if ((context.document?.picture as any)?.asset?._ref && !alt) {
                return 'Required'
              }
              return true
            })
          },
        }),
      ],
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'productName',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page builder',
      type: 'array',
      of: [{type: 'callToAction'}, {type: 'infoSection'}],
      options: {
        insertMenu: {
          views: [
            {
              name: 'grid',
              previewImageUrl: (schemaTypeName) =>
                `/static/page-builder-thumbnails/${schemaTypeName}.webp`,
            },
          ],
        },
      },
    }),
  ],
  preview: {
    select: {
      title: 'productName',
      media: 'picture',
      authorName: 'author.name',
      price: 'productPrice',
      format: 'format',
    },
    prepare({title, media, authorName, price, format}) {
      const subtitles = [
        price !== undefined && price !== null ? `$${price}` : null,
        format,
        authorName ? `by ${authorName}` : null,
      ].filter(Boolean)

      return {
        title,
        media,
        subtitle: subtitles.join(' • '),
      }
    },
  },
})

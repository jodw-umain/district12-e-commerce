import Link from 'next/link'
import {notFound} from 'next/navigation'

import {sanityFetch} from '@/sanity/lib/live'
import {getAllProductsQuery, moreProductsQuery} from '@/sanity/lib/queries'
import type {Product as Product} from '@/sanity.types'

import Avatar from '@/app/components/Avatar'
import {createDataAttribute} from 'next-sanity'

const Product = ({product}: {product: Product}) => {
  const {_id, productName, slug, productDescription, author} = product

  const attr = createDataAttribute({
    id: _id,
    type: 'product',
    path: 'productName',
  })

  return (
    <article
      data-sanity={attr()}
      key={_id}
      className="border border-gray-200 rounded-sm p-6 bg-gray-50 flex flex-col justify-between transition-colors hover:bg-white relative"
    >
      <Link
        className="hover:text-brand underline transition-colors"
        href={`/products/${slug?.current}`}
      >
        <span className="absolute inset-0 z-10" />
      </Link>

      <div>
        <h3 className="text-2xl font-bold mb-4 leading-tight">{productName}</h3>

        <p className="line-clamp-3 text-sm leading-6 text-gray-600 max-w-[70ch]">
          {/* Sanity block content might not return plain text, so wrap safely */}
          {productDescription && productDescription[0]?.children
            ? productDescription[0].children[0]?.text
            : ''}
        </p>
      </div>
      {/* 
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
        {author && author.firstName && author.lastName && (
          <div className="flex items-center">
            <Avatar person={author} small={true} />
          </div>
        )}
      </div> */}
    </article>
  )
}

const Products = ({
  children,
  heading,
  subHeading,
}: {
  children: React.ReactNode
  heading?: string
  subHeading?: string
}) => (
  <div>
    {heading && (
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
        {heading}
      </h2>
    )}
    {subHeading && <p className="mt-2 text-lg leading-8 text-gray-600">{subHeading}</p>}
    <div className="pt-6 space-y-6">{children}</div>
  </div>
)

export const MoreProducts = async ({skip, limit}: {skip: string; limit: number}) => {
  const {data} = await sanityFetch({
    query: moreProductsQuery,
    params: {skip, limit},
  })

  if (!data || data.length === 0) {
    return null
  }

  return (
    <Products heading={`Recent Products (${data?.length})`}>
      {data?.map((product: any) => (
        <Product key={product._id} product={product} />
      ))}
    </Products>
  )
}

export const AllProducts = async () => {
  const {data} = await sanityFetch({query: getAllProductsQuery})

  if (!data || data.length === 0) {
    return notFound()
  }

  return (
    <Products
      heading="Recent Products"
      subHeading={`${
        data.length === 1 ? 'This product is' : `These ${data.length} products are`
      } populated from your Sanity Studio.`}
    >
      {data.map((product: any) => (
        <Product key={product._id} product={product} />
      ))}
    </Products>
  )
}

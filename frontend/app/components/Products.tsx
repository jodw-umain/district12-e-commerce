import Link from 'next/link'
import {notFound} from 'next/navigation'

import {sanityFetch} from '@/sanity/lib/live'
import {allProductsQuery, moreProductsQuery} from '@/sanity/lib/queries'
// import type {AllProductsQueryResult} from '@/sanity.types'

import ProductCard from './ProductCard'

export const AllProducts = async () => {
  const {data} = await sanityFetch({query: allProductsQuery})

  if (!data || data.length === 0) {
    return notFound()
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6 md:align-bottom">
      {data.map((product) => (
        <Link href={`/products/${product.slug}`} key={product._id}>
          <ProductCard
            productTitle={product.productTitle}
            artist={product.artist}
            price={product.price}
            category={product.category}
            image={product.image}
          />
        </Link>
      ))}
    </div>
  )
}

import {sanityFetch} from '@/sanity/lib/live'
import ProductCard from './ProductCard'
import {allProductsQuery} from '@/sanity/lib/queries'

export default async function ProductsBlock() {
  const {data} = await sanityFetch({query: allProductsQuery})

  if (!data || data.length === 0) {
    return (
      <div>
        <p>no products found</p>
      </div>
    )
  }

  return (
    <div>
      {data.map((product: any) => (
        <ProductCard key={product._id} product={product} />
      ))}

      <p>hello</p>
    </div>
  )
}

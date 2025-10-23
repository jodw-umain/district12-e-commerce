import {getAllProductsQuery} from '@/sanity/lib/queries'
import ProductCard from '@/app/components/ProductCard'
import {sanityFetch} from '@/sanity/lib/live'

export default async function AllProductsPage() {
  const products = await sanityFetch({query: getAllProductsQuery})

  return (
    <section className="flex flex-col items-center p-8 h-fit">
      <h1 className="sm:mb-10 sm:place-self-start mb-8">All Products</h1>
      <ul className="columns-1 sm:columns-3 md:columns-4 gap-5 space-y-10">
        {products.data.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </ul>
    </section>
  )
}

import {getAllProductsQuery} from '@/sanity/lib/queries'
import ProductCard from '@/app/components/ProductCard'
import {sanityFetch} from '@/sanity/lib/live'

export default async function AllProductsPage() {
  const products = await sanityFetch({query: getAllProductsQuery})

  return (
    <section className="p-8">
      <h1 className="text-2xl font-bold mb-4">All Products</h1>

      <ul className="sm:grid sm: grid-cols-4 flex flex-col gap-6">
        {products.data.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </ul>
    </section>
  )
}

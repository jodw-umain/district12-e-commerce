// import {client} from '@/sanity/lib/client'
import {getProductsByCategoryQuery} from '@/sanity/lib/queries'
import type {GetProductsByCategoryQueryResult} from '@/sanity.types'
// import Image from 'next/image'
import ProductCard from '@/app/components/ProductCard'
import {sanityFetch} from '@/sanity/lib/live'

type PageProps = {
  params: Promise<{slug: string}>
}

export default async function CategoriesPage({params}: PageProps) {
  function capitalizeFirstLetter(val: string) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1)
  }
  const {slug} = await params
  const category = slug.toLowerCase() || null
  const {data}: {data: GetProductsByCategoryQueryResult} = await sanityFetch({
    query: getProductsByCategoryQuery,
    params: {category: category},
  })

  return (
    <section className="flex flex-col items-center p-8 h-fit">
      <h1 className="sm:mb-10 sm:place-self-start mb-8">
        {category ? `${capitalizeFirstLetter(category)}` : 'All Categories'}
      </h1>

      <ul className="columns-1 sm:columns-3 md:columns-4 gap-5 space-y-10">
        {data.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </ul>
    </section>
  )
}

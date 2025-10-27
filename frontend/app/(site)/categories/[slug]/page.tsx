import {client} from '@/sanity/lib/client'
import {getProductsByCategoryQuery} from '@/sanity/lib/queries'
import type {GetProductsByCategoryQueryResult} from '@/sanity.types'
import Image from 'next/image'

type PageProps = {
  params: Promise<{slug: string}>
}

export default async function CategoriesPage({params}: PageProps) {
  const {slug} = await params
  const category = slug?.toLowerCase() || null
  const products = await client.fetch<GetProductsByCategoryQueryResult>(
    getProductsByCategoryQuery,
    {category},
  )

  return (
    <section className="p-8">
      <h1 className="text-2xl font-bold mb-4">
        {category ? `Category: ${category}` : 'All Categories'}
      </h1>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <li key={p._id} className="flex flex-col">
            <div className="relative aspect-square w-full overflow-hidden rounded-md">
              <Image
                src={p.picture?.url ?? ''}
                alt={p.picture?.alt ?? p.productName ?? 'Product image'}
                fill
                sizes="(max-width:768px)100vw,33vw"
                className="object-cover"
              />
            </div>

            <h2 className="font-semibold mt-2">{p.productName}</h2>
            <p className="text-sm text-gray-600">${p.productPrice}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

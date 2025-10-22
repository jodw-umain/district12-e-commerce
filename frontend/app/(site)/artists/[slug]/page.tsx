import {getProductsByArtistQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'
import type {GetProductsByArtistQueryResult} from '@/sanity.types'
import {urlForImage} from '@/sanity/lib/utils'
import Image from 'next/image'

export default async function ArtistsPage({params}: {params: {slug: string}}) {
  const slug = params.slug
  const {data} = await sanityFetch({
    query: getProductsByArtistQuery,
    params: {artist: slug},
  })

  if (!data || data.length === 0) {
    return <div>No products found for {slug}</div>
  }
  const artist = data[0].author
  const artistImageUrl = urlForImage(artist?.picture)?.url() ?? ''

  return (
    <section className="p-8">
      <h1 className="text-2xl font-bold mb-4">{artist?.authorName}</h1>
      {/* 
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((p) => (
          <li key={p._id}>
            <div className="relative aspect-square w-full overflow-hidden rounded-md">
              <Image
                src={prductImageUrl}
                alt={p.picture.alt ?? 'Product image'}
                className="rounded-md"
                fill
              />
            </div>
            <h2 className="font-semibold mt-2">{p.productName}</h2>
            <p className="text-sm text-gray-600">${p.productPrice}</p>
          </li>
        ))}
      </ul> */}
    </section>
  )
}

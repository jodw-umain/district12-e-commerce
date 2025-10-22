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
  // const artistImageUrl = urlForImage(artist?.picture)?.url() ?? ''
  const artistImageUrl = artist?.picture?.url ?? ''

  return (
    <section className="p-8">
      <div className="flex items-center justify-between py-6">
        <h1>{artist?.authorName}</h1>
        <div className="items-center">
          {artist?.picture?.url && (
            <Image
              src={artist.picture.url}
              alt={artist.picture?.alt ?? 'Artist image'}
              width={200}
              height={200}
              className="object-cover"
            />
          )}
        </div>
      </div>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((p) => {
          // const productImageUrl = urlForImage(p.picture)?.url() ?? ''
          return (
            <li key={p._id}>
              <div className="w-full h-64 relative ">
                {/* {productImageUrl && ( */}
                {p.picture?.url && (
                  <Image
                    // src={productImageUrl}
                    src={p.picture.url}
                    alt={p.picture?.alt ?? 'Product image'}
                    className="rounded-md object-cover"
                    fill
                  />
                )}
              </div>
              <h2 className="font-semibold mt-2">{p.productName}</h2>
              <p className="text-sm text-gray-600">${p.productPrice}</p>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

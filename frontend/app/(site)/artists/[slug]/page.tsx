import {getProductsByArtistQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'
import type {GetProductsByArtistQueryResult} from '@/sanity.types'
import Image from 'next/image'
import {Button} from '@/app/components/ui/button'
import Link from 'next/link'

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
  const artistImageUrl = artist?.picture?.url ?? ''

  return (
    <section className="p-8 container">
      <div className="sm:flex justify-between py-8 ">
        <div className="flex flex-col">
          <div className="items-center rounded-full w-40 h-40 overflow-hidden">
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
          <h1>{artist?.authorName}</h1>
          <p>@{artist?.authorName}</p>
          <Button className="mt-4">Contact</Button>
        </div>
        <div className="items-center">
          <ul className="">
            {data.map((p) => {
              return (
                <Link
                  className="hover:text-brand underline transition-colors"
                  href={`/products/${p.slug}`}
                >
                  <li key={p._id}>
                    <div className="w-full h-full realtive">
                      {p.picture?.url && (
                        <Image
                          src={p.picture.url}
                          alt={p.picture?.alt ?? 'Product image'}
                          width={500}
                          height={200}
                          className="object-cover"
                        />
                      )}
                    </div>
                    <h2 className="mt-2">{p.productName}</h2>
                    <p className="text-gray-600">${p.productPrice}</p>
                    {p.categories && p.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {p.categories.map((cat) => (
                          <p key={cat.slug} className="">
                            {cat.title}
                          </p>
                        ))}
                      </div>
                    )}
                  </li>
                </Link>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}

import {getProductsByArtistQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'
import type {GetProductsByArtistQueryResult, Slug} from '@/sanity.types'
import Image from 'next/image'
import {Button} from '@/app/components/ui/button'
import Link from 'next/link'
import {Card, CardContent, CardTitle, CardFooter} from '@/app/components/ui/card/card'
import {urlForImage} from '@/sanity/lib/utils'
import {PortableText} from '@portabletext/react'

type ArtistPageProps = {
  params: Promise<{slug: Slug}>
}

export default async function ArtistsPage({params}: ArtistPageProps) {
  const {slug} = await params
  const {data}: {data: GetProductsByArtistQueryResult} = await sanityFetch({
    query: getProductsByArtistQuery,
    params: {artist: slug},
  })

  if (!data || data.length === 0) {
    return <div>No products found for {String(slug)}</div>
  }
  const artist = data[0].author
  const artistImageUrl = urlForImage(artist?.picture)?.url()
  return (
    <section className="my-20 sm:mx-20 mx-4">
      <div className="sm:flex justify-between py-8 sm:gap-4">
        <Card className="flex flex-col sm:pr-8 !border-none">
          <CardContent>
            <div className="">
              <div className="items-center rounded-full w-40 h-40 overflow-hidden">
                {artistImageUrl && (
                  <Image
                    src={artistImageUrl}
                    alt={artist?.picture?.alt ?? 'Artist image'}
                    width={200}
                    height={200}
                    className="object-cover "
                  />
                )}
              </div>
              <div>
                <CardTitle>
                  <h1 className="my-10">{artist?.authorName}</h1>
                </CardTitle>
                <p>@{artist?.authorName}</p>
                <Button className="mt-4 w-full">Contact</Button>
                <div className="mt-20 mb-10 text-sm text-justify max-w-lg text-white">
                  {artist?.authorDescription ? (
                    <PortableText value={artist.authorDescription} />
                  ) : null}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="items-center">
          <ul className="flex flex-col gap-10">
            {data.map((p) => {
              const productImageUrl = urlForImage(p.picture)?.url()

              return (
                <Card className="clickable-card" key={p._id}>
                  <Link href={`/allproducts/${p.slug}`}>
                    <CardContent>
                      <li key={p._id}>
                        <div className="w-full h-full">
                          {productImageUrl && (
                            <Image
                              src={productImageUrl}
                              alt={p.picture?.alt ?? 'Product image'}
                              width={500}
                              height={200}
                              className="object-cover"
                            />
                          )}
                        </div>
                        <CardTitle>
                          <h2 className="mt-2">{p.productName}</h2>
                        </CardTitle>
                        <p className="mt-3 mb-6">${p.productPrice}</p>
                      </li>
                    </CardContent>
                  </Link>
                  {p.categories && p.categories.length > 0 && (
                    <CardFooter className="flex flex-wrap gap-2 mt-2">
                      {p.categories.map((cat) => (
                        <Link
                          className="cursor-pointer"
                          key={cat.slug}
                          href={`/categories/${cat.slug}`}
                        >
                          <Button
                            key={cat.slug}
                            variant="secondary"
                            className="!text-xs rounded-full sm:px-6 z-10"
                          >
                            {' '}
                            {cat.title}
                          </Button>
                        </Link>
                      ))}
                    </CardFooter>
                  )}
                </Card>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}

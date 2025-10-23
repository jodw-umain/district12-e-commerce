import Image from 'next/image'
import {Card, CardHeader, CardContent, CardTitle} from '../ui/card/card'
import {Author as AuthorType, GetAuthorsQueryResult} from '@/sanity.types'
import {urlForImage} from '@/sanity/lib/utils'
import Link from 'next/link'

export default async function ArtistCard({artist}: {artist: GetAuthorsQueryResult[number]}) {
  const {authorName, picture, slug} = artist
  const imageUrl = urlForImage(artist?.picture)?.url()

  return (
    <Link className="" href={`/artists/${slug}`}>
      <Card className="h-full flex flex-col justify-between p-0 rounded-none border-none shadow-none">
        <div>
          <CardContent className="w-full p-0">
            <div>
              {imageUrl && (
                <Image
                  src={imageUrl}
                  width={200}
                  height={200}
                  alt={picture?.alt || authorName || 'Artist image'}
                  className="w-auto h-auto"
                  priority={true}
                />
              )}
            </div>
          </CardContent>
        </div>
        <div>
          <CardHeader className="p-0 pt-4">
            <CardTitle className="flex flex-col">{authorName}</CardTitle>
          </CardHeader>
        </div>
      </Card>
    </Link>
  )
}

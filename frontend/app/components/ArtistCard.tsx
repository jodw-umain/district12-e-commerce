import Image from 'next/image'
import {Card, CardContent, CardHeader, CardTitle} from './ui/card'
import {GetPageQueryResult} from '@/sanity.types'

// Fix the type extraction by handling the null case
type PageBuilderArray = NonNullable<NonNullable<GetPageQueryResult>['pageBuilder']>
type ArtistCardBlock = Extract<PageBuilderArray[number], {_type: 'artistCard'}>

interface ArtistCardProps {
  block: ArtistCardBlock
  index: number
}

export default function ArtistCardComponent({block}: ArtistCardProps) {
  const artist = block.artist

  if (!artist) {
    return <div>No artist data available</div>
  }

  console
  return (
    <Card className="h-full rounded-none border-none shadow-none">
      <div className="flex flex-col justify-between">
        <CardContent className="w-full h-full">
          {artist.picture?.url && (
            <Image
              src={artist.picture.url}
              alt={artist.picture?.alt || `Image of ${artist.name}`}
              width={200}
              height={200}
              priority={true}
            />
          )}
        </CardContent>
        <CardHeader className="mt-2">
          <CardTitle>{artist.name}</CardTitle>
        </CardHeader>
      </div>
    </Card>
  )
}

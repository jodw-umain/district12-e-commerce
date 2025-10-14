import Image from 'next/image'
import {Card, CardContent, CardHeader, CardTitle} from './ui/card'

interface ArtistCardProps {
  name?: string | null
  image?: string | null
}

export default async function ArtistCard({name, image}: ArtistCardProps) {
  return (
    <Card className="h-full rounded-none border-none shadow-none">
      <div className="flex flex-col justify-between">
        <CardContent>
          <Image src={`${image}`} alt={`image of ${name}`} width={200} height={200} />
        </CardContent>
        <CardHeader className="mt-2">
          <CardTitle>{name}</CardTitle>
        </CardHeader>
      </div>
    </Card>
  )
}

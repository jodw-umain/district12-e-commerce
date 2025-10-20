import Image from 'next/image'
import {Card, CardHeader, CardDescription, CardContent, CardTitle, CardFooter} from '../ui/card'
import {Author as AuthorType, AllAuthorsQueryResult} from '@/sanity.types'
import Link from 'next/link'
  import {urlForImage} from '@/sanity/lib/utils'


export default async function ArtistCard({artist}:{artist:AllAuthorsQueryResult[number]}){


      const imageUrl = urlForImage(artist?.picture)?.url()
     
  return (
    // <Link
    //   className="hover:text-brand underline transition-colors"
    //   href={`/artist/${slug}`}
    //   //key should be in the parent :)
    // >

      <Card className="h-full flex flex-col justify-between p-0 rounded-none border-none shadow-none">
        <div>
          <CardContent className="w-full p-0">
            {artist.map(person)=>(

            )}
            {?.url && (
              <Image
                src={productImage.url}
                width={200}
                height={200}
                alt={productImageAlt || productName || 'Product image'}
                className="w-auto h-auto"
                priority={true}
              />
            )}
          </CardContent>

        </div>
        <div>
          <CardHeader className="p-0 pt-4">
            <CardTitle className="flex flex-col">
              <p className="">{productName}</p>
              {author && <p className="text-sm font-mono font-normal mt-1">{author}</p>}
            </CardTitle>
            {categoriesString && <CardDescription>{categoriesString}</CardDescription>}
          </CardHeader>
          <CardFooter className="rounded-none p-0 pt-4">
            {productPrice && <p>${productPrice}</p>}
          </CardFooter>
        </div>
      </Card>
    </Link>
  )
}

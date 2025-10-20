import {Carousel, CarouselContent, CarouselItem} from '../ui/carousel'
import {allAuthorsQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'
import ArtistCard from './ArtistCard'

export default async function ProductCarouselSection() {
  const {data} = await sanityFetch({query: allAuthorsQuery})

  return (
    <div className="container">
      <h2 className="text-4xl mb-6">Title</h2>

      <Carousel
        opts={{
          containScroll: false,
          align: 'start',
          dragFree: true,
        }}
      >
        <CarouselContent>
          {data.map((artist) => (
            <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/6" key={artist._id}>
              <ArtistCard artist={artist} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

import {Carousel, CarouselContent, CarouselItem} from '../ui/carousel'
import {getAuthorsQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'
import ArtistCard from './ArtistCard'
import {getArtistSectionTitle} from '@/sanity/lib/queries'
import {GetArtistSectionTitleResult} from '@/sanity.types'

export default async function ArtistSection() {
  const {data} = await sanityFetch({query: getAuthorsQuery})
  const {data: sectionTitleData} = (await sanityFetch({
    query: getArtistSectionTitle,
  })) as {data: GetArtistSectionTitleResult}

  const sectionTitle = sectionTitleData?.artistsSection?.artistHeading ?? 'Artists'

  return (
    <section className="my-20 sm:ml-20 ml-4">
      <h2 className="mb-6">{sectionTitle}</h2>

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
    </section>
  )
}

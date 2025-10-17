import {sanityFetch} from '@/sanity/lib/live'
import ProductCard from './ProductCard'
import {Carousel, CarouselContent, CarouselItem} from './ui/carousel'
import {AllProductsQuery} from '@/sanity/lib/queries'

interface ProductsBlockProps {}

export default async function ProductCarouselSection() {
  const {data} = await sanityFetch({query: AllProductsQuery})

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
          {data.map((product) => (
            <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/6" key={product._id}>
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

import ProductCard from './ProductCard'
import {Carousel, CarouselContent, CarouselItem} from '../ui/carousel'
import {GetPageQueryResult} from '@/sanity.types'

// Extract the productsBlock type
type PageBuilderArray = NonNullable<NonNullable<GetPageQueryResult>['pageBuilder']>
type ProductsBlockType = Extract<PageBuilderArray[number], {_type: 'productsBlock'}>

interface ProductsBlockProps {
  block: ProductsBlockType
  index: number
}

export default function ProductsBlockClient({block}: ProductsBlockProps) {
  const products = block.allProducts

  if (!products || products.length === 0) {
    return (
      <div className="container">
        <h2 className="text-4xl mb-6">{block.heading}</h2>
        <p>No products found</p>
      </div>
    )
  }

  return (
    <div className="container">
      <h2 className="text-4xl mb-6">{block.heading}</h2>

      <Carousel
        opts={{
          containScroll: false,
          align: 'start',
          dragFree: true,
        }}
      >
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/6" key={product._id}>
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

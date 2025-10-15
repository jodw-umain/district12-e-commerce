// import {ProductDetails} from '@/sanity.types'

// type ProductDetailsProps = {
//   block: HeroSection
//   index: number
// }

import Image from 'next/image';
import ResolvedLink from '@/app/components/ResolvedLink'
import {Button} from '@/app/components/ui/button'

export default function ProductDetails() {

  return (
    <section className="flex items-center">
      <div className="container flex items-center justify-center py-6 px-2 sm:px-6">
        <Image src="/placeholder.png" alt="Product image" width={200} height={200} />
        <div>
            <h1 className='text-4xl'>Product title</h1>
            <h2 className='text-grey-500 text-xl'>Artist</h2>
            <p>Description</p>
            <p>price </p>
            <p>category</p>
            <div className='flex gap-2'>
                   {/* <p>{category}</p> */}
                    
            </div>
             
                {/* <ResolvedLink key={btn._key} link={btn.link}>
                  <Button variant={btn.buttonVariant}>{btn.buttonText}</Button>
                </ResolvedLink> */}
          
           

        </div>
      </div>
    </section>
  )
}
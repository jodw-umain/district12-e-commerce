import {Suspense} from 'react'
import {AllProducts} from '@/app/components/Products'
import {settingsQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'
import ProductDetails from './components/ProductDetails'

export default async function Page() {
  const {data: settings} = await sanityFetch({
    query: settingsQuery,
  })

  return (
    <>
      <div className="relative">
      </div>
      <div className="container">
        <aside className="py-12 sm:py-20">
            <ProductDetails/>
          <Suspense>{await AllProducts()}</Suspense>
        </aside>
      </div>
    </>
  )
}

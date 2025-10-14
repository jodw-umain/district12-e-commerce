import {Suspense} from 'react'
import {AllProducts} from '@/app/components/Products'
import {settingsQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'
import Hero from '@/app/components/Hero'

export default async function Page() {
  const {data: settings} = await sanityFetch({
    query: settingsQuery,
  })

  return (
    <>
      <div className="relative">
       <Hero/>
      </div>
      <div className="border-t border-gray-100 bg-gray-50">
        <div className="container">
          <aside className="py-12 sm:py-20">
            <Suspense>{await AllProducts()}</Suspense>
          </aside>
        </div>
      </div>
    </>
  )
}

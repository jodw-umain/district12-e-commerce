import {Suspense} from 'react'
import {AllProducts} from '@/app/components/Products'
import {settingsQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'
import {Button} from '@/app/components/ui/button'

export default async function Page() {
  const {data: settings} = await sanityFetch({
    query: settingsQuery,
  })

  return (
    <>
      <div className="relative">
        <p>{settings?.title || 'hero'}</p>
      <Button variant="default">default</Button>
       <Button variant="destructive">destructive</Button>
        <Button variant="outline">outline</Button>
         <Button variant="secondary">secondary</Button>
          <Button variant="ghost">ghost</Button>
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

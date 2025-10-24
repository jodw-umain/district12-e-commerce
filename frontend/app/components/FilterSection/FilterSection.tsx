import {sanityFetch} from '@/sanity/lib/live'
import {getLandingPage} from '@/sanity/lib/queries'
import Link from 'next/link'
import {Button} from '../ui/button'

export default async function FilterSection() {
  const {data: landing} = await sanityFetch({query: getLandingPage})

  const filterSection = landing?.filterSection

  return (
    <>
      {filterSection && (
        <section className="py-12 px-4 sm:px-6 flex justify-center">
          <div className="md:flex sm:items-center ">
            <h2 className="mb-8 mr-8">{filterSection.title}</h2>
            {filterSection.filters.map((filter) => (
              <Link key={filter.title} className="sm:mr-4 mr-4" href={`categories/${filter.slug}`}>
                <Button variant="secondary" className="rounded-full sm:px-8 px-4 mb-3">
                  {filter.title}
                </Button>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  )
}

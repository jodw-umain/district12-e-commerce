import {sanityFetch} from '@/sanity/lib/live'
import {getLandingPage} from '@/sanity/lib/queries'
import Link from 'next/link'

export default async function FilterSection() {
  const {data: landing} = await sanityFetch({query: getLandingPage})

  const filterSection = landing?.filterSection

  return (
    <>
      {filterSection && (
       <section className="text-black py-12 px-2 sm:px-6 flex justify-center">
          <div className="flex items-center flex-wrap gap-3">
            <h2 className="text-2xl mb-0 mr-6">{filterSection.title}</h2>
            {filterSection.filters.map((filter) => (
              <Link
                key={filter.title}
                className="px-4 py-2 text-white bg-black rounded hover:bg-gray-300 transition"
                href={`categories/${filter.slug}`}
              >
                {filter.title}
              </Link>
            ))}
          </div>
       </section>
      )}
    </>
  )
}
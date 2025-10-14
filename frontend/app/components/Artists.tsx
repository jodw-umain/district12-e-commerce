import {allArtists} from '@/sanity/lib/queries'
import ArtistCard from './ArtistCard'
import {sanityFetch} from '@/sanity/lib/live'
import type {AllArtistsResult} from '@/sanity.types'

export default async function AllArtists() {
  const {data} = await sanityFetch({query: allArtists})
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
      {data.map((artist) => (
        <ArtistCard key={artist._id} name={artist.name} image={artist.authorImg} />
      ))}
    </div>
  )
}

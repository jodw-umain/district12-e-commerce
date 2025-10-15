import Link from "next/link";
import { getClient } from "@/sanity/lib/getClient";
import { getArtistsQuery } from "@/sanity/lib/queries";

export default async function ArtistsButton() {
  const client = getClient();
  const artists= await client.fetch(getArtistsQuery);

  return (
    <div className="relative group">
      <Link
        href="/artists"
        className="flex items-center gap-1 text-sm hover:text-primary"
      >
        Artists
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path d="m6 9 6 6 6-6" stroke="currentColor" fill="none" />
        </svg>
      </Link>

      <div className="absolute left-0 top-full hidden group-hover:block z-50 bg-white text-black rounded-md shadow-md w-48">
        {artists.map((a: { _id: string; name: string | null; slug: null; picture: { url: string | null; alt: string | null } | null }) => (
          <Link
            key={a._id}
            href={`/artists?artist=${a.name}`}
            className="block px-3 py-2 hover:bg-gray-100"
          >
            {a.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
import { getCachedClient } from "@/sanity/lib/getClient";
import { getProductsByArtistQuery } from "@/sanity/lib/queries";
import type { GetProductsByArtistQueryResult } from '@/sanity.types';

type PageProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function ArtistsPage({ searchParams }: PageProps) {
  const artist = (searchParams?.artist as string) || null;
  const products = await getCachedClient().fetch<GetProductsByArtistQueryResult>(
    getProductsByArtistQuery,
    { artist }
  );

  return (
    <section className="p-8">
      <h1 className="text-2xl font-bold mb-4">
        {artist ? `Artist: ${artist}` : "All Artists"}
      </h1>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <li key={p._id}>
            <img
              src={p.picture?.url ?? ""}
              alt={p.picture?.alt || p.productName}
              className="rounded-md"
            />
            <h2 className="font-semibold mt-2">{p.productName}</h2>
            <p className="text-sm text-gray-600">${p.productPrice}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
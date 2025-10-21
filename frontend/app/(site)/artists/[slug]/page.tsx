import { client } from "@/sanity/lib/client";
import { getCachedClient } from "@/sanity/lib/client";
import { getProductsByArtistQuery } from "@/sanity/lib/queries";
import type { GetProductsByArtistQueryResult } from '@/sanity.types';
import Image from "next/image";

type PageProps = {
  params: Promise<{ slug: string }>
}


export default async function ArtistsPage({ params }: PageProps){
  const { slug } = await params;  
  const artist = (slug.replace("-", " ") as string) || null;
  const products = await client.fetch<GetProductsByArtistQueryResult>(
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
            <div className="relative aspect-square w-full overflow-hidden rounded-md">
              <Image
                src={p.picture?.url ?? ""}
                alt={p.picture?.alt ?? p.productName ?? "Product image"}
                className="rounded-md"
                fill
              />
            </div>
            <h2 className="font-semibold mt-2">{p.productName}</h2>
            <p className="text-sm text-gray-600">${p.productPrice}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
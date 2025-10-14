import { getCachedClient } from "@/sanity/lib/getClient";
import { getProductsByCategoryQuery } from "@/sanity/lib/queries";

type PageProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function CategoriesPage({ searchParams }: PageProps) {
  const category = (searchParams?.category as string) || null;
  const products = await getCachedClient().fetch(
    getProductsByCategoryQuery,
    { category }
  );


  return (
    <section className="p-8">
      <h1 className="text-2xl font-bold mb-4">
        {category ? `Category: ${category}` : "All Categories"}
      </h1>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p: any) => (
            <li key={p._id}>
            <img
                src={p.picture?.url}
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
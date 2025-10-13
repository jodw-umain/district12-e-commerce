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

      {/* render products here */}
    </section>
  );
}
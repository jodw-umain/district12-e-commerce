import Link from "next/link";

export const metadata = {
  title: "Your Cart - ditrict12",
  description: "View items you have added to your shopping cart",
};

export default async function ShoppingCartPage() {
  const items: any[] = []; 

  const totalItems = items.length;

  return (
    <section className="p-8">
      <h1 className="text-3xl font-bold mb-8">
        Your cart <span className="text-gray-400">({totalItems})</span>
      </h1>

      {totalItems === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 text-center">
          <p className="text-gray-500 mb-6">
            You have not yet added any works to your cart.
          </p>
          <Link
            href="/products"
            className="bg-black text-white px-6 py-3 font-medium rounded-md hover:bg-gray-900"
          >
            Keep exploring
          </Link>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="border p-4 rounded-md flex flex-col gap-3"
            >
              <div className="bg-gray-100 aspect-square w-full rounded-md" />
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-sm text-gray-600">${item.price}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
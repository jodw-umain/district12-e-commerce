import Link from "next/link";

export default function AllProductsButton() {
  return (
    <Link
      href="/products"
      className="text-sm font-normal hover:text-primary transition-colors"
    >
      All Products
    </Link>
  );
}
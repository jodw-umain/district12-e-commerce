import Link from "next/link";

export default function AllProducts() {
  return (
    <Link
      href="/products"
      className="text-sm font-normal hover:text-primary transition-colors"
    >
      All Products
    </Link>
  );
}
import Link from "next/link";

export default function AllProductsButton() {
  return (
    <Link
      href="/allproducts"
      className="text-sm font-normal hover:text-primary transition-colors"
    >
      All Products
    </Link>
  );
}
import Link from "next/link";
import Image from "next/image"
import ShoppingBag from "@/public/images/shoppingbag.svg";

export default function ShoppingCart() {
  return (
    <Link href="/shoppingcart" className="relative" aria-label="Shopping cart">
      <Image src={ShoppingBag} alt="Shopping Bag" className="w-5 h-5" />
    </Link>
  );
}


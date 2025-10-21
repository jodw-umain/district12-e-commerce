import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export default function ShoppingCart() {
  return (
    <Link href="/shoppingcart" className="relative" aria-label="Shopping cart">
      <ShoppingBag className="w-5 h-5" />
      <span className="absolute -top-2 -right-2 text-[10px] px-[6px] py-[2px] bg-black text-white rounded">
        0
      </span>
    </Link>
  );
}


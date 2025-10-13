import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="relative flex items-center gap-2 w-[120px] h-[40px]"
    >
      <Image
        src="/images/logo.png"
        alt="Logo"
        fill                    
        className="object-contain"
        priority
        style={{ top: 0, left: 0, display: "block", width: "100%", height: "100%", position: "absolute", borderRadius: 0 }}
      />
    </Link>
  );
}
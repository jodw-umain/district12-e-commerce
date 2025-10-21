import Link from "next/link";

export default function NewInButton() {
  return (
    <Link
      href="/new-in"
      className="text-sm font-normal hover:text-primary transition-colors"
    >
      New In
    </Link>
  );
}
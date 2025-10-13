import Logo from "./Logo";
import CategoriesButton from "./Features/Categories";
export default function NavBar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <Logo />

      <div className="flex items-center gap-6">
        {/* Features/Components */}
        <CategoriesButton />
      </div>
    </nav>
  );
}
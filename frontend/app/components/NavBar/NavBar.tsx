import Logo from "./Logo";
import CategoriesButton from "./Features/Categories";
import AllProductsButton from "./Features/AllProducts";
import ArtistsButton from "./Features/Artists";
import NewInButton from "./Features/NewIn";
import ShoppingCart from "./ShoppingCart";

export default function NavBar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <Logo />

      <div className="flex items-center gap-6">
        <NewInButton />
        <CategoriesButton />
        <ArtistsButton />
        <AllProductsButton />
        <ShoppingCart />
      </div>
    </nav>
  );
}
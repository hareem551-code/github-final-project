import { Link } from "react-router-dom";
import useCartStore from "../store/cartStore";

function Navbar() {

  const cart = useCartStore((state) => state.cart);
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className=" px-1.5 py-2.5 sticky top-0 z-50 bg-white shadow-md">

      <div className="mx-auto max-w-6xl px-4">

        <div className="flex h-20 items-center justify-between">

     
          <Link
            to="/"
            className="text-2xl px-2 py-2 font-bold text-black"
          >
            ElectroMarket
          </Link>

       
          <nav className="hidden items-center gap-7 md:flex">

            <Link
              to="/"
              className="font-medium text-gray-700 transition hover:text-blue-600"
            >
              Home
            </Link>

            <Link
              to="/products"
              className="font-medium text-gray-700 transition hover:text-blue-600"
            >
              Products
            </Link>

            <Link
              to="/categories"
              className="font-medium text-gray-700 transition hover:text-blue-600"
            >
              Categories
            </Link>

            <Link
              to="/deals"
              className="font-medium text-gray-700 transition hover:text-blue-600"
            >
              Deals
            </Link>

            <Link
              to="/vendor"
              className="font-medium text-gray-700 transition hover:text-blue-600"
            >
              Become a Seller
            </Link>

          </nav>

    
          <div className="flex items-center gap-4">

     
            <button
              type="button"
              className="text-xl text-gray-700 transition hover:text-blue-600"
              title="Search"
            >
              🔍
            </button>

          
            <Link
              to="/cart"
              className="relative text-2xl text-gray-700 transition hover:text-blue-600"
              title="Shopping Cart"
            >
              🛒

         
              {cartCount > 0 && (
                <span className="absolute -right-3 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

      
            <Link
              to="/login"
              className="rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700"
            >
              Login
            </Link>

       
            <Link
              to="/register"
              className="hidden rounded-lg border border-blue-600 px-5 py-2 font-semibold text-blue-600 transition hover:bg-blue-50 sm:block"
            >
              Register
            </Link>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;
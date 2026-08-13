import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">

      {/* Top Header */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-6">

          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            ElectroMart
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-2xl">
            <div className="flex">
              <input
                type="text"
                placeholder="Search electronics, brands and products..."
                className="w-full border border-gray-300 rounded-l-lg px-4 py-3 outline-none focus:border-blue-500"
              />

              <button className="bg-blue-600 text-white px-6 rounded-r-lg hover:bg-blue-700">
                Search
              </button>
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-5">

            <Link
              to="/login"
              className="text-gray-700 hover:text-blue-600"
            >
              Login
            </Link>

            <Link
              to="/cart"
              className="text-gray-700 hover:text-blue-600"
            >
              🛒 Cart
            </Link>

          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4">

          <div className="flex items-center gap-8 py-3">

            <Link
              to="/"
              className="hover:text-blue-400"
            >
              Home
            </Link>

            <Link
              to="/products"
              className="hover:text-blue-400"
            >
              Products
            </Link>

            <Link
              to="/categories"
              className="hover:text-blue-400"
            >
              Categories
            </Link>

            <Link
              to="/deals"
              className="hover:text-blue-400"
            >
              Deals
            </Link>

            <Link
              to="/vendors"
              className="hover:text-blue-400"
            >
              Vendors
            </Link>

            <Link
              to="/become-vendor"
              className="hover:text-blue-400"
            >
              Become a Vendor
            </Link>

          </div>



        </div>
      </nav>

    </header>
  );
}

export default Navbar;
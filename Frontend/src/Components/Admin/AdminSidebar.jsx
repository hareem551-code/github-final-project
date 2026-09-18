import { Link } from "react-router-dom";

function AdminSidebar() {
  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white p-5">

      {/* Logo */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold">
          TechNest
        </h2>

        <p className="text-gray-400 text-sm">
          Admin Panel
        </p>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">

        <Link
          to="/admin"
          className="block px-4 py-3 rounded-lg hover:bg-gray-700 transition"
        >
          Dashboard
        </Link>

        <Link
          to="/admin/vendors"
          className="block px-4 py-3 rounded-lg hover:bg-gray-700 transition"
        >
          Vendors
        </Link>

        <Link
          to="/admin/products"
          className="block px-4 py-3 rounded-lg hover:bg-gray-700 transition"
        >
          Products
        </Link>

        <Link
          to="/admin/categories"
          className="block px-4 py-3 rounded-lg hover:bg-gray-700 transition"
        >
          Categories
        </Link>

        <Link
          to="/admin/orders"
          className="block px-4 py-3 rounded-lg hover:bg-gray-700 transition"
        >
          Orders
        </Link>

        <Link
          to="/admin/customers"
          className="block px-4 py-3 rounded-lg hover:bg-gray-700 transition"
        >
          Customers
        </Link>

        <Link
          to="/admin/settings"
          className="block px-4 py-3 rounded-lg hover:bg-gray-700 transition"
        >
          Settings
        </Link>

      </nav>

    </aside>
  );
}

export default AdminSidebar;
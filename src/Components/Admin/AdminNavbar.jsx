import { Link } from "react-router-dom";

function AdminSidebar() {
  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white p-5">
      
      <h2 className="text-2xl font-bold mb-8">
        TechNest Admin
      </h2>

      <nav className="space-y-2">

        <Link
          to="/admin"
          className="block px-4 py-3 rounded hover:bg-gray-700"
        >
          Dashboard
        </Link>

        <Link
          to="/admin/vendors"
          className="block px-4 py-3 rounded hover:bg-gray-700"
        >
          Vendors
        </Link>

        <Link
          to="/admin/products"
          className="block px-4 py-3 rounded hover:bg-gray-700"
        >
          Products
        </Link>

        <Link
          to="/admin/categories"
          className="block px-4 py-3 rounded hover:bg-gray-700"
        >
          Categories
        </Link>

        <Link
          to="/admin/orders"
          className="block px-4 py-3 rounded hover:bg-gray-700"
        >
          Orders
        </Link>

        <Link
          to="/admin/customers"
          className="block px-4 py-3 rounded hover:bg-gray-700"
        >
          Customers
        </Link>

        <Link
          to="/admin/settings"
          className="block px-4 py-3 rounded hover:bg-gray-700"
        >
          Settings
        </Link>

      </nav>
    </aside>
  );
}

export default AdminSidebar;
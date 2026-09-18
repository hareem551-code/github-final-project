import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

function VendorDashboard() {
  // ==============================
  // STATE
  // ==============================

  const [activePage, setActivePage] = useState("Overview");

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [showAddProduct, setShowAddProduct] = useState(false);

  // ==============================
  // PRODUCTS
  // ==============================

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "iPhone 15 Pro",
      category: "Smartphones",
      price: 999,
      stock: 18,
      sales: 42,
      status: "Active",
    },
    {
      id: 2,
      name: "MacBook Air M3",
      category: "Laptops",
      price: 1199,
      stock: 12,
      sales: 27,
      status: "Active",
    },
    {
      id: 3,
      name: "Sony WH-1000XM5",
      category: "Audio",
      price: 349,
      stock: 5,
      sales: 19,
      status: "Low Stock",
    },
    {
      id: 4,
      name: "Apple Watch Series 9",
      category: "Wearables",
      price: 399,
      stock: 0,
      sales: 11,
      status: "Out of Stock",
    },
    {
      id: 5,
      name: "Canon EOS Camera",
      category: "Cameras",
      price: 899,
      stock: 9,
      sales: 15,
      status: "Active",
    },
  ]);

  // ==============================
  // ORDERS
  // ==============================

  const [orders] = useState([
    {
      id: "#ORD-1001",
      customer: "Ali Khan",
      product: "iPhone 15 Pro",
      amount: 999,
      status: "Delivered",
      date: "Aug 30, 2026",
    },
    {
      id: "#ORD-1002",
      customer: "Sara Ahmed",
      product: "MacBook Air M3",
      amount: 1199,
      status: "Processing",
      date: "Aug 30, 2026",
    },
    {
      id: "#ORD-1003",
      customer: "Usman Malik",
      product: "Sony Headphones",
      amount: 349,
      status: "Shipped",
      date: "Aug 29, 2026",
    },
    {
      id: "#ORD-1004",
      customer: "Hina Shah",
      product: "Apple Watch",
      amount: 399,
      status: "Pending",
      date: "Aug 28, 2026",
    },
    {
      id: "#ORD-1005",
      customer: "Ahmed Raza",
      product: "Canon Camera",
      amount: 899,
      status: "Delivered",
      date: "Aug 27, 2026",
    },
  ]);

  // ==============================
  // NEW PRODUCT FORM
  // ==============================

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "Smartphones",
    price: "",
    stock: "",
  });

  // ==============================
  // FILTER PRODUCTS
  // ==============================

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        product.name.toLowerCase().includes(searchText) ||
        product.category.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        product.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [products, search, statusFilter]);

  // ==============================
  // ADD PRODUCT
  // ==============================

  const handleAddProduct = (e) => {
    e.preventDefault();

    if (
      !newProduct.name.trim() ||
      newProduct.price === "" ||
      newProduct.stock === ""
    ) {
      alert("Please fill all product fields.");
      return;
    }

    const stock = Number(newProduct.stock);
    const price = Number(newProduct.price);

    if (price < 0 || stock < 0) {
      alert("Price and stock cannot be negative.");
      return;
    }

    const product = {
      id: Date.now(),
      name: newProduct.name,
      category: newProduct.category,
      price: price,
      stock: stock,
      sales: 0,
      status:
        stock === 0
          ? "Out of Stock"
          : stock <= 5
          ? "Low Stock"
          : "Active",
    };

    setProducts((prevProducts) => [
      product,
      ...prevProducts,
    ]);

    setNewProduct({
      name: "",
      category: "Smartphones",
      price: "",
      stock: "",
    });

    setShowAddProduct(false);

    alert("Product added successfully!");
  };

  // ==============================
  // DELETE PRODUCT
  // ==============================

  const handleDeleteProduct = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmDelete) {
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
    }
  };

  // ==============================
  // SIDEBAR ITEMS
  // ==============================

  const sidebarItems = [
    {
      name: "Overview",
      icon: "📊",
    },
    {
      name: "Products",
      icon: "📦",
    },
    {
      name: "Orders",
      icon: "🛒",
    },
    {
      name: "Sales",
      icon: "💰",
    },
    {
      name: "Customers",
      icon: "👥",
    },
    {
      name: "Settings",
      icon: "⚙️",
    },
  ];

  // ==============================
  // STATUS COLORS
  // ==============================

  const getStatusClass = (status) => {
    if (status === "Delivered") {
      return "bg-green-100 text-green-700";
    }

    if (status === "Processing") {
      return "bg-gray-200 text-gray-700";
    }

    if (status === "Shipped") {
      return "bg-purple-100 text-purple-700";
    }

    if (status === "Pending") {
      return "bg-yellow-100 text-yellow-700";
    }

    if (status === "Low Stock") {
      return "bg-orange-100 text-orange-700";
    }

    if (status === "Out of Stock") {
      return "bg-red-100 text-red-700";
    }

    if (status === "Active") {
      return "bg-green-100 text-green-700";
    }

    return "bg-gray-100 text-gray-700";
  };

  // ==============================
  // DASHBOARD
  // ==============================

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ======================================
          MOBILE TOP BAR
      ====================================== */}

      <div className="border-b border-gray-200 bg-white px-4 py-4 lg:hidden">
        <div className="flex items-center justify-between">

          <Link
            to="/"
            className="text-xl font-bold text-gray-800"
          >
            ElectroMarket
          </Link>

          <button
            onClick={() => setActivePage("Overview")}
            className="rounded-lg bg-gray-800 px-4 py-2 text-sm font-semibold text-white"
          >
            Dashboard
          </button>

        </div>
      </div>

      {/* ======================================
          MAIN LAYOUT
      ====================================== */}

      <div className="flex min-h-[calc(100vh-80px)]">

        {/* ======================================
            SIDEBAR
        ====================================== */}

        <aside className="hidden w-64 shrink-0 border-r border-gray-200 bg-white lg:block">

          <div className="sticky top-0">

            {/* SELLER PROFILE */}

            <div className="border-b border-gray-200 p-6">

              <div className="flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 text-xl">
                  🏪
                </div>

                <div>
                  <h2 className="font-bold text-gray-900">
                    Tech Store
                  </h2>

                  <p className="text-sm text-gray-500">
                    Verified Seller
                  </p>
                </div>

              </div>

            </div>

            {/* SELLER MENU */}

            <nav className="p-4">

              <p className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-gray-400">
                Seller Menu
              </p>

              <div className="space-y-1">

                {sidebarItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => setActivePage(item.name)}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                      activePage === item.name
                        ? "bg-gray-800 text-white"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <span className="text-lg">
                      {item.icon}
                    </span>

                    {item.name}
                  </button>
                ))}

              </div>

            </nav>

            {/* BACK TO STORE */}

            <div className="border-t border-gray-200 p-4">

              <Link
                to="/"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-100"
              >
                🏠
                Back to Store
              </Link>

            </div>

          </div>

        </aside>

        {/* ======================================
            MAIN CONTENT
        ====================================== */}

        <main className="min-w-0 flex-1">

          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

            {/* ==================================
                HEADER
            ================================== */}

            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">

              <div>

                <p className="text-sm font-semibold text-gray-600">
                  SELLER DASHBOARD
                </p>

                <h1 className="mt-1 text-3xl font-bold text-gray-900 sm:text-4xl">
                  {activePage}
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                  Manage your products, orders and sales.
                </p>

              </div>

              <button
                onClick={() => setShowAddProduct(true)}
                className="rounded-xl bg-gray-800 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-gray-900"
              >
                + Add New Product
              </button>

            </div>

            {/* ==================================
                MOBILE MENU
            ================================== */}

            <div className="mb-6 flex gap-2 overflow-x-auto pb-2 lg:hidden">

              {sidebarItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setActivePage(item.name)}
                  className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold ${
                    activePage === item.name
                      ? "bg-gray-800 text-white"
                      : "bg-white text-gray-600 shadow-sm"
                  }`}
                >
                  {item.icon} {item.name}
                </button>
              ))}

            </div>

            {/* ==================================
                OVERVIEW PAGE
            ================================== */}

            {activePage === "Overview" && (
              <>

                {/* STATS */}

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

                  {/* PRODUCTS */}

                  <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

                    <div className="flex items-center justify-between">

                      <div>

                        <p className="text-sm font-medium text-gray-500">
                          Total Products
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-gray-900">
                          {products.length}
                        </h2>

                        <p className="mt-2 text-xs font-semibold text-green-600">
                          ↑ 12% this month
                        </p>

                      </div>

                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-200 text-2xl">
                        📦
                      </div>

                    </div>

                  </div>

                  {/* ORDERS */}

                  <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

                    <div className="flex items-center justify-between">

                      <div>

                        <p className="text-sm font-medium text-gray-500">
                          Total Orders
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-gray-900">
                          120
                        </h2>

                        <p className="mt-2 text-xs font-semibold text-green-600">
                          ↑ 18% this month
                        </p>

                      </div>

                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-200 text-2xl">
                        🛒
                      </div>

                    </div>

                  </div>

                  {/* REVENUE */}

                  <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

                    <div className="flex items-center justify-between">

                      <div>

                        <p className="text-sm font-medium text-gray-500">
                          Total Revenue
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-gray-900">
                          $12,500
                        </h2>

                        <p className="mt-2 text-xs font-semibold text-green-600">
                          ↑ 24% this month
                        </p>

                      </div>

                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-2xl">
                        💰
                      </div>

                    </div>

                  </div>

                  {/* PENDING ORDERS */}

                  <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

                    <div className="flex items-center justify-between">

                      <div>

                        <p className="text-sm font-medium text-gray-500">
                          Pending Orders
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-gray-900">
                          8
                        </h2>

                        <p className="mt-2 text-xs font-semibold text-orange-600">
                          Requires attention
                        </p>

                      </div>

                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-2xl">
                        ⏳
                      </div>

                    </div>

                  </div>

                </div>

                {/* CHART + QUICK ACTIONS */}

                <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">

                  {/* SALES CHART */}

                  <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">

                    <div className="flex items-center justify-between">

                      <div>

                        <h2 className="text-lg font-bold text-gray-900">
                          Sales Overview
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                          Your sales performance this month
                        </p>

                      </div>

                      <select className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500">
                        <option>This Month</option>
                        <option>Last Month</option>
                        <option>This Year</option>
                      </select>

                    </div>

                    <div className="mt-8 flex h-64 items-end gap-3">

                      {[45, 65, 50, 75, 55, 80, 70, 90, 72, 85, 78, 95].map(
                        (height, index) => (
                          <div
                            key={index}
                            className="group flex flex-1 flex-col items-center justify-end"
                          >

                            <div
                              className="w-full rounded-t-lg bg-gray-700 transition group-hover:bg-gray-900"
                              style={{
                                height: `${height}%`,
                              }}
                            />

                            <span className="mt-2 text-xs text-gray-400">
                              {index + 1}
                            </span>

                          </div>
                        )
                      )}

                    </div>

                  </div>

                  {/* QUICK ACTIONS */}

                  <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                    <h2 className="text-lg font-bold text-gray-900">
                      Quick Actions
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Manage your store quickly.
                    </p>

                    <div className="mt-6 space-y-3">

                      <button
                        onClick={() => setShowAddProduct(true)}
                        className="flex w-full items-center gap-3 rounded-xl bg-gray-100 p-4 text-left transition hover:bg-gray-200"
                      >
                        <span className="text-xl">➕</span>

                        <div>
                          <p className="font-semibold text-gray-900">
                            Add Product
                          </p>

                          <p className="text-xs text-gray-500">
                            Add a new product
                          </p>
                        </div>

                      </button>

                      <button
                        onClick={() => setActivePage("Orders")}
                        className="flex w-full items-center gap-3 rounded-xl bg-gray-50 p-4 text-left transition hover:bg-gray-100"
                      >
                        <span className="text-xl">📦</span>

                        <div>
                          <p className="font-semibold text-gray-900">
                            Manage Orders
                          </p>

                          <p className="text-xs text-gray-500">
                            View customer orders
                          </p>
                        </div>

                      </button>

                      <button
                        onClick={() => setActivePage("Products")}
                        className="flex w-full items-center gap-3 rounded-xl bg-gray-50 p-4 text-left transition hover:bg-gray-100"
                      >
                        <span className="text-xl">🏷️</span>

                        <div>
                          <p className="font-semibold text-gray-900">
                            Manage Products
                          </p>

                          <p className="text-xs text-gray-500">
                            Update your inventory
                          </p>
                        </div>

                      </button>

                    </div>

                  </div>

                </div>

                {/* RECENT ORDERS */}

                <div className="mt-6 rounded-2xl border border-gray-200 bg-white shadow-sm">

                  <div className="flex flex-col justify-between gap-3 border-b border-gray-200 p-6 sm:flex-row sm:items-center">

                    <div>

                      <h2 className="text-lg font-bold text-gray-900">
                        Recent Orders
                      </h2>

                      <p className="mt-1 text-sm text-gray-500">
                        Latest customer orders
                      </p>

                    </div>

                    <button
                      onClick={() => setActivePage("Orders")}
                      className="text-sm font-semibold text-gray-700 hover:text-gray-900"
                    >
                      View All →
                    </button>

                  </div>

                  <div className="overflow-x-auto">

                    <table className="w-full min-w-[700px]">

                      <thead className="bg-gray-50">

                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-bold uppercase text-gray-500">
                            Order
                          </th>

                          <th className="px-6 py-4 text-left text-xs font-bold uppercase text-gray-500">
                            Customer
                          </th>

                          <th className="px-6 py-4 text-left text-xs font-bold uppercase text-gray-500">
                            Product
                          </th>

                          <th className="px-6 py-4 text-left text-xs font-bold uppercase text-gray-500">
                            Amount
                          </th>

                          <th className="px-6 py-4 text-left text-xs font-bold uppercase text-gray-500">
                            Status
                          </th>
                        </tr>

                      </thead>

                      <tbody className="divide-y divide-gray-100">

                        {orders.slice(0, 5).map((order) => (

                          <tr
                            key={order.id}
                            className="transition hover:bg-gray-50"
                          >

                            <td className="px-6 py-4 text-sm font-semibold text-gray-700">
                              {order.id}
                            </td>

                            <td className="px-6 py-4 text-sm text-gray-700">
                              {order.customer}
                            </td>

                            <td className="px-6 py-4 text-sm text-gray-700">
                              {order.product}
                            </td>

                            <td className="px-6 py-4 text-sm font-bold text-gray-900">
                              ${order.amount}
                            </td>

                            <td className="px-6 py-4">

                              <span
                                className={`rounded-full px-3 py-1 text-xs font-bold ${getStatusClass(
                                  order.status
                                )}`}
                              >
                                {order.status}
                              </span>

                            </td>

                          </tr>

                        ))}

                      </tbody>

                    </table>

                  </div>

                </div>

              </>
            )}

            {/* ==================================
                PRODUCTS PAGE
            ================================== */}

            {activePage === "Products" && (

              <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">

                {/* PRODUCT HEADER */}

                <div className="border-b border-gray-200 p-6">

                  <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">

                    <div>

                      <h2 className="text-xl font-bold text-gray-900">
                        My Products
                      </h2>

                      <p className="mt-1 text-sm text-gray-500">
                        Manage your product inventory.
                      </p>

                    </div>

                    <button
                      onClick={() => setShowAddProduct(true)}
                      className="rounded-xl bg-gray-800 px-5 py-3 text-sm font-bold text-white hover:bg-gray-900"
                    >
                      + Add Product
                    </button>

                  </div>

                  {/* SEARCH + FILTER */}

                  <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">

                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search products..."
                      className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
                    />

                    <select
                      value={statusFilter}
                      onChange={(e) =>
                        setStatusFilter(e.target.value)
                      }
                      className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-500"
                    >
                      <option value="All">All Products</option>
                      <option value="Active">Active</option>
                      <option value="Low Stock">Low Stock</option>
                      <option value="Out of Stock">
                        Out of Stock
                      </option>
                    </select>

                  </div>

                </div>

                {/* PRODUCT TABLE */}

                <div className="overflow-x-auto">

                  <table className="w-full min-w-[800px]">

                    <thead className="bg-gray-50">

                      <tr>

                        <th className="px-6 py-4 text-left text-xs font-bold uppercase text-gray-500">
                          Product
                        </th>

                        <th className="px-6 py-4 text-left text-xs font-bold uppercase text-gray-500">
                          Category
                        </th>

                        <th className="px-6 py-4 text-left text-xs font-bold uppercase text-gray-500">
                          Price
                        </th>

                        <th className="px-6 py-4 text-left text-xs font-bold uppercase text-gray-500">
                          Stock
                        </th>

                        <th className="px-6 py-4 text-left text-xs font-bold uppercase text-gray-500">
                          Sales
                        </th>

                        <th className="px-6 py-4 text-left text-xs font-bold uppercase text-gray-500">
                          Status
                        </th>

                        <th className="px-6 py-4 text-left text-xs font-bold uppercase text-gray-500">
                          Action
                        </th>

                      </tr>

                    </thead>

                    <tbody className="divide-y divide-gray-100">

                      {filteredProducts.length === 0 ? (

                        <tr>

                          <td
                            colSpan="7"
                            className="px-6 py-10 text-center text-gray-500"
                          >
                            No products found.
                          </td>

                        </tr>

                      ) : (

                        filteredProducts.map((product) => (

                          <tr
                            key={product.id}
                            className="transition hover:bg-gray-50"
                          >

                            <td className="px-6 py-5">

                              <div className="flex items-center gap-3">

                                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-100">
                                  📦
                                </div>

                                <div>

                                  <p className="font-semibold text-gray-900">
                                    {product.name}
                                  </p>

                                  <p className="text-xs text-gray-400">
                                    Product #{product.id}
                                  </p>

                                </div>

                              </div>

                            </td>

                            <td className="px-6 py-5 text-sm text-gray-600">
                              {product.category}
                            </td>

                            <td className="px-6 py-5 text-sm font-bold text-gray-900">
                              ${product.price}
                            </td>

                            <td className="px-6 py-5 text-sm text-gray-600">
                              {product.stock}
                            </td>

                            <td className="px-6 py-5 text-sm text-gray-600">
                              {product.sales}
                            </td>

                            <td className="px-6 py-5">

                              <span
                                className={`rounded-full px-3 py-1 text-xs font-bold ${getStatusClass(
                                  product.status
                                )}`}
                              >
                                {product.status}
                              </span>

                            </td>

                            <td className="px-6 py-5">

                              <button
                                onClick={() =>
                                  handleDeleteProduct(product.id)
                                }
                                className="text-sm font-semibold text-red-500 hover:text-red-700"
                              >
                                Delete
                              </button>

                            </td>

                          </tr>

                        ))

                      )}

                    </tbody>

                  </table>

                </div>

              </div>

            )}

            {/* ==================================
                ORDERS PAGE
            ================================== */}

            {activePage === "Orders" && (

              <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">

                <div className="border-b border-gray-200 p-6">

                  <h2 className="text-xl font-bold text-gray-900">
                    Customer Orders
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Manage orders received from customers.
                  </p>

                </div>

                <div className="overflow-x-auto">

                  <table className="w-full min-w-[800px]">

                    <thead className="bg-gray-50">

                      <tr>

                        <th className="px-6 py-4 text-left text-xs font-bold uppercase text-gray-500">
                          Order ID
                        </th>

                        <th className="px-6 py-4 text-left text-xs font-bold uppercase text-gray-500">
                          Customer
                        </th>

                        <th className="px-6 py-4 text-left text-xs font-bold uppercase text-gray-500">
                          Product
                        </th>

                        <th className="px-6 py-4 text-left text-xs font-bold uppercase text-gray-500">
                          Amount
                        </th>

                        <th className="px-6 py-4 text-left text-xs font-bold uppercase text-gray-500">
                          Date
                        </th>

                        <th className="px-6 py-4 text-left text-xs font-bold uppercase text-gray-500">
                          Status
                        </th>

                      </tr>

                    </thead>

                    <tbody className="divide-y divide-gray-100">

                      {orders.map((order) => (

                        <tr
                          key={order.id}
                          className="hover:bg-gray-50"
                        >

                          <td className="px-6 py-5 text-sm font-bold text-gray-700">
                            {order.id}
                          </td>

                          <td className="px-6 py-5 text-sm text-gray-700">
                            {order.customer}
                          </td>

                          <td className="px-6 py-5 text-sm text-gray-700">
                            {order.product}
                          </td>

                          <td className="px-6 py-5 text-sm font-bold text-gray-900">
                            ${order.amount}
                          </td>

                          <td className="px-6 py-5 text-sm text-gray-500">
                            {order.date}
                          </td>

                          <td className="px-6 py-5">

                            <span
                              className={`rounded-full px-3 py-1 text-xs font-bold ${getStatusClass(
                                order.status
                              )}`}
                            >
                              {order.status}
                            </span>

                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

              </div>

            )}

            {/* ==================================
                SALES PAGE
            ================================== */}

            {activePage === "Sales" && (

              <div className="space-y-6">

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">

                  <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                    <p className="text-sm text-gray-500">
                      Today's Sales
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-gray-900">
                      $1,240
                    </h2>

                    <p className="mt-2 text-sm font-semibold text-green-600">
                      ↑ 15.4%
                    </p>

                  </div>

                  <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                    <p className="text-sm text-gray-500">
                      This Month
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-gray-900">
                      $12,500
                    </h2>

                    <p className="mt-2 text-sm font-semibold text-green-600">
                      ↑ 24.8%
                    </p>

                  </div>

                  <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                    <p className="text-sm text-gray-500">
                      Total Sales
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-gray-900">
                      $58,900
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                      All time
                    </p>

                  </div>

                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                  <h2 className="text-xl font-bold text-gray-900">
                    Sales Performance
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Monthly sales overview
                  </p>

                  <div className="mt-8 flex h-72 items-end gap-4">

                    {[40, 55, 45, 70, 60, 85, 75, 90, 68, 82, 78, 96].map(
                      (height, index) => (

                        <div
                          key={index}
                          className="flex flex-1 flex-col items-center justify-end"
                        >

                          <div
                            className="w-full rounded-t-lg bg-gray-700 hover:bg-gray-900"
                            style={{
                              height: `${height}%`,
                            }}
                          />

                          <span className="mt-2 text-xs text-gray-400">
                            {index + 1}
                          </span>

                        </div>

                      )
                    )}

                  </div>

                </div>

              </div>

            )}

            {/* ==================================
                CUSTOMERS PAGE
            ================================== */}

            {activePage === "Customers" && (

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                  <div className="text-3xl">
                    👥
                  </div>

                  <p className="mt-4 text-sm text-gray-500">
                    Total Customers
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-gray-900">
                    1,248
                  </h2>

                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                  <div className="text-3xl">
                    ⭐
                  </div>

                  <p className="mt-4 text-sm text-gray-500">
                    Returning Customers
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-gray-900">
                    684
                  </h2>

                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                  <div className="text-3xl">
                    📈
                  </div>

                  <p className="mt-4 text-sm text-gray-500">
                    Customer Growth
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-gray-900">
                    +18.4%
                  </h2>

                </div>

              </div>

            )}

            {/* ==================================
                SETTINGS PAGE
            ================================== */}

            {activePage === "Settings" && (

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                <h2 className="text-xl font-bold text-gray-900">
                  Store Settings
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Manage your vendor store information.
                </p>

                <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Store Name
                    </label>

                    <input
                      type="text"
                      defaultValue="Tech Store"
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
                    />

                  </div>

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Seller Email
                    </label>

                    <input
                      type="email"
                      defaultValue="seller@example.com"
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
                    />

                  </div>

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Phone Number
                    </label>

                    <input
                      type="text"
                      defaultValue="+92 300 1234567"
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
                    />

                  </div>

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Store Category
                    </label>

                    <select
                      defaultValue="Electronics"
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-500"
                    >

                      <option>Electronics</option>
                      <option>Smartphones</option>
                      <option>Laptops</option>
                      <option>Gaming</option>
                      <option>Accessories</option>

                    </select>

                  </div>

                </div>

                <button
                  onClick={() =>
                    alert("Settings saved successfully!")
                  }
                  className="mt-6 rounded-xl bg-gray-800 px-6 py-3 text-sm font-bold text-white hover:bg-gray-900"
                >
                  Save Changes
                </button>

              </div>

            )}

          </div>

        </main>

      </div>

      {/* ======================================
          ADD PRODUCT MODAL
      ====================================== */}

      {showAddProduct && (

        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4">

          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">

            {/* MODAL HEADER */}

            <div className="flex items-center justify-between border-b border-gray-200 p-6">

              <div>

                <h2 className="text-xl font-bold text-gray-900">
                  Add New Product
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Add a product to your store.
                </p>

              </div>

              <button
                onClick={() => setShowAddProduct(false)}
                className="text-2xl text-gray-400 hover:text-gray-700"
              >
                ×
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleAddProduct}
              className="space-y-5 p-6"
            >

              {/* PRODUCT NAME */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Product Name
                </label>

                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      name: e.target.value,
                    })
                  }
                  placeholder="e.g. Samsung Galaxy S25"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
                />

              </div>

              {/* CATEGORY */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Category
                </label>

                <select
                  value={newProduct.category}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      category: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-500"
                >

                  <option>Smartphones</option>
                  <option>Laptops</option>
                  <option>Audio</option>
                  <option>Wearables</option>
                  <option>Cameras</option>
                  <option>Gaming</option>
                  <option>Accessories</option>

                </select>

              </div>

              {/* PRICE */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Price
                </label>

                <input
                  type="number"
                  min="0"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      price: e.target.value,
                    })
                  }
                  placeholder="999"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
                />

              </div>

              {/* STOCK */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Stock Quantity
                </label>

                <input
                  type="number"
                  min="0"
                  value={newProduct.stock}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      stock: e.target.value,
                    })
                  }
                  placeholder="20"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
                />

              </div>

              {/* BUTTONS */}

              <div className="flex gap-3 pt-2">

                <button
                  type="button"
                  onClick={() => setShowAddProduct(false)}
                  className="flex-1 rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-gray-800 px-5 py-3 font-bold text-white hover:bg-gray-900"
                >
                  Add Product
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default VendorDashboard;
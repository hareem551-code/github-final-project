import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import products from "../Data/Products";
import useCartStore from "../store/cartStore";

function Products() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");

  // Zustand
  const addToCart = useCartStore((state) => state.addToCart);

  // Get categories automatically
  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  // Search + filter + sort
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (search.trim()) {
      const searchText = search.toLowerCase();

      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchText) ||
          product.category.toLowerCase().includes(searchText) ||
          product.vendor.toLowerCase().includes(searchText)
      );
    }

    // Category
    if (category !== "All") {
      result = result.filter(
        (product) => product.category === category
      );
    }

    // Sort
    if (sort === "low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [search, category, sort]);

  // Add to cart
  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-14">

          <div className="text-center">

            <p className="text-blue-100 font-semibold uppercase tracking-wider">
              ElectroMarket
            </p>

            <h1 className="text-4xl md:text-5xl font-bold mt-2">
              All Electronics
            </h1>

            <p className="text-blue-100 text-lg mt-4 max-w-2xl mx-auto">
              Discover quality electronics from trusted
              marketplace vendors.
            </p>

          </div>

        </div>
      </section>

      {/* ================= FILTERS ================= */}
      <section className="max-w-7xl mx-auto px-4 py-8">

        <div className="bg-white rounded-2xl shadow-md p-5">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Search */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Search Products
              </label>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Sort By
              </label>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="default">
                  Default
                </option>

                <option value="low">
                  Price: Low to High
                </option>

                <option value="high">
                  Price: High to Low
                </option>

                <option value="rating">
                  Highest Rated
                </option>
              </select>
            </div>

          </div>

        </div>
      </section>

      {/* ================= CATEGORY BUTTONS ================= */}
      <section className="max-w-7xl mx-auto px-4 pb-8">

        <div className="flex flex-wrap gap-3">

          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`px-5 py-2 rounded-full font-semibold transition ${
                category === item
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-blue-50"
              }`}
            >
              {item}
            </button>
          ))}

        </div>

      </section>

      {/* ================= PRODUCT SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 pb-14">

        <div className="flex justify-between items-center mb-6">

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Electronics
            </h2>

            <p className="text-gray-500 mt-1">
              {filteredProducts.length} products found
            </p>
          </div>

        </div>

        {/* ================= PRODUCTS ================= */}

        {filteredProducts.length > 0 ? (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

            {filteredProducts.map((product) => {

              const discount =
                product.oldPrice > product.price
                  ? Math.round(
                      ((product.oldPrice - product.price) /
                        product.oldPrice) *
                        100
                    )
                  : 0;

              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition duration-300"
                >

                  {/* Product Image */}
                  <div className="relative h-64 bg-gray-100 flex items-center justify-center p-5">

                    {discount > 0 && (
                      <span className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                        {discount}% OFF
                      </span>
                    )}

                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition duration-300"
                    />

                  </div>

                  {/* Product Information */}
                  <div className="p-5">

                    {/* Category */}
                    <p className="text-sm text-blue-600 font-semibold">
                      {product.category}
                    </p>

                    {/* Product Name */}
                    <h3 className="text-lg font-bold text-gray-900 mt-1 line-clamp-1">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mt-2">

                      <span className="text-yellow-500">
                        {"★".repeat(
                          Math.round(product.rating)
                        )}
                      </span>

                      <span className="text-sm text-gray-500">
                        {product.rating}
                      </span>

                      {product.reviews && (
                        <span className="text-xs text-gray-400">
                          ({product.reviews})
                        </span>
                      )}

                    </div>

                    {/* Vendor */}
                    <p className="text-sm text-gray-500 mt-2">
                      Sold by{" "}
                      <span className="font-semibold text-gray-700">
                        {product.vendor}
                      </span>
                    </p>

                    {/* Price */}
                    <div className="flex items-center gap-3 mt-4">

                      <span className="text-2xl font-bold text-blue-600">
                        ${product.price}
                      </span>

                      {product.oldPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          ${product.oldPrice}
                        </span>
                      )}

                    </div>

                    {/* Stock */}
                    <p
                      className={`text-sm font-medium mt-2 ${
                        product.stock > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {product.stock > 0
                        ? `${product.stock} available`
                        : "Out of stock"}
                    </p>

                    {/* Buttons */}
                    <div className="grid grid-cols-2 gap-3 mt-5">

                      {/* Details */}
                      <Link
                        to={`/products/${product.id}`}
                        className="text-center border border-blue-600 text-blue-600 hover:bg-blue-50 py-2.5 rounded-lg font-semibold transition"
                      >
                        Details
                      </Link>

                      {/* Add Cart */}
                      <button
                        onClick={() =>
                          handleAddToCart(product)
                        }
                        disabled={product.stock <= 0}
                        className={`py-2.5 rounded-lg font-semibold transition ${
                          product.stock > 0
                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        Add Cart
                      </button>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>

        ) : (

          /* No Results */
          <div className="bg-white rounded-2xl p-16 text-center shadow-sm">

            <div className="text-6xl">
              🔍
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-5">
              No Products Found
            </h2>

            <p className="text-gray-500 mt-2">
              Try another product name or category.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
                setSort("default");
              }}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Clear Filters
            </button>

          </div>

        )}

      </section>

    </div>
  );
}

export default Products;
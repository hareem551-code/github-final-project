import React from "react";
import { Link } from "react-router-dom";

const deals = [
  {
    id: 1,
    name: "iPhone",
    price: "$699",
    oldPrice: "$799",
    discount: "13% OFF",
    image: "/src/assets/Product/iphone.jpeg",
  },
  {
    id: 2,
    name: "Laptop",
    price: "$899",
    oldPrice: "$1099",
    discount: "18% OFF",
    image: "/src/assets/Product/laptop.jpeg",
  },
  {
    id: 3,
    name: "Headphones",
    price: "$79",
    oldPrice: "$119",
    discount: "34% OFF",
    image: "/src/assets/Product/headphone.jpeg",
  },
  {
    id: 4,
    name: "Smartwatch",
    price: "$129",
    oldPrice: "$179",
    discount: "28% OFF",
    image: "/src/assets/Product/smartwatch.jpeg",
  },
];

export default function Deals() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900">
            Today's Deals
          </h1>

          <p className="text-gray-600 mt-3 text-lg">
            Get the best electronics at amazing prices
          </p>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
            >
              {/* Discount */}
              <div className="relative">
                <span className="absolute top-3 left-3 z-10 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {deal.discount}
                </span>

                <div className="h-64 flex items-center justify-center bg-gray-100 p-5">
                  <img
                    src={deal.image}
                    alt={deal.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </div>

              {/* Details */}
              <div className="p-5">
                <h2 className="text-xl font-bold text-gray-900">
                  {deal.name}
                </h2>

                <div className="flex items-center gap-3 mt-3">
                  <span className="text-2xl font-bold text-blue-600">
                    {deal.price}
                  </span>

                  <span className="text-gray-400 line-through">
                    {deal.oldPrice}
                  </span>
                </div>

                <button className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Back button */}
        <div className="text-center mt-10">
          <Link
            to="/products"
            className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
          >
            View All Products
          </Link>
        </div>

      </div>
    </div>
  );
}
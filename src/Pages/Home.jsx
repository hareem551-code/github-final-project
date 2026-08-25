import { Link } from "react-router-dom";

import iphone from "../assets/Product/iphone.jpeg";
import laptop from "../assets/Product/laptop.jpeg";
import headphone from "../assets/Product/headphone.jpeg";
import smartwatch from "../assets/Product/smartwatch.jpeg";
import camera from "../assets/Product/camera.jpeg";

function Home() {
  const categories = [
    {
      name: "Smartphones",
      image: iphone,
    },
    {
      name: "Laptops",
      image: laptop,
    },
    {
      name: "Audio",
      image: headphone,
    },
    {
      name: "Wearables",
      image: smartwatch,
    },
    {
      name: "Cameras",
      image: camera,
    },
    {
      name: "Gaming",
      image: laptop,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ================= HERO SECTION ================= */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center min-h-[520px]">

            {/* Hero Content */}
            <div className="py-12">

              <p className="text-blue-600 font-semibold text-sm md:text-base mb-4 tracking-wide">
                MULTI-VENDOR ELECTRONICS MARKETPLACE
              </p>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900">
                Everything Electronics.
              </h1>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-500 mt-2">
                All In One Place.
              </h2>

              <p className="text-lg text-gray-600 max-w-xl mt-6 leading-relaxed">
                Discover smartphones, laptops, gaming devices,
                accessories and electronics from trusted vendors.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4 mt-8">

                <Link
                  to="/products"
                  className="bg-blue-600 text-white px-7 py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-sm"
                >
                  Shop Now
                </Link>

                <Link
                  to="/vendor"
                  className="border-2 border-gray-800 text-gray-800 px-7 py-3 rounded-lg font-bold hover:bg-gray-900 hover:text-white transition"
                >
                  Become a Seller
                </Link>

              </div>

              {/* Small Stats */}
              <div className="grid grid-cols-3 gap-4 mt-10 max-w-xl">

                <div>
                  <h3 className="font-bold text-gray-900">
                    500+
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Products
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900">
                    50+
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Vendors
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900">
                    1000+
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Customers
                  </p>
                </div>

              </div>
            </div>

            {/* Hero Product Image */}
            <div className="flex justify-center lg:justify-end py-10">

              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-5 w-full max-w-md">

                <div className="bg-gray-100 rounded-xl h-[300px] flex items-center justify-center overflow-hidden">

                  <img
                    src={laptop}
                    alt="Latest Laptop"
                    className="w-full h-full object-contain"
                  />

                </div>

                <div className="text-center pt-5">

                  <h2 className="text-2xl font-bold text-gray-900">
                    Latest Electronics
                  </h2>

                  <p className="text-gray-500 mt-2">
                    Products from trusted sellers
                  </p>

                  <Link
                    to="/products"
                    className="inline-block mt-4 bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    Explore Products
                  </Link>

                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ================= CATEGORY SECTION ================= */}
      <section className="bg-gray-50 max-w-7xl mx-auto px-6 lg:px-8 py-16">

        <div className="flex justify-between items-end mb-8">

          <div>

            <p className="text-blue-600 font-semibold text-sm">
              SHOP BY CATEGORY
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              Explore Electronics
            </h2>

            <p className="text-gray-500 mt-2">
              Find the products you need from different vendors.
            </p>

          </div>

          <Link
            to="/categories"
            className="hidden md:block text-blue-600 font-semibold hover:text-blue-800"
          >
            View All →
          </Link>

        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">

          {categories.map((category) => (

            <Link
              to="/products"
              key={category.name}
              className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition duration-300"
            >

              <div className="h-36 bg-gray-100 flex items-center justify-center p-4">

                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition duration-300"
                />

              </div>

              <div className="p-4 text-center">

                <h3 className="font-bold text-gray-800 group-hover:text-blue-600">
                  {category.name}
                </h3>

                <p className="text-xs text-gray-500 mt-1">
                  Explore {category.name}
                </p>

              </div>

            </Link>

          ))}

        </div>

      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="bg-white border-y border-gray-200">

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

            <div className="text-center">

              <div className="text-3xl mb-3">
                🚚
              </div>

              <h3 className="font-bold text-lg text-gray-900">
                Fast Delivery
              </h3>

              <p className="text-gray-500 mt-2">
                Get your electronics delivered quickly.
              </p>

            </div>

            <div className="text-center">

              <div className="text-3xl mb-3">
                🔒
              </div>

              <h3 className="font-bold text-lg text-gray-900">
                Secure Shopping
              </h3>

              <p className="text-gray-500 mt-2">
                Your shopping experience is safe and secure.
              </p>

            </div>

            <div className="text-center">

              <div className="text-3xl mb-3">
                🏪
              </div>

              <h3 className="font-bold text-lg text-gray-900">
                Trusted Vendors
              </h3>

              <p className="text-gray-500 mt-2">
                Shop from multiple trusted electronics vendors.
              </p>

            </div>

            <div className="text-center">

              <div className="text-3xl mb-3">
                💬
              </div>

              <h3 className="font-bold text-lg text-gray-900">
                Customer Support
              </h3>

              <p className="text-gray-500 mt-2">
                We are here to help whenever you need us.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ================= VENDOR CTA SECTION ================= */}
      <section className="bg-gray-100 border-t border-gray-200">

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">

            <div className="text-gray-900 text-center md:text-left">

              <h2 className="text-3xl font-bold">
                Want to sell your electronics?
              </h2>

              <p className="text-gray-600 mt-2">
                Join our marketplace and start selling today.
              </p>

            </div>

            <Link
              to="/vendor"
              className="bg-blue-600 text-white px-7 py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-sm"
            >
              Become a Vendor
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;
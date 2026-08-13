import { Link } from "react-router-dom";

function Home() {
  return (
    <div>

      {/* Hero Section */}
      <section className="bg-gradient-to from-slate-900 to-blue-900 text-white">

        <div className="max-w-7xl mx-auto px-4 py-20">

          <div className="grid md:grid-cols-2 gap-12 items-center">

            <div>

              <p className="text-blue-300 font-semibold mb-3">
                MULTI-VENDOR ELECTRONICS MARKETPLACE
              </p>

              <h1 className="text-5xl font-bold leading-tight mb-6">
                Everything Electronics.
                <br />
                All in One Place.
              </h1>

              <p className="text-gray-300 text-lg mb-8">
                Discover smartphones, laptops, gaming devices,
                accessories and electronics from trusted vendors.
              </p>

              <div className="flex gap-4">

                <Link
                  to="/products"
                  className="bg-blue-600 hover:bg-blue-700 px-7 py-3 rounded-lg font-semibold"
                >
                  Shop Now
                </Link>

                <Link
                  to="/categories"
                  className="border border-white px-7 py-3 rounded-lg font-semibold hover:bg-white hover:text-slate-900"
                >
                  Explore Categories
                </Link>

              </div>

            </div>

            {/* Hero Product */}
            <div className="bg-white/10 rounded-2xl p-8 text-center">

              <div className="text-8xl mb-6">
                💻
              </div>

              <h2 className="text-3xl font-bold">
                Latest Electronics
              </h2>

              <p className="text-gray-300 mt-3">
                Best products from multiple trusted sellers
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-16">

        <div className="flex justify-between items-center mb-8">

          <div>
            <h2 className="text-3xl font-bold">
              Shop by Category
            </h2>

            <p className="text-gray-500 mt-2">
              Find the electronics you need
            </p>
          </div>

          <Link
            to="/categories"
            className="text-blue-600 font-semibold"
          >
            View All →
          </Link>

        </div>


        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">

          {[
            ["📱", "Smartphones"],
            ["💻", "Laptops"],
            ["🎧", "Audio"],
            ["⌚", "Wearables"],
            ["🎮", "Gaming"],
            ["📷", "Cameras"],
          ].map(([icon, name]) => (

            <Link
              key={name}
              to="/products"
              className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition"
            >

              <div className="text-4xl mb-3">
                {icon}
              </div>

              <h3 className="font-semibold">
                {name}
              </h3>

            </Link>

          ))}

        </div>

      </section>


      {/* Features */}
      <section className="bg-white border-y">

        <div className="max-w-7xl mx-auto px-4 py-12">

          <div className="grid md:grid-cols-4 gap-8">

            <div>
              <div className="text-3xl mb-3">🚚</div>
              <h3 className="font-bold">Fast Delivery</h3>
              <p className="text-gray-500 text-sm mt-2">
                Quick and reliable delivery.
              </p>
            </div>

            <div>
              <div className="text-3xl mb-3">🔒</div>
              <h3 className="font-bold">Secure Payment</h3>
              <p className="text-gray-500 text-sm mt-2">
                Safe and secure checkout.
              </p>
            </div>

            <div>
              <div className="text-3xl mb-3">⭐</div>
              <h3 className="font-bold">Trusted Vendors</h3>
              <p className="text-gray-500 text-sm mt-2">
                Buy from verified sellers.
              </p>
            </div>

            <div>
              <div className="text-3xl mb-3">↩️</div>
              <h3 className="font-bold">Easy Returns</h3>
              <p className="text-gray-500 text-sm mt-2">
                Simple return process.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 py-16">

        <div className="bg-blue-600 text-white rounded-2xl p-10 flex flex-col md:flex-row justify-between items-center gap-6">

          <div>
            <h2 className="text-3xl font-bold">
              Want to sell your electronics?
            </h2>

            <p className="mt-2 text-blue-100">
              Join our marketplace and start selling today.
            </p>
          </div>

          <Link
            to="/become-vendor"
            className="bg-white text-blue-600 px-7 py-3 rounded-lg font-bold"
          >
            Become a Vendor
          </Link>

        </div>

      </section>

    </div>
  );
}

export default Home;
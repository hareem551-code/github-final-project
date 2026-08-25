function Footer() {
  return (
    <footer className="bg-pink-200 text-white">

      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          <div>
            <h2 className="text-2xl font-bold text-blue-400">
              ElectroMarket
            </h2>

            <p className="text-gray-400 mt-4">
              A multi-vendor marketplace for
              electronics and technology products.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">
              Marketplace
            </h3>

            <p className="text-gray-400 mb-2">
              Products
            </p>

            <p className="text-gray-400 mb-2">
              Categories
            </p>

            <p className="text-gray-400">
              Deals
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">
              Sellers
            </h3>

            <p className="text-gray-400 mb-2">
              Become a Seller
            </p>

            <p className="text-gray-400">
              Vendor Dashboard
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">
              Support
            </h3>

            <p className="text-gray-400 mb-2">
              Contact Us
            </p>

            <p className="text-gray-400">
              Help Center
            </p>
          </div>

        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400">
          © 2026 ElectroMarket. All rights reserved.
        </div>

      </div>

    </footer>
  );
}

export default Footer;
function Footer() {
  return (
    <footer className="bg-slate-950 text-white">

      <div className="max-w-7xl mx-auto px-4 py-12">

        <div className="grid md:grid-cols-4 gap-10">

          <div>
            <h2 className="text-2xl font-bold text-blue-400">
              ElectroMart
            </h2>

            <p className="text-gray-400 mt-4">
              Your multi-vendor marketplace for electronics.
            </p>
          </div>


          <div>
            <h3 className="font-bold mb-4">
              Marketplace
            </h3>

            <ul className="space-y-2 text-gray-400">
              <li>Products</li>
              <li>Categories</li>
              <li>Deals</li>
              <li>Vendors</li>
            </ul>
          </div>


          <div>
            <h3 className="font-bold mb-4">
              Customer
            </h3>

            <ul className="space-y-2 text-gray-400">
              <li>My Account</li>
              <li>Orders</li>
              <li>Wishlist</li>
              <li>Help Center</li>
            </ul>
          </div>


          <div>
            <h3 className="font-bold mb-4">
              Vendor
            </h3>

            <ul className="space-y-2 text-gray-400">
              <li>Become a Vendor</li>
              <li>Vendor Login</li>
              <li>Seller Guide</li>
              <li>Vendor Support</li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500">
          © 2026 ElectroMart. All rights reserved.
        </div>

      </div>

    </footer>
  );
}

export default Footer;
import {
  ShoppingBag,
  Grid3X3,
  Tag,
  Store,
  LayoutDashboard,
  Mail,
  CircleHelp,
  Zap,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaLinkedinIn,
} from "react-icons/fa6";

function Footer() {
  return (
    <footer className="bg-gray-100 px-4 sm:px-6 py-10 sm:py-14">

      {/* Main Footer Card */}
      <div className="max-w-7xl mx-auto bg-gray-700 text-white rounded-[28px] sm:rounded-[32px] min-h-[50vh] px-8 sm:px-12 lg:px-16 py-10 sm:py-12 shadow-xl transition-all duration-500 hover:shadow-2xl">

        {/* Inner Footer Container */}
        <div className="w-full h-full flex flex-col justify-between">

          {/* Footer Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 lg:gap-16">

            {/* Brand / Description */}
            <div className="lg:pr-6">

              {/* Logo */}
              <div className="flex items-center gap-3 group cursor-pointer">

                <div className="w-11 h-11 shrink-0 rounded-xl bg-black flex items-center justify-center shadow-md group-hover:scale-105 group-hover:-rotate-2 transition-all duration-300">

                  <Zap
                    size={21}
                    strokeWidth={2.5}
                    className="text-white"
                  />

                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight group-hover:text-gray-200 transition-colors duration-300">
                  NextTech
                </h2>

              </div>

              {/* Description */}
              <p className="text-gray-300 text-base sm:text-lg mt-5 leading-7 max-w-sm">
                A multi-vendor marketplace for electronics and technology products.
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-3 mt-7">

                <a
                  href="#"
                  aria-label="Facebook"
                  className="w-10 h-10 shrink-0 bg-black rounded-full border border-gray-500 flex items-center justify-center text-gray-300 hover:bg-white hover:text-black hover:border-white hover:-translate-y-1 hover:scale-105 transition-all duration-300"
                >
                  <FaFacebookF size={14} />
                </a>

                <a
                  href="#"
                  aria-label="Instagram"
                  className="w-10 h-10 shrink-0 bg-black rounded-full border border-gray-500 flex items-center justify-center text-gray-300 hover:bg-white hover:text-black hover:border-white hover:-translate-y-1 hover:scale-105 transition-all duration-300"
                >
                  <FaInstagram size={14} />
                </a>

                <a
                  href="#"
                  aria-label="X / Twitter"
                  className="w-10 h-10 shrink-0 bg-black rounded-full border border-gray-500 flex items-center justify-center text-gray-300 hover:bg-white hover:text-black hover:border-white hover:-translate-y-1 hover:scale-105 transition-all duration-300"
                >
                  <FaXTwitter size={14} />
                </a>

                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="w-10 h-10 shrink-0 bg-black rounded-full border border-gray-500 flex items-center justify-center text-gray-300 hover:bg-white hover:text-black hover:border-white hover:-translate-y-1 hover:scale-105 transition-all duration-300"
                >
                  <FaLinkedinIn size={14} />
                </a>

              </div>
            </div>


            {/* Marketplace */}
            <div>

              <h3 className="text-white font-semibold text-xl sm:text-2xl uppercase tracking-wider mb-6">
                Marketplace
              </h3>

              <div className="space-y-6">

                {/* Products */}
                <div className="flex items-center gap-4 group cursor-pointer">

                  <div className="w-10 h-10 shrink-0 bg-black rounded-full flex items-center justify-center border border-gray-500 group-hover:bg-white group-hover:border-white group-hover:-translate-y-1 transition-all duration-300">

                    <ShoppingBag
                      size={17}
                      strokeWidth={1.8}
                      className="text-gray-300 group-hover:text-black group-hover:scale-105 transition-all duration-300"
                    />

                  </div>

                  <p className="text-gray-300 text-base sm:text-lg group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
                    Products
                  </p>

                </div>


                {/* Categories */}
                <div className="flex items-center gap-4 group cursor-pointer">

                  <div className="w-10 h-10 shrink-0 bg-black rounded-full flex items-center justify-center border border-gray-500 group-hover:bg-white group-hover:border-white group-hover:-translate-y-1 transition-all duration-300">

                    <Grid3X3
                      size={17}
                      strokeWidth={1.8}
                      className="text-gray-300 group-hover:text-black group-hover:scale-105 transition-all duration-300"
                    />

                  </div>

                  <p className="text-gray-300 text-base sm:text-lg group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
                    Categories
                  </p>

                </div>


                {/* Deals */}
                <div className="flex items-center gap-4 group cursor-pointer">

                  <div className="w-10 h-10 shrink-0 bg-black rounded-full flex items-center justify-center border border-gray-500 group-hover:bg-white group-hover:border-white group-hover:-translate-y-1 transition-all duration-300">

                    <Tag
                      size={17}
                      strokeWidth={1.8}
                      className="text-gray-300 group-hover:text-black group-hover:scale-105 transition-all duration-300"
                    />

                  </div>

                  <p className="text-gray-300 text-base sm:text-lg group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
                    Deals
                  </p>

                </div>

              </div>
            </div>


            {/* Sellers */}
            <div>

              <h3 className="text-white text-xl sm:text-2xl font-semibold uppercase tracking-wider mb-6">
                Sellers
              </h3>

              <div className="space-y-6">

                {/* Become a Seller */}
                <div className="flex items-center gap-4 group cursor-pointer">

                  <div className="w-10 h-10 shrink-0 bg-black rounded-full flex items-center justify-center border border-gray-500 group-hover:bg-white group-hover:border-white group-hover:-translate-y-1 transition-all duration-300">

                    <Store
                      size={17}
                      strokeWidth={1.8}
                      className="text-gray-300 group-hover:text-black group-hover:scale-105 transition-all duration-300"
                    />

                  </div>

                  <p className="text-gray-300 text-base sm:text-lg group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
                    Become a Seller
                  </p>

                </div>


                {/* Vendor Dashboard */}
                <div className="flex items-center gap-4 group cursor-pointer">

                  <div className="w-10 h-10 shrink-0 bg-black rounded-full flex items-center justify-center border border-gray-500 group-hover:bg-white group-hover:border-white group-hover:-translate-y-1 transition-all duration-300">

                    <LayoutDashboard
                      size={17}
                      strokeWidth={1.8}
                      className="text-gray-300 group-hover:text-black group-hover:scale-105 transition-all duration-300"
                    />

                  </div>

                  <p className="text-gray-300 text-base sm:text-lg group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
                    Vendor Dashboard
                  </p>

                </div>

              </div>
            </div>


            {/* Support */}
            <div>

              <h3 className="text-white text-xl sm:text-2xl font-semibold uppercase tracking-wider mb-6">
                Support
              </h3>

              <div className="space-y-6">

                {/* Contact Us */}
                <div className="flex items-center gap-4 group cursor-pointer">

                  <div className="w-10 h-10 shrink-0 bg-black rounded-full flex items-center justify-center border border-gray-500 group-hover:bg-white group-hover:border-white group-hover:-translate-y-1 transition-all duration-300">

                    <Mail
                      size={17}
                      strokeWidth={1.8}
                      className="text-gray-300 group-hover:text-black group-hover:scale-105 transition-all duration-300"
                    />

                  </div>

                  <p className="text-gray-300 text-base sm:text-lg group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
                    Contact Us
                  </p>

                </div>


                {/* Help Center */}
                <div className="flex items-center gap-4 group cursor-pointer">

                  <div className="w-10 h-10 shrink-0 bg-black rounded-full flex items-center justify-center border border-gray-500 group-hover:bg-white group-hover:border-white group-hover:-translate-y-1 transition-all duration-300">

                    <CircleHelp
                      size={17}
                      strokeWidth={1.8}
                      className="text-gray-300 group-hover:text-black group-hover:scale-105 transition-all duration-300"
                    />

                  </div>

                  <p className="text-gray-300 text-base sm:text-lg group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
                    Help Center
                  </p>

                </div>

              </div>
            </div>

          </div>


          {/* Bottom Divider */}
          <div className="border-t border-gray-500/60 mt-10 sm:mt-12 pt-6 px-2 sm:px-4">

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">

              {/* Copyright */}
              <p className="text-gray-300 text-xs sm:text-sm leading-5">
                © 2026 NextTech. All rights reserved.
              </p>

              {/* Policies */}
              <div className="flex flex-wrap items-center gap-x-7 gap-y-2 text-gray-400 text-xs sm:text-sm pr-1">

                <span className="cursor-pointer whitespace-nowrap hover:text-white hover:underline underline-offset-4 transition-all duration-300">
                  Privacy Policy
                </span>

                <span className="cursor-pointer whitespace-nowrap hover:text-white hover:underline underline-offset-4 transition-all duration-300">
                  Terms & Conditions
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;
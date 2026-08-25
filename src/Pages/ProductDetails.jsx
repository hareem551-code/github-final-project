import { Link, useParams } from "react-router-dom";
import products from "../Data/Products";

function ProductDetails() {
  const { id } = useParams();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Product Not Found
          </h1>

          <Link
            to="/products"
            className="inline-block mt-5 bg-pink-200 text-white px-5 py-3 rounded-lg"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="text-sm text-gray-500">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>

          <span className="mx-2">/</span>

          <Link to="/products" className="hover:text-blue-600">
            Products
          </Link>

          <span className="mx-2">/</span>

          <span className="text-gray-900">
            {product.name}
          </span>
        </div>
      </div>

      {/* Product Details */}
      <main className="max-w-7xl mx-auto px-6 pb-12">

        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* Product Image */}
            <div className="bg-gray-100 min-h-[450px] flex items-center justify-center p-10">

              <img
                src={product.image}
                alt={product.name}
                className="w-full max-w-lg h-[400px] object-contain"
              />

            </div>

            {/* Product Information */}
            <div className="p-8 lg:p-12">

              {/* Category */}
              <p className="text-blue-600 font-semibold">
                {product.category}
              </p>

              {/* Name */}
              <h1 className="text-4xl font-bold text-gray-900 mt-3">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mt-5">

                <div className="text-yellow-500 text-xl">
                  ★★★★★
                </div>

                <span className="text-gray-600">
                  {product.rating} Rating
                </span>

              </div>

              {/* Price */}
              <div className="mt-7">

                <span className="text-4xl font-bold text-gray-900">
                  ${product.price}
                </span>

                <span className="ml-3 text-gray-400 line-through">
                  ${(product.price + 150).toFixed(0)}
                </span>

              </div>

              {/* Description */}
              <p className="text-gray-600 leading-7 mt-6">
                Experience high-quality electronics from a trusted
                marketplace seller. This product is carefully selected
                for customers looking for reliable technology and
                excellent performance.
              </p>

              {/* Seller */}
              <div className="bg-gray-50 rounded-xl p-5 mt-7">

                <p className="text-sm text-gray-500">
                  Sold by
                </p>

                <p className="font-bold text-gray-900 text-lg mt-1">
                  {product.seller}
                </p>

                <div className="flex items-center gap-2 mt-2">

                  <span className="text-green-600 font-semibold">
                    ✓ Verified Seller
                  </span>

                </div>

              </div>

              {/* Stock */}
              <div className="mt-6">

                <span className="text-green-600 font-semibold">
                  ✓ In Stock
                </span>

                <span className="text-gray-500 ml-3">
                  Fast delivery available
                </span>

              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 mt-7">

                <span className="font-semibold">
                  Quantity:
                </span>

                <div className="flex items-center border rounded-lg">

                  <button className="px-4 py-2 text-lg hover:bg-gray-100">
                    −
                  </button>

                  <span className="px-5 py-2 border-x">
                    1
                  </span>

                  <button className="px-4 py-2 text-lg hover:bg-gray-100">
                    +
                  </button>

                </div>

              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">

                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg transition">
                  Add to Cart
                </button>

                <button className="flex-1 bg-gray-900 hover:bg-gray-800 text-white py-4 rounded-xl font-bold text-lg transition">
                  Buy Now
                </button>

              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">

                <div className="border rounded-xl p-4 text-center">
                  <div className="text-2xl">
                    🚚
                  </div>

                  <p className="font-semibold mt-2">
                    Fast Delivery
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Quick shipping
                  </p>
                </div>

                <div className="border rounded-xl p-4 text-center">
                  <div className="text-2xl">
                    🔒
                  </div>

                  <p className="font-semibold mt-2">
                    Secure Payment
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Safe checkout
                  </p>
                </div>

                <div className="border rounded-xl p-4 text-center">
                  <div className="text-2xl">
                    ↩️
                  </div>

                  <p className="font-semibold mt-2">
                    Easy Returns
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Customer friendly
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Additional Information */}
        <div className="bg-white rounded-2xl shadow-sm border mt-8 p-8">

          <h2 className="text-2xl font-bold text-gray-900">
            Product Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

            <div className="border rounded-xl p-5">
              <p className="text-sm text-gray-500">
                Category
              </p>

              <p className="font-semibold mt-1">
                {product.category}
              </p>
            </div>

            <div className="border rounded-xl p-5">
              <p className="text-sm text-gray-500">
                Seller
              </p>

              <p className="font-semibold mt-1">
                {product.seller}
              </p>
            </div>

            <div className="border rounded-xl p-5">
              <p className="text-sm text-gray-500">
                Customer Rating
              </p>

              <p className="font-semibold mt-1">
                ⭐ {product.rating} / 5
              </p>
            </div>

            <div className="border rounded-xl p-5">
              <p className="text-sm text-gray-500">
                Availability
              </p>

              <p className="font-semibold text-green-600 mt-1">
                In Stock
              </p>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default ProductDetails;
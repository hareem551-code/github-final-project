import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-10 text-center max-w-lg w-full">

        <div className="text-6xl mb-5">
          ✅
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Order Placed Successfully!
        </h1>

        <p className="text-gray-600 mb-2">
          Thank you for shopping with ElectroMarket.
        </p>

        <p className="text-gray-500 mb-8">
          Your order has been received and is being processed.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">

          <Link
            to="/products"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Continue Shopping
          </Link>

          <Link
            to="/"
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
          >
            Back to Home
          </Link>

        </div>

      </div>
    </div>
  );
}

export default OrderSuccess;
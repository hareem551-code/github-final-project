// trigger redeploy


import { Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/productdetails";
import Categories from "./pages/Categories";
import Stores from "./pages/Stores";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VendorDashboard from "./pages/VendorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Deals from "./pages/Deals";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        <Routes>

          {/* Home */}
          <Route
            path="/"
            element={<Home />}
          />

          {/* Products */}
          <Route
            path="/products"
            element={<Products />}
          />

          {/* Product Details */}
          <Route
            path="/products/:id"
            element={<ProductDetails />}
          />

          {/* Categories */}
          <Route
            path="/categories"
            element={<Categories />}
          />

          {/* Stores */}
          <Route
            path="/stores"
            element={<Stores />}
          />

          {/* Deals */}
          <Route
            path="/deals"
            element={<Deals />}
          />

          {/* Cart */}
          <Route
            path="/cart"
            element={<Cart />}
          />

          {/* Checkout */}
          <Route
            path="/checkout"
            element={<Checkout />}
          />

          {/* Order Success */}
          <Route
            path="/order-success"
            element={<OrderSuccess />}
          />

          {/* Login */}
          <Route
            path="/login"
            element={<Login />}
          />

          {/* Register */}
          <Route
            path="/register"
            element={<Register />}
          />

          {/* Forgot Password */}
          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />

          {/* Reset Password */}
          <Route
            path="/reset-password/:token"
            element={<ResetPassword />}
          />

          <Route
            path="/vendor"
            element={<VendorDashboard />}
          />

          <Route
            path="/vendor/dashboard"
            element={<VendorDashboard />}
          />

          <Route
            path="/admin"
            element={<AdminDashboard />}
          />

          <Route
            path="/admin/dashboard"
            element={<AdminDashboard />}
          />

          <Route
            path="*"
            element={<NotFound />}
          />

        </Routes>
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default App;
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VendorDashboard from "./pages/VendorDashboard";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <div className="min-h-screen flex flex-col">

      <Navbar />

      <main className="flex-1">

        <Routes>

          <Route path="/" element={<Home />} />

          <Route
            path="/products"
            element={<Products />}
          />

          <Route
            path="/categories"
            element={<Categories />}
          />

          <Route
            path="/cart"
            element={<Cart />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/vendor"
            element={<VendorDashboard />}
          />

          <Route
            path="/admin"
            element={<AdminDashboard />}
          />

        </Routes>

      </main>

      <Footer />

    </div>
  );
}

export default App;
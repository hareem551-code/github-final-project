import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">

      <div className="bg-white border rounded-2xl shadow-lg p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center">
          Login
        </h1>

        <p className="text-gray-500 text-center mt-2">
          Welcome back to ElectroMarket
        </p>

        <form className="mt-8 space-y-5">

          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg p-3"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg p-3"
          />

          <button
            type="button"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold"
          >
            Login
          </button>

        </form>

        <p className="text-center mt-6 text-gray-600">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="text-blue-600 font-semibold"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;
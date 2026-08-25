import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center text-center px-6">

      <div>

        <h1 className="text-7xl font-bold text-blue-600">
          404
        </h1>

        <h2 className="text-3xl font-bold mt-4">
          Page Not Found
        </h2>

        <p className="text-gray-500 mt-3">
          The page you are looking for does not exist.
        </p>

        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-7 py-3 rounded-lg mt-6"
        >
          Go Home
        </Link>

      </div>

    </div>
  );
}

export default NotFound;
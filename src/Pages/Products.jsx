
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();

  // ======================================================
  // STATES
  // ======================================================

  const [product, setProduct] = useState(null);

  const [reviews, setReviews] = useState([]);

  const [averageRating, setAverageRating] = useState(0);

  const [totalReviews, setTotalReviews] = useState(0);

  const [loading, setLoading] = useState(true);

  const [reviewsLoading, setReviewsLoading] =
    useState(true);

  const [error, setError] = useState("");

  const [reviewError, setReviewError] =
    useState("");

  const [rating, setRating] = useState(5);

  const [comment, setComment] = useState("");

  const [submittingReview, setSubmittingReview] =
    useState(false);

  const [quantity, setQuantity] = useState(1);

  // ======================================================
  // BACKEND URL
  // ======================================================

  const API_URL = "http://localhost:5000";

  // ======================================================
  // FETCH PRODUCT
  // ======================================================

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/api/products/${id}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Product not found"
          );
        }

        setProduct(data);

      } catch (error) {
        console.error(
          "Product fetch error:",
          error
        );

        setError(
          error.message ||
            "Unable to load product"
        );

      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  // ======================================================
  // FETCH REVIEWS
  // ======================================================

  const fetchReviews = async () => {
    try {
      setReviewsLoading(true);
      setReviewError("");

      const response = await fetch(
        `${API_URL}/api/reviews/product/${id}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to load reviews"
        );
      }

      setReviews(data.reviews || []);

      setAverageRating(
        data.averageRating || 0
      );

      setTotalReviews(
        data.totalReviews || 0
      );

    } catch (error) {
      console.error(
        "Reviews fetch error:",
        error
      );

      setReviewError(
        error.message ||
          "Unable to load reviews"
      );

    } finally {
      setReviewsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchReviews();
    }
  }, [id]);

  // ======================================================
  // SUBMIT REVIEW
  // ======================================================

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      setReviewError(
        "Please write a review."
      );

      return;
    }

    try {
      setSubmittingReview(true);
      setReviewError("");

      const response = await fetch(
        `${API_URL}/api/reviews`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            productId: Number(id),
            rating: Number(rating),
            comment: comment.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to submit review"
        );
      }

      // --------------------------------------------------
      // CLEAR FORM
      // --------------------------------------------------

      setComment("");

      setRating(5);

      // --------------------------------------------------
      // UPDATE RATING
      // --------------------------------------------------

      setAverageRating(
        data.averageRating || 0
      );

      setTotalReviews(
        data.totalReviews || 0
      );

      // --------------------------------------------------
      // REFRESH REVIEWS
      // --------------------------------------------------

      await fetchReviews();

      // --------------------------------------------------
      // UPDATE PRODUCT RATING LOCALLY
      // --------------------------------------------------

      setProduct((previousProduct) => {
        if (!previousProduct) {
          return previousProduct;
        }

        return {
          ...previousProduct,
          rating:
            data.averageRating ||
            previousProduct.rating,
        };
      });

    } catch (error) {
      console.error(
        "Submit review error:",
        error
      );

      setReviewError(
        error.message ||
          "Unable to submit review"
      );

    } finally {
      setSubmittingReview(false);
    }
  };

  // ======================================================
  // QUANTITY
  // ======================================================

  const decreaseQuantity = () => {
    setQuantity((previous) =>
      previous > 1
        ? previous - 1
        : 1
    );
  };

  const increaseQuantity = () => {
    setQuantity(
      (previous) => previous + 1
    );
  };

  // ======================================================
  // LOADING
  // ======================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto"></div>

          <p className="text-gray-600 mt-4">
            Loading product...
          </p>
        </div>
      </div>
    );
  }

  // ======================================================
  // PRODUCT ERROR / NOT FOUND
  // ======================================================

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Product Not Found
          </h1>

          <p className="text-gray-500 mt-3">
            {error ||
              "The requested product could not be found."}
          </p>

          <Link
            to="/products"
            className="inline-block mt-5 bg-gray-900 hover:bg-gray-800 text-white px-5 py-3 rounded-lg transition"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  // ======================================================
  // DISPLAY VALUES
  // ======================================================

  const currentRating =
    averageRating > 0
      ? averageRating
      : Number(product.rating || 0);

  const seller =
    product.seller ||
    product.vendor ||
    "Marketplace Seller";

  const oldPrice =
    Number(product.price || 0) + 150;

  // ======================================================
  // STAR DISPLAY
  // ======================================================

  const renderStars = (
    value,
    size = "text-xl"
  ) => {
    const roundedRating =
      Math.round(Number(value));

    return (
      <div
        className={`flex items-center ${size}`}
      >
        {[1, 2, 3, 4, 5].map(
          (star) => (
            <span
              key={star}
              className={
                star <= roundedRating
                  ? "text-yellow-500"
                  : "text-gray-300"
              }
            >
              ★
            </span>
          )
        )}
      </div>
    );
  };

  // ======================================================
  // RETURN
  // ======================================================

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ==================================================
          BREADCRUMB
      ================================================== */}

      <div className="max-w-7xl mx-auto px-6 py-5">

        <div className="text-sm text-gray-500">

          <Link
            to="/"
            className="hover:text-blue-600"
          >
            Home
          </Link>

          <span className="mx-2">
            /
          </span>

          <Link
            to="/products"
            className="hover:text-blue-600"
          >
            Products
          </Link>

          <span className="mx-2">
            /
          </span>

          <span className="text-gray-900">
            {product.name}
          </span>

        </div>

      </div>

      {/* ==================================================
          PRODUCT DETAILS
      ================================================== */}

      <main className="max-w-7xl mx-auto px-6 pb-12">

        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* ==================================================
                PRODUCT IMAGE
            ================================================== */}

            <div className="bg-gray-100 min-h-[450px] flex items-center justify-center p-10">

              <img
                src={product.image}
                alt={product.name}
                className="w-full max-w-lg h-[400px] object-contain"
                onError={(e) => {
                  e.currentTarget.style.display =
                    "none";
                }}
              />

            </div>

            {/* ==================================================
                PRODUCT INFORMATION
            ================================================== */}

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

                {renderStars(
                  currentRating
                )}

                <span className="text-gray-600">

                  {currentRating > 0
                    ? currentRating.toFixed(
                        1
                      )
                    : "No rating"}

                  {" "}Rating

                </span>

                {totalReviews > 0 && (
                  <span className="text-gray-400">
                    ({totalReviews}{" "}
                    reviews)
                  </span>
                )}

              </div>

              {/* Price */}

              <div className="mt-7">

                <span className="text-4xl font-bold text-gray-900">

                  $
                  {Number(
                    product.price || 0
                  ).toFixed(2)}

                </span>

                <span className="ml-3 text-gray-400 line-through">

                  $
                  {oldPrice.toFixed(0)}

                </span>

              </div>

              {/* Description */}

              <p className="text-gray-600 leading-7 mt-6">

                Experience high-quality
                electronics from a trusted
                marketplace seller. This
                product is carefully selected
                for customers looking for
                reliable technology and
                excellent performance.

              </p>

              {/* Seller */}

              <div className="bg-gray-50 rounded-xl p-5 mt-7">

                <p className="text-sm text-gray-500">
                  Sold by
                </p>

                <p className="font-bold text-gray-900 text-lg mt-1">
                  {seller}
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

                <div className="flex items-center border rounded-lg overflow-hidden">

                  <button
                    type="button"
                    onClick={
                      decreaseQuantity
                    }
                    className="px-4 py-2 text-lg hover:bg-gray-100"
                  >
                    −
                  </button>

                  <span className="px-5 py-2 border-x">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={
                      increaseQuantity
                    }
                    className="px-4 py-2 text-lg hover:bg-gray-100"
                  >
                    +
                  </button>

                </div>

              </div>

              {/* Buttons */}

              <div className="flex flex-col sm:flex-row gap-4 mt-8">

                <button
                  type="button"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg transition"
                >
                  Add to Cart
                </button>

                <button
                  type="button"
                  className="flex-1 bg-gray-900 hover:bg-gray-800 text-white py-4 rounded-xl font-bold text-lg transition"
                >
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

        {/* ==================================================
            PRODUCT INFORMATION
        ================================================== */}

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
                {seller}
              </p>

            </div>

            <div className="border rounded-xl p-5">

              <p className="text-sm text-gray-500">
                Customer Rating
              </p>

              <p className="font-semibold mt-1">

                ⭐{" "}
                {currentRating > 0
                  ? currentRating.toFixed(
                      1
                    )
                  : "No rating"}{" "}
                / 5

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

        {/* ==================================================
            REVIEWS SECTION
        ================================================== */}

        <div className="bg-white rounded-2xl shadow-sm border mt-8 p-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>

              <h2 className="text-2xl font-bold text-gray-900">
                Customer Reviews
              </h2>

              <div className="flex items-center gap-3 mt-3">

                {renderStars(
                  currentRating,
                  "text-2xl"
                )}

                <span className="font-semibold text-gray-900">

                  {currentRating > 0
                    ? currentRating.toFixed(
                        1
                      )
                    : "0.0"}{" "}
                  / 5

                </span>

                <span className="text-gray-500">

                  ({totalReviews}{" "}
                  reviews)

                </span>

              </div>

            </div>

          </div>

          {/* ==================================================
              WRITE REVIEW
          ================================================== */}

          <div className="border rounded-xl p-6 mt-8">

            <h3 className="text-lg font-bold text-gray-900">
              Write a Review
            </h3>

            <form
              onSubmit={
                handleSubmitReview
              }
              className="mt-5"
            >

              {/* Rating */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Rating
                </label>

                <div className="flex items-center gap-1">

                  {[1, 2, 3, 4, 5].map(
                    (star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() =>
                          setRating(star)
                        }
                        className={`text-3xl transition ${
                          star <= rating
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }`}
                        aria-label={`Rate ${star} out of 5`}
                      >
                        ★
                      </button>
                    )
                  )}

                </div>

              </div>

              {/* Comment */}

              <div className="mt-5">

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Review
                </label>

                <textarea
                  value={comment}
                  onChange={(e) =>
                    setComment(
                      e.target.value
                    )
                  }
                  rows="4"
                  placeholder="Share your experience with this product..."
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                />

              </div>

              {/* Error */}

              {reviewError && (
                <div className="mt-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                  {reviewError}
                </div>
              )}

              {/* Submit */}

              <button
                type="submit"
                disabled={
                  submittingReview
                }
                className="mt-5 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 text-white px-6 py-3 rounded-xl font-semibold transition"
              >

                {submittingReview
                  ? "Submitting..."
                  : "Submit Review"}

              </button>

            </form>

          </div>

          {/* ==================================================
              REVIEWS LIST
          ================================================== */}

          <div className="mt-8">

            <h3 className="text-lg font-bold text-gray-900">
              Recent Reviews
            </h3>

            {reviewsLoading ? (
              <div className="py-8 text-center text-gray-500">
                Loading reviews...
              </div>
            ) : reviews.length === 0 ? (
              <div className="mt-5 border rounded-xl p-8 text-center">

                <p className="text-gray-500">
                  No reviews yet.
                </p>

                <p className="text-sm text-gray-400 mt-1">
                  Be the first customer to
                  review this product.
                </p>

              </div>
            ) : (
              <div className="space-y-4 mt-5">

                {reviews.map(
                  (review) => (
                    <div
                      key={review._id}
                      className="border rounded-xl p-5"
                    >

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

                        <div className="flex items-center gap-3">

                          {renderStars(
                            review.rating,
                            "text-lg"
                          )}

                          <span className="font-semibold text-gray-900">
                            {review.rating}/5
                          </span>

                        </div>

                        {review.createdAt && (
                          <span className="text-sm text-gray-400">

                            {new Date(
                              review.createdAt
                            ).toLocaleDateString()}

                          </span>
                        )}

                      </div>

                      <p className="text-gray-600 leading-7 mt-3">
                        {review.comment}
                      </p>

                    </div>
                  )
                )}

              </div>
            )}

          </div>

        </div>

      </main>

    </div>
  );
}

export default ProductDetails;

import React, { useState, useEffect } from "react";
import apiService from "@/app/utils/apiService";

function Reviews({ productId, userId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await apiService.get(
          `/reviews/${productId}`,
          {},
          true
        );
        setReviews(response.data);
      } catch (err) {
        console.error("Failed to fetch reviews", err);
      }
    };
    if (productId) fetchReviews();
  }, [productId]);

  const addReview = async () => {
    setLoading(true);
    setMessage("");
    try {
      await apiService.post(
        `/reviews/${productId}`,
        { user: userId, rating, comment },
        true
      );
      setMessage("Review submitted successfully!");
      setIsOpen(false);
      setComment("");
      setRating(5);
      const updated = await apiService.get(`/reviews/${productId}`);
      setReviews(updated.data);
    } catch (error) {
      if (error?.response?.status === 400 || error?.response?.status === 409) {
        setMessage(
          error.response.data.message ||
            "You have already reviewed this product."
        );
      } else {
        setMessage("An error occurred while submitting your review.");
      }
    } finally {
      setLoading(false);
    }
  };

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const renderStars = (rating, size = "w-5 h-5") => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`${size} ${
            rating >= star ? "text-amber-500" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-amber-200 overflow-hidden">
      <div className="px-6 py-5 border-b border-amber-100">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
            <h2 className="text-2xl font-bold text-amber-800">
              Customer Reviews
            </h2>
            {reviews.length > 0 && (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {renderStars(Math.round(getAverageRating()))}
                  <span className="text-lg font-semibold text-amber-700">
                    {getAverageRating()}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  ({reviews.length}{" "}
                  {reviews.length === 1 ? "review" : "reviews"})
                </span>
              </div>
            )}
          </div>
          {localStorage.getItem("token") && (
            <button
              onClick={() => setIsOpen(true)}
              className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 whitespace-nowrap"
            >
              Write a Review
            </button>
          )}
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {reviews.length === 0 ? (
          <div className="text-center py-12">
            <div className="mb-4">
              <svg
                className="mx-auto h-12 w-12 text-amber-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </div>
            <p className="text-amber-600 text-lg font-medium mb-2">
              No reviews yet
            </p>
            <p className="text-gray-500">
              Be the first to share your experience!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-xl p-6 hover:shadow-md transition-shadow duration-200 flex flex-col h-full"
              >
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                      {(review.user?.fullName || "A").charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-gray-800 truncate">
                        {review.user?.fullName || "Anonymous"}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {renderStars(review.rating, "w-4 h-4")}
                    <span className="text-sm font-medium text-amber-700 ml-1">
                      {review.rating}.0
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed text-sm flex-1">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        )}

        {message && (
          <div
            className={`mt-6 p-4 rounded-lg ${
              message.includes("successfully")
                ? "bg-green-50 border border-green-200 text-green-800"
                : "bg-red-50 border border-red-200 text-red-800"
            }`}
          >
            <p className="font-medium">{message}</p>
          </div>
        )}
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative max-h-screen overflow-y-auto">
            <div className="sticky top-0 bg-white rounded-t-2xl border-b border-gray-100 px-6 py-4">
              {localStorage.getItem("token") && (
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-amber-800">
                    Write a Review
                  </h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200"
                  >
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Your Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="group"
                    >
                      <svg
                        className={`h-8 w-8 transition-all duration-200 ${
                          rating >= star
                            ? "text-amber-500 scale-110"
                            : "text-gray-300 group-hover:text-amber-300 group-hover:scale-105"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  ))}
                  <span className="ml-2 text-sm font-medium text-amber-700">
                    {rating} star{rating !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Your Review
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 resize-none"
                  rows={5}
                  placeholder="Share your experience with this product..."
                />
              </div>

              <button
                onClick={addReview}
                disabled={loading || !comment.trim()}
                className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white px-6 py-4 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Submitting...
                  </div>
                ) : (
                  "Submit Review"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reviews;

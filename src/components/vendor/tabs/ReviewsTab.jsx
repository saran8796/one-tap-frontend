import React from "react";

export default function ReviewsTab({ reviews, calculateAverageRating }) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Customer Reviews</h1>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Overall Rating
            </h2>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-3xl font-bold text-gray-900">
                {calculateAverageRating()}
              </span>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={
                      i < Math.floor(calculateAverageRating())
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }
                  >
                    ⭐
                  </span>
                ))}
              </div>
              <span className="text-gray-600">({reviews.length} reviews)</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="border border-gray-200 rounded-xl p-6"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {review.customerName}
                  </h3>
                  <p className="text-gray-600 text-sm">{review.service}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={
                          i < review.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }
                      >
                        ⭐
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-500 text-sm mt-1">{review.date}</p>
                </div>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

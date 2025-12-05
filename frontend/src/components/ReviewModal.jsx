import React, { useState } from "react";
import { Star, X } from "lucide-react";

const ReviewModal = ({ order, user, onClose, onSubmit }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedItem || rating === 0) {
      alert("Please select an item and provide a rating");
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({
        userId: user.id,
        orderId: order.id.toString(),
        menuItemId: selectedItem.id.toString(),
        rating,
        comment,
      });
      setRating(0);
      setComment("");
      setSelectedItem(null);
      alert("Review submitted successfully!");
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Leave a Review</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Select an item to review:</h3>
            <div className="space-y-2">
              {order.items.map((item) => (
                <button
                  key={item.cartId}
                  onClick={() => setSelectedItem(item)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    selectedItem?.cartId === item.cartId
                      ? "border-green-600 bg-green-50"
                      : "border-gray-200 hover:border-green-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{item.image}</span>
                      <div>
                        <div className="font-semibold text-gray-900">{item.name}</div>
                        {item.customization.size && (
                          <div className="text-sm text-gray-600">Size: {item.customization.size}</div>
                        )}
                      </div>
                    </div>
                    {selectedItem?.cartId === item.cartId && (
                      <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {selectedItem && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-lg font-semibold mb-3">Your Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-10 h-10 ${
                          star <= (hoveredRating || rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                  {rating > 0 && (
                    <span className="ml-2 text-lg font-semibold text-gray-700">
                      {rating} {rating === 1 ? "star" : "stars"}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-lg font-semibold mb-3">Your Review (Optional)</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us about your experience with this item..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-600 focus:outline-none min-h-32 resize-none"
                  maxLength={500}
                />
                <div className="text-right text-sm text-gray-500 mt-1">
                  {comment.length}/500 characters
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={rating === 0 || submitting}
                  className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-colors ${
                    rating === 0 || submitting
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >
                  {submitting ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;

import React, { useState } from "react";
import { Package } from "lucide-react";
import ReviewModal from "./ReviewModal";

const Orders = ({ orders, setCurrentPage, user }) => {
  const [reviewingOrder, setReviewingOrder] = useState(null);

  const handleReviewSubmit = async (reviewData) => {
    try {
      const response = await fetch("http://localhost:5247/api/Review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      return await response.json();
    } catch (error) {
      console.error("Error submitting review:", error);
      throw error;
    }
  };
  if (orders.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <Package className="w-24 h-24 mx-auto text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold mb-2">No orders yet</h2>
        <p className="text-gray-600 mb-4">Your order history will appear here</p>
        <button
          onClick={() => setCurrentPage("menu")}
          className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
        >
          Start Ordering
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Order History</h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-xl">Order #{order.id}</h3>
                <p className="text-gray-600 text-sm">{new Date(order.date).toLocaleString()}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  order.status === "Delivered"
                    ? "bg-green-100 text-green-600"
                    : order.status === "On the way"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {order.status}
              </span>
            </div>

            <div className="border-t pt-4 mb-4">
              {order.items.map((item) => (
                <div key={item.cartId} className="flex justify-between mb-2">
                  <span>
                    {item.name} {item.customization.size && `(${item.customization.size})`}
                  </span>
                  <span>${item.totalPrice.toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-1">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Delivery Fee:</span>
                <span>${order.deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span className="text-orange-500">${order.total.toFixed(2)}</span>
              </div>
            </div>

            {order.status === "Delivered" && (
              <button 
                onClick={() => setReviewingOrder(order)}
                className="mt-4 w-full border-2 border-orange-500 text-orange-500 py-2 rounded-lg font-semibold hover:bg-orange-50"
              >
                Leave a Review
              </button>
            )}
          </div>
        ))}
      </div>

      {reviewingOrder && (
        <ReviewModal
          order={reviewingOrder}
          user={user}
          onClose={() => setReviewingOrder(null)}
          onSubmit={handleReviewSubmit}
        />
      )}
    </div>
  );
};

export default Orders;

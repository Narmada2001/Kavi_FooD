import React from "react";

export default function OrderConfirmation({ order, onViewOrders, onOrderMore }) {
  // Simulate status: 0=placed, 1=preparing, 2=out, 3=delivered
  const statusStep = 1; // 1 = Preparing (simulate for now)
  const statusStages = [
    { label: "Order Placed", color: "text-green-700" },
    { label: "Preparing Your Food", color: "text-orange-500" },
    { label: "Out for Delivery", color: "text-gray-500" },
    { label: "Delivered", color: "text-gray-500" },
  ];

  function renderStageIcon(idx) {
    if (idx === 0) {
      return (
        <span className="bg-green-500 text-white rounded-full p-2 mr-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </span>
      );
    } else if (idx === 1) {
      return (
        <span className="bg-orange-400 text-white rounded-full p-2 mr-2 animate-pulse">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" />
          </svg>
        </span>
      );
    } else if (idx === 2) {
      return (
        <span className="bg-gray-300 text-white rounded-full p-2 mr-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2" />
          </svg>
        </span>
      );
    } else {
      return (
        <span className="bg-gray-300 text-white rounded-full p-2 mr-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h1l2 7h13l2-7h1" />
          </svg>
        </span>
      );
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center -m-8 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-green-100">
          {/* Celebration */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-4 shadow-lg">
              <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Order Confirmed! 🎉</h2>
            <p className="text-gray-600 text-lg">Thank you for your order. We're preparing your delicious meal!</p>
          </div>
          {/* Order Details Card */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-100 rounded-xl p-6 mb-8">
            <div className="flex flex-wrap gap-4 justify-between mb-4">
              <div className="font-semibold text-gray-700">📦 Order Number: <span className="text-green-700">#{order.id}</span></div>
              <div className="font-semibold text-gray-700">⏰ Estimated Delivery: <span className="text-green-700">{order.estimatedTime}</span></div>
            </div>
            <div className="mb-2">
              <div className="font-semibold text-gray-700 mb-1">🍕 Order Items:</div>
              <ul className="list-disc list-inside text-gray-700">
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name}
                    {item.customization?.size && <span className="ml-2 text-xs text-gray-500">[{item.customization.size}]</span>}
                    {item.customization?.extras?.length > 0 && <span className="ml-2 text-xs text-gray-500">+ {item.customization.extras.join(", ")}</span>}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-2">
              <span className="font-semibold text-gray-700">📍 Delivery Address:</span> <span className="text-gray-700">{order.deliveryAddress}</span>
            </div>
            <div className="mb-2">
              <span className="font-semibold text-gray-700">💳 Payment Method:</span> <span className="text-gray-700">{order.paymentMethod}</span>
            </div>
            <div className="flex flex-wrap gap-4 justify-between mt-4">
              <div className="font-semibold text-gray-700">Subtotal: <span className="text-green-700">${order.subtotal.toFixed(2)}</span></div>
              <div className="font-semibold text-gray-700">Delivery Fee: <span className="text-green-700">${order.deliveryFee.toFixed(2)}</span></div>
              <div className="font-bold text-lg text-green-800">Total: ${order.total.toFixed(2)}</div>
            </div>
          </div>
          {/* Order Status Timeline */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {statusStages.map((stage, idx) => (
                <div key={stage.label} className="flex items-center">
                  <div className={idx <= statusStep ? stage.color : "text-gray-400"}>{renderStageIcon(idx)}</div>
                  <span className={`font-semibold ${idx <= statusStep ? stage.color : "text-gray-400"}`}>{stage.label}</span>
                  {idx < statusStages.length - 1 && (
                    <div className={`mx-2 w-8 h-1 rounded-full ${idx < statusStep ? "bg-green-400" : "bg-gray-200"}`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <button className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all" onClick={onViewOrders}>
              View All Orders
            </button>
            <button className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all" onClick={onOrderMore}>
              Order More Food
            </button>
          </div>
          {/* Support Section */}
          <div className="bg-gradient-to-br from-green-100 to-emerald-100 border-2 border-green-200 rounded-xl p-4 text-center">
            <div className="font-semibold text-green-800 mb-1">Need help with your order?</div>
            <div className="text-gray-700">Contact our support team: <span className="font-bold">(555) 123-4567</span></div>
            <div className="text-gray-700">or email <span className="font-bold">support@foodorder.com</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

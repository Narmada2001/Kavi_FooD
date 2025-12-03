import React, { useState } from "react";
import { MapPin, CreditCard } from "lucide-react";

const Checkout = ({ cart, user, getCartTotal, calculateDeliveryFee, placeOrder }) => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [address, setAddress] = useState(user?.address || "");

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Checkout</h2>

      <div className="bg-white rounded-lg shadow p-6 mb-4">
        <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5" /> Delivery Address
        </h3>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter delivery address"
          className="w-full border-2 border-gray-300 rounded-lg p-3 mb-2"
        />
        <p className="text-sm text-gray-600">Estimated delivery: 30-45 mins</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-4">
        <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
          <CreditCard className="w-5 h-5" /> Payment Method
        </h3>
        <div className="space-y-2">
          <label className="flex items-center p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="payment"
              value="card"
              checked={paymentMethod === "card"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-3"
            />
            <span>Credit/Debit Card</span>
          </label>
          <label className="flex items-center p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="payment"
              value="cash"
              checked={paymentMethod === "cash"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-3"
            />
            <span>Cash on Delivery</span>
          </label>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-4">
        <h3 className="font-bold text-xl mb-4">Order Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal ({cart.length} items):</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee:</span>
            <span>${calculateDeliveryFee(getCartTotal()).toFixed(2)}</span>
          </div>
          <div className="border-t pt-2 flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span className="text-orange-500">${(getCartTotal() + calculateDeliveryFee(getCartTotal())).toFixed(2)}</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => placeOrder(paymentMethod, address)}
        disabled={!address}
        className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Place Order
      </button>
    </div>
  );
};

export default Checkout;

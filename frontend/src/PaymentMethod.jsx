import React, { useState } from "react";

export default function PaymentMethod({ totalAmount, onPlaceOrder, onCancel }) {
  const [paymentType, setPaymentType] = useState("card");
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePlaceOrder = () => {
    const paymentData = {
      paymentMethod: paymentType === "card" ? "Card" : "Cash on Delivery",
      deliveryAddress: `${deliveryAddress}, ${city}, ${state} ${zipCode}`,
      phoneNumber,
      ...(paymentType === "card" && {
        cardholderName,
        cardNumber: cardNumber.slice(-4),
      }),
    };
    onPlaceOrder(paymentData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 -m-8 p-8 flex items-center justify-center">
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Payment Method</h1>
        
        <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-green-100">
          {/* Total Amount */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-400 rounded-2xl p-6 mb-8 text-center">
            <div className="text-gray-600 font-medium mb-2">Total Amount</div>
            <div className="text-5xl font-bold text-green-600">${totalAmount.toFixed(2)}</div>
          </div>

          {/* Payment Type Selection */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-8">
            <div className="grid grid-cols-2 gap-4">
              <button
                className={`p-6 rounded-xl border-2 transition-all ${
                  paymentType === "card"
                    ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-500 shadow-lg"
                    : "bg-white border-gray-300 hover:border-green-300"
                }`}
                onClick={() => setPaymentType("card")}
              >
                <div className="text-4xl mb-2">💳</div>
                <div className="font-semibold text-gray-700">Card</div>
              </button>
              <button
                className={`p-6 rounded-xl border-2 transition-all ${
                  paymentType === "cash"
                    ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-500 shadow-lg"
                    : "bg-white border-gray-300 hover:border-green-300"
                }`}
                onClick={() => setPaymentType("cash")}
              >
                <div className="text-4xl mb-2">💵</div>
                <div className="font-semibold text-gray-700">Cash on Delivery</div>
              </button>
            </div>
          </div>

          {/* Card Details (only if card selected) */}
          {paymentType === "card" && (
            <div className="mb-8">
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Cardholder Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-all"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim())}
                  maxLength="19"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={expiryDate}
                    onChange={(e) => {
                      let val = e.target.value.replace(/\D/g, "");
                      if (val.length >= 2) val = val.slice(0, 2) + "/" + val.slice(2, 4);
                      setExpiryDate(val);
                    }}
                    maxLength="5"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                    maxLength="3"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Delivery Address */}
          <div className="mb-8">
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Delivery Address</label>
              <input
                type="text"
                placeholder="123 Main Street, Apt 4B"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-all"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">City</label>
              <input
                type="text"
                placeholder="New York"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-all"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">State</label>
                <input
                  type="text"
                  placeholder="NY"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">ZIP Code</label>
                <input
                  type="text"
                  placeholder="10001"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value.replace(/\D/g, ""))}
                  maxLength="5"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-all"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
              <input
                type="text"
                placeholder="+1 (234) 567-890"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Place Order Button */}
          <button
            onClick={handlePlaceOrder}
            className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

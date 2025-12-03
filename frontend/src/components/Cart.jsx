import React from "react";
import { ShoppingCart } from "lucide-react";

const Cart = ({ cart, removeFromCart, getCartTotal, calculateDeliveryFee, setCurrentPage }) => {
  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <ShoppingCart className="w-24 h-24 mx-auto text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-gray-600 mb-4">Add some delicious items to get started!</p>
        <button
          onClick={() => setCurrentPage("menu")}
          className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
        >
          Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>

      <div className="space-y-4 mb-6">
        {cart.map((item) => (
          <div key={item.cartId} className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
            <div className="text-4xl">{item.image}</div>
            <div className="flex-1">
              <h3 className="font-bold">{item.name}</h3>
              {item.customization.size && <p className="text-sm text-gray-600">Size: {item.customization.size}</p>}
              {item.customization.extras.length > 0 && (
                <p className="text-sm text-gray-600">Extras: {item.customization.extras.join(", ")}</p>
              )}
            </div>
            <div className="text-right">
              <p className="font-bold text-orange-500">${item.totalPrice.toFixed(2)}</p>
              <button
                onClick={() => removeFromCart(item.cartId)}
                className="text-red-500 text-sm hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-4">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee:</span>
            <span>${calculateDeliveryFee(getCartTotal()).toFixed(2)}</span>
          </div>
          {getCartTotal() >= 50 && <p className="text-green-600 text-sm">🎉 Free delivery unlocked!</p>}
          <div className="border-t pt-2 flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span className="text-orange-500">${(getCartTotal() + calculateDeliveryFee(getCartTotal())).toFixed(2)}</span>
          </div>
        </div>
        <button
          onClick={() => setCurrentPage("checkout")}
          className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;

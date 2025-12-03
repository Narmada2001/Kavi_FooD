import React from "react";
import { ShoppingCart, LogOut } from "lucide-react";

const Navbar = ({ user, cart, currentPage, setCurrentPage, handleLogout }) => {
  if (!user) return null;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <h1
            className="text-2xl font-bold text-orange-500 cursor-pointer"
            onClick={() => setCurrentPage("menu")}
          >
            🍔 FoodHub
          </h1>

          <div className="flex gap-4 items-center">
            <button
              onClick={() => setCurrentPage("menu")}
              className={`px-4 py-2 rounded-lg font-semibold ${
                currentPage === "menu" ? "text-orange-500" : "text-gray-600 hover:text-orange-500"
              }`}
            >
              Menu
            </button>
            <button
              onClick={() => setCurrentPage("cart")}
              className={`px-4 py-2 rounded-lg font-semibold relative ${
                currentPage === "cart" ? "text-orange-500" : "text-gray-600 hover:text-orange-500"
              }`}
            >
              <ShoppingCart className="w-5 h-5 inline" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setCurrentPage("orders")}
              className={`px-4 py-2 rounded-lg font-semibold ${
                currentPage === "orders" ? "text-orange-500" : "text-gray-600 hover:text-orange-500"
              }`}
            >
              Orders
            </button>
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-red-500"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

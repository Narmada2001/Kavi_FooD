import React from "react";
import logoImage from "../assets/logo.jpg";

const Navbar = ({ user, cart, currentPage, setCurrentPage, handleLogout }) => {
  if (!user) return null;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={logoImage} alt="Logo" className="h-10 w-10 rounded-full object-cover" />
            <h1 className="text-2xl font-bold text-green-600">
              Food Order App
            </h1>
          </div>

          <div className="flex gap-2 items-center">
            <button
              onClick={() => setCurrentPage("home")}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                currentPage === "home" 
                  ? "bg-green-600 text-white" 
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentPage("menu")}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                currentPage === "menu" 
                  ? "bg-green-600 text-white" 
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Menu
            </button>
            <button
              onClick={() => setCurrentPage("cart")}
              className={`px-6 py-2 rounded-full font-semibold transition relative ${
                currentPage === "cart" 
                  ? "bg-green-600 text-white" 
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Cart
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setCurrentPage("orders")}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                currentPage === "orders" 
                  ? "bg-green-600 text-white" 
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Orders
            </button>
            <button
              onClick={handleLogout}
              className="px-6 py-2 rounded-full font-semibold text-red-600 hover:bg-red-50 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React from "react";
import AuthForm from "../components/AuthForm";

const Home = ({ user, handleAuth, setCurrentPage }) => (
  <div className="min-h-screen bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🍔</div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">FoodHub</h1>
        <p className="text-gray-600">Delicious food delivered to your door</p>
      </div>

      {!user ? (
        <AuthForm onAuth={handleAuth} />
      ) : (
        <button
          onClick={() => setCurrentPage("menu")}
          className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
        >
          Browse Menu
        </button>
      )}
    </div>
  </div>
);

export default Home;

import React from "react";
import homeBg from "../assets/HomeBg1.jpg";
import logoImage from "../assets/logo.jpg";

const Home = ({ user, handleAuth, setCurrentPage }) => (
  <div 
    className="relative min-h-screen bg-center bg-cover"
    style={{ 
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${homeBg})`,
    }}
  >
    {/* Hero Section */}
    <div className="flex items-center justify-center min-h-screen px-4 py-12">
      <div className="max-w-3xl text-center">
        {/* Logo/Burger Icon */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center justify-center w-32 h-32 overflow-hidden bg-green-600 rounded-full shadow-2xl">
            <img src={logoImage} alt="Logo" className="object-cover w-full h-full" />
          </div>
        </div>
        
        {/* Main Heading */}
        <h1 className="mb-6 text-5xl font-bold text-white md:text-6xl lg:text-7xl">
          Welcome to <span className="text-green-400">FoodHub</span>
        </h1>
        
        {/* Subheading */}
        <p className="mb-12 text-xl font-medium text-gray-200 md:text-2xl">
          Delicious food delivered to your door
        </p>
        
        {/* CTA Button */}
        <button
          onClick={() => user ? setCurrentPage("menu") : handleAuth && handleAuth()}
          className="px-12 py-4 text-lg font-bold text-white transition-all bg-green-600 shadow-lg rounded-xl hover:bg-green-700 hover:shadow-xl"
        >
          Browse Menu Now
        </button>
      </div>
    </div>
  </div>
);

export default Home;

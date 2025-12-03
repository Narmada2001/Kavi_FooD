import React, { useState } from "react";
import logoImage from "../assets/logo.jpg";

const AuthForm = ({ onAuth }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      onAuth(email, password, isRegister);
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-green-700 to-green-900 flex items-center justify-start pl-16 sm:pl-24 lg:pl-32 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-sm sm:max-w-md">
        <div className="bg-white/95 backdrop-blur rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10">
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
              <span className="text-xl sm:text-2xl">🍔</span>
              <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">
                Kavi <span className="text-green-600">FooD</span>
              </span>
            </div>
            <h2 className="text-center text-xl sm:text-2xl font-bold text-slate-900 mb-2">
              {isRegister ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="text-center text-gray-600 text-sm">
              {isRegister ? "Join us and start your food journey" : "Sign in to continue your food journey"}
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {isRegister && (
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600 transition-all"
                  required={isRegister}
                />
              </div>
            )}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600 transition-all"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 sm:py-3.5 text-sm sm:text-base text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
              style={{ background: '#16a34a' }}
            >
              {isRegister ? "Create Account" : "Sign In"}
            </button>
          </form>
          <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-900">
            {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              className="font-semibold hover:underline transition-colors"
              style={{ color: '#16a34a' }}
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister ? "Sign in" : "Sign up now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;

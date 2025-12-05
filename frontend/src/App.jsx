import React, { useState } from "react";
import Login from "./components/Login";
import PaymentMethod from "./PaymentMethod";
import OrderConfirmation from "./OrderConfirmation";
import Orders from "./components/Orders";
import logoImage from "./assets/logo.jpg";
// Temporary minimal app while wiring components

// Mock menu items
const MOCK_MENU_ITEMS = [
  { id: 1, name: "Classic Burger", category: "Burgers", price: 12.99, image: "🍔", description: "Juicy beef patty with lettuce, tomato, and cheese", rating: 4.5, reviews: 120, inStock: true, options: { sizes: ["Small", "Medium", "Large"], extras: ["Extra Cheese", "Bacon", "Avocado"] } },
  { id: 2, name: "Margherita Pizza", category: "Pizza", price: 15.99, image: "🍕", description: "Fresh mozzarella, tomatoes, and basil", rating: 4.8, reviews: 200, inStock: true, options: { sizes: ["Small", "Medium", "Large"], extras: ["Extra Cheese", "Olives", "Mushrooms"] } },
  { id: 3, name: "Caesar Salad", category: "Salads", price: 9.99, image: "🥗", description: "Crisp romaine with parmesan and croutons", rating: 4.3, reviews: 85, inStock: true, options: { extras: ["Grilled Chicken", "Extra Dressing"] } },
  { id: 4, name: "Chicken Wings", category: "Appetizers", price: 11.99, image: "🍗", description: "Spicy buffalo wings with ranch dip", rating: 4.6, reviews: 150, inStock: false, options: { sizes: ["6 pieces", "12 pieces", "24 pieces"] } },
  { id: 5, name: "Pasta Carbonara", category: "Pasta", price: 13.99, image: "🍝", description: "Creamy pasta with bacon and parmesan", rating: 4.7, reviews: 95, inStock: true, options: { extras: ["Extra Bacon", "Garlic Bread"] } },
  { id: 6, name: "Fish Tacos", category: "Mexican", price: 10.99, image: "🌮", description: "Grilled fish with cabbage slaw", rating: 4.4, reviews: 110, inStock: true, options: { sizes: ["2 tacos", "3 tacos", "4 tacos"] } },
];

const App = () => {
  const [currentPage, setCurrentPage] = useState("login");
  const [user, setUser] = useState(null);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);
  const [customization, setCustomization] = useState({ size: "", extras: [] });

  const categories = ["All", ...new Set(MOCK_MENU_ITEMS.map((item) => item.category))];

  const handleAuth = (email, password, isRegister) => {
    const mockUser = { id: 1, name: email.split("@")[0], email, address: "123 Main St" };
    setUser(mockUser);
    if (isRegister) {
      setSignupSuccess(true);
      setCurrentPage("signup");
    } else {
      setCurrentPage("menu");
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]);
    setCurrentPage("home");
  };

  const addToCart = (item, customization) => {
    const cartItem = { ...item, cartId: Date.now(), customization, totalPrice: calculateItemPrice(item, customization) };
    setCart([...cart, cartItem]);
    setSelectedItem(null);
    setCustomization({ size: "", extras: [] });
  };

  const removeFromCart = (cartId) => setCart(cart.filter((item) => item.cartId !== cartId));

  const calculateItemPrice = (item, custom) => {
    let price = item.price;
    if (custom.size === "Large") price += 3;
    if (custom.size === "Medium") price += 1.5;
    price += custom.extras.length * 1.5;
    return price;
  };

  const getCartTotal = () => cart.reduce((sum, item) => sum + item.totalPrice, 0);

  const calculateDeliveryFee = (subtotal) => (subtotal >= 50 ? 0 : subtotal >= 30 ? 2.99 : 4.99);

  const [lastOrder, setLastOrder] = useState(null);
  const placeOrder = (paymentData) => {
    const subtotal = getCartTotal();
    const deliveryFee = calculateDeliveryFee(subtotal);
    const total = subtotal + deliveryFee;

    const order = {
      id: Date.now(),
      items: [...cart],
      subtotal,
      deliveryFee,
      total,
      status: "Pending",
      paymentMethod: paymentData.paymentMethod,
      deliveryAddress: paymentData.deliveryAddress,
      phoneNumber: paymentData.phoneNumber,
      date: new Date().toISOString(),
      estimatedTime: "30-45 mins",
    };

    setOrders([order, ...orders]);
    setCart([]);
    setLastOrder(order);
    setCurrentPage("orderConfirmation");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {currentPage !== "login" && currentPage !== "signup" && (
        <header className="sticky top-0 z-20 bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Food Order App
              </h1>
              <nav className="flex gap-2">
                <button 
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${currentPage === "home" ? "bg-green-600 text-white shadow-lg" : "text-gray-700 hover:bg-green-50"}`} 
                  onClick={() => setCurrentPage("home")}
                >
                  Home
                </button>
                <button 
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${currentPage === "menu" ? "bg-green-600 text-white shadow-lg" : "text-gray-700 hover:bg-green-50"}`} 
                  onClick={() => setCurrentPage("menu")}
                >
                  Menu
                </button>
                <button 
                  className={`px-4 py-2 rounded-lg font-medium transition-all relative ${currentPage === "cart" ? "bg-green-600 text-white shadow-lg" : "text-gray-700 hover:bg-green-50"}`} 
                  onClick={() => setCurrentPage("cart")}
                >
                  Cart
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </button>
                <button 
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${currentPage === "orders" ? "bg-green-600 text-white shadow-lg" : "text-gray-700 hover:bg-green-50"}`} 
                  onClick={() => setCurrentPage("orders")}
                >
                  Orders
                </button>
                {user && (
                  <button 
                    className="px-4 py-2 rounded-lg font-medium text-red-600 hover:bg-red-50 transition-all" 
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                )}
              </nav>
            </div>
          </div>
        </header>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentPage === "login" && (
          <Login
            onSubmit={(email, password) => handleAuth(email, password, false)}
            onSignup={() => setCurrentPage("signup")}
          />
        )}
        {currentPage === "home" && (
          <div className="py-8 md:py-16">
            {/* Hero Section */}
            <div className="min-h-screen flex items-center justify-center">
              <div className="max-w-4xl mx-auto text-center px-4">
                <div className="flex flex-col items-center mb-8">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-6 text-6xl md:text-7xl shadow-2xl">🍔</div>
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-4">
                    Welcome to <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">FoodHub</span>
                  </h2>
                  <p className="text-xl md:text-2xl text-gray-600 mb-12">Delicious food delivered to your door</p>
                  <button 
                    className="px-10 py-5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                    onClick={() => setCurrentPage("menu")}
                  >
                    Browse Menu Now
                  </button>
                </div>
              </div>
            </div>

            {/* About Us Section */}
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-green-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
              <div className="max-w-5xl mx-auto text-center py-16">
                <div className="mb-8">
                  <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full font-semibold text-sm mb-4">ABOUT US</span>
                  <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Who We Are</h3>
                </div>
                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-green-100">
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                    FoodHub is your go-to platform for fast, fresh, and delicious meals delivered right to your doorstep. 
                    We partner with the best local restaurants to bring you a wide variety of cuisines, all in one place.
                  </p>
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                    Our mission is to connect food lovers with amazing meals while supporting local businesses. 
                    Whether you're craving comfort food, healthy options, or international flavors, we've got you covered.
                  </p>
                </div>
              </div>
            </div>

            {/* Our Services Section */}
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto text-center py-12 lg:py-16">
                <div className="mb-8 lg:mb-12">
                  <span className="inline-block px-4 py-2 bg-green-600 text-white rounded-full font-semibold text-sm mb-4">OUR SERVICES</span>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 mb-4 lg:mb-6">What We Offer</h3>
                  <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">Experience seamless food ordering with our premium features</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8 xl:gap-10">
                  {[
                    { icon: "⚡", title: "Lightning-Fast Delivery", desc: "Get your food delivered in 30-45 minutes" },
                    { icon: "📍", title: "Real-Time Tracking", desc: "Track your order from kitchen to doorstep" },
                    { icon: "🎨", title: "Customizable Menu", desc: "Personalize your meal just the way you like it" },
                    { icon: "💳", title: "Secure Payments", desc: "Multiple safe and easy payment options" },
                    { icon: "🎁", title: "Exclusive Deals", desc: "Special discounts and offers for members" },
                    { icon: "📱", title: "Easy Mobile App", desc: "Order on the go with our mobile-friendly platform" },
                  ].map((service, idx) => (
                    <div key={idx} className="bg-white rounded-2xl lg:rounded-3xl p-6 md:p-8 lg:p-10 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all border-2 border-green-100">
                      <div className="text-4xl md:text-5xl lg:text-6xl mb-3 md:mb-4">{service.icon}</div>
                      <h4 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-2 md:mb-3">{service.title}</h4>
                      <p className="text-sm md:text-base lg:text-lg text-gray-600">{service.desc}</p>
                    </div>
                  ))}
                </div>
                <button 
                  className="mt-10 lg:mt-16 px-8 md:px-10 lg:px-12 py-4 md:py-5 lg:py-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-base md:text-lg lg:text-xl rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                  onClick={() => setCurrentPage("menu")}
                >
                  Start Ordering Now
                </button>
              </div>
            </div>
          </div>
        )}

        {currentPage === "signup" && (
          <div className="min-h-screen flex items-center justify-center -m-8 p-4 sm:p-6 lg:p-8" style={{ background: '#16a34a' }}>
            <div className="w-full max-w-sm sm:max-w-md lg:max-w-2xl">
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10">
                {!signupSuccess ? (
                  <>
                    <div className="text-center mb-6 sm:mb-8">
                      <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-3 sm:mb-4" style={{ background: '#6b7c6b' }}>
                        <svg className="w-7 h-7 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Create your account</h2>
                      <p className="text-sm sm:text-base text-gray-600">Delicious food deliver to your door</p>
                    </div>
                    <SignupForm onSubmit={(payload) => handleAuth(payload.email, payload.password, true)} />
                    <div className="mt-6 text-center text-sm text-gray-600">
                      Already have an account? {" "}
                      <button className="font-semibold text-green-600 hover:text-green-700" onClick={() => setCurrentPage("login")}>
                        Login
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-center mb-8">
                      <div className="flex items-center justify-center gap-2 mb-6">
                        <div className="relative">
                          <div className="w-16 h-16 bg-white rounded-lg shadow-md flex items-center justify-center overflow-hidden">
                            <img src={logoImage} alt="Logo" className="w-full h-full object-cover" />
                          </div>
                          <div className="absolute -right-2 -bottom-2 w-8 h-8 bg-gray-700 rounded-md transform rotate-12"></div>
                        </div>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                        <span style={{ color: '#16a34a' }}>Kavi</span> <span className="text-gray-900">FooD</span>
                      </h2>
                      <p className="text-gray-600 text-sm sm:text-base mb-8">Delicious food delivered to your door</p>
                    </div>
                    <div className="rounded-2xl border-2 border-green-600 bg-green-50 text-gray-900 p-5 text-center font-medium mb-8">
                      Account created successfully! Welcome to <span style={{ color: '#16a34a' }} className="font-bold">Kavi FooD</span> 🎉
                    </div>
                    <button 
                      className="w-full px-6 py-4 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                      style={{ background: '#16a34a' }}
                      onClick={() => setCurrentPage("menu")}
                    >
                      Browse Menu
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {currentPage === "menu" && (
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-2">Our Menu</h2>
                <p className="text-gray-600">Discover our delicious selection</p>
              </div>
              <select 
                className="px-4 py-3 border-2 border-green-200 rounded-xl focus:outline-none focus:border-green-500 bg-white shadow-sm font-medium" 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_MENU_ITEMS.filter(i => selectedCategory === "All" || i.category === selectedCategory).map((item) => (
                <div 
                  key={item.id} 
                  className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all border-2 ${item.inStock ? "border-green-100" : "border-gray-200 opacity-75"}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-5xl">{item.image}</div>
                    {!item.inStock && (
                      <span className="px-3 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded-full">
                        Out of Stock
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                  <div className="flex items-center mb-4">
                    <div className="flex items-center text-yellow-500 mr-2">
                      {"★".repeat(Math.floor(item.rating))}
                      {"☆".repeat(5 - Math.floor(item.rating))}
                    </div>
                    <span className="text-xs text-gray-500">({item.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-green-600">${item.price.toFixed(2)}</span>
                    <button 
                      className={`px-5 py-2.5 rounded-xl font-semibold transition-all ${
                        item.inStock 
                          ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md hover:shadow-lg transform hover:scale-105" 
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                      onClick={() => item.inStock && setSelectedItem(item)}
                      disabled={!item.inStock}
                    >
                      Order Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentPage === "cart" && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h2>
            {cart.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
                <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <p className="text-xl text-gray-600 mb-6">Your cart is empty</p>
                <button 
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all"
                  onClick={() => setCurrentPage("menu")}
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {cart.map((ci) => (
                  <div key={ci.cartId} className="bg-white rounded-2xl shadow p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{ci.image}</div>
                      <div>
                        <div className="font-bold text-lg text-gray-900">{ci.name}</div>
                        {ci.customization.size && (
                          <div className="text-sm text-gray-600">Size: {ci.customization.size}</div>
                        )}
                        {ci.customization.extras.length > 0 && (
                          <div className="text-sm text-gray-600">
                            Extras: {ci.customization.extras.join(", ")}
                          </div>
                        )}
                        <div className="text-xl font-bold text-green-600 mt-1">
                          ${ci.totalPrice.toFixed(2)}
                        </div>
                      </div>
                    </div>
                    <button 
                      className="px-6 py-2 border-2 border-red-300 text-red-600 rounded-lg font-semibold bg-white hover:bg-red-50 transition-all" 
                      onClick={() => removeFromCart(ci.cartId)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-300 mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700 font-medium">Subtotal</span>
                    <span className="text-lg font-bold">${getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700 font-medium">Delivery Fee</span>
                    <span className="text-lg font-bold">
                      {calculateDeliveryFee(getCartTotal()) === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `$${calculateDeliveryFee(getCartTotal()).toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <hr className="my-2 border-green-300" />
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-gray-900">Total</span>
                    <span className="text-3xl font-extrabold text-green-600">
                      ${(getCartTotal() + calculateDeliveryFee(getCartTotal())).toFixed(2)}
                    </span>
                  </div>
                  <button 
                    className="w-full mt-2 px-6 py-4 bg-green-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
                    onClick={() => setCurrentPage("payment")}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {currentPage === "payment" && (
          <PaymentMethod
            totalAmount={getCartTotal() + calculateDeliveryFee(getCartTotal())}
            onPlaceOrder={placeOrder}
            onCancel={() => setCurrentPage("cart")}
          />
        )}

        {currentPage === "orderConfirmation" && lastOrder && (
          <OrderConfirmation
            order={lastOrder}
            onViewOrders={() => setCurrentPage("orders")}
            onOrderMore={() => setCurrentPage("menu")}
          />
        )}

        {currentPage === "orders" && (
          <Orders orders={orders} setCurrentPage={setCurrentPage} user={user} />
        )}

        {selectedItem && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm grid place-items-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-2xl transform transition-all">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Customize Your Order</h3>
                  <p className="text-gray-600 mt-1">{selectedItem.name}</p>
                </div>
                <div className="text-5xl">{selectedItem.image}</div>
              </div>
              
              <div className="space-y-6">
                {selectedItem.options?.sizes && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Choose Size</label>
                    <div className="grid grid-cols-3 gap-3">
                      {selectedItem.options.sizes.map((s) => (
                        <button
                          key={s}
                          className={`px-4 py-3 rounded-xl border-2 font-medium transition-all ${
                            customization.size === s
                              ? "border-green-600 bg-green-50 text-green-700"
                              : "border-gray-200 hover:border-green-300"
                          }`}
                          onClick={() => setCustomization({ ...customization, size: s })}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {selectedItem.options?.extras && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Add Extras (+$1.50 each)</label>
                    <div className="grid grid-cols-2 gap-3">
                      {selectedItem.options.extras.map((e) => {
                        const checked = customization.extras.includes(e);
                        return (
                          <button
                            key={e}
                            className={`px-4 py-3 rounded-xl border-2 font-medium transition-all ${
                              checked
                                ? "border-green-600 bg-green-50 text-green-700"
                                : "border-gray-200 hover:border-green-300"
                            }`}
                            onClick={() =>
                              setCustomization({
                                ...customization,
                                extras: checked
                                  ? customization.extras.filter((x) => x !== e)
                                  : [...customization.extras, e],
                              })
                            }
                          >
                            {checked && "✓ "}
                            {e}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
                
                <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium">Estimated Price</span>
                    <span className="text-2xl font-bold text-green-600">
                      ${calculateItemPrice(selectedItem, customization).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex items-center gap-3">
                <button
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
                  onClick={() => {
                    setSelectedItem(null);
                    setCustomization({ size: "", extras: [] });
                  }}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                  onClick={() => addToCart(selectedItem, customization)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      {currentPage !== "login" && currentPage !== "signup" && (
        <footer className="mt-16 bg-gradient-to-br from-green-800 to-emerald-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
              <div>
                <div className="font-bold text-lg mb-4">Contact Us</div>
                <ul className="space-y-2 text-green-100 text-sm">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    support@foodorder.com
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    (555) 123-4567
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    123 Food Street, Tasty City
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-green-700 text-center text-green-200 text-sm">
              © {new Date().getFullYear()} Food Order App. All rights reserved. Made with ❤️ for food lovers.
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;

// Inline login form component
function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(email, password);
      }}
    >
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
        <input
          type="email"
          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition-colors"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:border-green-500 transition-colors"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>
      </div>
      <button
        type="submit"
        className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
      >
        Sign In
      </button>
    </form>
  );
}

// Inline signup form component
function SignupForm({ onSubmit }) {
  const [fullName, setFullName] = useState("John Doe");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!fullName.trim()) e.fullName = "Full name is required";
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Enter a valid email";
    if (!phone.trim()) e.phone = "Phone is required";
    if (!address.trim()) e.address = "Delivery address is required";
    if (password.length < 6) e.password = "Password must be at least 6 characters";
    if (password !== confirmPassword) e.confirmPassword = "Passwords do not match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ fullName, email, phone, address, password });
  };

  const inputClass = "w-full border border-gray-200 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3.5 bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:border-green-600 focus:ring-green-600 transition-colors text-xs sm:text-sm";
  const labelClass = "block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5 sm:mb-2";
  const errorClass = "mt-1 text-xs text-red-600";

  return (
    <form className="space-y-3 sm:space-y-4 lg:space-y-5" onSubmit={handleSubmit}>
      <div>
        <label className={labelClass}>Full Name *</label>
        <input className={inputClass} placeholder="ABC Perera" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        {errors.fullName && <div className={errorClass}>{errors.fullName}</div>}
      </div>
      <div>
        <label className={labelClass}>Email *</label>
        <input type="email" className={inputClass} placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        {errors.email && <div className={errorClass}>{errors.email}</div>}
      </div>
      <div>
        <label className={labelClass}>Phone Number *</label>
        <input className={inputClass} placeholder="(+94) 77 123 4567" value={phone} onChange={(e) => setPhone(e.target.value)} />
        {errors.phone && <div className={errorClass}>{errors.phone}</div>}
      </div>
      <div>
        <label className={labelClass}>Delivery Address *</label>
        <input className={inputClass} placeholder="123, Street, Welipanna Rd, Mathugama" value={address} onChange={(e) => setAddress(e.target.value)} />
        {errors.address && <div className={errorClass}>{errors.address}</div>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label className={labelClass}>Password *</label>
          <input type="password" className={inputClass} placeholder="•••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
          {errors.password && <div className={errorClass}>{errors.password}</div>}
        </div>
        <div>
          <label className={labelClass}>Confirm Password *</label>
          <input type="password" className={inputClass} placeholder="•••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          {errors.confirmPassword && <div className={errorClass}>{errors.confirmPassword}</div>}
        </div>
      </div>
      <button type="submit" className="w-full px-4 sm:px-6 py-3 sm:py-4 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all text-sm sm:text-base" style={{ background: '#16a34a' }}>
        Create Account
      </button>
    </form>
  );
}


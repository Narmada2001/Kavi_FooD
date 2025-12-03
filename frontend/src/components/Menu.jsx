import React from "react";
import { Star } from "lucide-react";

const Menu = ({ menuItems, selectedCategory, setSelectedCategory, categories, setSelectedItem }) => {
  const filteredItems = selectedCategory === "All" ? menuItems : menuItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              selectedCategory === cat ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
            <div className="p-6">
              <div className="text-6xl mb-4 text-center">{item.image}</div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-xl text-gray-800">{item.name}</h3>
                {!item.inStock && <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs">Out of Stock</span>}
              </div>
              <p className="text-gray-600 text-sm mb-3">{item.description}</p>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 text-sm font-semibold">{item.rating}</span>
                </div>
                <span className="text-gray-500 text-sm">({item.reviews} reviews)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-orange-500">${item.price}</span>
                <button
                  onClick={() => setSelectedItem(item)}
                  disabled={!item.inStock}
                  className={`px-4 py-2 rounded-lg font-semibold ${
                    item.inStock ? "bg-orange-500 text-white hover:bg-orange-600" : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {item.inStock ? "Customize" : "Unavailable"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;

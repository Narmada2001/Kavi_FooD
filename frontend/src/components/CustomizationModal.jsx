import React from "react";

const CustomizationModal = ({ selectedItem, customization, setCustomization, addToCart, close }) => {
  if (!selectedItem) return null;

  const calculateItemPrice = (item, custom) => {
    let price = item.price;
    if (custom.size === "Large") price += 3;
    if (custom.size === "Medium") price += 1.5;
    price += custom.extras.length * 1.5;
    return price;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Customize Your Order</h2>
        <div className="text-5xl mb-4 text-center">{selectedItem.image}</div>
        <h3 className="font-bold text-xl mb-2">{selectedItem.name}</h3>

        {selectedItem.options.sizes && (
          <div className="mb-4">
            <label className="block font-semibold mb-2">Size:</label>
            <div className="flex gap-2">
              {selectedItem.options.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setCustomization({ ...customization, size })}
                  className={`flex-1 py-2 rounded-lg border-2 ${
                    customization.size === size ? "border-orange-500 bg-orange-50" : "border-gray-300"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedItem.options.extras && (
          <div className="mb-4">
            <label className="block font-semibold mb-2">Extras (+$1.50 each):</label>
            <div className="space-y-2">
              {selectedItem.options.extras.map((extra) => (
                <label key={extra} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={customization.extras.includes(extra)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCustomization({ ...customization, extras: [...customization.extras, extra] });
                      } else {
                        setCustomization({ ...customization, extras: customization.extras.filter((x) => x !== extra) });
                      }
                    }}
                    className="mr-2"
                  />
                  {extra}
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="border-t pt-4 mb-4">
          <div className="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span className="text-orange-500">${calculateItemPrice(selectedItem, customization).toFixed(2)}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={close}
            className="flex-1 py-2 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => addToCart(selectedItem, customization)}
            className="flex-1 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomizationModal;

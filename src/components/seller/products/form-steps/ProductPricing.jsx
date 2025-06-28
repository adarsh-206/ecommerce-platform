import React from "react";

const ProductPricing = ({
  form,
  handlePriceChange,
  addPriceSize,
  removePriceSize,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block font-medium mb-2 text-gray-700">
          Price By Size <span className="text-red-500">*</span>
        </label>
        <p className="text-xs text-gray-500 mb-3">
          Set pricing for different product sizes or variants
        </p>

        {form.priceBySize.map((p, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-lg p-4 mb-3 bg-gray-50"
          >
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Size/Variant <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Small, Medium, 500ml"
                  value={p.size}
                  onChange={(e) => handlePriceChange(i, "size", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-rose-300 focus:border-rose-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Currency
                </label>
                <select
                  value={p.currency}
                  onChange={(e) =>
                    handlePriceChange(i, "currency", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-1 focus:ring-rose-300 focus:border-rose-200"
                >
                  <option value="INR">INR</option>
                  <option value="USD">USD</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Original Price <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  placeholder="0.00"
                  value={p.originalPrice}
                  onChange={(e) =>
                    handlePriceChange(i, "originalPrice", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-rose-300 focus:border-rose-200"
                />
                <p className="text-xs text-gray-500 mt-1">MRP or list price</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Purchase Price <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  placeholder="0.00"
                  value={p.purchasePrice}
                  onChange={(e) =>
                    handlePriceChange(i, "purchasePrice", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-rose-300 focus:border-rose-200"
                />
                <p className="text-xs text-gray-500 mt-1">Your cost price</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Selling Price <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  placeholder="0.00"
                  value={p.sellingPrice}
                  onChange={(e) =>
                    handlePriceChange(i, "sellingPrice", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-rose-300 focus:border-rose-200"
                />
                <p className="text-xs text-gray-500 mt-1">Customer pays this</p>
              </div>
            </div>

            {form.priceBySize.length > 1 && (
              <button
                type="button"
                onClick={() => removePriceSize(i)}
                className="mt-3 text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Remove this size
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addPriceSize}
          className="text-rose-600 hover:text-rose-800 font-medium text-sm"
        >
          + Add another size/variant
        </button>
      </div>
    </div>
  );
};

export default ProductPricing;

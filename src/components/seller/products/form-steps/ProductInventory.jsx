"use client";

import React from "react";
import ColorCodes from "../color-codes/ColorCodes";
import { X } from "lucide-react";

const ProductInventory = ({ form, setForm, handleChange }) => {
  const handleAddColor = ({ name, hexCode }) => {
    hexCode = hexCode.toLowerCase();
    setForm((prevForm) => {
      const colors = prevForm.colors || [];
      const exists = colors.some((c) => c.hexCode === hexCode);
      if (exists) return prevForm;
      return {
        ...prevForm,
        colors: [...colors, { name, hexCode }],
      };
    });
  };

  const handleRemoveColor = (hexCode) => {
    setForm((prevForm) => ({
      ...prevForm,
      colors: prevForm.colors.filter((c) => c.hexCode !== hexCode),
    }));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1 text-gray-700">
            Stock Quantity <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            min={0}
            name="stock.quantity"
            value={form.stock.quantity}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-rose-300 focus:border-rose-200"
            placeholder="0"
          />
          <p className="text-xs text-gray-500 mt-1">
            Total available inventory
          </p>
        </div>
        <div>
          <label className="block font-medium mb-1 text-gray-700">
            Low Stock Alert
          </label>
          <input
            type="number"
            min={0}
            name="stock.lowStockThreshold"
            value={form.stock.lowStockThreshold}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-rose-300 focus:border-rose-200"
            placeholder="5"
          />
          <p className="text-xs text-gray-500 mt-1">
            Alert when stock falls below this
          </p>
        </div>
      </div>

      <div>
        <label className="block font-medium mb-2 text-gray-700">
          Available Colors
        </label>
        <p className="text-xs text-gray-500 mb-3">
          Click a color to add it to your product
        </p>
        <ColorCodes
          onSelect={handleAddColor}
          selected={form.colors.map((c) => c.hexCode.toLowerCase())}
        />
      </div>

      {form.colors?.length > 0 && (
        <div>
          <p className="text-sm font-medium mb-2 text-gray-700">
            Selected Colors:
          </p>
          <div className="flex flex-wrap gap-2">
            {form.colors.map(({ hexCode, name }, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded-full border border-gray-300"
                  style={{ backgroundColor: hexCode }}
                />
                <span className="text-sm text-gray-700">{name}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveColor(hexCode)}
                  className="text-red-500 hover:text-red-600"
                  title="Remove"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductInventory;

"use client";

import apiService from "@/app/utils/apiService";
import { useEffect, useRef, useState } from "react";
import { Plus, X, Trash2 } from "lucide-react";

export default function ColorCodes({ onSelect, selected = [] }) {
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newColor, setNewColor] = useState({ name: "", hexCode: "" });
  const hasFetched = useRef(false);

  const fetchColors = async () => {
    try {
      const response = await apiService.get("/colors/", {}, true);
      setColors(response.data || []);
    } catch (err) {
      console.error("Failed to fetch colors:", err);
      setError("Failed to load colors.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddNewColor = async () => {
    try {
      const { name, hexCode } = newColor;
      if (!name || !hexCode) return;
      await apiService.post("/colors/", { name, hexCode }, true);
      setShowModal(false);
      setNewColor({ name: "", hexCode: "" });
      fetchColors();
    } catch (err) {
      console.error("Error adding color:", err);
    }
  };

  const handleDeleteColor = async (color) => {
    const confirmed = window.confirm(`Delete color "${color.name}"?`);
    if (!confirmed) return;

    try {
      await apiService.delete(`/colors/${color._id}`, {}, true);
      fetchColors(); // refresh list
    } catch (err) {
      console.error("Error deleting color:", err);
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      fetchColors();
      hasFetched.current = true;
    }
  }, []);

  if (loading) return <p className="p-4">Loading colors...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-2 space-y-4">
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-1 text-sm text-rose-500 border border-rose-300 px-2 py-1 rounded hover:bg-rose-50"
      >
        <Plus className="w-4 h-4" />
        Add New Color
      </button>

      <div className="flex flex-wrap gap-2">
        {colors.map((color) => {
          const isSelected = selected.includes(color.hexCode.toLowerCase());
          return (
            <div className="relative group" key={color?._id}>
              <div
                className={`w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center transition ring-offset-2 ${
                  isSelected ? "ring-2 ring-rose-400" : ""
                }`}
                style={{ backgroundColor: color.hexCode }}
                onClick={() => onSelect?.(color)}
              >
                {/* Delete icon (appears on hover) */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteColor(color);
                  }}
                  className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 bg-white rounded-full p-0.5 shadow hover:bg-red-100 opacity-0 group-hover:opacity-100 transition"
                  title="Delete"
                >
                  <Trash2 className="w-3 h-3 text-red-500" />
                </button>
              </div>

              {/* Tooltip */}
              <div className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-20 pointer-events-none">
                {color.name} ({color.hexCode})
              </div>
            </div>
          );
        })}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="relative bg-white p-6 rounded-lg shadow-xl w-full max-w-sm space-y-4">
            {/* Close Icon */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Heading */}
            <h2 className="text-lg text-center text-gray-800 font-semibold">
              Add New Color
            </h2>

            {/* Color Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Color Name
              </label>
              <input
                type="text"
                value={newColor.name}
                onChange={(e) =>
                  setNewColor({ ...newColor, name: e.target.value })
                }
                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:ring-rose-400 focus:border-rose-400"
              />
            </div>

            {/* Hex Code Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hex Code
              </label>
              <input
                type="text"
                value={newColor.hexCode}
                onChange={(e) =>
                  setNewColor({ ...newColor, hexCode: e.target.value })
                }
                placeholder="#FF0000"
                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:ring-rose-400 focus:border-rose-400"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                onClick={handleAddNewColor}
                className="w-full bg-rose-500 text-white px-4 py-2 rounded-md text-sm hover:bg-rose-600 transition"
              >
                Add Color
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// components/ProductForm.jsx
import { useState, useEffect } from "react";

export default function ProductForm({ product, categories, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    short_desc: "",
    long_desc: "",
    main_image: "",
    extra_images: [],
    price: "",
    sale_price: "",
    stock: "",
    category: "",
    subcategory: "",
    tags: "",
    featured: false,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        tags: product.tags.join(", "),
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleImageChange = (index, value) => {
    const updated = [...formData.extra_images];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, extra_images: updated }));
  };

  const handleAddImage = () => {
    setFormData((prev) => ({
      ...prev,
      extra_images: [...prev.extra_images, ""],
    }));
  };

  const handleRemoveImage = (index) => {
    const updated = formData.extra_images.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, extra_images: updated }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      tags: formData.tags.split(",").map((tag) => tag.trim()),
    };
    onSave(finalData);
  };

  const subcategories =
    categories.find((cat) => cat.id === formData.category)?.subcategories || [];

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white shadow rounded-lg space-y-6"
    >
      <h2 className="text-2xl font-semibold text-indigo-600">
        {product ? "Edit Product" : "Add Product"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Product Name"
        />
        <input
          name="short_desc"
          value={formData.short_desc}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Short Description"
        />
        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Price"
        />
        <input
          name="sale_price"
          type="number"
          value={formData.sale_price || ""}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Sale Price (Optional)"
        />
        <input
          name="stock"
          type="number"
          value={formData.stock}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Stock"
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <select
          name="subcategory"
          value={formData.subcategory}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Select Subcategory</option>
          {subcategories.map((sub) => (
            <option key={sub.id} value={sub.id}>
              {sub.name}
            </option>
          ))}
        </select>
        <input
          name="main_image"
          value={formData.main_image}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Main Image URL"
        />
      </div>

      <div>
        <label className="block text-indigo-700 mb-2">Extra Images</label>
        {formData.extra_images.map((url, index) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <input
              value={url}
              onChange={(e) => handleImageChange(index, e.target.value)}
              className="border rounded px-3 py-2 flex-1 border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Image URL"
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="text-red-600 hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddImage}
          className="text-indigo-600 hover:underline mt-2"
        >
          Add Image
        </button>
      </div>

      <textarea
        name="long_desc"
        value={formData.long_desc}
        onChange={handleChange}
        className="border rounded px-3 py-2 w-full border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        rows={4}
        placeholder="Long Description"
      />

      <input
        name="tags"
        value={formData.tags}
        onChange={handleChange}
        className="border rounded px-3 py-2 w-full border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Tags (comma-separated)"
      />

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="featured"
          checked={formData.featured}
          onChange={handleChange}
          className="accent-indigo-600"
        />
        <label className="text-indigo-700">Featured Product</label>
      </div>

      <div className="flex gap-4 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Save Product
        </button>
      </div>
    </form>
  );
}

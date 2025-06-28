import React from "react";

const ProductGeneralInfo = ({
  form,
  handleChange,
  categories,
  getSubcategories,
  setForm,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block font-medium mb-1 text-gray-700">
          Product Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          minLength={3}
          className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-rose-300 focus:border-rose-200"
          placeholder="Enter the product name (min 3 characters)"
        />
        <p className="text-xs text-gray-500 mt-1">
          This will be displayed as the main product title
        </p>
      </div>

      <div>
        <label className="block font-medium mb-1 text-gray-700">
          Short Description <span className="text-red-500">*</span>
        </label>
        <textarea
          name="description.short"
          value={form.description.short}
          onChange={handleChange}
          maxLength={255}
          rows={2}
          className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-rose-300 focus:border-rose-200"
          placeholder="Brief product summary for search results and cards"
        />
        <p className="text-xs text-gray-500 mt-1">
          Appears in product listings and search results (max 255 chars)
        </p>
      </div>

      <div>
        <label className="block font-medium mb-1 text-gray-700">
          Long Description <span className="text-red-500">*</span>
        </label>
        <textarea
          name="description.long"
          value={form.description.long}
          onChange={handleChange}
          rows={3}
          className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-rose-300 focus:border-rose-200"
          placeholder="Detailed product description with features and benefits"
        />
        <p className="text-xs text-gray-500 mt-1">
          Detailed description shown on product page
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1 text-gray-700">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            name="category"
            value={form.category}
            onChange={(e) => {
              handleChange(e);
              setForm((f) => ({ ...f, subCategory: "" }));
            }}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-1 focus:ring-rose-300 focus:border-rose-200"
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Main product category for organization
          </p>
        </div>

        {form.category && (
          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Subcategory
            </label>
            <select
              name="subCategory"
              value={form.subCategory}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-1 focus:ring-rose-300 focus:border-rose-200"
            >
              <option value="">Select subcategory</option>
              {getSubcategories().map((subcat) => (
                <option key={subcat.id} value={subcat.id}>
                  {subcat.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Specific product subcategory
            </p>
          </div>
        )}
      </div>

      <div>
        <label className="block font-medium mb-1 text-gray-700">Brand</label>
        <input
          type="text"
          name="brand"
          value={form.brand}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-rose-300 focus:border-rose-200"
          placeholder="Product brand or manufacturer"
        />
        <p className="text-xs text-gray-500 mt-1">
          Brand name for filtering and customer trust
        </p>
      </div>
    </div>
  );
};

export default ProductGeneralInfo;

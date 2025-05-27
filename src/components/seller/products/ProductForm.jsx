import { useState, useEffect } from "react";

export default function ProductForm({ product, categories, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    description: {
      short: "",
      long: "",
    },
    priceBySize: [
      {
        size: "",
        originalPrice: "",
        purchasePrice: "",
        sellingPrice: "",
        currency: "INR",
      },
    ],
    stock: {
      quantity: "",
      lowStockThreshold: 5,
    },
    category: "",
    subCategory: "",
    brand: "",
    tags: "",
    sizes: "",
    colors: "",
    weight: {
      value: "",
      unit: "g",
    },
    dimensions: {
      width: "",
      height: "",
      depth: "",
      unit: "cm",
    },
    images: {
      main: {
        url: "",
        altText: "",
      },
      extras: [],
    },
    attributes: [],
    featured: "",
  });

  const [step, setStep] = useState(1);

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        tags: product.tags.join(", "),
        sizes: product.sizes.join(", "),
        colors: product.colors.join(", "),
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePriceSizeChange = (index, field, value) => {
    const updated = [...formData.priceBySize];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, priceBySize: updated }));
  };

  const addPriceSize = () => {
    setFormData((prev) => ({
      ...prev,
      priceBySize: [
        ...prev.priceBySize,
        {
          size: "",
          originalPrice: "",
          purchasePrice: "",
          sellingPrice: "",
          currency: "INR",
        },
      ],
    }));
  };

  const removePriceSize = (index) => {
    const updated = formData.priceBySize.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, priceBySize: updated }));
  };

  const handleExtraImageChange = (index, field, value) => {
    const updated = [...formData.images.extras];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({
      ...prev,
      images: { ...prev.images, extras: updated },
    }));
  };

  const addExtraImage = () => {
    if (formData.images.extras.length < 5) {
      setFormData((prev) => ({
        ...prev,
        images: {
          ...prev.images,
          extras: [...prev.images.extras, { url: "", altText: "" }],
        },
      }));
    }
  };

  const removeExtraImage = (index) => {
    const updated = formData.images.extras.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      images: { ...prev.images, extras: updated },
    }));
  };

  const handleAttributeChange = (index, field, value) => {
    const updated = [...formData.attributes];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, attributes: updated }));
  };

  const addAttribute = () => {
    setFormData((prev) => ({
      ...prev,
      attributes: [...prev.attributes, { key: "", value: "" }],
    }));
  };

  const removeAttribute = (index) => {
    const updated = formData.attributes.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, attributes: updated }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
      sizes: formData.sizes
        .split(",")
        .map((size) => size.trim())
        .filter((size) => size),
      colors: formData.colors
        .split(",")
        .map((color) => color.trim())
        .filter((color) => color),
      stock: {
        ...formData.stock,
        quantity: parseInt(formData.stock.quantity),
        lowStockThreshold: parseInt(formData.stock.lowStockThreshold),
      },
      priceBySize: formData.priceBySize.map((price) => ({
        ...price,
        originalPrice: parseFloat(price.originalPrice),
        purchasePrice: parseFloat(price.purchasePrice),
        sellingPrice: parseFloat(price.sellingPrice),
      })),
      weight: {
        ...formData.weight,
        value: parseFloat(formData.weight.value) || 0,
      },
      dimensions: {
        ...formData.dimensions,
        width: parseFloat(formData.dimensions.width) || 0,
        height: parseFloat(formData.dimensions.height) || 0,
        depth: parseFloat(formData.dimensions.depth) || 0,
      },
    };
    onSave(finalData);
  };

  const subcategories =
    categories.find((cat) => cat.id === formData.category)?.subcategories || [];

  const allRequiredFieldsFilled = () => {
    return (
      formData.name &&
      formData.description.short &&
      formData.description.long &&
      formData.images.main.url &&
      formData.priceBySize.length > 0 &&
      formData.priceBySize[0].size &&
      formData.priceBySize[0].originalPrice &&
      formData.priceBySize[0].purchasePrice &&
      formData.priceBySize[0].sellingPrice &&
      formData.stock.quantity &&
      formData.category
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-lg p-6 shadow relative h-[90vh] overflow-auto">
        <h2 className="text-2xl font-bold text-indigo-600 mb-4 text-center">
          {product ? "Edit Product" : "Add Product"}
        </h2>

        <div className="flex mb-6 space-x-4">
          {[1, 2, 3, 4].map((stepNum) => (
            <div
              key={stepNum}
              className={`flex-1 h-2 rounded ${
                step >= stepNum ? "bg-indigo-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        <div className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-indigo-700">
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-indigo-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                    placeholder="Product Name"
                  />
                </div>
                <div>
                  <input
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className="w-full border border-indigo-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                    placeholder="Brand"
                  />
                </div>
                <div className="md:col-span-2">
                  <input
                    name="description.short"
                    value={formData.description.short}
                    onChange={handleChange}
                    className="w-full border border-indigo-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                    placeholder="Short Description"
                  />
                </div>
                <div className="md:col-span-2">
                  <textarea
                    name="description.long"
                    value={formData.description.long}
                    onChange={handleChange}
                    rows={4}
                    className="w-full border border-indigo-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                    placeholder="Long Description"
                  />
                </div>
                <div>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border border-indigo-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <select
                    name="subCategory"
                    value={formData.subCategory}
                    onChange={handleChange}
                    className="w-full border border-indigo-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select Subcategory</option>
                    {subcategories.map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-indigo-700">
                Pricing & Stock
              </h3>
              <div className="space-y-4">
                {formData.priceBySize.map((price, index) => (
                  <div
                    key={index}
                    className="border border-gray-300 rounded p-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      <input
                        value={price.size}
                        onChange={(e) =>
                          handlePriceSizeChange(index, "size", e.target.value)
                        }
                        className="w-full border border-indigo-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                        placeholder="Size"
                      />
                      <input
                        type="number"
                        value={price.originalPrice}
                        onChange={(e) =>
                          handlePriceSizeChange(
                            index,
                            "originalPrice",
                            e.target.value
                          )
                        }
                        className="w-full border border-indigo-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                        placeholder="Original Price"
                      />
                      <input
                        type="number"
                        value={price.purchasePrice}
                        onChange={(e) =>
                          handlePriceSizeChange(
                            index,
                            "purchasePrice",
                            e.target.value
                          )
                        }
                        className="w-full border border-indigo-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                        placeholder="Purchase Price"
                      />
                      <input
                        type="number"
                        value={price.sellingPrice}
                        onChange={(e) =>
                          handlePriceSizeChange(
                            index,
                            "sellingPrice",
                            e.target.value
                          )
                        }
                        className="w-full border border-indigo-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                        placeholder="Selling Price"
                      />
                      <button
                        type="button"
                        onClick={() => removePriceSize(index)}
                        className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addPriceSize}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Add Price Option
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    name="stock.quantity"
                    type="number"
                    value={formData.stock.quantity}
                    onChange={handleChange}
                    className="w-full border border-indigo-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                    placeholder="Stock Quantity"
                  />
                </div>
                <div>
                  <input
                    name="stock.lowStockThreshold"
                    type="number"
                    value={formData.stock.lowStockThreshold}
                    onChange={handleChange}
                    className="w-full border border-indigo-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                    placeholder="Low Stock Threshold"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-indigo-700">Images</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    name="images.main.url"
                    value={formData.images.main.url}
                    onChange={handleChange}
                    className="w-full border border-indigo-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                    placeholder="Main Image URL"
                  />
                </div>
                <div>
                  <input
                    name="images.main.altText"
                    value={formData.images.main.altText}
                    onChange={handleChange}
                    className="w-full border border-indigo-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                    placeholder="Main Image Alt Text"
                  />
                </div>
              </div>

              <div>
                <label className="text-indigo-700 font-medium">
                  Extra Images (Max 5)
                </label>
                {formData.images.extras.map((img, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2"
                  >
                    <input
                      value={img.url}
                      onChange={(e) =>
                        handleExtraImageChange(index, "url", e.target.value)
                      }
                      className="w-full border border-indigo-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                      placeholder="Image URL"
                    />
                    <input
                      value={img.altText}
                      onChange={(e) =>
                        handleExtraImageChange(index, "altText", e.target.value)
                      }
                      className="w-full border border-indigo-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                      placeholder="Alt Text"
                    />
                    <button
                      type="button"
                      onClick={() => removeExtraImage(index)}
                      className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                {formData.images.extras.length < 5 && (
                  <button
                    type="button"
                    onClick={addExtraImage}
                    className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                  >
                    Add Extra Image
                  </button>
                )}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-indigo-700">
                Additional Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <input
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    className="w-full border border-indigo-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                    placeholder="Tags (comma separated)"
                  />
                </div>
                <div>
                  <input
                    name="sizes"
                    value={formData.sizes}
                    onChange={handleChange}
                    className="w-full border border-indigo-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                    placeholder="Sizes (comma separated)"
                  />
                </div>
                <div>
                  <input
                    name="colors"
                    value={formData.colors}
                    onChange={handleChange}
                    className="w-full border border-indigo-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                    placeholder="Colors (comma separated)"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <input
                    name="weight.value"
                    type="number"
                    value={formData.weight.value}
                    onChange={handleChange}
                    className="w-full border border-indigo-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                    placeholder="Weight"
                  />
                </div>
                <div>
                  <select
                    name="weight.unit"
                    value={formData.weight.unit}
                    onChange={handleChange}
                    className="w-full border border-indigo-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="g">Grams</option>
                    <option value="kg">Kilograms</option>
                    <option value="oz">Ounces</option>
                    <option value="lb">Pounds</option>
                  </select>
                </div>
                <div>
                  <input
                    name="dimensions.width"
                    type="number"
                    value={formData.dimensions.width}
                    onChange={handleChange}
                    className="w-full border border-indigo-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                    placeholder="Width"
                  />
                </div>
                <div>
                  <input
                    name="dimensions.height"
                    type="number"
                    value={formData.dimensions.height}
                    onChange={handleChange}
                    className="w-full border border-indigo-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                    placeholder="Height"
                  />
                </div>
                <div>
                  <input
                    name="dimensions.depth"
                    type="number"
                    value={formData.dimensions.depth}
                    onChange={handleChange}
                    className="w-full border border-indigo-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                    placeholder="Depth"
                  />
                </div>
                <div>
                  <select
                    name="dimensions.unit"
                    value={formData.dimensions.unit}
                    onChange={handleChange}
                    className="w-full border border-indigo-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="cm">Centimeters</option>
                    <option value="in">Inches</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-indigo-700 font-medium">
                  Custom Attributes
                </label>
                {formData.attributes.map((attr, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2"
                  >
                    <input
                      value={attr.key}
                      onChange={(e) =>
                        handleAttributeChange(index, "key", e.target.value)
                      }
                      className="w-full border border-indigo-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                      placeholder="Attribute Name"
                    />
                    <input
                      value={attr.value}
                      onChange={(e) =>
                        handleAttributeChange(index, "value", e.target.value)
                      }
                      className="w-full border border-indigo-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                      placeholder="Attribute Value"
                    />
                    <button
                      type="button"
                      onClick={() => removeAttribute(index)}
                      className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addAttribute}
                  className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Add Attribute
                </button>
              </div>

              <div>
                <select
                  name="featured"
                  value={formData.featured}
                  onChange={handleChange}
                  className="w-full border border-indigo-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Not Featured</option>
                  <option value="New Arrival">New Arrival</option>
                  <option value="Best Seller">Best Seller</option>
                </select>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => setStep((prev) => Math.max(prev - 1, 1))}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              disabled={step === 1}
            >
              Back
            </button>

            {step < 4 && (
              <button
                type="button"
                onClick={() => setStep((prev) => Math.min(prev + 1, 4))}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Next
              </button>
            )}

            {step === 4 && allRequiredFieldsFilled() && (
              <button
                type="button"
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                {product ? "Update Product" : "Create Products"}
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={onCancel}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

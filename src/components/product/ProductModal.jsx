"use client";

import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { X, Upload, Plus, Trash2, Star, Check, Camera } from "lucide-react";

export default function ProductModal({ product, categories, onClose, onSave }) {
  const fileInputRef = useRef(null);
  const extraImagesRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    sku: "",
    description: { short: "", long: "" },
    priceBySize: [{ size: "", amount: 0, currency: "INR" }],
    stock: { quantity: 0, lowStockThreshold: 5 },
    category: "",
    subCategory: "",
    brand: "",
    tags: [],
    sizes: [],
    colors: [],
    weight: { value: 0, unit: "g" },
    dimensions: { width: 0, height: 0, depth: 0, unit: "cm" },
    images: {
      main: {
        file: null,
        preview: "",
        altText: "",
      },
      extras: [],
    },
    attributes: [],
    listingStatus: "pending",
    featured: "", // "New Arrival" or "Best Seller" or ""
  });

  const [mainImageError, setMainImageError] = useState("");
  const [activeTab, setActiveTab] = useState("basic");

  useEffect(() => {
    if (product) {
      setForm({
        ...product,
        priceBySize:
          product.priceBySize?.length > 0
            ? product.priceBySize
            : [{ size: "", amount: 0, currency: "INR" }],
        stock: product.stock || { quantity: 0, lowStockThreshold: 5 },
        images: {
          main: {
            file: null,
            preview: product.images?.main?.url || "",
            altText: product.images?.main?.altText || "",
          },
          extras:
            product.images?.extras?.map((img) => ({
              file: null,
              preview: img.url || "",
              altText: img.altText || "",
            })) || [],
        },
        description: product.description || { short: "", long: "" },
        attributes: product.attributes || [],
        featured: product.featured || "",
        listingStatus: product.listingStatus || "pending",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("description.")) {
      const key = name.split(".")[1];
      setForm((f) => ({
        ...f,
        description: { ...f.description, [key]: value },
      }));
    } else if (name.includes("stock.")) {
      const key = name.split(".")[1];
      setForm((f) => ({
        ...f,
        stock: { ...f.stock, [key]: Number(value) },
      }));
    } else if (name.includes("weight.")) {
      const key = name.split(".")[1];
      setForm((f) => ({
        ...f,
        weight: { ...f.weight, [key]: key === "unit" ? value : Number(value) },
      }));
    } else if (name.includes("dimensions.")) {
      const key = name.split(".")[1];
      setForm((f) => ({
        ...f,
        dimensions: {
          ...f.dimensions,
          [key]: key === "unit" ? value : Number(value),
        },
      }));
    } else if (name === "tags" || name === "sizes" || name === "colors") {
      setForm((f) => ({
        ...f,
        [name]: value
          .split(",")
          .map((v) => v.trim())
          .filter((v) => v !== ""),
      }));
    } else if (name === "featured") {
      setForm((f) => ({ ...f, featured: value }));
    } else if (name === "listingStatus") {
      setForm((f) => ({ ...f, listingStatus: value }));
    } else if (name === "main-image-alt") {
      setForm((f) => ({
        ...f,
        images: {
          ...f.images,
          main: { ...f.images.main, altText: value },
        },
      }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setMainImageError("Image size should be less than 5MB");
      return;
    }

    // Validate file type
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setMainImageError("Only JPG, PNG, and WebP formats are allowed");
      return;
    }

    setMainImageError("");
    const reader = new FileReader();
    reader.onload = () => {
      setForm((prevForm) => ({
        ...prevForm,
        images: {
          ...prevForm.images,
          main: {
            file: file,
            preview: reader.result,
            altText: prevForm.images.main.altText || file.name.split(".")[0],
          },
        },
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleExtraImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Limit to 5 extra images
    if (form.images.extras.length + files.length > 5) {
      alert("You can only upload up to 5 extra images");
      return;
    }

    const newExtras = [...form.images.extras];

    files.forEach((file) => {
      // Validate each file
      if (
        file.size > 5 * 1024 * 1024 ||
        !["image/jpeg", "image/png", "image/webp"].includes(file.type)
      ) {
        alert(
          `File ${file.name} skipped: It should be less than 5MB and in JPG, PNG, or WebP format`
        );
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        newExtras.push({
          file: file,
          preview: reader.result,
          altText: file.name.split(".")[0],
        });

        setForm((prevForm) => ({
          ...prevForm,
          images: {
            ...prevForm.images,
            extras: [...newExtras],
          },
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeExtraImage = (index) => {
    setForm((prevForm) => ({
      ...prevForm,
      images: {
        ...prevForm.images,
        extras: prevForm.images.extras.filter((_, i) => i !== index),
      },
    }));
  };

  // Price by size handling
  const handlePriceChange = (index, field, value) => {
    const newPrices = [...form.priceBySize];
    if (field === "amount") newPrices[index][field] = Number(value);
    else newPrices[index][field] = value;
    setForm((f) => ({ ...f, priceBySize: newPrices }));
  };

  const addPriceSize = () => {
    setForm((f) => ({
      ...f,
      priceBySize: [...f.priceBySize, { size: "", amount: 0, currency: "INR" }],
    }));
  };

  const removePriceSize = (index) => {
    if (form.priceBySize.length <= 1) return;
    setForm((f) => ({
      ...f,
      priceBySize: f.priceBySize.filter((_, i) => i !== index),
    }));
  };

  // Attributes handling
  const handleAttributeChange = (index, field, value) => {
    const newAttributes = [...form.attributes];
    newAttributes[index][field] = value;
    setForm((f) => ({ ...f, attributes: newAttributes }));
  };

  const addAttribute = () => {
    setForm((f) => ({
      ...f,
      attributes: [...f.attributes, { key: "", value: "" }],
    }));
  };

  const removeAttribute = (index) => {
    setForm((f) => ({
      ...f,
      attributes: f.attributes.filter((_, i) => i !== index),
    }));
  };

  // Category/Subcategory helpers
  const getSubcategories = () => {
    if (!form.category) return [];
    const cat = categories.find((c) => c.id === form.category);
    return cat ? cat.subcategories : [];
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate main image
    if (!form.images.main.file && !form.images.main.preview) {
      setMainImageError("Main product image is required");
      setActiveTab("media");
      return;
    }

    // Basic validation
    if (!form.name || form.name.length < 3) {
      alert("Product name is required and must be at least 3 characters");
      setActiveTab("basic");
      return;
    }

    if (!form.sku) {
      alert("SKU is required");
      setActiveTab("basic");
      return;
    }

    if (!form.description.short) {
      alert("Short description is required");
      setActiveTab("description");
      return;
    }

    if (!form.category) {
      alert("Category is required");
      setActiveTab("categorization");
      return;
    }

    // Check if at least one price entry has both size and amount
    const validPriceEntries = form.priceBySize.filter(
      (p) => p.size.trim() !== "" && p.amount > 0
    );

    if (validPriceEntries.length === 0) {
      alert("At least one valid price with size and amount is required");
      setActiveTab("pricing");
      return;
    }

    // Convert image objects to format expected by API
    const preparedData = {
      ...form,
      // Backend will handle actual image uploads, we just pass the files
      images: {
        main: {
          file: form.images.main.file,
          altText: form.images.main.altText,
          url: form.images.main.preview, // For existing images
        },
        extras: form.images.extras.map((img) => ({
          file: img.file,
          altText: img.altText,
          url: img.preview, // For existing images
        })),
      },
    };

    onSave(preparedData);
  };

  const getTabClass = (tabName) => {
    return `px-4 py-2 border-b-2 font-medium text-sm ${
      activeTab === tabName
        ? "border-indigo-600 text-indigo-600"
        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
    }`;
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 text-gray-900 overflow-y-auto py-6">
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4">
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 rounded-t-lg px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            {product ? "Edit Product" : "Add New Product"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="text-sm">
          {/* Tabs Navigation */}
          <div className="overflow-x-auto border-b border-gray-200 bg-gray-50 sticky top-16 z-10">
            <div className="flex min-w-max px-6">
              <button
                type="button"
                className={getTabClass("basic")}
                onClick={() => setActiveTab("basic")}
              >
                Basic Info
              </button>
              <button
                type="button"
                className={getTabClass("description")}
                onClick={() => setActiveTab("description")}
              >
                Description
              </button>
              <button
                type="button"
                className={getTabClass("categorization")}
                onClick={() => setActiveTab("categorization")}
              >
                Categorization
              </button>
              <button
                type="button"
                className={getTabClass("pricing")}
                onClick={() => setActiveTab("pricing")}
              >
                Pricing & Stock
              </button>
              <button
                type="button"
                className={getTabClass("media")}
                onClick={() => setActiveTab("media")}
              >
                Media
              </button>
              <button
                type="button"
                className={getTabClass("attributes")}
                onClick={() => setActiveTab("attributes")}
              >
                Attributes
              </button>
              <button
                type="button"
                className={getTabClass("physical")}
                onClick={() => setActiveTab("physical")}
              >
                Physical Details
              </button>
              <button
                type="button"
                className={getTabClass("advanced")}
                onClick={() => setActiveTab("advanced")}
              >
                Advanced
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Basic Info */}
            {activeTab === "basic" && (
              <div className="space-y-6">
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
                    className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    placeholder="Enter product name"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1 text-gray-700">
                    SKU <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="sku"
                    value={form.sku}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    placeholder="Enter unique product SKU"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Must be unique across all products
                  </p>
                </div>

                <div>
                  <label className="block font-medium mb-1 text-gray-700">
                    Brand
                  </label>
                  <input
                    type="text"
                    name="brand"
                    value={form.brand}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    placeholder="Brand name"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1 text-gray-700">
                    Featured Status
                  </label>
                  <select
                    name="featured"
                    value={form.featured}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="">Not Featured</option>
                    <option value="New Arrival">New Arrival</option>
                    <option value="Best Seller">Best Seller</option>
                  </select>
                </div>
              </div>
            )}

            {/* Description */}
            {activeTab === "description" && (
              <div className="space-y-6">
                <div>
                  <label className="block font-medium mb-1 text-gray-700">
                    Short Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description.short"
                    value={form.description.short}
                    onChange={handleChange}
                    maxLength={255}
                    rows={3}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    placeholder="Brief product description (max 255 characters)"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {form.description.short.length}/255 characters
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
                    rows={8}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    placeholder="Detailed product description"
                  />
                </div>
              </div>
            )}

            {/* Categorization */}
            {activeTab === "categorization" && (
              <div className="space-y-6">
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
                    className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="" className="text-gray-400">
                      Select category
                    </option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
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
                      className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    >
                      <option value="" className="text-gray-400">
                        Select subcategory
                      </option>
                      {getSubcategories().map((subcat) => (
                        <option key={subcat.id} value={subcat.id}>
                          {subcat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block font-medium mb-1 text-gray-700">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={form.tags.join(", ")}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    placeholder="cotton, summer, casual"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Help customers find your product through search
                  </p>
                </div>
              </div>
            )}

            {/* Pricing & Stock */}
            {activeTab === "pricing" && (
              <div className="space-y-6">
                {/* Price By Size */}
                <div>
                  <label className="block font-medium mb-2 text-gray-700">
                    Price By Size/Variant{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2">
                    {form.priceBySize.map((p, i) => (
                      <div key={i} className="flex gap-2 items-center">
                        <input
                          type="text"
                          placeholder="Size/Variant"
                          value={p.size}
                          onChange={(e) =>
                            handlePriceChange(i, "size", e.target.value)
                          }
                          className="border border-gray-300 rounded px-3 py-2 w-32 text-gray-900 placeholder-gray-400 focus:outline-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        />
                        <input
                          type="number"
                          min={0}
                          step="0.01"
                          placeholder="Amount"
                          value={p.amount}
                          onChange={(e) =>
                            handlePriceChange(i, "amount", e.target.value)
                          }
                          className="border border-gray-300 rounded px-3 py-2 w-24 text-gray-900 placeholder-gray-400 focus:outline-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        />
                        <select
                          value={p.currency}
                          onChange={(e) =>
                            handlePriceChange(i, "currency", e.target.value)
                          }
                          className="border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        >
                          <option value="INR">₹ INR</option>
                          <option value="USD">$ USD</option>
                        </select>
                        {form.priceBySize.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removePriceSize(i)}
                            className="p-2 text-red-500 hover:text-red-700"
                            aria-label="Remove price size"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={addPriceSize}
                    className="mt-2 flex items-center text-indigo-600 hover:text-indigo-800"
                  >
                    <Plus size={16} className="mr-1" /> Add another size/variant
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-1 text-gray-700">
                      Low Stock Alert Threshold
                    </label>
                    <input
                      type="number"
                      min={0}
                      name="stock.lowStockThreshold"
                      value={form.stock.lowStockThreshold}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      placeholder="5"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      You'll be notified when stock reaches this level
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block font-medium mb-1 text-gray-700">
                    Available Sizes (comma separated)
                  </label>
                  <input
                    type="text"
                    name="sizes"
                    value={form.sizes.join(", ")}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    placeholder="S, M, L, XL"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1 text-gray-700">
                    Available Colors (comma separated)
                  </label>
                  <input
                    type="text"
                    name="colors"
                    value={form.colors.join(", ")}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    placeholder="Red, Blue, Green"
                  />
                </div>
              </div>
            )}

            {/* Media */}
            {activeTab === "media" && (
              <div className="space-y-6">
                <div>
                  <label className="block font-medium mb-2 text-gray-700">
                    Main Product Image <span className="text-red-500">*</span>
                  </label>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                      className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center min-h-40 h-56 cursor-pointer hover:bg-gray-50 transition-colors ${
                        mainImageError ? "border-red-400" : "border-gray-300"
                      }`}
                      onClick={() => fileInputRef.current.click()}
                    >
                      {form.images.main.preview ? (
                        <div className="relative w-full h-full flex items-center justify-center">
                          <img
                            src={form.images.main.preview}
                            alt="Product preview"
                            className="max-h-48 max-w-full object-contain"
                          />
                          <button
                            type="button"
                            className="absolute top-0 right-0 bg-red-500 rounded-full p-1 text-white"
                            onClick={(e) => {
                              e.stopPropagation();
                              setForm((prev) => ({
                                ...prev,
                                images: {
                                  ...prev.images,
                                  main: {
                                    file: null,
                                    preview: "",
                                    altText: "",
                                  },
                                },
                              }));
                            }}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <>
                          <Camera size={40} className="text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500">
                            Click to upload main product image
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            JPG, PNG, or WebP up to 5MB
                          </p>
                        </>
                      )}
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleMainImageChange}
                        className="hidden"
                      />
                    </div>

                    <div>
                      <div className="mb-4">
                        <label className="block font-medium mb-1 text-gray-700">
                          Image Alt Text
                        </label>
                        <input
                          type="text"
                          name="main-image-alt"
                          value={form.images.main.altText}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-indigo-500 focus:ring-1 focus:ring-indigo-500"
                          placeholder="Descriptive text for the image"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Helps with SEO and accessibility
                        </p>
                      </div>

                      {mainImageError && (
                        <p className="text-red-500 text-sm">{mainImageError}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block font-medium mb-2 text-gray-700">
                    Additional Product Images (up to 5)
                  </label>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    {form.images.extras.map((img, idx) => (
                      <div
                        key={idx}
                        className="relative border rounded-lg p-2 h-24"
                      >
                        <img
                          src={img.preview}
                          alt={`Product extra ${idx + 1}`}
                          className="w-full h-full object-contain"
                        />
                        <button
                          type="button"
                          className="absolute top-1 right-1 bg-red-500 rounded-full p-1 text-white"
                          onClick={() => removeExtraImage(idx)}
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}

                    {form.images.extras.length < 5 && (
                      <div
                        className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center h-24 cursor-pointer hover:bg-gray-50"
                        onClick={() => extraImagesRef.current.click()}
                      >
                        <Plus size={24} className="text-gray-400" />
                        <span className="text-xs text-gray-500">Add</span>
                      </div>
                    )}

                    <input
                      type="file"
                      multiple
                      ref={extraImagesRef}
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleExtraImagesChange}
                      className="hidden"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Show different angles or variations of your product
                  </p>
                </div>
              </div>
            )}

            {/* Attributes */}
            {activeTab === "attributes" && (
              <div className="space-y-6">
                <div>
                  <label className="block font-medium mb-2 text-gray-700">
                    Product Attributes
                  </label>
                  <div className="space-y-2">
                    {form.attributes.map((attr, i) => (
                      <div key={i} className="flex gap-2 items-center">
                        <input
                          type="text"
                          placeholder="Name (e.g. Material)"
                          value={attr.key}
                          onChange={(e) =>
                            handleAttributeChange(i, "key", e.target.value)
                          }
                          className="border border-gray-300 rounded px-3 py-2 flex-1 text-gray-900 placeholder-gray-400 focus:outline-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        />
                        <input
                          type="text"
                          placeholder="Value (e.g. Cotton)"
                          value={attr.value}
                          onChange={(e) =>
                            handleAttributeChange(i, "value", e.target.value)
                          }
                          className="border border-gray-300 rounded px-3 py-2 flex-1 text-gray-900 placeholder-gray-400 focus:outline-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        />
                        <button
                          type="button"
                          onClick={() => removeAttribute(i)}
                          className="p-2 text-red-500 hover:text-red-700"
                          aria-label="Remove attribute"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={addAttribute}
                    className="mt-2 flex items-center text-indigo-600 hover:text-indigo-800"
                  >
                    <Plus size={16} className="mr-1" /> Add product attribute
                  </button>
                  <p className="text-xs text-gray-500 mt-1">
                    Add specific product details like material, care
                    instructions, etc.
                  </p>
                </div>
              </div>
            )}

            {/* Physical Details */}
            {activeTab === "physical" && (
              <div className="space-y-6">
                <div>
                  <label className="block font-medium mb-1 text-gray-700">
                    Weight
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min={0}
                      step="0.01"
                      name="weight.value"
                      value={form.weight.value}
                      onChange={handleChange}
                      className="border border-gray-300 rounded px-3 py-2 w-full text-gray-900 placeholder-gray-400 focus:outline-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      placeholder="Weight value"
                    />
                    <select
                      name="weight.unit"
                      value={form.weight.unit}
                      onChange={handleChange}
                      className="border border-gray-300 rounded px-3 py-2 w-24 text-gray-900 focus:outline-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    >
                      <option value="g">g</option>
                      <option value="kg">kg</option>
                      <option value="lb">lb</option>
                      <option value="oz">oz</option>
                    </select>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Used for shipping calculations
                  </p>
                </div>

                <div>
                  <label className="block font-medium mb-1 text-gray-700">
                    Dimensions
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        Width
                      </label>
                      <input
                        type="number"
                        min={0}
                        step="0.1"
                        name="dimensions.width"
                        value={form.dimensions.width}
                        onChange={handleChange}
                        placeholder="Width"
                        className="border border-gray-300 rounded px-3 py-2 w-full text-gray-900 placeholder-gray-400 focus:outline-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        Height
                      </label>
                      <input
                        type="number"
                        min={0}
                        step="0.1"
                        name="dimensions.height"
                        value={form.dimensions.height}
                        onChange={handleChange}
                        placeholder="Height"
                        className="border border-gray-300 rounded px-3 py-2 w-full text-gray-900 placeholder-gray-400 focus:outline-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        Depth
                      </label>
                      <input
                        type="number"
                        min={0}
                        step="0.1"
                        name="dimensions.depth"
                        value={form.dimensions.depth}
                        onChange={handleChange}
                        placeholder="Depth"
                        className="border border-gray-300 rounded px-3 py-2 w-full text-gray-900 placeholder-gray-400 focus:outline-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                  <div className="mt-2">
                    <select
                      name="dimensions.unit"
                      value={form.dimensions.unit}
                      onChange={handleChange}
                      className="border border-gray-300 rounded px-3 py-2 w-24 text-gray-900 focus:outline-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    >
                      <option value="cm">cm</option>
                      <option value="in">in</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Advanced */}
            {activeTab === "advanced" && (
              <div className="space-y-6">
                <div>
                  <label className="block font-medium mb-1 text-gray-700">
                    Listing Status
                  </label>
                  <select
                    name="listingStatus"
                    value={form.listingStatus}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="pending">Pending Review</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Form Footer */}
          <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4 flex justify-between items-center rounded-b-lg">
            <div className="text-sm text-gray-500">
              <span className="text-red-500">*</span> Required fields
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 flex items-center"
              >
                <Check size={18} className="mr-2" />
                {product ? "Update Product" : "Create Product"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}

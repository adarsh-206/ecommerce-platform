"use client";

import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import ProductFormTabContent from "./ProductFormTabContent";

export default function ProductModal({
  product,
  categories,
  onClose,
  onSave,
  loading,
}) {
  const [currentTab, setCurrentTab] = useState(0);
  const [form, setForm] = useState({
    name: "",
    description: { short: "", long: "" },
    priceBySize: [
      {
        size: "",
        originalPrice: 0,
        purchasePrice: 0,
        sellingPrice: 0,
        currency: "INR",
      },
    ],
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
      main: { url: "", altText: "", sizeKB: 0 },
      extras: [],
    },
    attributes: [],
    featured: "",
  });

  const tabs = [
    {
      id: 0,
      title: "Basic Info",
      fields: ["name", "description", "category", "subCategory", "brand"],
    },
    { id: 1, title: "Pricing", fields: ["priceBySize"] },
    { id: 2, title: "Inventory", fields: ["stock", "sizes", "colors"] },
    {
      id: 3,
      title: "Details",
      fields: ["weight", "dimensions", "tags", "attributes"],
    },
    {
      id: 4,
      title: "Media & Status",
      fields: ["images", "featured"],
    },
  ];

  useEffect(() => {
    if (product) {
      setForm({
        ...product,
        priceBySize:
          product.priceBySize?.length > 0
            ? product.priceBySize
            : [
                {
                  size: "",
                  originalPrice: 0,
                  purchasePrice: 0,
                  sellingPrice: 0,
                  currency: "INR",
                },
              ],
        stock: product.stock || { quantity: 0, lowStockThreshold: 5 },
        images: {
          main: product.images?.main || { url: "", altText: "", sizeKB: 0 },
          extras: product.images?.extras || [],
        },
        description: product.description || { short: "", long: "" },
        attributes: product.attributes || [],
        featured: product.featured || "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const finalValue = type === "checkbox" ? checked : value;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      let processedValue = finalValue;

      // For number inputs, allow empty string during typing but prevent negative values
      if (type === "number") {
        if (value === "") {
          processedValue = "";
        } else {
          const numValue = Number(value);
          processedValue = numValue < 0 ? 0 : numValue;
        }
      } else if (!isNaN(finalValue) && finalValue !== "") {
        const numValue = Number(finalValue);
        processedValue = numValue < 0 ? 0 : numValue;
      }

      setForm((f) => ({
        ...f,
        [parent]: {
          ...f[parent],
          [child]: processedValue,
        },
      }));
    } else if (name === "tags" || name === "sizes" || name === "colors") {
      setForm((f) => ({
        ...f,
        [name]: value
          .split(",")
          .map((v) => v.trim())
          .filter((v) => v),
      }));
    } else {
      setForm((f) => ({ ...f, [name]: finalValue }));
    }
  };

  const handlePriceChange = (index, field, value) => {
    const newPrices = [...form.priceBySize];

    if (field === "size" || field === "currency") {
      newPrices[index][field] = value;
    } else {
      // Allow empty string while typing, but prevent negative values
      if (value === "") {
        newPrices[index][field] = "";
      } else {
        const numValue = Number(value);
        newPrices[index][field] = numValue < 0 ? 0 : numValue;
      }
    }

    setForm((f) => ({ ...f, priceBySize: newPrices }));
  };

  const addPriceSize = () => {
    setForm((f) => ({
      ...f,
      priceBySize: [
        ...f.priceBySize,
        {
          size: "",
          originalPrice: 0,
          purchasePrice: 0,
          sellingPrice: 0,
          currency: "INR",
        },
      ],
    }));
  };

  const removePriceSize = (index) => {
    if (form.priceBySize.length > 1) {
      setForm((f) => ({
        ...f,
        priceBySize: f.priceBySize.filter((_, i) => i !== index),
      }));
    }
  };

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

  const getSubcategories = () => {
    if (!form.category) return [];
    const cat = categories.find((c) => c.id == form.category);
    return cat ? cat.subcategories : [];
  };

  const isTabValid = (tabIndex) => {
    const tab = tabs[tabIndex];

    const optionalFields = [
      "brand",
      "sizes",
      "colors",
      "featured",
      "weight",
      "dimensions",
      "tags",
      "attributes",
    ];

    return tab.fields.every((field) => {
      if (optionalFields.includes(field)) return true;

      let isValid = true;

      switch (field) {
        case "name":
          isValid = form.name && form.name.trim().length >= 3;
          break;

        case "description":
          isValid =
            form.description.short &&
            form.description.short.trim() &&
            form.description.long &&
            form.description.long.trim();
          break;

        case "category":
          isValid = !!form.category;
          break;

        case "subCategory":
          const subcategories = getSubcategories();
          isValid = subcategories.length === 0 || !!form.subCategory;
          break;

        case "priceBySize":
          isValid =
            form.priceBySize.length > 0 &&
            form.priceBySize.every(
              (p) =>
                p.size &&
                p.size.trim() &&
                p.originalPrice > 0 &&
                p.sellingPrice > 0
            );
          break;

        case "stock":
          isValid =
            typeof form.stock.quantity === "number" && form.stock.quantity >= 0;
          break;

        case "images":
          isValid = form.images.main;
          break;

        default:
          isValid = true;
      }

      // if (!isValid) {
      //   console.warn(`Tab ${tabIndex} - Invalid field: ${field}`);
      // }

      return isValid;
    });
  };

  const canProceed = () =>
    currentTab < tabs.length - 1 && isTabValid(currentTab);

  const canSubmit = () =>
    currentTab === tabs.length - 1 &&
    tabs.every((_, index) => isTabValid(index));

  const handleImageUpload = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setForm((prev) => ({
          ...prev,
          images: {
            ...prev.images,
            [type]: {
              file: file,
              preview: e.target.result,
            },
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExtraImageUpload = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setForm((prev) => {
          const newExtra = [...(prev.images?.extras || [])];
          newExtra[index] = {
            file: file,
            preview: e.target.result,
          };
          return {
            ...prev,
            images: {
              ...prev.images,
              extras: newExtra,
            },
          };
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeExtraImage = (index) => {
    setForm((prev) => {
      const newExtra = [...(prev.images?.extras || [])];
      newExtra[index] = null;
      return {
        ...prev,
        images: {
          ...prev.images,
          extras: newExtra,
        },
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSubmit()) {
      onSave(form);
    }
  };

  const handleTabNav = () => {
    if (currentTab === 1) {
      for (let i = 0; i < form.priceBySize.length; i++) {
        const p = form.priceBySize[i];

        if (!p.size.trim()) {
          alert("Size/Variant is required.");
          return;
        }

        if (p.originalPrice < 0 || p.purchasePrice < 0 || p.sellingPrice < 0) {
          alert("Negative prices are not allowed.");
          return;
        }

        if (p.sellingPrice < p.purchasePrice) {
          alert("Selling price cannot be less than purchase price.");
          return;
        }

        if (p.sellingPrice > p.originalPrice) {
          alert("Selling price cannot be more than original price.");
          return;
        }
      }
    }

    // Proceed to next tab if validation passes
    setCurrentTab(currentTab + 1);
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-4xl flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            {product ? "Edit Product" : "Add New Product"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex border-b border-gray-200">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(index)}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                currentTab === index
                  ? "text-rose-600 border-b-2 border-rose-600 bg-rose-50"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
              } ${
                !isTabValid(index) && index < currentTab ? "text-red-500" : ""
              }`}
            >
              <span className="flex items-center gap-2">
                {tab.title}
                {isTabValid(index) && index < currentTab && (
                  <span className="text-green-500">✓</span>
                )}
                {!isTabValid(index) && index < currentTab && (
                  <span className="text-red-500">!</span>
                )}
              </span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-6 max-h-[calc(80vh-136px)]">
            <ProductFormTabContent
              currentTab={currentTab}
              form={form}
              handleChange={handleChange}
              categories={categories}
              getSubcategories={getSubcategories}
              setForm={setForm}
              handlePriceChange={handlePriceChange}
              addPriceSize={addPriceSize}
              removePriceSize={removePriceSize}
              handleAttributeChange={handleAttributeChange}
              addAttribute={addAttribute}
              removeAttribute={removeAttribute}
              handleImageUpload={handleImageUpload}
              handleExtraImageUpload={handleExtraImageUpload}
              removeExtraImage={removeExtraImage}
            />
          </div>

          <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
            <button
              type="button"
              onClick={() => setCurrentTab(Math.max(0, currentTab - 1))}
              disabled={currentTab === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                currentTab === 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400"
              }`}
            >
              <ChevronLeft size={16} />
              Back
            </button>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                Step {currentTab + 1} of {tabs.length}
              </span>
              <div className="flex gap-1">
                {tabs.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentTab
                        ? "bg-rose-600"
                        : index < currentTab
                        ? isTabValid(index)
                          ? "bg-green-500"
                          : "bg-red-500"
                        : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            {currentTab < tabs.length - 1 ? (
              <button
                type="button"
                onClick={handleTabNav}
                disabled={!canProceed()}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  canProceed()
                    ? "bg-rose-600 text-white hover:bg-rose-700"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Next
                <ChevronRight size={16} />
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading || !canSubmit()}
                className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center justify-center ${
                  !loading && canSubmit()
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                {loading ? (
                  // Simple spinner - you can replace this with an SVG or CSS spinner
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                ) : product ? (
                  "Update Product"
                ) : (
                  "Create Products"
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}

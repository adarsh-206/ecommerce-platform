"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import apiService from "@/app/utils/apiService";
import SellerLayout from "@/components/layouts/SellerLayout";
import QuoteDetailsColumn from "./QuoteDetailsColumn";
import {
  Loader,
  AlertTriangle,
  Package,
  CheckCircle,
  ArrowLeft,
  PlusCircle,
  Trash2,
  Send,
  UploadCloud,
} from "lucide-react";
import categories from "@/constants/categories";

const QuoteResponsePage = () => {
  const { id } = useParams();
  const router = useRouter();

  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [availableColors, setAvailableColors] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [productData, setProductData] = useState({
    name: "",
    description: {
      short: "",
      long: "",
    },
    priceBySize: [],
    stock: {
      quantity: 1,
      lowStockThreshold: 5,
    },
    category: "",
    subCategory: "",
    brand: "",
    tags: [],
    sizes: [],
    colors: [],
    weight: {
      value: 0,
      unit: "g",
    },
    dimensions: {
      width: 0,
      height: 0,
      depth: 0,
      unit: "cm",
    },
    images: {
      main: {
        file: null,
        colorHex: "",
      },
      extras: [],
    },
    attributes: [],
    featured: false,
  });

  const [priceEntry, setPriceEntry] = useState({
    size: "",
    originalPrice: "",
    purchasePrice: "",
    sellingPrice: "",
  });
  const [attributeEntry, setAttributeEntry] = useState({ name: "", value: "" });
  const imageInputRefs = useRef({});
  const mainImageInputRef = useRef(null);

  const fetchQuoteDetails = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const response = await apiService.get(`/quote/${id}`, {}, true);
      const quoteData = response.data.quote;
      setQuote(quoteData);

      if (quoteData) {
        setProductData((prev) => ({
          ...prev,
          name: `Custom ${quoteData.productType}`,
          description: {
            short: quoteData.productType || "",
            long: quoteData.notes || "",
          },
          sizes: quoteData.sizes || [],
        }));
      }
    } catch (err) {
      setError("Failed to load quote details. It may have been withdrawn.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchQuoteDetails();
    }
  }, [id]);

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const response = await apiService.get("/colors/", {}, true);
        if (Array.isArray(response.data)) {
          setAvailableColors(response.data);
        } else {
          console.warn("Unexpected color data format", response.data);
        }
      } catch (err) {
        console.error("Failed to fetch colors", err);
      }
    };
    fetchColors();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "shortDescription") {
      setProductData({
        ...productData,
        description: {
          ...productData.description,
          short: value,
        },
      });
    } else if (name === "longDescription") {
      setProductData({
        ...productData,
        description: {
          ...productData.description,
          long: value,
        },
      });
    } else if (name === "stockQuantity") {
      setProductData({
        ...productData,
        stock: {
          ...productData.stock,
          quantity: parseInt(value) || 0,
        },
      });
    } else if (name === "lowStockThreshold") {
      setProductData({
        ...productData,
        stock: {
          ...productData.stock,
          lowStockThreshold: parseInt(value) || 0,
        },
      });
    } else if (name === "weight") {
      setProductData({
        ...productData,
        weight: {
          ...productData.weight,
          value: parseFloat(value) || 0,
        },
      });
    } else if (name === "tags") {
      setProductData({
        ...productData,
        tags: value
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
      });
    } else {
      setProductData({ ...productData, [name]: value });
    }
  };

  const handleCategoryChange = (e) => {
    const categoryName = e.target.value;
    const selectedCategory = categories.find(
      (cat) => cat.name === categoryName
    );
    if (selectedCategory) {
      setProductData({
        ...productData,
        category: selectedCategory.id,
        subCategory: "",
      });
      setSubCategories(selectedCategory.subcategories);
    } else {
      setProductData({ ...productData, category: "", subCategory: "" });
      setSubCategories([]);
    }
  };

  const handleSubCategoryChange = (e) => {
    const subCategoryName = e.target.value;
    const selectedSubCategory = subCategories.find(
      (sub) => sub.name === subCategoryName
    );
    if (selectedSubCategory) {
      setProductData({
        ...productData,
        subCategory: selectedSubCategory.id,
      });
    }
  };

  const handleDimensionChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      dimensions: {
        ...productData.dimensions,
        [name]: parseFloat(value) || 0,
      },
    });
  };

  const handlePriceEntryChange = (e) => {
    const { name, value } = e.target;
    setPriceEntry({ ...priceEntry, [name]: value });
  };

  const handleAttributeEntryChange = (e) => {
    const { name, value } = e.target;
    setAttributeEntry({ ...attributeEntry, [name]: value });
  };

  const handleColorSelection = (color) => {
    const isSelected = selectedColors.find((c) => c._id === color._id);
    if (isSelected) {
      setSelectedColors(selectedColors.filter((c) => c._id !== color._id));
      const newColors = productData.colors.filter(
        (c) => c.hexCode !== color.hexCode
      );
      const newExtras = productData.images.extras.filter(
        (img) => img.colorHex !== color.hexCode
      );
      setProductData({
        ...productData,
        colors: newColors,
        images: {
          ...productData.images,
          extras: newExtras,
        },
      });
    } else {
      setSelectedColors([...selectedColors, color]);
      const newColors = [
        ...productData.colors,
        {
          name: color.name,
          hexCode: color.hexCode,
        },
      ];
      setProductData({
        ...productData,
        colors: newColors,
      });
    }
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const defaultColor = selectedColors[0]?.hexCode || "#000000";
      setProductData({
        ...productData,
        images: {
          ...productData.images,
          main: {
            file: file,
            colorHex: defaultColor,
          },
        },
      });
    }
  };

  const handleExtraImageChange = (e, colorHex) => {
    const file = e.target.files[0];
    if (file) {
      const existingExtraIndex = productData.images.extras.findIndex(
        (img) => img.colorHex === colorHex
      );

      if (existingExtraIndex >= 0) {
        const newExtras = [...productData.images.extras];
        newExtras[existingExtraIndex] = {
          file: file,
          colorHex: colorHex,
        };
        setProductData({
          ...productData,
          images: {
            ...productData.images,
            extras: newExtras,
          },
        });
      } else {
        const newExtras = [
          ...productData.images.extras,
          {
            file: file,
            colorHex: colorHex,
          },
        ];
        setProductData({
          ...productData,
          images: {
            ...productData.images,
            extras: newExtras,
          },
        });
      }
    }
  };

  const addPriceBySize = () => {
    if (
      priceEntry.size &&
      priceEntry.originalPrice &&
      priceEntry.purchasePrice &&
      priceEntry.sellingPrice
    ) {
      const newPriceEntry = {
        size: priceEntry.size,
        originalPrice: parseFloat(priceEntry.originalPrice),
        purchasePrice: parseFloat(priceEntry.purchasePrice),
        sellingPrice: parseFloat(priceEntry.sellingPrice),
        currency: "INR",
      };

      setProductData({
        ...productData,
        priceBySize: [...productData.priceBySize, newPriceEntry],
      });
      setPriceEntry({
        size: "",
        originalPrice: "",
        purchasePrice: "",
        sellingPrice: "",
      });
    }
  };

  const removePriceBySize = (indexToRemove) => {
    const newPriceBySize = productData.priceBySize.filter(
      (_, index) => index !== indexToRemove
    );
    setProductData({ ...productData, priceBySize: newPriceBySize });
  };

  const addAttribute = () => {
    if (attributeEntry.name && attributeEntry.value) {
      setProductData({
        ...productData,
        attributes: [...productData.attributes, { ...attributeEntry }],
      });
      setAttributeEntry({ name: "", value: "" });
    }
  };

  const removeAttribute = (indexToRemove) => {
    const newAttributes = productData.attributes.filter(
      (_, index) => index !== indexToRemove
    );
    setProductData({ ...productData, attributes: newAttributes });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const formData = new FormData();

    // Create the product data object matching the schema
    const productInfo = {
      name: productData.name,
      description: productData.description,
      priceBySize: productData.priceBySize,
      stock: productData.stock,
      category: productData.category,
      subCategory: productData.subCategory,
      brand: productData.brand,
      tags: productData.tags,
      sizes: productData.sizes,
      colors: productData.colors,
      weight: productData.weight,
      dimensions: productData.dimensions,
      images: {
        main: {
          file: "mainImage_binary_or_URL",
          colorHex: productData.images.main.colorHex,
        },
        extras: productData.images.extras.map((extra) => ({
          file: "extraImage_binary_or_URL",
          colorHex: extra.colorHex,
        })),
      },
      attributes: productData.attributes,
      featured: productData.featured,
    };

    formData.append("productData", JSON.stringify(productInfo));

    // Add main image
    if (productData.images.main.file) {
      formData.append("mainImage", productData.images.main.file);
    }

    // Add extra images
    productData.images.extras.forEach((extra, index) => {
      if (extra.file) {
        formData.append(`extraImage_${index}`, extra.file);
      }
    });

    try {
      await apiService.post(
        `/seller-quote/${id}/respond`,
        formData,
        true,
        true
      );
      router.push("/seller/quotes?status=responded");
    } catch (err) {
      setError(err.response?.data?.error || "An unknown error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <SellerLayout>
        <div className="p-8 flex justify-center items-center h-full">
          <Loader className="animate-spin w-10 h-10 text-orange-600" />
        </div>
      </SellerLayout>
    );
  }

  if (error && !quote) {
    return (
      <SellerLayout>
        <div className="p-8 text-center flex flex-col items-center">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800">Request Error</h2>
          <p className="text-red-600 mt-2 max-w-md">{error}</p>
          <button
            onClick={() => router.back()}
            className="mt-6 inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </button>
        </div>
      </SellerLayout>
    );
  }

  if (quote?.status === "responded") {
    return (
      <SellerLayout>
        <div className="p-8 max-w-4xl mx-auto text-center flex flex-col items-center">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-5" />
          <h1 className="text-4xl font-bold text-gray-800">
            Response Submitted
          </h1>
          <p className="text-gray-600 mt-3 max-w-lg">
            You have already responded to this quote. The custom product is now
            available to the customer.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4 w-full">
            <button
              onClick={() => router.push("/seller/quotes")}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Quotes
            </button>
            <button
              onClick={() =>
                router.push(`/seller/products/${quote.customProduct}`)
              }
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all"
            >
              <Package className="w-5 h-5 mr-2" />
              View Created Product
            </button>
          </div>
        </div>
      </SellerLayout>
    );
  }

  return (
    <SellerLayout>
      <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-700 mb-6 group transition-all"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="font-semibold">Back to All Quotes</span>
          </button>
          <div className="grid lg:grid-cols-5 gap-8 items-start">
            <QuoteDetailsColumn quote={quote} />
            <div className="lg:col-span-3 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">
                Create Your Response
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={productData.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="shortDescription"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Short Description
                    </label>
                    <input
                      type="text"
                      id="shortDescription"
                      name="shortDescription"
                      value={productData.description.short}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      placeholder="Brief product description"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="longDescription"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Long Description
                    </label>
                    <textarea
                      id="longDescription"
                      name="longDescription"
                      value={productData.description.long}
                      onChange={handleInputChange}
                      rows="3"
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      placeholder="Detailed product description"
                    ></textarea>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pricing per Size
                  </label>
                  <div className="space-y-2 mb-3">
                    {productData.priceBySize.map((price, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-orange-50 p-3 rounded-lg"
                      >
                        <div className="text-sm font-medium text-orange-900">
                          <span className="font-semibold">{price.size}:</span>
                          <span className="ml-2">
                            Original: ₹{price.originalPrice}
                          </span>
                          <span className="ml-2">
                            Purchase: ₹{price.purchasePrice}
                          </span>
                          <span className="ml-2">
                            Selling: ₹{price.sellingPrice}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removePriceBySize(index)}
                          className="p-1 rounded-full hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-500">
                        Size
                      </label>
                      <input
                        type="text"
                        name="size"
                        value={priceEntry.size}
                        onChange={handlePriceEntryChange}
                        placeholder="e.g., XL"
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500">
                        Original Price (₹)
                      </label>
                      <input
                        type="number"
                        name="originalPrice"
                        value={priceEntry.originalPrice}
                        onChange={handlePriceEntryChange}
                        placeholder="599"
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500">
                        Purchase Price (₹)
                      </label>
                      <input
                        type="number"
                        name="purchasePrice"
                        value={priceEntry.purchasePrice}
                        onChange={handlePriceEntryChange}
                        placeholder="299"
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500">
                        Selling Price (₹)
                      </label>
                      <input
                        type="number"
                        name="sellingPrice"
                        value={priceEntry.sellingPrice}
                        onChange={handlePriceEntryChange}
                        placeholder="399"
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={addPriceBySize}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all"
                  >
                    <PlusCircle className="w-4 h-4" />
                    Add Price
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={
                        categories.find((c) => c.id === productData.category)
                          ?.name || ""
                      }
                      onChange={handleCategoryChange}
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      required
                    >
                      <option value="">Select a Category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="subCategory"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Subcategory
                    </label>
                    <select
                      id="subCategory"
                      name="subCategory"
                      value={
                        subCategories.find(
                          (s) => s.id === productData.subCategory
                        )?.name || ""
                      }
                      onChange={handleSubCategoryChange}
                      disabled={
                        !productData.category || subCategories.length === 0
                      }
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 disabled:bg-gray-100"
                      required
                    >
                      <option value="">Select a Subcategory</option>
                      {subCategories.map((sub) => (
                        <option key={sub.id} value={sub.name}>
                          {sub.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label
                      htmlFor="stockQuantity"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      id="stockQuantity"
                      name="stockQuantity"
                      min="0"
                      value={productData.stock.quantity}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lowStockThreshold"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Low Stock Threshold
                    </label>
                    <input
                      type="number"
                      id="lowStockThreshold"
                      name="lowStockThreshold"
                      min="0"
                      value={productData.stock.lowStockThreshold}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="brand"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Brand
                    </label>
                    <input
                      type="text"
                      id="brand"
                      name="brand"
                      value={productData.brand}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="tags"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      id="tags"
                      name="tags"
                      value={productData.tags.join(", ")}
                      onChange={handleInputChange}
                      placeholder="cotton, comfortable, trendy"
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="weight"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Weight (grams)
                    </label>
                    <input
                      type="number"
                      id="weight"
                      name="weight"
                      min="0"
                      value={productData.weight.value}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dimensions (cm)
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500">
                        Width
                      </label>
                      <input
                        type="number"
                        name="width"
                        min="0"
                        value={productData.dimensions.width}
                        onChange={handleDimensionChange}
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500">
                        Height
                      </label>
                      <input
                        type="number"
                        name="height"
                        min="0"
                        value={productData.dimensions.height}
                        onChange={handleDimensionChange}
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500">
                        Depth
                      </label>
                      <input
                        type="number"
                        name="depth"
                        min="0"
                        value={productData.dimensions.depth}
                        onChange={handleDimensionChange}
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Select Colors
                  </label>
                  <div className="mt-2 flex flex-wrap gap-3">
                    {availableColors.map((color) => (
                      <button
                        key={color._id}
                        type="button"
                        onClick={() => handleColorSelection(color)}
                        className={`flex items-center gap-2 p-1 rounded-full border-2 transition-colors duration-200 ${
                          selectedColors.find((c) => c._id === color._id)
                            ? "border-orange-600 bg-orange-50"
                            : "border-transparent bg-gray-100 hover:border-gray-300"
                        }`}
                      >
                        <span
                          className="block w-6 h-6 rounded-full border"
                          style={{ backgroundColor: color.hexCode }}
                        ></span>
                        <span className="pr-2 text-xs font-medium text-gray-800">
                          {color.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Main Product Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleMainImageChange}
                    ref={mainImageInputRef}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => mainImageInputRef.current?.click()}
                    className="w-full h-40 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:border-orange-500 hover:text-orange-500 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  >
                    {productData.images.main.file ? (
                      <img
                        src={URL.createObjectURL(productData.images.main.file)}
                        alt="Main product preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <>
                        <UploadCloud className="w-8 h-8 mb-2" />
                        <span>Upload Main Image</span>
                      </>
                    )}
                  </button>
                </div>

                {selectedColors.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Additional Images by Color
                    </label>
                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedColors.map((color) => (
                        <div key={color._id}>
                          <label className="block text-xs font-medium text-gray-500 mb-1">
                            {color.name} Image
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleExtraImageChange(e, color.hexCode)
                            }
                            ref={(el) =>
                              (imageInputRefs.current[color.hexCode] = el)
                            }
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              imageInputRefs.current[color.hexCode]?.click()
                            }
                            className="w-full h-40 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:border-orange-500 hover:text-orange-500 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                          >
                            {productData.images.extras.find(
                              (img) => img.colorHex === color.hexCode
                            )?.file ? (
                              <img
                                src={URL.createObjectURL(
                                  productData.images.extras.find(
                                    (img) => img.colorHex === color.hexCode
                                  ).file
                                )}
                                alt={`Preview for ${color.name}`}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            ) : (
                              <>
                                <UploadCloud className="w-8 h-8 mb-2" />
                                <span>Upload for {color.name}</span>
                              </>
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Attributes
                  </label>
                  <div className="space-y-2 mb-3">
                    {productData.attributes.map((attr, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                      >
                        <div className="text-sm font-medium text-gray-700">
                          <span className="font-semibold">{attr.name}:</span>
                          <span className="ml-2">{attr.value}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeAttribute(index)}
                          className="p-1 rounded-full hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-end gap-3">
                    <div className="flex-grow">
                      <label className="block text-xs font-medium text-gray-500">
                        Attribute Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={attributeEntry.name}
                        onChange={handleAttributeEntryChange}
                        placeholder="e.g., Material"
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                    <div className="flex-grow">
                      <label className="block text-xs font-medium text-gray-500">
                        Attribute Value
                      </label>
                      <input
                        type="text"
                        name="value"
                        value={attributeEntry.value}
                        onChange={handleAttributeEntryChange}
                        placeholder="e.g., 100% Cotton"
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={addAttribute}
                      className="p-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all"
                    >
                      <PlusCircle className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={productData.featured}
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        featured: e.target.checked,
                      })
                    }
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="featured"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Mark as Featured Product
                  </label>
                </div>

                {error && (
                  <p className="text-red-600 text-sm font-medium">{error}</p>
                )}
                <div className="pt-5 text-right">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all"
                  >
                    {submitting ? (
                      <>
                        <Loader className="w-5 h-5 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Response
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </SellerLayout>
  );
};

export default QuoteResponsePage;

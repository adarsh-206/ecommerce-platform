"use client";
import apiService from "@/app/utils/apiService";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import categories from "@/constants/categories";

export default function ProductInfoPage() {
  const params = useParams();
  const productId = params.id;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({});
  const [isZooming, setIsZooming] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  const imageRef = useRef(null);
  const containerRef = useRef(null);

  // Helper function to get category name by ID
  const getCategoryName = (categoryId) => {
    // First check if it's a main category
    const mainCategory = categories.find((cat) => cat.id === categoryId);
    if (mainCategory) {
      return mainCategory.name;
    }

    // Then check subcategories
    for (const category of categories) {
      const subCategory = category.subcategories.find(
        (sub) => sub.id === categoryId
      );
      if (subCategory) {
        return subCategory.name;
      }
    }

    return "Unknown Category";
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await apiService.get(`/buyer/get-product/${productId}`);
        setProduct(data?.data);

        // Set default size selection
        if (data?.data?.priceBySize && data.data.priceBySize.length > 0) {
          setSelectedSize(data.data.priceBySize[0].size);
        }
        setError(null);
      } catch (err) {
        setError("Failed to load product details");
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const getSelectedPriceData = () => {
    if (!product?.priceBySize || !selectedSize) return null;
    return product.priceBySize.find((p) => p.size === selectedSize);
  };

  const getAllImages = () => {
    if (!product?.images) return [];
    const images = [];

    // Add main image if exists
    if (product.images.main?.url) {
      images.push(product.images.main.url);
    }

    // Add extra images if they exist
    if (product.images.extras && Array.isArray(product.images.extras)) {
      images.push(
        ...product.images.extras.map((img) => img.url).filter(Boolean)
      );
    }

    return images;
  };

  const handleMouseMove = (e) => {
    if (!containerRef.current || !imageRef.current) return;

    const container = containerRef.current;
    const image = imageRef.current;
    const rect = container.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    setZoomStyle({
      transformOrigin: `${xPercent}% ${yPercent}%`,
      transform: "scale(2)",
    });
  };

  const handleMouseEnter = () => {
    setIsZooming(true);
  };

  const handleMouseLeave = () => {
    setIsZooming(false);
    setZoomStyle({});
  };

  const openModal = (index = selectedImage) => {
    setModalImageIndex(index);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "unset";
  };

  const nextModalImage = () => {
    const images = getAllImages();
    setModalImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevModalImage = () => {
    const images = getAllImages();
    setModalImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isModalOpen) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") nextModalImage();
      if (e.key === "ArrowLeft") prevModalImage();
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [isModalOpen]);

  if (loading) {
    return (
      <div>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600 mx-auto"></div>
            <p className="mt-4 text-amber-800 text-lg">Loading product...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 text-lg">
              {error || "Product not found"}
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const images = getAllImages();
  const priceData = getSelectedPriceData();
  const isInStock = product.stock?.quantity > 0;
  const isLowStock =
    product.stock?.quantity <= (product.stock?.lowStockThreshold || 5);
  const categoryName = getCategoryName(product.category);

  // Calculate max quantity available for selected size
  const getMaxQuantity = () => {
    if (priceData?.stock?.quantity) {
      return priceData.stock.quantity;
    }
    return product.stock?.quantity || 0;
  };

  const maxQuantity = getMaxQuantity();

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <nav className="mb-6">
            <div className="flex items-center space-x-2 text-sm text-amber-600">
              <span>Home</span>
              <span>/</span>
              <span>Products</span>
              <span>/</span>
              <span className="text-amber-800 font-medium">{categoryName}</span>
            </div>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Section */}
            <div className="space-y-4">
              {images.length > 0 && (
                <div
                  ref={containerRef}
                  className="relative bg-white rounded-2xl shadow-lg overflow-hidden border border-amber-200 cursor-zoom-in"
                  onMouseMove={handleMouseMove}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => openModal(selectedImage)}
                >
                  <img
                    ref={imageRef}
                    src={images[selectedImage]}
                    alt={product.name}
                    className={`w-full h-96 object-cover transition-transform duration-300 ease-out ${
                      isZooming ? "cursor-zoom-out" : "cursor-zoom-in"
                    }`}
                    style={isZooming ? zoomStyle : {}}
                  />
                  {priceData?.discountPercentage > 0 && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold pointer-events-none">
                      {Math.round(priceData.discountPercentage)}% OFF
                    </div>
                  )}
                  {product.featured && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold pointer-events-none">
                      Featured
                    </div>
                  )}
                  <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm pointer-events-none">
                    Click to enlarge
                  </div>
                </div>
              )}

              {images.length > 1 && (
                <div className="flex space-x-3 overflow-x-auto">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                        selectedImage === index
                          ? "border-amber-500 shadow-lg scale-105"
                          : "border-amber-200 hover:border-amber-400"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details Section */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-block text-sm font-medium text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                    {categoryName}
                  </span>
                  {product.brand && (
                    <span className="inline-block text-sm font-medium text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                      {product.brand}
                    </span>
                  )}
                </div>

                <h1 className="text-3xl font-bold text-amber-800 mb-4">
                  {product.name}
                </h1>

                <p className="text-amber-600 mb-4">
                  {product.description?.short}
                </p>

                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <svg
                        key={rating}
                        className={`h-5 w-5 ${
                          (product.ratings?.avg || 0) > rating
                            ? "text-amber-400"
                            : "text-amber-200"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-amber-600 font-medium">
                      {product.ratings?.avg || 0}
                    </span>
                  </div>
                  <span className="text-amber-600">
                    ({product.ratings?.count || 0} reviews)
                  </span>
                </div>

                {/* Price Display */}
                {priceData && (
                  <div className="flex items-center space-x-4 mb-6">
                    <span className="text-3xl font-bold text-amber-800">
                      ₹
                      {priceData.sellingPrice?.toLocaleString("en-IN") ||
                        priceData.price?.toLocaleString("en-IN")}
                    </span>
                    {priceData.originalPrice &&
                      priceData.originalPrice >
                        (priceData.sellingPrice || priceData.price) && (
                        <span className="text-xl text-gray-500 line-through">
                          ₹{priceData.originalPrice.toLocaleString("en-IN")}
                        </span>
                      )}
                    {priceData.discountPercentage > 0 && (
                      <span className="text-green-600 font-semibold text-lg">
                        ({Math.round(priceData.discountPercentage)}% OFF)
                      </span>
                    )}
                  </div>
                )}

                {product.sku && (
                  <p className="text-sm text-amber-600 mb-4">
                    SKU: {product.sku}
                  </p>
                )}
              </div>

              {/* Product Options */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-amber-200">
                <div className="space-y-4">
                  {/* Size Selection */}
                  {product.priceBySize && product.priceBySize.length > 0 && (
                    <div>
                      <label className="block text-sm font-semibold text-amber-800 mb-2">
                        Size
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {product.priceBySize.map((priceItem) => (
                          <button
                            key={priceItem.size}
                            onClick={() => {
                              setSelectedSize(priceItem.size);
                              setQuantity(1); // Reset quantity when size changes
                            }}
                            className={`px-4 py-2 rounded-lg border-2 transition-all duration-300 min-w-[60px] ${
                              selectedSize === priceItem.size
                                ? "border-amber-500 bg-amber-100 text-amber-800"
                                : "border-amber-200 hover:border-amber-400 text-amber-600"
                            }`}
                          >
                            <div className="text-center">
                              <div className="font-semibold">
                                {priceItem.size}
                              </div>
                              <div className="text-xs">
                                ₹
                                {(
                                  priceItem.sellingPrice || priceItem.price
                                )?.toLocaleString("en-IN")}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Colors */}
                  {product.colors && product.colors.length > 0 && (
                    <div>
                      <label className="block text-sm font-semibold text-amber-800 mb-2">
                        Available Colors
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {product.colors.map((color, index) => (
                          <div
                            key={index}
                            className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm border border-amber-200"
                          >
                            {color}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quantity Selector */}
                  <div>
                    <label className="block text-sm font-semibold text-amber-800 mb-2">
                      Quantity {maxQuantity > 0 && `(Max: ${maxQuantity})`}
                    </label>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-800 font-semibold transition-colors duration-300"
                        disabled={quantity <= 1}
                      >
                        -
                      </button>
                      <span className="w-12 text-center font-semibold text-amber-800">
                        {quantity}
                      </span>
                      <button
                        onClick={() =>
                          setQuantity(Math.min(maxQuantity, quantity + 1))
                        }
                        className="w-10 h-10 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-800 font-semibold transition-colors duration-300"
                        disabled={quantity >= maxQuantity}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 pt-4">
                    <button
                      disabled={!isInStock || maxQuantity === 0}
                      className={`flex-1 py-3 px-6 rounded-full font-semibold shadow-lg transition-all duration-300 ${
                        isInStock && maxQuantity > 0
                          ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white hover:shadow-xl hover:scale-105"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {isInStock && maxQuantity > 0
                        ? "Add to Cart"
                        : "Out of Stock"}
                    </button>
                    <button
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      className={`p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 ${
                        isWishlisted
                          ? "bg-red-100 text-red-600 border-2 border-red-200"
                          : "bg-white text-amber-600 border-2 border-amber-200 hover:bg-amber-50"
                      }`}
                    >
                      <svg
                        className="h-6 w-6"
                        fill={isWishlisted ? "currentColor" : "none"}
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Stock Status */}
              <div className="flex items-center space-x-6 text-sm">
                {isInStock && maxQuantity > 0 ? (
                  <div
                    className={`flex items-center ${
                      isLowStock ? "text-orange-600" : "text-green-600"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full mr-2 ${
                        isLowStock ? "bg-orange-500" : "bg-green-500"
                      }`}
                    ></div>
                    {isLowStock
                      ? `Only ${maxQuantity} left in stock`
                      : "In Stock"}
                  </div>
                ) : (
                  <div className="flex items-center text-red-600">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    Out of Stock
                  </div>
                )}
                <div className="flex items-center text-amber-600">
                  <svg
                    className="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  Fast Delivery
                </div>
              </div>
            </div>
          </div>

          {/* Description and Details */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-amber-200">
              <h2 className="text-2xl font-bold text-amber-800 mb-6">
                Description
              </h2>
              <p className="text-amber-700 leading-relaxed mb-4">
                {product.description?.long ||
                  product.description?.short ||
                  "No description available."}
              </p>
              {product.tags && product.tags.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-amber-800 mb-2">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-amber-200">
              <h2 className="text-2xl font-bold text-amber-800 mb-6">
                Product Details
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-amber-700 font-medium">Category:</span>
                  <span className="text-amber-800">{categoryName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-700 font-medium">Stock:</span>
                  <span className="text-amber-800">{maxQuantity} units</span>
                </div>
                {product.weight?.value > 0 && (
                  <div className="flex justify-between">
                    <span className="text-amber-700 font-medium">Weight:</span>
                    <span className="text-amber-800">
                      {product.weight.value} {product.weight.unit}
                    </span>
                  </div>
                )}

                {priceData && (
                  <div className="pt-3 border-t border-amber-200">
                    <h3 className="text-lg font-semibold text-amber-800 mb-2">
                      Price Details ({selectedSize})
                    </h3>
                    <div className="space-y-2">
                      {priceData.originalPrice && (
                        <div className="flex justify-between">
                          <span className="text-amber-700">
                            Original Price:
                          </span>
                          <span className="text-amber-800">
                            ₹{priceData.originalPrice.toLocaleString("en-IN")}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-amber-700">Selling Price:</span>
                        <span className="text-amber-800 font-bold">
                          ₹
                          {(
                            priceData.sellingPrice || priceData.price
                          ).toLocaleString("en-IN")}
                        </span>
                      </div>
                      {priceData.originalPrice &&
                        priceData.originalPrice >
                          (priceData.sellingPrice || priceData.price) && (
                          <div className="flex justify-between">
                            <span className="text-amber-700">You Save:</span>
                            <span className="text-green-600 font-bold">
                              ₹
                              {(
                                priceData.originalPrice -
                                (priceData.sellingPrice || priceData.price)
                              ).toLocaleString("en-IN")}
                            </span>
                          </div>
                        )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {isModalOpen && images.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative max-w-7xl max-h-full p-4">
            <button
              onClick={closeModal}
              className="absolute top-4 m-3 right-4 z-10 bg-white text-gray-700 hover:bg-amber-400 hover:text-white transition-all duration-300 rounded-full shadow-lg p-2"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="relative">
              <img
                src={images[modalImageIndex]}
                alt={`${product.name} ${modalImageIndex + 1}`}
                className="max-w-full max-h-[90vh] object-contain mx-auto"
                style={{ maxWidth: "90vw" }}
              />

              {images.length > 1 && (
                <>
                  <button
                    onClick={prevModalImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-amber-300 transition-colors duration-200 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-2"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={nextModalImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-amber-300 transition-colors duration-200 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-2"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </>
              )}

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black bg-opacity-50 px-3 py-1 rounded-full text-sm">
                {modalImageIndex + 1} / {images.length}
              </div>
            </div>
          </div>

          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setModalImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                    modalImageIndex === index
                      ? "bg-amber-400"
                      : "bg-white bg-opacity-50 hover:bg-opacity-70"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <Footer />
    </div>
  );
}

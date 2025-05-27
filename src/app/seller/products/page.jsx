"use client";

import { useState, useEffect } from "react";
import SellerLayout from "@/components/layouts/SellerLayout";
import ProductsList from "@/components/seller/products/ProductsList";
import ProductModal from "@/components/product/ProductModal";
import { PlusCircle, Filter, Search } from "lucide-react";
import categories from "@/constants/categories";
import apiService from "@/app/utils/apiService";

export default function SellerProductsPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterSubcategory, setFilterSubcategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Helper function to validate and sanitize product data
  const sanitizeProduct = (product) => {
    if (!product) return null;

    return {
      ...product,
      name: product.name || "Unnamed Product",
      price: typeof product.price === "number" ? product.price : 0,
      originalPrice:
        typeof product.originalPrice === "number"
          ? product.originalPrice
          : undefined,
      category: product.category || "",
      subCategory: product.subCategory || "",
      description: product.description || "",
      stock:
        product.stock &&
        typeof product.stock === "object" &&
        typeof product.stock.quantity === "number"
          ? product.stock.quantity
          : 0,
      images: product.images || { main: null, extras: [] },
    };
  };

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const data = await apiService.get("/seller/products", true);
      const productsData = data?.data;

      if (Array.isArray(productsData)) {
        // Sanitize each product to ensure all required fields exist
        const sanitizedProducts = productsData
          .map(sanitizeProduct)
          .filter((product) => product !== null);
        setProducts(sanitizedProducts);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Failed to fetch products", error);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const openAddModal = () => {
    setSelectedProduct(null);
    setModalOpen(true);
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    console.log("hello close the modal");

    setSelectedProduct(null);
    setModalOpen(false);
  };

  const handleDelete = async (productId) => {
    if (!productId) return;

    try {
      await apiService.delete(`/seller/products/${productId}`, true);
      setProducts(products.filter((p) => p?._id !== productId));
    } catch (error) {
      console.error("Failed to delete product", error);
    }
  };

  const handleSave = async (productData) => {
    if (!productData) return;

    try {
      setLoading(true);

      if (selectedProduct?._id) {
        const updated = await apiService.put(
          `/seller/products/${selectedProduct._id}`,
          productData,
          true
        );
        if (updated) {
          const sanitizedUpdated = sanitizeProduct(updated);
          if (sanitizedUpdated) {
            setProducts(
              products.map((p) =>
                p?._id === selectedProduct._id ? sanitizedUpdated : p
              )
            );
          }
        }
      } else {
        const images = productData?.images;
        const mainImage = images?.main;
        const extraImages = images?.extras;

        if (!mainImage?.file) return;

        const cleanProductData = {
          ...productData,
          images: {
            ...images,
            main: {
              file: mainImage.file,
            },
            extras: Array.isArray(extraImages)
              ? extraImages
                  .filter((img) => img?.file)
                  .map((img) => ({ file: img.file }))
              : [],
          },
        };

        const formData = new FormData();
        formData.append("data", JSON.stringify(cleanProductData));
        formData.append("mainImage", cleanProductData.images.main.file);

        cleanProductData.images.extras.forEach((imgObj) => {
          if (imgObj?.file) {
            formData.append("extraImages", imgObj.file);
          }
        });

        const created = await apiService.post(
          "/seller/products",
          formData,
          true,
          true
        );

        if (created) {
          const sanitizedCreated = sanitizeProduct(created);
          if (sanitizedCreated) {
            setProducts([...products, sanitizedCreated]);
          }
        }
      }

      closeModal();
      fetchProducts();
    } catch (error) {
      console.error("Failed to save product", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = Array.isArray(products)
    ? products.filter((product) => {
        if (!product) return false;

        const productName = product.name || "";
        const productCategory = product.category;
        const productSubCategory = product.subCategory;

        if (filterCategory !== "all" && productCategory !== filterCategory) {
          return false;
        }

        if (
          filterSubcategory !== "all" &&
          productSubCategory !== filterSubcategory
        ) {
          return false;
        }

        if (searchQuery && searchQuery.trim()) {
          const query = searchQuery.toLowerCase().trim();
          const name = productName.toLowerCase();
          if (!name.includes(query)) {
            return false;
          }
        }

        return true;
      })
    : [];

  const getSubcategories = () => {
    if (filterCategory === "all" || !Array.isArray(categories)) return [];
    const cat = categories.find((c) => c?.id === filterCategory);
    return Array.isArray(cat?.subcategories) ? cat.subcategories : [];
  };

  return (
    <SellerLayout>
      <div className="min-h-screen p-4 text-gray-900">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-black">Products Management</h1>
          <button
            onClick={openAddModal}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Add New Product
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value || "")}
              />
            </div>

            <div className="flex items-center text-gray-700">
              <Filter className="h-5 w-5 text-gray-600 mr-2" />
              <select
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
                value={filterCategory}
                onChange={(e) => {
                  const value = e?.target?.value || "all";
                  setFilterCategory(value);
                  setFilterSubcategory("all");
                }}
              >
                <option value="all">All Categories</option>
                {Array.isArray(categories) &&
                  categories.map((category) =>
                    category?.id && category?.name ? (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ) : null
                  )}
              </select>
            </div>

            {filterCategory !== "all" && (
              <div>
                <select
                  className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                  value={filterSubcategory}
                  onChange={(e) =>
                    setFilterSubcategory(e?.target?.value || "all")
                  }
                >
                  <option value="all">All Subcategories</option>
                  {getSubcategories().map((subcategory, index) =>
                    subcategory ? (
                      <option key={index} value={subcategory}>
                        {subcategory}
                      </option>
                    ) : null
                  )}
                </select>
              </div>
            )}
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-700"></div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center text-gray-500 py-20">
              No products found. Please add some products.
            </div>
          ) : (
            <ProductsList
              products={filteredProducts}
              onEdit={openEditModal}
              onDelete={handleDelete}
            />
          )}
        </div>

        {modalOpen && (
          <ProductModal
            product={selectedProduct}
            categories={Array.isArray(categories) ? categories : []}
            onClose={closeModal}
            onSave={handleSave}
            loading={loading}
          />
        )}
      </div>
    </SellerLayout>
  );
}

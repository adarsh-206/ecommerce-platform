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

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const data = await apiService.get("/seller/products", true);

      setProducts(Array.isArray(data.data) ? data.data : []);
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
    setSelectedProduct(null);
    setModalOpen(false);
  };

  const handleDelete = async (productId) => {
    try {
      await apiService.delete(`/seller/products/${productId}`, true);
      setProducts(products.filter((p) => p._id !== productId));
    } catch (error) {
      console.error("Failed to delete product", error);
    }
  };

  const handleSave = async (productData) => {
    try {
      if (selectedProduct) {
        const updated = await apiService.put(
          `/seller/products/${selectedProduct._id}`,
          productData,
          true
        );
        setProducts(
          products.map((p) => (p._id === selectedProduct._id ? updated : p))
        );
      } else {
        const created = await apiService.post(
          "/seller/products",
          productData,
          true
        );
        setProducts([...products, created]);
      }
      closeModal();
    } catch (error) {
      console.error("Failed to save product", error);
    }
  };

  const filteredProducts = Array.isArray(products)
    ? products.filter((product) => {
        console.log("Checking product:", product.name);

        if (filterCategory !== "all" && product.category !== filterCategory) {
          console.log(
            `Excluded by category: product.category=${product.category}, filterCategory=${filterCategory}`
          );
          return false;
        }

        if (
          filterSubcategory !== "all" &&
          product.subCategory !== filterSubcategory
        ) {
          console.log(
            `Excluded by subCategory: product.subCategory=${product.subCategory}, filterSubcategory=${filterSubcategory}`
          );
          return false;
        }

        if (
          searchQuery &&
          !product.name.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          console.log(
            `Excluded by searchQuery: product.name=${product.name}, searchQuery=${searchQuery}`
          );
          return false;
        }

        console.log(`Included: ${product.name}`);
        return true;
      })
    : [];

  const getSubcategories = () => {
    if (filterCategory === "all") return [];
    const cat = categories.find((c) => c.id === filterCategory);
    return cat ? cat.subcategories : [];
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
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center text-gray-700">
              <Filter className="h-5 w-5 text-gray-600 mr-2" />
              <select
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
                value={filterCategory}
                onChange={(e) => {
                  setFilterCategory(e.target.value);
                  setFilterSubcategory("all");
                }}
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {filterCategory !== "all" && (
              <div>
                <select
                  className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                  value={filterSubcategory}
                  onChange={(e) => setFilterSubcategory(e.target.value)}
                >
                  <option value="all">All Subcategories</option>
                  {getSubcategories().map((subcategory, index) => (
                    <option key={index} value={subcategory}>
                      {subcategory}
                    </option>
                  ))}
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
            categories={categories}
            onClose={closeModal}
            onSave={handleSave}
          />
        )}
      </div>
    </SellerLayout>
  );
}

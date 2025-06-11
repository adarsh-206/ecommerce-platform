"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Filter, X, ShoppingBag } from "lucide-react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import apiService from "@/app/utils/apiService";
import ProductCard from "../product/ProductCard";

export default function CategoryProducts({ category }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [category?.id, selectedSubcategory]);

  const fetchProducts = async () => {
    if (!category?.id) return;

    setLoading(true);
    try {
      const endpoint = selectedSubcategory
        ? `/buyer/get-product-by-category/${category.id}?subcategoryId=${selectedSubcategory.id}`
        : `/buyer/get-product-by-category/${category.id}`;

      const data = await apiService.get(endpoint);
      setProducts(data?.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubcategorySelect = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setSidebarOpen(false);
  };

  const clearSubcategoryFilter = () => {
    setSelectedSubcategory(null);
  };

  const SubcategoryCard = ({ subcategory, isSelected, onClick }) => (
    <div
      onClick={() => onClick(subcategory)}
      className={`flex items-center p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
        isSelected
          ? "border-amber-500 bg-amber-50 shadow-md"
          : "border-gray-100 bg-white hover:border-amber-200 hover:bg-amber-25 hover:shadow-sm"
      }`}
    >
      <div
        className={`w-3 h-3 rounded-full mr-3 transition-colors ${
          isSelected ? "bg-amber-500" : "bg-gray-300"
        }`}
      />
      <span
        className={`font-medium transition-colors ${
          isSelected ? "text-amber-800" : "text-gray-700 hover:text-amber-700"
        }`}
      >
        {subcategory.name}
      </span>
    </div>
  );

  const Sidebar = () => (
    <div className="w-80 h-screen bg-white border-r border-gray-100 shadow-sm">
      <div className="p-6 border-b border-gray-50">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800 flex items-center">
            <Filter className="w-6 h-6 mr-3 text-amber-600" />
            Filter Products
          </h3>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-full hover:bg-gray-50 transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {selectedSubcategory && (
          <button
            onClick={clearSubcategoryFilter}
            className="inline-flex items-center px-4 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors font-medium text-sm"
          >
            <X className="w-4 h-4 mr-2" />
            Clear Filter
          </button>
        )}
      </div>

      <div className="p-6">
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
            <ShoppingBag className="w-5 h-5 mr-2 text-amber-600" />
            Categories
          </h4>

          <div className="space-y-3">
            {category?.subcategories?.map((subcategory) => (
              <SubcategoryCard
                key={subcategory.id}
                subcategory={subcategory}
                isSelected={selectedSubcategory?.id === subcategory.id}
                onClick={handleSubcategorySelect}
              />
            ))}
          </div>

          {category?.subcategories?.length === 0 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-50 flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 text-gray-300" />
              </div>
              <p className="text-gray-500 text-sm">
                No subcategories available
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const MobileSidebar = () => (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div
        className={`fixed left-0 top-0 h-full z-50 transform transition-transform duration-300 lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Header />
      <div className="flex">
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        <MobileSidebar />

        <div className="flex-1">
          <section className="py-8 lg:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center">
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden mr-4 p-3 rounded-xl bg-white border-2 border-gray-100 shadow-lg hover:shadow-xl hover:border-amber-200 transition-all duration-300"
                  >
                    <Filter className="w-5 h-5 text-amber-600" />
                  </button>

                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
                      <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                    </div>
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <h1 className="text-base sm:text-xl font-semibold text-gray-800">
                        {selectedSubcategory
                          ? selectedSubcategory.name
                          : category?.name}
                      </h1>
                      {selectedSubcategory && (
                        <p className="text-xs sm:text-sm text-amber-600 font-medium">
                          in {category?.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-sm font-medium text-gray-600 bg-white px-4 py-2 rounded-full border-2 border-gray-100 shadow-sm">
                    {loading ? (
                      <div className="flex items-center">
                        <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mr-2"></div>
                        Loading...
                      </div>
                    ) : (
                      `${products.length} ${
                        products.length === 1 ? "item" : "items"
                      }`
                    )}
                  </div>
                </div>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {[...Array(8)].map((_, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 animate-pulse"
                    >
                      <div className="w-full h-56 bg-gray-200 rounded-xl mb-6"></div>
                      <div className="h-6 bg-gray-200 rounded-lg mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded-lg w-2/3 mb-3"></div>
                      <div className="h-8 bg-gray-200 rounded-lg w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center shadow-lg">
                    <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 text-amber-400" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                    No products found
                  </h3>
                  <p className="text-sm sm:text-lg text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                    {selectedSubcategory
                      ? `We couldn't find any products in ${selectedSubcategory.name}. Try browsing other categories or check back later.`
                      : `No products are currently available in ${category?.name}. New items are added regularly!`}
                  </p>
                  {selectedSubcategory && (
                    <button
                      onClick={clearSubcategoryFilter}
                      className="inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm sm:text-base"
                    >
                      <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      Browse All {category?.name}
                    </button>
                  )}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}

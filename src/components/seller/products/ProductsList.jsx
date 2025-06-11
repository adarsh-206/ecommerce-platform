"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Edit,
  Trash2,
  Eye,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import categories from "@/constants/categories";

export default function ProductsList({ products, onEdit, onDelete }) {
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "ascending",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getProductValue = (product, key) => {
    switch (key) {
      case "name":
        return product.name || "";
      case "category":
        return product.category || "";
      case "price":
        return product.priceBySize && product.priceBySize.length > 0
          ? product.priceBySize[0].sellingPrice || 0
          : 0;
      case "stock":
        return product.stock && typeof product.stock === "object"
          ? product.stock.quantity || 0
          : typeof product.stock === "number"
          ? product.stock
          : 0;
      default:
        return product[key] || "";
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    const aValue = getProductValue(a, sortConfig.key);
    const bValue = getProductValue(b, sortConfig.key);

    if (aValue < bValue) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return (
        <ArrowUpDown
          className={`h-4 w-4 ml-1 ${
            sortConfig.direction === "ascending"
              ? "text-rose-600"
              : "text-rose-400"
          }`}
        />
      );
    }
    return <ArrowUpDown className="h-4 w-4 ml-1 text-gray-400" />;
  };

  const getStockStatus = (product) => {
    let stockQuantity = 0;
    let lowStockThreshold = 10;

    if (product?.stock) {
      if (typeof product.stock === "object") {
        stockQuantity = parseInt(product.stock.quantity) || 0;
        lowStockThreshold = parseInt(product.stock.lowStockThreshold) || 10;
      } else if (typeof product.stock === "number") {
        stockQuantity = parseInt(product.stock);
      }
    }

    if (stockQuantity <= 0) {
      return {
        className: "bg-red-100 text-red-800",
        label: "Out of Stock",
        showLowStock: true,
      };
    }

    if (stockQuantity <= lowStockThreshold) {
      return {
        className: "bg-red-100 text-red-800",
        label: `${stockQuantity} left`,
        showLowStock: true,
      };
    }

    if (stockQuantity <= lowStockThreshold * 1.5) {
      return {
        className: "bg-yellow-100 text-yellow-800",
        label: `${stockQuantity} in stock`,
        showLowStock: false,
      };
    }

    return {
      className: "bg-green-100 text-green-800",
      label: `${stockQuantity} in stock`,
      showLowStock: false,
    };
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">
          No products found. Add your first product to get started.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <button
                  className="flex items-center font-medium uppercase"
                  onClick={() => handleSort("name")}
                >
                  Product {getSortIcon("name")}
                </button>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <button
                  className="flex items-center font-medium uppercase"
                  onClick={() => handleSort("category")}
                >
                  Category {getSortIcon("category")}
                </button>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <button
                  className="flex items-center font-medium uppercase"
                  onClick={() => handleSort("price")}
                >
                  Price {getSortIcon("price")}
                </button>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <button
                  className="flex items-center font-medium uppercase"
                  onClick={() => handleSort("stock")}
                >
                  Stock {getSortIcon("stock")}
                </button>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentProducts.map((product) => {
              const stockStatus = getStockStatus(product);

              return (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden relative">
                        {product.images && product.images.main ? (
                          <Image
                            src={product.images.main.url}
                            alt={product.name}
                            width={40}
                            height={40}
                            className="object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://via.placeholder.com/40";
                            }}
                            unoptimized
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            N/A
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {product.description?.short &&
                            product.description.short
                              .split(" ")
                              .slice(0, 5)
                              .join(" ") +
                              (product.description.short.split(" ").length > 5
                                ? "..."
                                : "")}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {categories.find((c) => c.id == product.category)?.name ||
                        ""}
                    </div>
                    <div className="text-sm text-gray-500">
                      {categories
                        .find((c) => c.id == product.category)
                        ?.subcategories.find(
                          (sc) => sc.id == product.subCategory
                        )?.name || ""}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {product?.priceBySize &&
                      product?.priceBySize?.length > 0 ? (
                        <div className="space-y-1">
                          <div className="font-semibold">
                            ₹
                            {product.priceBySize[0]?.sellingPrice?.toFixed(2) ||
                              "0.00"}
                          </div>
                          {product.priceBySize[0]?.originalPrice &&
                            product.priceBySize[0].originalPrice !==
                              product.priceBySize[0].sellingPrice && (
                              <div className="text-xs text-gray-500 line-through">
                                ₹
                                {product.priceBySize[0].originalPrice.toFixed(
                                  2
                                )}
                              </div>
                            )}
                          {product.priceBySize[0]?.discountPercentage > 0 && (
                            <div className="text-xs text-green-600 font-medium">
                              {product.priceBySize[0].discountPercentage}% OFF
                            </div>
                          )}
                        </div>
                      ) : (
                        "N/A"
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
                      {product.priceBySize &&
                        product.priceBySize.length > 0 && (
                          <>Size: {product.priceBySize[0].size}</>
                        )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${stockStatus.className}`}
                    >
                      {stockStatus.label}
                    </span>
                    {stockStatus.showLowStock && (
                      <div className="text-xs text-red-600 mt-1">
                        {product.stock &&
                        ((typeof product.stock === "object" &&
                          product.stock.quantity === 0) ||
                          (typeof product.stock === "number" &&
                            product.stock === 0))
                          ? "Out of stock"
                          : "Low stock"}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      className="text-rose-600 hover:text-rose-900 mr-3"
                      onClick={() =>
                        window.open(`/products/${product._id}`, "_blank")
                      }
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                    <button
                      className="text-rose-600 hover:text-rose-900 mr-3"
                      onClick={() => onEdit(product)}
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this product?"
                          )
                        ) {
                          onDelete(product._id);
                        }
                      }}
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-4">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
                currentPage === 1
                  ? "text-gray-300"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Previous
            </button>
            <button
              onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
                currentPage === totalPages
                  ? "text-gray-300"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">{indexOfFirstProduct + 1}</span>{" "}
                to{" "}
                <span className="font-medium">
                  {Math.min(indexOfLastProduct, products.length)}
                </span>{" "}
                of <span className="font-medium">{products.length}</span>{" "}
                results
              </p>
            </div>
            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <button
                  onClick={() => paginate(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                    currentPage === 1 ? "cursor-not-allowed" : ""
                  }`}
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>

                {[...Array(totalPages).keys()].map((number) => (
                  <button
                    key={number + 1}
                    onClick={() => paginate(number + 1)}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                      currentPage === number + 1
                        ? "z-10 bg-rose-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
                        : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    }`}
                  >
                    {number + 1}
                  </button>
                ))}

                <button
                  onClick={() =>
                    paginate(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                    currentPage === totalPages ? "cursor-not-allowed" : ""
                  }`}
                >
                  <span className="sr-only">Next</span>
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

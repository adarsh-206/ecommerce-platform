"use client";

import { useEffect, useState } from "react";
import apiService from "@/app/utils/apiService";
import {
  Loader,
  AlertTriangle,
  Download,
  Package,
  Users,
  Image as ImageIcon,
  Eye,
} from "lucide-react";
import SellerLayout from "@/components/layouts/SellerLayout";

const QuotePage = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchQuotes = async () => {
    try {
      const response = await apiService.get("/quote/", {}, true);
      setQuotes(response?.data?.quotes || []);
    } catch (err) {
      setError("Failed to load quotes.");
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = async (imageUrl, filename = "design-image") => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${filename}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
      // Fallback: open in new tab if download fails
      window.open(imageUrl, "_blank");
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const SkeletonCard = () => (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-6 animate-pulse">
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-2">
          <div className="h-5 w-32 bg-gradient-to-r from-gray-200 to-gray-100 rounded-lg" />
          <div className="h-3 w-24 bg-gray-100 rounded-md" />
        </div>
        <div className="h-8 w-16 bg-amber-100 rounded-full" />
      </div>

      <div className="space-y-3 mb-4">
        <div className="h-3 w-full bg-gray-100 rounded" />
        <div className="h-3 w-3/4 bg-gray-50 rounded" />
      </div>

      <div className="flex gap-3">
        <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl" />
        <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl" />
      </div>
    </div>
  );

  return (
    <SellerLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-amber-50/30">
        <div className="p-8 max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-amber-100 rounded-xl">
                <Package className="w-6 h-6 text-amber-600" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-800 to-amber-600 bg-clip-text text-transparent">
                Customer Quotes
              </h1>
            </div>
            <p className="text-gray-600 ml-11">
              Manage and review customer quote requests
            </p>
          </div>

          {loading ? (
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="p-4 bg-red-50 rounded-full mb-4">
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Error Loading Quotes
              </h3>
              <p className="text-red-600 text-center">{error}</p>
            </div>
          ) : quotes.length === 0 ? (
            <div className="text-center py-16">
              <div className="p-4 bg-gray-100 rounded-full inline-block mb-4">
                <Package className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No Quotes Yet
              </h3>
              <p className="text-gray-500">
                Customer quote requests will appear here when submitted.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span>
                  {quotes.length} quote request{quotes.length !== 1 ? "s" : ""}{" "}
                  received
                </span>
              </div>

              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {quotes.map((quote) => (
                  <div
                    key={quote._id}
                    className="bg-amber-50 border border-amber-100 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 group"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-amber-700 transition-colors">
                          {quote.productType}
                        </h2>
                        <p className="text-sm text-gray-500">Product Request</p>
                      </div>
                      <div className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-semibold">
                        Qty: {quote.quantity}
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700">
                          Sizes:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {quote.sizes.map((size, index) => (
                            <span
                              key={index}
                              className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-medium"
                            >
                              {size}
                            </span>
                          ))}
                        </div>
                      </div>

                      {quote.notes && (
                        <div className="bg-gray-50 rounded-lg p-3 border-l-4 border-amber-300">
                          <p className="text-sm text-gray-700 italic">
                            "{quote.notes}"
                          </p>
                        </div>
                      )}
                    </div>

                    {quote.image?.length > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-3">
                          <ImageIcon className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-700">
                            Design References
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {quote.image.map((imgUrl, index) => (
                            <div key={index} className="relative group/image">
                              <img
                                src={imgUrl}
                                alt={`Design ${index + 1}`}
                                className="w-full h-20 object-cover rounded-lg border border-gray-200 group-hover/image:scale-105 transition-transform duration-200"
                              />
                              <div className="absolute inset-0 bg-black/0 hover:bg-black/50 rounded-lg opacity-0 group-hover/image:opacity-100 transition-all duration-200 flex items-center justify-center gap-2">
                                <button
                                  onClick={() => window.open(imgUrl, "_blank")}
                                  className="bg-white/90 hover:bg-white text-gray-700 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                                  title="View Image"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() =>
                                    downloadImage(
                                      imgUrl,
                                      `${quote.productType}-design-${index + 1}`
                                    )
                                  }
                                  className="bg-white/90 hover:bg-white text-gray-700 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                                  title="Download Image"
                                >
                                  <Download className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {quote.user && (
                      <div className="pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-semibold">
                              {quote.user.fullName?.charAt(0)?.toUpperCase() ||
                                "U"}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {quote.user.fullName}
                            </p>
                            <p className="text-xs text-gray-500">
                              {quote.user.email}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </SellerLayout>
  );
};

export default QuotePage;

"use client";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import { TrendingUp, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import apiService from "@/app/utils/apiService";
import MainLayout from "@/components/layouts/MainLayout";

export const bestSellersMetadata = {
  title: "Best Sellers at Chaka-Chak | Most Popular Fashion Items & Top Picks",
  description:
    "Explore Chaka-Chak's best-selling collection featuring the most popular and highly-rated fashion items that have captured the hearts of thousands of satisfied customers across India. Our best sellers section showcases proven winners - products that consistently receive rave reviews, high ratings, and repeat purchases from our loyal customer base. These aren't just popular items; they're fashion statements that have stood the test of time and continue to be customer favorites month after month. From our signature graphic tees that perfectly blend humor with style to elegant accessories that add the perfect finishing touch to any outfit, every item in this collection has earned its place through genuine customer love and satisfaction. You'll find versatile pieces that work for multiple occasions, high-quality products that offer exceptional value for money, and trending items that keep you looking fashionable without breaking the bank. Our best sellers include everything from casual wear that's perfect for everyday comfort to statement pieces that make you the center of attention at parties and social gatherings. These products have been tested by real customers in real-life situations, ensuring that when you choose from our best sellers, you're investing in items that deliver on both style and functionality. Join the thousands of happy customers who have made these items their wardrobe staples and discover why these particular pieces have become the talk of the town in fashion circles.",
  keywords:
    "chaka chak best sellers, popular fashion, top rated products, customer favorites, most loved items",
  icons: {
    icon: "/chaka-chak-logo.ico",
    apple: "/chaka-chak-logo.png",
  },
};

const LoadingCard = () => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
    <div className="h-48 bg-gray-200"></div>
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="h-6 bg-gray-200 rounded w-1/3"></div>
    </div>
  </div>
);

export default function BestSellers() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(false);
  const cachedData = useRef(null);

  const getProducts = async () => {
    if (cachedData.current) {
      setProducts(cachedData.current);
      setLoading(false);
      return;
    }
    try {
      const data = await apiService.get("/buyer/products/best-seller");
      const result = data?.data || [];
      cachedData.current = result;
      if (isMounted.current) {
        setProducts(result);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      if (isMounted.current) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    isMounted.current = true;
    getProducts();
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (products.length === 0 || loading) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % products.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [products, loading]);

  return (
    <MainLayout>
      <section className="p-12 pb-24 bg-gradient-to-r from-amber-50 via-orange-50 to-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-row justify-between items-start sm:items-center mb-8 sm:mb-12 gap-4">
            <div className="flex items-center space-x-2">
              <Link
                href="/"
                className="text-amber-800 text-lg font-semibold no-underline"
              >
                Home
              </Link>
              <span className="text-gray-500 text-sm">/</span>
              <span className="text-amber-800 text-xl font-bold">
                Best Sellers
              </span>
            </div>
          </div>

          {loading ? (
            <>
              <div className="sm:hidden">
                <LoadingCard />
              </div>
              <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {Array.from({ length: 4 }).map((_, index) => (
                  <LoadingCard key={index} />
                ))}
              </div>
            </>
          ) : products.length > 0 ? (
            <>
              <div className="sm:hidden">
                <div className="overflow-hidden rounded-xl">
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                      transform: `translateX(-${currentSlide * 100}%)`,
                    }}
                  >
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className="w-full flex-shrink-0 px-2"
                      >
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          ) : null}
        </div>
      </section>
    </MainLayout>
  );
}

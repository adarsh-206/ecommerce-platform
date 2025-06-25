"use client";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import { useState, useEffect, useRef } from "react";
import apiService from "@/app/utils/apiService";
import MainLayout from "@/components/layouts/MainLayout";

export const newArrivalsMetadata = {
  title: "New Arrivals at Chaka-Chak | Latest Fashion Trends & Fresh Styles",
  description:
    "Discover the hottest new arrivals at Chaka-Chak, where cutting-edge fashion meets unbeatable style and affordability. Our new arrivals section is constantly updated with the freshest designs, trending styles, and must-have pieces that fashion enthusiasts across India are talking about. From the latest graphic tees featuring contemporary artwork and witty slogans to sophisticated formal wear perfect for professional settings, our new collection encompasses a diverse range of products designed to cater to every fashion preference and lifestyle need. Each week, we carefully select and add new items to our inventory, ensuring that our customers always have access to the most current fashion trends and seasonal essentials. Whether you're searching for summer essentials like breezy dresses and comfortable shorts, winter warmers including cozy sweaters and stylish jackets, or year-round staples like versatile tops and classic bottoms, our new arrivals section is your go-to destination for staying ahead of the fashion curve. We work closely with emerging designers and established brands to bring you exclusive pieces that you won't find elsewhere, making Chaka-Chak your secret weapon for standing out in any crowd. Don't miss out on limited-edition items and special collections that sell out quickly - check back regularly to see what's new and exciting in the world of Chaka-Chak fashion.",
  keywords:
    "chaka chak new arrivals, latest fashion, new collection, trending styles, fresh designs, fashion updates",
  icons: {
    icon: "/chaka-chak-logo.ico",
    apple: "/chaka-chak-logo.png",
  },
};

const LoadingCard = () => (
  <div className="bg-amber-50 rounded-xl shadow-lg overflow-hidden animate-pulse">
    <div className="h-48 bg-gray-200"></div>
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="h-6 bg-gray-200 rounded w-1/3"></div>
    </div>
  </div>
);

export default function NewArrivals() {
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
      const data = await apiService.get("/buyer/products/new-arrival");
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
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
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
                New Arrivals
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
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
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

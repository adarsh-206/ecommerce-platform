"use client";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import { Sparkles, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import apiService from "@/app/utils/apiService";

export default function NewArrivals() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState([]);
  const isMounted = useRef(false);
  const cachedData = useRef(null);

  const getProducts = async () => {
    if (cachedData.current) {
      setProducts(cachedData.current);
      return;
    }
    try {
      const data = await apiService.get("/buyer/products/new-arrival");
      const result = data?.data || [];
      cachedData.current = result;
      if (isMounted.current) {
        setProducts(result);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
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
    if (products.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % products.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [products]);

  if (products.length === 0) return null;

  return (
    <section className="py-20 bg-gradient-to-r from-amber-50 via-orange-50 to-rose-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-row justify-between items-start sm:items-center mb-8 sm:mb-12 gap-4">
          <div className="flex items-center">
            <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-amber-600 mr-3 sm:mr-4" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-amber-800">
              New Arrivals
            </h2>
          </div>
          <Link
            href="/new-arrivals"
            className="group flex items-center px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full text-amber-800 hover:text-orange-700 font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 text-sm sm:text-base"
          >
            View All
            <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="sm:hidden">
          <div className="overflow-hidden rounded-xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {products.map((product) => (
                <div key={product.id} className="w-full flex-shrink-0 px-2">
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
      </div>
    </section>
  );
}

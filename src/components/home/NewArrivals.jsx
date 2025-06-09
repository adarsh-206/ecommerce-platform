"use client";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import { Sparkles, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function NewArrivals() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const products = [
    {
      id: 1,
      name: "Unisex Cotton T-Shirt",
      price: 399,
      image:
        "https://cms.cloudinary.vpsvc.com/image/upload/c_scale,dpr_auto,f_auto,q_70,w_auto:50:550/India%20LOB/Category%20Images/Premium-Men_s-Cotton-T-Shirt_Category-image_1x1",
      category: "Clothing",
      rating: 4.6,
      href: "/product/unisex-cotton-tshirt",
    },
    {
      id: 2,
      name: "Printed Tote Bag",
      price: 249,
      image: "https://m.media-amazon.com/images/I/61rorcTqRLL._AC_UY1100_.jpg",
      category: "Accessories",
      rating: 4.3,
      href: "/product/printed-tote-bag",
    },
    {
      id: 3,
      name: "Classic Baseball Cap",
      price: 199,
      image: "https://m.media-amazon.com/images/I/819D7Z-kFfL._AC_UY1000_.jpg",
      category: "Headwear",
      rating: 4.4,
      href: "/product/classic-baseball-cap",
    },
    {
      id: 4,
      name: "Pet Bandana – Small",
      price: 299,
      image:
        "https://images.meesho.com/images/products/425269760/3vjhn_512.webp",
      category: "Pet Products",
      rating: 4.5,
      href: "/product/pet-bandana-small",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % products.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [products.length]);

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
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
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

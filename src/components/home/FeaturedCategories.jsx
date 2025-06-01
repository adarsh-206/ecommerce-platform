"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function FeaturedCategories() {
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [loadedImages, setLoadedImages] = useState({});

  const categories = [
    {
      name: "Clothing",
      href: "/featured_categories/clothing",
      images: [
        "/featured_categories/clothing/tshirt_1.jpg",
        "/featured_categories/clothing/tshirt_2.jpg",
        "/featured_categories/clothing/tshirt_3.jpg",
        "/featured_categories/clothing/tshirt_4.jpg",
      ],
    },
    {
      name: "Accessories",
      href: "/featured_categories/accessories",
      images: [
        "/featured_categories/accessories/acc_1.jpg",
        "/featured_categories/accessories/acc_2.jpg",
        "/featured_categories/accessories/acc_3.jpg",
        "/featured_categories/accessories/acc_4.jpg",
      ],
    },
    {
      name: "Headwear",
      href: "/featured_categories/headwear",
      images: [
        "/featured_categories/headwear/head_1.jpg",
        "/featured_categories/headwear/head_2.jpg",
        "/featured_categories/headwear/head_3.jpg",
      ],
    },
    {
      name: "Pet Products",
      href: "/featured_categories/pet-products",
      images: [
        "/featured_categories/pet-products/pet_1.jpg",
        "/featured_categories/pet-products/pet_2.jpg",
      ],
    },
    {
      name: "Home & Living",
      href: "/featured_categories/home-living",
      images: [
        "/featured_categories/home-living/home_1.jpg",
        "/featured_categories/home-living/home_2.jpg",
        "/featured_categories/home-living/home_3.jpg",
      ],
    },
  ];

  // Preload all images
  useEffect(() => {
    const imageMap = {};

    categories.forEach((category, catIndex) => {
      imageMap[catIndex] = [];
      category.images.forEach((src) => {
        const img = new Image();
        img.src = src;
        imageMap[catIndex].push(img);
      });
    });

    setLoadedImages(imageMap);
  }, []);

  useEffect(() => {
    const intervals = categories.map((category, categoryIndex) =>
      setInterval(() => {
        setCurrentImageIndex((prev) => ({
          ...prev,
          [categoryIndex]:
            ((prev[categoryIndex] || 0) + 1) % category.images.length,
        }));
      }, 4000 + categoryIndex * 700)
    );

    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-r from-amber-50 via-orange-50 to-rose-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center mb-16">
          <Sparkles className="h-8 w-8 text-amber-600 mr-4" />
          <h2 className="text-4xl font-bold text-amber-800">
            Featured Categories
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              href={category.href}
              className="group flex flex-col items-center"
            >
              <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 mb-6">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-200 via-orange-200 to-rose-200 p-1 shadow-lg">
                  <div className="w-full h-full rounded-full overflow-hidden bg-white shadow-inner relative">
                    {category.images.map((src, imgIndex) => (
                      <img
                        key={imgIndex}
                        src={src}
                        alt={`${category.name} ${imgIndex}`}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                          (currentImageIndex[index] || 0) === imgIndex
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <h3 className="text-lg md:text-xl font-semibold text-amber-800 hover:text-orange-700 transition-colors duration-300 text-center">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

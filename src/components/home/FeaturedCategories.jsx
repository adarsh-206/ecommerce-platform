"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function FeaturedCategories() {
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [loadedImages, setLoadedImages] = useState({});
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(2);

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

  useEffect(() => {
    const updateItemsPerSlide = () => {
      const width = window.innerWidth;
      if (width >= 480) {
        setItemsPerSlide(3);
      } else if (width >= 360) {
        setItemsPerSlide(2);
      } else {
        setItemsPerSlide(2);
      }
    };

    updateItemsPerSlide();
    window.addEventListener("resize", updateItemsPerSlide);
    return () => window.removeEventListener("resize", updateItemsPerSlide);
  }, []);

  useEffect(() => {
    const autoSlide = setInterval(() => {
      setCurrentSlide(
        (prev) => (prev + 1) % Math.ceil(categories.length / itemsPerSlide)
      );
    }, 4000);

    return () => clearInterval(autoSlide);
  }, [categories.length, itemsPerSlide]);

  const CategoryCard = ({ category, index }) => (
    <Link
      href={category.href}
      className="group flex flex-col items-center min-w-0 flex-shrink-0"
    >
      <div className="relative w-32 h-32 xs:w-24 xs:h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 mb-3 md:mb-6">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-200 via-orange-200 to-rose-200 p-1 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
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

      <h3 className="text-md xs:text-sm sm:text-lg md:text-xl font-semibold text-amber-800 hover:text-orange-700 transition-colors duration-300 text-center px-1">
        {category.name}
      </h3>
    </Link>
  );

  return (
    <section className="py-12 md:py-20 bg-gradient-to-r from-amber-50 via-orange-50 to-rose-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center mb-8 md:mb-16">
          <Sparkles className="h-6 w-6 md:h-8 md:w-8 text-amber-600 mr-3 md:mr-4" />
          <h2 className="text-2xl md:text-4xl font-bold text-amber-800">
            Featured Categories
          </h2>
        </div>

        <div className="block sm:hidden">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: Math.ceil(categories.length / 2) }).map(
                (_, slideIndex) => (
                  <div
                    key={slideIndex}
                    className="w-full flex justify-center space-x-8 px-4 flex-shrink-0"
                  >
                    {categories
                      .slice(slideIndex * 2, slideIndex * 2 + 2)
                      .map((category, index) => (
                        <CategoryCard
                          key={category.name}
                          category={category}
                          index={slideIndex * 2 + index}
                        />
                      ))}
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 lg:gap-12">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.name}
              category={category}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";

export default function FeaturedCategories() {
  const [hoverIndex, setHoverIndex] = useState(null);

  const categories = [
    {
      name: "Clothing",
      description: "Discover our latest fashion collection",
      image:
        "https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg?cs=srgb&dl=pexels-pixabay-325876.jpg&fm=jpg",
      href: "/categories/clothing",
    },
    {
      name: "Accessories",
      description: "Complete your look with stylish accessories",
      image:
        "https://img.freepik.com/free-photo/top-view-accessoires-travel-with-women-clothing-concept-white-mobilephone-watch-bag-hat-map-camera-necklace-trousers-sunglasses-white-wood-table_1921-106.jpg?semt=ais_hybrid&w=740",
      href: "/categories/accessories",
    },
    {
      name: "Headwear",
      description: "Top off your style with premium headwear",
      image:
        "https://c8.alamy.com/comp/2C44AWK/headwear-hats-men-and-women-elegant-headwear-modern-and-retro-caps-stylish-hats-and-caps-fashion-accessories-vector-illustration-icons-set-2C44AWK.jpg",
      href: "/categories/headwear",
    },
    {
      name: "Pet Products",
      description: "Spoil your furry friends with the best",
      image:
        "https://img.freepik.com/free-photo/pet-accessories-still-life-with-chew-bone-toys_23-2148949561.jpg",
      href: "/categories/pet-products",
    },
    {
      name: "Home & Living",
      description: "Transform your space with our collection",
      image:
        "https://m.media-amazon.com/images/I/51khQ-xSjQL._AC_UF894,1000_QL80_.jpg",
      href: "/categories/home-living",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center mb-10">
          <TrendingUp className="h-6 w-6 text-indigo-500 mr-3" />
          <h2 className="text-3xl font-bold text-gray-900">
            Shop Our Top Categories
          </h2>
        </div>

        <div className="relative">
          <div className="flex space-x-6 justify-between mb-8">
            {categories.map((category, index) => (
              <Link
                key={category.name}
                href={category.href}
                className="group relative block w-1/5"
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <div className="aspect-square relative overflow-hidden rounded-lg shadow-md transition-all duration-300 group-hover:shadow-xl">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>

                  <div className="absolute inset-0 flex flex-col justify-end p-4">
                    <h3 className="text-lg font-bold text-white mb-1">
                      {category.name}
                    </h3>

                    <p
                      className={`text-gray-200 text-sm line-clamp-2 mb-2 transform transition-all duration-300 ${
                        hoverIndex === index
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-2"
                      }`}
                    >
                      {category.description}
                    </p>

                    <div
                      className={`flex items-center justify-between transform transition-all duration-300 ${
                        hoverIndex === index
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-2"
                      }`}
                    >
                      <span className="text-sm font-medium text-white">
                        Shop Now
                      </span>
                      <span className="bg-white rounded-full p-1 text-indigo-500">
                        <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = ["/banners/banner_1.webp", "/banners/banner_2.webp"];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <>
      <div className="hidden sm:block relative w-full h-[650px] overflow-hidden">
        <div
          className="flex w-full h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {banners.map((banner, index) => (
            <div key={index} className="relative w-full h-full flex-shrink-0">
              <Image
                src={banner}
                alt={`Hero Banner Slide ${index + 1}`}
                fill
                priority={index === 0}
                unoptimized
                className="object-cover object-center"
              />
              <div className="absolute inset-0">
                {index === 0 && (
                  <h1 className="sr-only">
                    Chaka-Chak – Unique Fashion, Accessories & Decor
                  </h1>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 sm:p-3 rounded-full transition-all duration-300 group"
        >
          <svg
            className="w-6 h-6 group-hover:scale-110 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 sm:p-3 rounded-full transition-all duration-300 group"
        >
          <svg
            className="w-6 h-6 group-hover:scale-110 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <div className="sm:hidden w-full h-[350px] bg-gradient-to-r from-[#e0c3a9] to-[#d4a98e] relative overflow-hidden font-[TC_October]">
        <div
          className="flex w-full h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {[
            {
              src: "/banners/man_1.png",
              title: "BOLD PRINTS",
              subtitle: "SAVE BIG!",
              description: "T-Shirts up to 50% off",
            },
            {
              src: "/banners/man_2.png",
              title: "TRENDY STYLES",
              subtitle: "LIMITED DEAL",
              description: "Hurry! Offer ends soon",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="relative w-full h-full flex-shrink-0 flex shadow-inner"
            >
              <div className="w-2/3 h-full relative">
                <Image
                  src={item.src}
                  alt={`Mobile Banner ${index + 1}`}
                  fill
                  priority={index === 0}
                  unoptimized
                  className="object-cover object-center"
                />
              </div>
              <div className="w-1/3 h-full flex flex-col justify-center items-center text-center px-2 text-[#4c321c]">
                <h2 className="text-base font-extrabold drop-shadow-md mb-1 leading-snug">
                  {item.title}
                </h2>
                <h3 className="text-sm font-semibold drop-shadow mb-1">
                  {item.subtitle}
                </h3>
                <p className="text-xs drop-shadow-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/70 text-[#4c321c] p-1.5 rounded-full shadow-md transition"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/70 text-[#4c321c] p-1.5 rounded-full shadow-md transition"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </>
  );
}

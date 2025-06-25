"use client";

import MainLayout from "@/components/layouts/MainLayout";

export const aboutUsMetadata = {
  title: "About Chaka-Chak | Our Story, Mission & Vision for Quirky Fashion",
  description:
    "Learn about Chaka-Chak's inspiring journey from a small startup to India's leading destination for clean, quirky, and totally unique fashion experiences. Founded with a simple yet powerful vision - to make fashion accessible, affordable, and fun for everyone - Chaka-Chak has grown into a trusted brand that serves thousands of happy customers across the country. Our story begins with a passionate team of fashion enthusiasts who believed that everyone deserves to express their personality through their clothing choices without having to compromise on quality or budget. We recognized a gap in the Indian fashion market for products that were both trendy and affordable, quirky yet sophisticated, and accessible to people from all walks of life. This realization drove us to create Chaka-Chak, a platform that celebrates individuality and encourages self-expression through fashion. Our mission is to democratize fashion by offering high-quality, unique products at prices that don't require you to empty your savings account. We work tirelessly to source the best materials, collaborate with talented designers, and maintain strict quality control standards to ensure that every product bearing the Chaka-Chak name meets our high expectations and yours. Our vision extends beyond just selling clothes - we aim to build a community of fashion-forward individuals who aren't afraid to stand out, make bold choices, and embrace their unique style with confidence and pride.",
  keywords:
    "chaka chak about, company story, fashion mission, brand vision, quirky fashion India, our story",
  icons: {
    icon: "/chaka-chak-logo.ico",
    apple: "/chaka-chak-logo.png",
  },
};

export default function AboutUsPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
        <div className="w-full px-4 sm:px-10 lg:px-20 py-14 sm:py-20 lg:py-28">
          <div className="text-center mb-14">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-amber-800 mb-4 leading-tight tracking-tight">
              About <span className="text-orange-600">Chaka-Chak</span>
            </h1>
            <div className="w-24 h-1.5 bg-gradient-to-r from-amber-600 to-orange-600 mx-auto rounded-full"></div>
          </div>

          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg sm:text-xl text-amber-800 font-semibold mb-6 leading-relaxed">
              Smart living meets{" "}
              <span className="text-orange-600 italic">Indori swag!</span> 🚀
            </p>

            <p className="text-base sm:text-lg text-amber-700 font-medium leading-relaxed">
              Inspired by Indore’s vibe,{" "}
              <span className="font-bold text-amber-900">"Chaka-Chak"</span>{" "}
              means clean, cool, and perfectly sorted. We’re building a platform
              that brings creative expression into everyday essentials — fresh,
              stylish, and made for now.
            </p>
          </div>
        </div>

        <div className="w-full px-4 sm:px-10 lg:px-20 pb-20">
          <div className="max-w-5xl mx-auto">
            <div className="mb-20">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-amber-800 mb-8 text-center">
                Born in India. Built for Everyone. ✨
              </h2>
              <p className="text-base sm:text-lg text-amber-700 leading-relaxed text-center font-medium max-w-3xl mx-auto">
                We craft lifestyle picks that are playful, functional, and full
                of character. Everything’s designed with intention — made to
                reflect *you*, and rooted in quality and simplicity.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 mb-20">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-amber-800 mb-4">
                  🎯 Our Vision
                </h3>
                <p className="text-base sm:text-lg text-amber-700 font-medium leading-relaxed">
                  To be India’s most-loved homegrown brand — blending style,
                  sustainability, and everyday joy. Think clean homes, cool
                  vibes, and conscious choices. That’s the dream.
                </p>
              </div>

              <div className="text-center lg:text-right">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-amber-800 mb-4">
                  💪 What Drives Us
                </h3>
                <p className="text-base sm:text-lg text-amber-700 font-medium leading-relaxed">
                  People-first thinking, always. We support local talent, keep
                  packaging minimal, and focus on fast, easy experiences that
                  feel personal and fresh.
                </p>
              </div>
            </div>

            <div className="text-center mb-20">
              <h3 className="text-3xl sm:text-4xl font-extrabold text-amber-800 mb-8">
                Just Getting <span className="text-orange-600">Started</span> ❤️
              </h3>
              <div className="max-w-3xl mx-auto">
                <p className="text-base sm:text-lg text-amber-700 font-medium mb-6 leading-relaxed">
                  We're early in our journey — but every click, share, and smile
                  helps shape what’s next. Big plans ahead, and we’re building
                  it with heart.
                </p>
                <p className="text-base sm:text-lg text-amber-700 font-medium leading-relaxed">
                  So whether you're shopping for yourself or gifting good vibes,
                  you're part of a smarter, cleaner future.
                </p>
              </div>
            </div>

            <div className="text-center py-16">
              <div className="inline-block transform hover:scale-105 transition-all duration-300">
                <p className="text-2xl sm:text-3xl text-amber-800 font-bold mb-2">
                  Ab toh bolo –
                </p>
                <p className="text-3xl sm:text-4xl font-extrabold italic text-amber-800">
                  <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    "Kya Chaka-Chak brand hai bhiya!"
                  </span>{" "}
                  🔥
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

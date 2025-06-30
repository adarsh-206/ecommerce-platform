"use client";

import { Percent, ShieldCheck, Headphones, Shield } from "lucide-react";

export default function PromoFeatures() {
  const features = [
    {
      icon: Percent,
      title: "Get an Instant Discount",
      subtitle: "Enjoy your first order with a special discount!",
    },
    {
      icon: ShieldCheck,
      title: "Secure Payment Guarantee",
      subtitle: "Your payments are 100% secure with our encryption.",
    },
    {
      icon: Headphones,
      title: "24/7 Customer Support",
      subtitle: "We're here anytime you need us.",
    },
    {
      icon: Shield,
      title: "100% Satisfaction Guaranteed",
      subtitle: "Shop with confidence — we’ve got you covered.",
    },
  ];

  return (
    <section className="bg-gradient-to-r from-[#7c533e] to-[#6b432f] backdrop-blur-lg py-8">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 group hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center group-hover:from-amber-200 group-hover:to-orange-200 transition-all duration-300 shadow-lg">
                  <feature.icon
                    size={24}
                    className="text-amber-700 group-hover:text-orange-700 transition-colors duration-300"
                  />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-bold text-sm sm:text-base leading-tight group-hover:text-amber-100 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm mt-1 group-hover:text-amber-200 transition-colors duration-300">
                  {feature.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from "react";
import { Sparkles, Shirt } from "lucide-react";
import "./style.css";

export default function CustomizeProduct() {
  return (
    <section className="bg-orange-100 py-16">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <div className="mb-5 flex justify-center">
          <span className="inline-flex items-center rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-900">
            <Sparkles className="w-5 h-5 mr-2 text-amber-600" />
            Your Style, Your Way
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl text-amber-800 font-extrabold leading-tight">
          Create Apparel That's Uniquely Yours
        </h2>
        <p className="mt-4 text-sm text-amber-700 font-medium max-w-2xl mx-auto">
          Unleash your creativity. Design custom T-shirts, hoodies, and more
          with your own design and logos. It’s fun, easy, and the possibilities
          are endless.
        </p>
        <div className="mt-12 flex justify-center">
          <a
            href="/customize-your-product"
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-3 w-full sm:w-auto text-lg font-bold text-white rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-amber-400/40 focus:outline-none shiny-button"
          >
            <Shirt className="w-5 h-5 text-white transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110" />
            Customize Your Apparel
            <span className="absolute inset-0 rounded-xl ring-2 ring-transparent group-hover:ring-white/40 transition duration-300 pointer-events-none" />
          </a>
        </div>
      </div>
    </section>
  );
}

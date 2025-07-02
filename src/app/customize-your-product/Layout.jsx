"use client";

import React from "react";
import { motion } from "framer-motion";
import { RotateCw, ZoomIn, Paintbrush, UploadCloud, Info } from "lucide-react";

export const Instructions = () => (
  <motion.div
    initial={{ y: 30, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ type: "spring", stiffness: 80, damping: 18, delay: 0.5 }}
    className="col-span-full max-w-7xl bg-white/40 backdrop-blur-2xl rounded-2xl p-6 md:my-24"
  >
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-center text-base text-gray-800 font-bold uppercase tracking-wide mb-4">
          How to Customize
        </h3>
        <ul className="space-y-4 text-sm text-gray-700">
          <li className="flex items-start gap-3">
            <RotateCw className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <span>
              <strong className="text-gray-800">Rotate:</strong> Drag the mouse
              to rotate the 3D model
            </span>
          </li>
          <li className="flex items-start gap-3">
            <ZoomIn className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <span>
              <strong className="text-gray-800">Zoom:</strong> Scroll in/out to
              zoom
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Paintbrush className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <span>
              <strong className="text-gray-800">Color:</strong> Choose a color
              from the palette
            </span>
          </li>
          <li className="flex items-start gap-3">
            <UploadCloud className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <span>
              <strong className="text-gray-800">Design:</strong> Upload and
              adjust your own design
            </span>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-center text-base text-gray-800 font-bold uppercase tracking-wide mb-4">
          Please Note
        </h3>
        <ul className="space-y-4 text-sm text-gray-700">
          <li className="flex items-start gap-3">
            <Info className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <span>
              This is a sample mockup meant to help you visualize your design on
              a T-shirt. It’s a rough representation to give you a feel of the
              final product.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Info className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <span>
              At the moment, mockups are only available for T-shirts. Our team
              is actively working to bring more realistic previews and support
              for other products. You can still upload designs for any category
              in the dropdown—we’ll review and send a personalized quote with
              your custom design.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Info className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <span>
              For the best preview and print quality, please upload a
              high-resolution image.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Info className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <span>
              We recommend submitting a PNG, JPEG, or SVG file that is at least{" "}
              <strong>3600×4800 pixels</strong> at <strong>300 DPI</strong> (or
              proportional to the product size) to ensure excellent print
              quality.
            </span>
          </li>
        </ul>
      </div>
    </div>
  </motion.div>
);

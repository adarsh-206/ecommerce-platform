"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { FormField } from "./Customizer";
import { showToast } from "@/utils/showToast";

export const SubmitStep = ({ onSubmit, isSubmitted }) => {
  const [formData, setFormData] = useState({
    productType: "",
    quantity: 1,
    sizes: [],
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSizeChange = (size) => {
    setFormData((prev) => {
      const newSizes = prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size];
      return { ...prev, sizes: newSizes };
    });
  };

  const handleFormSubmit = async () => {
    if (
      !formData.productType ||
      !formData.quantity ||
      formData.sizes.length === 0
    ) {
      showToast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      showToast.success("Your quote has been submitted successfully!");
    } catch (error) {
      console.error("Submission failed:", error);
      showToast.error("There was an issue submitting your request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const productTypes = [
    "T-Shirt",
    "Hoodie",
    "Tank Top",
    "Long Sleeve",
    "Polo Shirt",
  ];
  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex flex-col items-center justify-center gap-6 py-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center"
        >
          <CheckCircle className="w-8 h-8 text-white" />
        </motion.div>
        <div className="text-center space-y-2">
          <h3 className="text-xl font-bold text-gray-800">
            Designs Submitted Successfully!
          </h3>
          <p className="text-gray-600">
            We’ll send you a personalized quote within 24–48 hours.
          </p>
        </div>
        <div className="bg-gradient-to-r from-amber-50 to-rose-50 p-4 rounded-xl border border-amber-200/50">
          <p className="text-sm text-gray-700 text-center">
            For any queries, contact us at{" "}
            <a href="mailto:chakachakteam@gmail.com" className="underline">
              chakachakteam@gmail.com
            </a>
            .
          </p>
        </div>
      </motion.div>
    );
  }

  const isFormValid =
    formData.productType && formData.quantity > 0 && formData.sizes.length > 0;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2 pb-4">
        <h3 className="text-lg font-bold text-gray-800">Submit Your Design</h3>
        <p className="text-sm text-gray-600">
          Let's bring your custom apparel to life!
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="Product Type"
            type="select"
            value={formData.productType}
            onChange={(e) => updateField("productType", e.target.value)}
            options={productTypes}
            required
            className="text-gray-600"
          />
          <FormField
            label="Quantity"
            type="number"
            value={formData.quantity}
            onChange={(e) => updateField("quantity", e.target.value)}
            placeholder="1"
            required
            className="text-gray-600"
          />
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Sizes <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-4 gap-3">
            {availableSizes.map((size) => (
              <label
                key={size}
                className={`flex items-center justify-center p-2 text-sm font-medium rounded-lg cursor-pointer transition-all duration-200 border ${
                  formData.sizes.includes(size)
                    ? "bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white shadow-md"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100 border-gray-200"
                }`}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={formData.sizes.includes(size)}
                  onChange={() => handleSizeChange(size)}
                />
                {size}
              </label>
            ))}
          </div>
        </div>

        <FormField
          label="Additional Notes"
          type="textarea"
          value={formData.notes}
          onChange={(e) => updateField("notes", e.target.value)}
          placeholder="Any special requests, delivery date preferences, or other details..."
          className="text-gray-600 text-xs"
        />
      </div>

      <motion.button
        onClick={handleFormSubmit}
        disabled={isSubmitting || !isFormValid}
        whileHover={{ scale: isSubmitting || !isFormValid ? 1 : 1.02 }}
        whileTap={{ scale: isSubmitting || !isFormValid ? 1 : 0.98 }}
        className={`w-full px-6 py-4 rounded-xl font-bold transition-all duration-300 
    ${
      isSubmitting || !isFormValid
        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
        : "bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white shadow-lg hover:shadow-xl"
    }`}
      >
        {isSubmitting ? "Submitting..." : "Submit Order Request"}
      </motion.button>

      <div className="text-center">
        <p className="text-xs text-gray-500">
          You'll receive a personalized quote within 24–48 hours with the best
          available options.
        </p>
      </div>
    </div>
  );
};

export default SubmitStep;

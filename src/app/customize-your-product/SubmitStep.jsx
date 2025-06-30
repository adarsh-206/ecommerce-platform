"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { FormField } from "./Customizer"; // Assuming FormField is exported from Customizer.jsx
import { showToast } from "@/utils/showToast"; // Assuming showToast utility is available

export const SubmitStep = ({ onSubmit, isSubmitted }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    productType: "",
    quantity: "",
    sizes: [], // Changed to an array to accept multiple sizes
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // General purpose field updater
  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Specific handler for multiple checkbox selection for sizes
  const handleSizeChange = (size) => {
    setFormData((prev) => {
      const newSizes = prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size) // Deselect size
        : [...prev.sizes, size]; // Select size
      return { ...prev, sizes: newSizes };
    });
  };

  // New async function to handle the entire submission process
  const handleFormSubmit = async () => {
    // Basic validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.productType ||
      !formData.quantity ||
      formData.sizes.length === 0 // Check if at least one size is selected
    ) {
      // Using a toast for error notification is cleaner than an alert
      showToast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      // The onSubmit prop is called with the form data
      await onSubmit(formData);
      // Show a success toast upon successful submission
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

  // Success screen remains the same
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
          <h3 className="text-xl font-bold text-gray-800">Order Submitted!</h3>
          <p className="text-gray-600">
            We'll contact you within 24 hours with a quote and timeline.
          </p>
        </div>
        <div className="bg-gradient-to-r from-amber-50 to-rose-50 p-4 rounded-xl border border-amber-200/50">
          <p className="text-sm text-gray-700 text-center">
            Check your email for order confirmation details.
          </p>
        </div>
      </motion.div>
    );
  }

  // Form rendering
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2 pb-4">
        <h3 className="text-lg font-bold text-gray-800">Submit Your Design</h3>
        <p className="text-sm text-gray-600">
          Let's bring your custom apparel to life!
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Added className to style the input text color */}
        <FormField
          label="Full Name"
          value={formData.name}
          onChange={(e) => updateField("name", e.target.value)}
          placeholder="Enter your full name"
          required
          className="text-gray-600"
        />
        <FormField
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={(e) => updateField("email", e.target.value)}
          placeholder="your@email.com"
          required
          className="text-gray-600"
        />
        <FormField
          label="Phone Number"
          type="tel"
          value={formData.phone}
          onChange={(e) => updateField("phone", e.target.value)}
          placeholder="+91 98765 43210"
          required
          className="text-gray-600"
        />
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

        {/* New multi-select component for sizes */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Sizes <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-4 gap-3">
            {availableSizes.map((size) => (
              <label
                key={size}
                className={`flex items-center justify-center p-3 text-sm font-medium rounded-lg cursor-pointer transition-all duration-200 border ${
                  formData.sizes.includes(size)
                    ? "bg-rose-500 text-white border-rose-500 shadow-md"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100 border-gray-200"
                }`}
              >
                <input
                  type="checkbox"
                  className="sr-only" // Hide the default checkbox
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
          className="text-gray-600"
        />
      </div>

      <motion.button
        onClick={handleFormSubmit}
        disabled={isSubmitting} // Disable button while submitting
        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
        className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white px-6 py-4 rounded-xl font-bold shadow-lg transition-all duration-300 hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Submitting..." : "Submit Order Request"}
      </motion.button>

      <div className="text-center">
        <p className="text-xs text-gray-500">
          By submitting, you agree to receive a quote via email or phone.
        </p>
      </div>
    </div>
  );
};

export default SubmitStep;

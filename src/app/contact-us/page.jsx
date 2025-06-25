"use client";

import { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import apiService from "../utils/apiService";
import { showToast } from "@/utils/showToast";

export const contactUsMetadata = {
  title: "Contact Chaka-Chak | Customer Support, Help & Get in Touch",
  description:
    "Get in touch with the Chaka-Chak team for any questions, concerns, feedback, or assistance you might need during your shopping journey with us. We pride ourselves on providing exceptional customer service that goes above and beyond to ensure your complete satisfaction with every interaction. Our dedicated customer support team is available through multiple channels to address your inquiries promptly and professionally, whether you need help with product selection, order tracking, return processing, payment issues, or general information about our services. We understand that shopping online can sometimes raise questions, and we're here to provide clear, helpful answers that make your experience smooth and enjoyable. You can reach us through our contact form, email, phone, or social media channels - whichever method is most convenient for you. We also provide detailed information about our physical location, business hours, and response times so you know exactly what to expect when you contact us. Our team consists of knowledgeable fashion experts who can provide styling advice, product recommendations, and technical support to help you make the most of your Chaka-Chak experience. We value your feedback immensely as it helps us continuously improve our products and services. Whether you have suggestions for new products, compliments about your recent purchase, or concerns that need addressing, we want to hear from you. Your voice matters to us, and we're committed to building lasting relationships with every customer who chooses Chaka-Chak for their fashion needs.",
  keywords:
    "chaka chak contact, customer support, help center, get in touch, customer service, contact details",
  icons: {
    icon: "/chaka-chak-logo.ico",
    apple: "/chaka-chak-logo.png",
  },
};

export default function ContactUsPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      showToast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      await apiService.post("/ticket", form, false);

      setForm({ name: "", email: "", message: "" });
      showToast.success("Your message was sent successfully!");
    } catch (err) {
      showToast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 py-12 px-6">
        <div className="max-w-3xl mx-auto bg-white/70 backdrop-blur-lg rounded-3xl shadow-lg p-8">
          <h1 className="text-4xl font-extrabold text-center text-amber-800 mb-4">
            Get in Touch
          </h1>
          <p className="text-center text-amber-700 mb-8">
            We'd love to hear from you! Whether you have a question, feedback,
            or just want to say hello, drop us a message below.
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-amber-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full text-gray-800 px-4 py-2 border border-amber-200 rounded-xl shadow-sm focus:ring-amber-400 focus:border-amber-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-amber-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full text-gray-800 px-4 py-2 border border-amber-200 rounded-xl shadow-sm focus:ring-amber-400 focus:border-amber-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-amber-700 mb-1">
                Message
              </label>
              <textarea
                rows="5"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Your message..."
                className="w-full text-gray-800 px-4 py-2 border border-amber-200 rounded-xl shadow-sm focus:ring-amber-400 focus:border-amber-400 outline-none resize-none"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={loading}
                className={`bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white px-6 py-2 rounded-xl font-semibold shadow-md transition-all duration-300 transform ${
                  loading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:from-amber-700 hover:via-orange-700 hover:to-rose-700 hover:scale-105"
                }`}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-amber-600">
            Or email us directly at{" "}
            <a
              href="mailto:chakachakteam@gmail.com"
              className="underline hover:text-amber-800"
            >
              chakachakteam@gmail.com
            </a>
          </p>
        </div>
      </div>
    </MainLayout>
  );
}

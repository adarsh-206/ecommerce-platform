"use client";

import MainLayout from "@/components/layouts/MainLayout";

export default function ContactUsPage() {
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

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-amber-700 mb-1">
                Name
              </label>
              <input
                type="text"
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
                placeholder="Your message..."
                className="w-full text-gray-800 px-4 py-2 border border-amber-200 rounded-xl shadow-sm focus:ring-amber-400 focus:border-amber-400 outline-none resize-none"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white px-6 py-2 rounded-xl font-semibold shadow-md hover:from-amber-700 hover:via-orange-700 hover:to-rose-700 transition-all duration-300 transform hover:scale-105"
              >
                Send Message
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

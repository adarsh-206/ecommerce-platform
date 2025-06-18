"use client";

import MainLayout from "@/components/layouts/MainLayout";

export default function AboutUsPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-amber-800 mb-6">
            About Chaka-Chak
          </h1>
          <p className="text-lg text-amber-700 mb-8">
            Chaka-Chak is dedicated to redefining cleanliness and convenience
            through sustainable, locally sourced solutions. Our mission is to
            make everyday living smarter, more hygienic, and beautifully simple.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="bg-white/70 rounded-2xl p-6 shadow-md">
              <h2 className="text-xl font-semibold text-amber-800 mb-2">
                Our Vision
              </h2>
              <p className="text-amber-700 text-sm leading-relaxed">
                To become the most trusted household brand in India by offering
                eco-conscious products that empower communities and promote
                mindful living.
              </p>
            </div>
            <div className="bg-white/70 rounded-2xl p-6 shadow-md">
              <h2 className="text-xl font-semibold text-amber-800 mb-2">
                What Drives Us
              </h2>
              <p className="text-amber-700 text-sm leading-relaxed">
                We believe in ethical sourcing, user-friendly design, and
                helping local sellers grow. Every product on our platform is a
                step toward a cleaner tomorrow.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

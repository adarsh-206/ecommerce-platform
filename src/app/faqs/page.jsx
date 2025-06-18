"use client";

import MainLayout from "@/components/layouts/MainLayout";

export default function FAQsPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-extrabold text-amber-800 text-center mb-10">
            Frequently Asked Questions
          </h1>
          <div className="space-y-6">
            <div className="bg-white/70 rounded-2xl p-6 shadow-md">
              <h2 className="text-lg font-semibold text-amber-800 mb-2">
                How do I place an order?
              </h2>
              <p className="text-amber-700 text-sm leading-relaxed">
                Browse through our product categories and click "Add to Cart"
                for the items you want. Once ready, go to your cart, click
                "Checkout," and follow the steps to complete your purchase.
              </p>
            </div>
            <div className="bg-white/70 rounded-2xl p-6 shadow-md">
              <h2 className="text-lg font-semibold text-amber-800 mb-2">
                What payment methods are accepted?
              </h2>
              <p className="text-amber-700 text-sm leading-relaxed">
                We accept UPI, credit/debit cards, net banking, and cash on
                delivery (COD) in select locations.
              </p>
            </div>
            <div className="bg-white/70 rounded-2xl p-6 shadow-md">
              <h2 className="text-lg font-semibold text-amber-800 mb-2">
                Can I track my order?
              </h2>
              <p className="text-amber-700 text-sm leading-relaxed">
                Yes, once your order is shipped, you'll receive a tracking link
                via email and SMS. You can also check the status under the "My
                Orders" section in your account.
              </p>
            </div>
            <div className="bg-white/70 rounded-2xl p-6 shadow-md">
              <h2 className="text-lg font-semibold text-amber-800 mb-2">
                What is your return policy?
              </h2>
              <p className="text-amber-700 text-sm leading-relaxed">
                You can request a return within 7 days of delivery if the
                product is unused and in original condition. Some items are
                non-returnable—please check the product page for specific return
                eligibility.
              </p>
            </div>
            <div className="bg-white/70 rounded-2xl p-6 shadow-md">
              <h2 className="text-lg font-semibold text-amber-800 mb-2">
                Do you offer customer support?
              </h2>
              <p className="text-amber-700 text-sm leading-relaxed">
                Absolutely! Our support team is available 7 days a week via
                chat, email, or phone. Visit our "Contact Us" page for more
                details.
              </p>
            </div>
            <div className="bg-white/70 rounded-2xl p-6 shadow-md">
              <h2 className="text-lg font-semibold text-amber-800 mb-2">
                Are your products eco-friendly?
              </h2>
              <p className="text-amber-700 text-sm leading-relaxed">
                Yes, most of our products are made from sustainable materials,
                ethically sourced from local communities. We’re committed to
                reducing environmental impact at every step.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

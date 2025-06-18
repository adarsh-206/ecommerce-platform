"use client";

import MainLayout from "@/components/layouts/MainLayout";

export default function ShippingAndDeliveryPolicyPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 px-6 py-12">
        <div className="max-w-4xl mx-auto text-left">
          <h1 className="text-4xl font-extrabold text-amber-800 text-center mb-10">
            Shipping & Delivery Policy
          </h1>

          <section className="bg-white/70 rounded-2xl p-6 shadow-md mb-6">
            <h2 className="text-xl font-semibold text-amber-800 mb-2">
              Delivery Coverage
            </h2>
            <p className="text-amber-700 text-sm leading-relaxed">
              We currently deliver across all major cities and towns in India.
              Remote locations may experience extended delivery timelines.
              You’ll be notified during checkout if your PIN code is
              serviceable.
            </p>
          </section>

          <section className="bg-white/70 rounded-2xl p-6 shadow-md mb-6">
            <h2 className="text-xl font-semibold text-amber-800 mb-2">
              Estimated Delivery Time
            </h2>
            <p className="text-amber-700 text-sm leading-relaxed">
              Orders are usually dispatched within 1–2 business days. Most
              deliveries are completed within 3–7 business days, depending on
              your location. Delays may occur during peak seasons or due to
              external factors like weather or courier constraints.
            </p>
          </section>

          <section className="bg-white/70 rounded-2xl p-6 shadow-md mb-6">
            <h2 className="text-xl font-semibold text-amber-800 mb-2">
              Shipping Charges
            </h2>
            <p className="text-amber-700 text-sm leading-relaxed">
              We offer free shipping on all prepaid orders above ₹499. For
              orders below this amount, a flat shipping fee of ₹49 is
              applicable. COD orders may incur an additional service charge.
            </p>
          </section>

          <section className="bg-white/70 rounded-2xl p-6 shadow-md mb-6">
            <h2 className="text-xl font-semibold text-amber-800 mb-2">
              Order Tracking
            </h2>
            <p className="text-amber-700 text-sm leading-relaxed">
              Once your order is shipped, you'll receive a tracking link via SMS
              and email. You can also track your order from the "My Orders"
              section after logging in.
            </p>
          </section>

          <section className="bg-white/70 rounded-2xl p-6 shadow-md">
            <h2 className="text-xl font-semibold text-amber-800 mb-2">
              Delayed or Failed Deliveries
            </h2>
            <p className="text-amber-700 text-sm leading-relaxed">
              In case of unexpected delays or if the package is marked as
              delivered but not received, please contact our support team within
              48 hours. We’ll promptly investigate and resolve the issue.
            </p>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}

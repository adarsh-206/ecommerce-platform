"use client";

import MainLayout from "@/components/layouts/MainLayout";

export default function CancellationAndRefundPolicyPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 px-6 py-12">
        <div className="max-w-4xl mx-auto text-left">
          <h1 className="text-4xl font-extrabold text-amber-800 text-center mb-10">
            Cancellation & Refund Policy
          </h1>

          <section className="bg-white/70 rounded-2xl p-6 shadow-md mb-6">
            <h2 className="text-xl font-semibold text-amber-800 mb-2">
              Order Cancellation
            </h2>
            <p className="text-amber-700 text-sm leading-relaxed">
              Orders can be cancelled within 1 hour of placement from the "My
              Orders" section, provided they haven’t been packed or shipped.
              Once the order is in transit, it cannot be cancelled.
            </p>
          </section>

          <section className="bg-white/70 rounded-2xl p-6 shadow-md mb-6">
            <h2 className="text-xl font-semibold text-amber-800 mb-2">
              Refunds for Cancellations
            </h2>
            <p className="text-amber-700 text-sm leading-relaxed">
              For prepaid orders, the refund will be initiated immediately after
              a successful cancellation. The amount will be credited back to
              your original payment method within 5–7 business days.
            </p>
          </section>

          <section className="bg-white/70 rounded-2xl p-6 shadow-md mb-6">
            <h2 className="text-xl font-semibold text-amber-800 mb-2">
              Return Eligibility
            </h2>
            <p className="text-amber-700 text-sm leading-relaxed">
              Items must be unused, undamaged, and returned in original
              packaging within 7 days of delivery. Please ensure you include all
              accessories and invoice copy.
            </p>
          </section>

          <section className="bg-white/70 rounded-2xl p-6 shadow-md mb-6">
            <h2 className="text-xl font-semibold text-amber-800 mb-2">
              Refunds for Returns
            </h2>
            <p className="text-amber-700 text-sm leading-relaxed">
              Once your returned item is received and inspected, the refund will
              be processed within 3–5 business days. You will receive an update
              via email or SMS.
            </p>
          </section>

          <section className="bg-white/70 rounded-2xl p-6 shadow-md">
            <h2 className="text-xl font-semibold text-amber-800 mb-2">
              Non-Refundable Items
            </h2>
            <p className="text-amber-700 text-sm leading-relaxed">
              Products marked as "Final Sale," perishable goods, personal care
              items, and items damaged due to misuse are not eligible for refund
              or return.
            </p>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}

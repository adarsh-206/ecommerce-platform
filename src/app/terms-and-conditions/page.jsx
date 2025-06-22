"use client";

import MainLayout from "@/components/layouts/MainLayout";

export default function TermsAndConditionsPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
        <div className="w-full px-4 sm:px-10 lg:px-20 py-14 sm:py-20 lg:py-28">
          <div className="text-center mb-14">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-amber-800 mb-4 leading-tight tracking-tight">
              Terms & <span className="text-orange-600">Conditions</span>
            </h1>
            <div className="w-24 h-1.5 bg-gradient-to-r from-amber-600 to-orange-600 mx-auto rounded-full mb-6"></div>
            <p className="text-base sm:text-lg text-amber-700 font-medium max-w-3xl mx-auto">
              Last updated: 18 June 2025
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 sm:p-8 lg:p-10 shadow-md border border-amber-100 mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-amber-800 mb-6">
                Welcome to Chaka-Chak! 🚀
              </h2>
              <p className="text-base sm:text-lg text-amber-700 leading-relaxed font-medium">
                By accessing and using our platform, you agree to be bound by
                these Terms and Conditions. Please read them carefully as they
                govern your relationship with Chaka-Chak and your use of our
                services.
              </p>
            </div>

            <div className="space-y-8">
              <section className="bg-white/50 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-amber-100">
                <h3 className="text-xl sm:text-2xl font-bold text-amber-800 mb-4">
                  1. Acceptance of Terms
                </h3>
                <p className="text-amber-700 leading-relaxed">
                  By creating an account, placing orders, or using our services,
                  you acknowledge that you have read, understood, and agree to
                  be bound by these Terms and Conditions, our Privacy Policy,
                  and all applicable laws and regulations of India.
                </p>
              </section>

              <section className="bg-white/50 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-amber-100">
                <h3 className="text-xl sm:text-2xl font-bold text-amber-800 mb-4">
                  2. Eligibility
                </h3>
                <div className="text-amber-700 leading-relaxed space-y-3">
                  <p>You must be at least 18 years old to use our services.</p>
                  <p>
                    If you are between 13-18 years old, you may use our services
                    only with parental consent and supervision.
                  </p>
                  <p>
                    You must provide accurate, current, and complete information
                    during registration.
                  </p>
                  <p>
                    You are responsible for maintaining the confidentiality of
                    your account credentials.
                  </p>
                </div>
              </section>

              <section className="bg-white/50 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-amber-100">
                <h3 className="text-xl sm:text-2xl font-bold text-amber-800 mb-4">
                  3. Products & Services
                </h3>
                <div className="text-amber-700 leading-relaxed space-y-3">
                  <p>
                    We strive to display product colors, images, and
                    specifications as accurately as possible. However, actual
                    products may vary slightly due to screen settings and
                    manufacturing variations.
                  </p>
                  <p>
                    All product prices are listed in Indian Rupees (INR) and
                    include applicable taxes unless otherwise stated.
                  </p>
                  <p>
                    We reserve the right to modify prices, discontinue products,
                    or change specifications without prior notice.
                  </p>
                  <p>
                    Product availability is subject to stock and we reserve the
                    right to limit quantities per customer.
                  </p>
                </div>
              </section>

              <section className="bg-white/50 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-amber-100">
                <h3 className="text-xl sm:text-2xl font-bold text-amber-800 mb-4">
                  4. Orders & Payment
                </h3>
                <div className="text-amber-700 leading-relaxed space-y-3">
                  <p>
                    <strong>Order Processing:</strong> Orders are processed
                    within 1-2 business days. Order confirmation does not
                    guarantee product availability.
                  </p>
                  <p>
                    <strong>Payment Methods:</strong> We accept UPI, Net
                    Banking, Credit/Debit Cards, and Cash on Delivery (where
                    available).
                  </p>
                  <p>
                    <strong>Payment Security:</strong> All payments are
                    processed through secure, PCI-compliant payment gateways.
                  </p>
                  <p>
                    <strong>Order Cancellation:</strong> You may cancel orders
                    before shipment. Refunds will be processed within 5-7
                    business days.
                  </p>
                  <p>
                    <strong>GST:</strong> All prices include applicable GST. Tax
                    invoices will be provided for all purchases.
                  </p>
                </div>
              </section>

              <section className="bg-white/50 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-amber-100">
                <h3 className="text-xl sm:text-2xl font-bold text-amber-800 mb-4">
                  5. Shipping & Delivery
                </h3>
                <div className="text-amber-700 leading-relaxed space-y-3">
                  <p>
                    <strong>Delivery Areas:</strong> We currently deliver across
                    India. Delivery charges may apply based on location and
                    order value.
                  </p>
                  <p>
                    <strong>Delivery Timeline:</strong> Standard delivery takes
                    3-7 business days. Express delivery options may be available
                    in select cities.
                  </p>
                  <p>
                    <strong>Delivery Address:</strong> Please ensure delivery
                    addresses are accurate and complete. We are not responsible
                    for delays due to incorrect addresses.
                  </p>
                  <p>
                    <strong>Failed Deliveries:</strong> If delivery attempts
                    fail due to unavailability or incorrect address, additional
                    charges may apply for re-delivery.
                  </p>
                </div>
              </section>

              <section className="bg-white/50 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-amber-100">
                <h3 className="text-xl sm:text-2xl font-bold text-amber-800 mb-4">
                  6. Returns & Refunds
                </h3>
                <div className="text-amber-700 leading-relaxed space-y-3">
                  <p>
                    <strong>Return Policy:</strong> Items can be returned within
                    7 days of delivery if unused, in original packaging, and
                    with tags intact.
                  </p>
                  <p>
                    <strong>Non-Returnable Items:</strong> Personal care items,
                    customized products, and perishable goods cannot be returned
                    for hygiene reasons.
                  </p>
                  <p>
                    <strong>Return Process:</strong> Contact our customer
                    service to initiate returns. Return shipping costs may apply
                    unless the item is defective.
                  </p>
                  <p>
                    <strong>Refunds:</strong> Approved refunds will be processed
                    within 5-7 business days to the original payment method.
                  </p>
                  <p>
                    <strong>Exchanges:</strong> Subject to product availability
                    and applicable price differences.
                  </p>
                </div>
              </section>

              <section className="bg-white/50 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-amber-100">
                <h3 className="text-xl sm:text-2xl font-bold text-amber-800 mb-4">
                  7. User Conduct
                </h3>
                <div className="text-amber-700 leading-relaxed space-y-3">
                  <p>
                    You agree not to use our platform for any unlawful purpose
                    or in any way that could damage our reputation or services.
                  </p>
                  <p>
                    Prohibited activities include but are not limited to: fraud,
                    harassment, spam, unauthorized access attempts, or violating
                    intellectual property rights.
                  </p>
                  <p>
                    User-generated content (reviews, comments) must be honest,
                    relevant, and respectful. We reserve the right to remove
                    inappropriate content.
                  </p>
                  <p>
                    Multiple accounts or bulk purchases for commercial resale
                    are prohibited without prior written consent.
                  </p>
                </div>
              </section>

              <section className="bg-white/50 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-amber-100">
                <h3 className="text-xl sm:text-2xl font-bold text-amber-800 mb-4">
                  8. Intellectual Property
                </h3>
                <div className="text-amber-700 leading-relaxed space-y-3">
                  <p>
                    All content on our platform, including logos, designs, text,
                    images, and software, is owned by Chaka-Chak or our
                    licensors.
                  </p>
                  <p>
                    You may not reproduce, distribute, or create derivative
                    works without written permission.
                  </p>
                  <p>
                    User-generated content remains your property, but you grant
                    us a non-exclusive license to use it for platform operations
                    and marketing.
                  </p>
                </div>
              </section>

              <section className="bg-white/50 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-amber-100">
                <h3 className="text-xl sm:text-2xl font-bold text-amber-800 mb-4">
                  9. Privacy & Data Protection
                </h3>
                <div className="text-amber-700 leading-relaxed space-y-3">
                  <p>
                    We are committed to protecting your personal information in
                    accordance with applicable Indian privacy laws and our
                    Privacy Policy.
                  </p>
                  <p>
                    We collect and use personal data only for legitimate
                    business purposes including order processing, customer
                    service, and marketing communications.
                  </p>
                  <p>
                    You have the right to access, correct, or delete your
                    personal information. Contact us for data-related requests.
                  </p>
                </div>
              </section>

              <section className="bg-white/50 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-amber-100">
                <h3 className="text-xl sm:text-2xl font-bold text-amber-800 mb-4">
                  10. Limitation of Liability
                </h3>
                <div className="text-amber-700 leading-relaxed space-y-3">
                  <p>
                    Our liability is limited to the maximum extent permitted by
                    Indian law.
                  </p>
                  <p>
                    We are not liable for indirect, incidental, or consequential
                    damages arising from your use of our services.
                  </p>
                  <p>
                    Our total liability for any claim shall not exceed the
                    amount you paid for the specific product or service giving
                    rise to the claim.
                  </p>
                  <p>
                    We do not warrant uninterrupted or error-free service and
                    are not responsible for technical failures beyond our
                    control.
                  </p>
                </div>
              </section>

              <section className="bg-white/50 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-amber-100">
                <h3 className="text-xl sm:text-2xl font-bold text-amber-800 mb-4">
                  11. Dispute Resolution
                </h3>
                <div className="text-amber-700 leading-relaxed space-y-3">
                  <p>
                    <strong>Customer Service:</strong> Please contact our
                    customer service team first for any concerns or disputes.
                  </p>
                  <p>
                    <strong>Governing Law:</strong> These terms are governed by
                    the laws of India.
                  </p>
                  <p>
                    <strong>Jurisdiction:</strong> Any disputes shall be subject
                    to the exclusive jurisdiction of courts in [Your City],
                    India.
                  </p>
                  <p>
                    <strong>Consumer Rights:</strong> Nothing in these terms
                    affects your statutory rights as a consumer under Indian
                    consumer protection laws.
                  </p>
                </div>
              </section>

              <section className="bg-white/50 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-amber-100">
                <h3 className="text-xl sm:text-2xl font-bold text-amber-800 mb-4">
                  12. Force Majeure
                </h3>
                <p className="text-amber-700 leading-relaxed">
                  We shall not be liable for any failure or delay in performance
                  due to circumstances beyond our reasonable control, including
                  but not limited to acts of God, natural disasters, government
                  actions, labor disputes, or technical failures.
                </p>
              </section>

              <section className="bg-white/50 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-amber-100">
                <h3 className="text-xl sm:text-2xl font-bold text-amber-800 mb-4">
                  13. Modifications
                </h3>
                <div className="text-amber-700 leading-relaxed space-y-3">
                  <p>
                    We reserve the right to modify these Terms and Conditions at
                    any time.
                  </p>
                  <p>
                    Significant changes will be communicated through email or
                    platform notifications.
                  </p>
                  <p>
                    Your continued use of our services after modifications
                    constitutes acceptance of the updated terms.
                  </p>
                </div>
              </section>

              <section className="bg-white/50 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-amber-100">
                <h3 className="text-xl sm:text-2xl font-bold text-amber-800 mb-4">
                  14. Termination
                </h3>
                <div className="text-amber-700 leading-relaxed space-y-3">
                  <p>
                    You may terminate your account at any time by contacting
                    customer service.
                  </p>
                  <p>
                    We may suspend or terminate accounts that violate these
                    terms or engage in fraudulent activities.
                  </p>
                  <p>
                    Upon termination, your right to use our services ceases
                    immediately, but these terms remain applicable to past
                    transactions.
                  </p>
                </div>
              </section>

              <section className="bg-white/50 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-amber-100">
                <h3 className="text-xl sm:text-2xl font-bold text-amber-800 mb-4">
                  15. Contact Information
                </h3>
                <div className="text-amber-700 leading-relaxed space-y-2">
                  <p>
                    For questions about these Terms and Conditions or our
                    services:
                  </p>
                  <p>
                    <strong>Email:</strong> chakachakteam@gmail.com
                  </p>
                  <p>
                    <strong>Instagram:</strong> @chakachakteam
                  </p>
                  <p>
                    <strong>Business Hours:</strong> Monday to Saturday, 9:00 AM
                    to 7:00 PM IST
                  </p>
                </div>
              </section>
            </div>

            <div className="text-center py-16">
              <div className="inline-block transform hover:scale-105 transition-all duration-300">
                <p className="text-2xl sm:text-3xl text-amber-800 font-bold mb-2">
                  Questions? We're here to help! 💪
                </p>
                <p className="text-lg sm:text-xl text-amber-700 font-medium">
                  Reach out anytime -{" "}
                  <span className="text-orange-600 font-bold">Chaka-Chak</span>{" "}
                  support is always ready! ✨
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

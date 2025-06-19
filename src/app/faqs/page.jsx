"use client";
import { useRouter } from "next/navigation";
import MainLayout from "@/components/layouts/MainLayout";

export default function FAQsPage() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/contact-us");
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
        <div className="w-full px-4 sm:px-10 lg:px-20 py-14 sm:py-16 lg:py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-amber-800 mb-4 leading-tight tracking-tight">
                Frequently Asked Questions
              </h1>
              <div className="w-24 h-1.5 bg-gradient-to-r from-amber-600 to-orange-600 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <div className="space-y-8">
                <div className="group">
                  <h2 className="text-xl sm:text-2xl font-bold text-amber-800 mb-4 group-hover:text-orange-600 transition-colors duration-300">
                    What products do you sell?
                  </h2>
                  <p className="text-base sm:text-lg text-amber-700 leading-relaxed">
                    We offer a wide range of custom printed products including
                    T-shirts for men, women, kids, and unisex styles. You'll
                    also find printed coffee mugs, phone cases, pet tags, dog
                    T-shirts, home and living essentials, printed water bottles,
                    and much more to express your unique style.
                  </p>
                </div>

                <div className="group">
                  <h2 className="text-xl sm:text-2xl font-bold text-amber-800 mb-4 group-hover:text-orange-600 transition-colors duration-300">
                    What is the quality of your products?
                  </h2>
                  <p className="text-base sm:text-lg text-amber-700 leading-relaxed">
                    All our products are made using high-quality fabrics and
                    durable prints. Each item is made-to-order with love and
                    care to ensure it lasts long and feels great. We believe in
                    delivering premium quality that exceeds your expectations.
                  </p>
                </div>

                <div className="group">
                  <h2 className="text-xl sm:text-2xl font-bold text-amber-800 mb-4 group-hover:text-orange-600 transition-colors duration-300">
                    Can I request a custom design?
                  </h2>
                  <p className="text-base sm:text-lg text-amber-700 leading-relaxed">
                    Not right now, but we're developing an exciting custom
                    design feature and will launch it as early as possible. Stay
                    tuned for updates on our social media channels for this
                    amazing new feature!
                  </p>
                </div>

                <div className="group">
                  <h2 className="text-xl sm:text-2xl font-bold text-amber-800 mb-4 group-hover:text-orange-600 transition-colors duration-300">
                    How do I know which size to order?
                  </h2>
                  <p className="text-base sm:text-lg text-amber-700 leading-relaxed">
                    We offer unisex oversized fits that are comfortable and
                    trendy. Please refer to the detailed size chart available on
                    each product page before ordering to find your perfect fit
                    and ensure maximum comfort.
                  </p>
                </div>

                <div className="group">
                  <h2 className="text-xl sm:text-2xl font-bold text-amber-800 mb-4 group-hover:text-orange-600 transition-colors duration-300">
                    Is Cash on Delivery (COD) available?
                  </h2>
                  <p className="text-base sm:text-lg text-amber-700 leading-relaxed">
                    No, we do not offer COD at this point in time. However, we
                    accept all major prepaid payment options including UPI,
                    credit/debit cards, net banking, and other digital payment
                    methods for your convenience.
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="group">
                  <h2 className="text-xl sm:text-2xl font-bold text-amber-800 mb-4 group-hover:text-orange-600 transition-colors duration-300">
                    How long does it take to receive my order?
                  </h2>
                  <p className="text-base sm:text-lg text-amber-700 leading-relaxed">
                    Orders are carefully processed in 2-3 business days and
                    delivered within 5-8 business days, depending on your
                    location. We work hard to get your custom products to you as
                    quickly as possible while maintaining our quality standards.
                  </p>
                </div>

                <div className="group">
                  <h2 className="text-xl sm:text-2xl font-bold text-amber-800 mb-4 group-hover:text-orange-600 transition-colors duration-300">
                    Can I cancel or return my order?
                  </h2>
                  <p className="text-base sm:text-lg text-amber-700 leading-relaxed">
                    Orders can be canceled within 1 hour of placing them. Due to
                    our custom print nature, we only accept returns for damaged
                    or wrong items. Please contact us within 7 days with clear
                    photos/videos of unboxing for quick resolution.
                  </p>
                </div>

                <div className="group">
                  <h2 className="text-xl sm:text-2xl font-bold text-amber-800 mb-4 group-hover:text-orange-600 transition-colors duration-300">
                    How can I track my order?
                  </h2>
                  <p className="text-base sm:text-lg text-amber-700 leading-relaxed">
                    Once your order is shipped, you'll receive a tracking link
                    via email and SMS. You can also check the real-time status
                    under the "My Orders" section in your account dashboard for
                    complete visibility.
                  </p>
                </div>

                <div className="group">
                  <h2 className="text-xl sm:text-2xl font-bold text-amber-800 mb-4 group-hover:text-orange-600 transition-colors duration-300">
                    How can I contact Customer Support?
                  </h2>
                  <p className="text-base sm:text-lg text-amber-700 leading-relaxed">
                    You can reach us anytime through our email{" "}
                    <span className="font-semibold text-amber-800">
                      chakachakteam@gmail.com
                    </span>{" "}
                    or DM us on Instagram{" "}
                    <span className="font-semibold text-amber-800">
                      @chakachakteam
                    </span>
                    . We usually respond within 24–48 hours and are always happy
                    to help!
                  </p>
                </div>

                <div className="group">
                  <h2 className="text-xl sm:text-2xl font-bold text-amber-800 mb-4 group-hover:text-orange-600 transition-colors duration-300">
                    Do you ship outside India?
                  </h2>
                  <p className="text-base sm:text-lg text-amber-700 leading-relaxed">
                    No, we currently ship only within India to ensure faster
                    delivery and better service. We're working on expanding our
                    reach and will update you when international shipping
                    becomes available.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-16 py-8">
              <div className="inline-block transform hover:scale-105 transition-all duration-300">
                <p className="text-2xl sm:text-3xl text-amber-800 font-bold mb-2">
                  Still have questions?
                </p>
                <p className="text-lg sm:text-xl text-amber-700 font-medium">
                  Feel free to reach out to us – we're here to help! 💫
                </p>
              </div>
              <div className="mt-6">
                <button
                  onClick={handleRedirect}
                  className="cursor-pointer bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white px-6 py-2 rounded-xl font-semibold shadow-md transition-all duration-300 transform"
                >
                  Get In Touch
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

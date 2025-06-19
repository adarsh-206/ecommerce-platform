"use client";

import MainLayout from "@/components/layouts/MainLayout";

export default function PrivacyPolicyPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
        <div className="w-full px-4 sm:px-10 lg:px-20 py-14 sm:py-20 lg:py-28">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-amber-800 mb-4 leading-tight tracking-tight">
                Privacy Policy
              </h1>
              <div className="w-24 h-1.5 bg-gradient-to-r from-amber-600 to-orange-600 mx-auto rounded-full"></div>
            </div>

            <div className="max-w-none">
              <div className="mb-8">
                <p className="text-base sm:text-lg text-amber-700 leading-relaxed font-medium">
                  At Chaka-Chak, your privacy matters deeply to us. We believe
                  in transparency and want you to understand exactly how we
                  handle your personal information. This comprehensive policy
                  outlines our data practices and your rights as our valued
                  customer.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-amber-800 mb-4 border-b border-amber-200 pb-2">
                What Information Do We Collect?
              </h2>
              <p className="text-amber-700 mb-4 leading-relaxed">
                To provide you with the best shopping experience and deliver
                your custom products, we collect certain information when you
                interact with our platform:
              </p>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-amber-800 mb-3">
                  Personal Information
                </h3>
                <ul className="text-amber-700 ml-6 space-y-2">
                  <li>
                    • Full name and contact details (email address, phone
                    number)
                  </li>
                  <li>• Delivery addresses and billing information</li>
                  <li>• Order preferences and purchase history</li>
                  <li>
                    • Communication records and customer service interactions
                  </li>
                </ul>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-amber-800 mb-3">
                  Technical Data
                </h3>
                <ul className="text-amber-700 ml-6 space-y-2">
                  <li>
                    • Device information (browser type, operating system, screen
                    resolution)
                  </li>
                  <li>• Website usage patterns and navigation behavior</li>
                  <li>
                    • IP address and location data (city/state level only)
                  </li>
                  <li>• Cookies and similar tracking technologies</li>
                </ul>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-amber-800 mb-3">
                  Payment Information
                </h3>
                <p className="text-amber-700 leading-relaxed">
                  All payment transactions are processed through secure,
                  industry-standard payment gateways. We never store your
                  complete credit card details, bank account information, or
                  other sensitive payment data on our servers.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-amber-800 mb-4 border-b border-amber-200 pb-2">
                How We Use Your Information
              </h2>
              <p className="text-amber-700 mb-4 leading-relaxed">
                We use the information we collect to enhance your shopping
                experience and provide exceptional service:
              </p>
              <ul className="text-amber-700 mb-6 ml-6 space-y-2">
                <li>
                  • <strong>Order Management:</strong> Processing orders,
                  managing inventory, and coordinating with our fulfillment
                  partners
                </li>
                <li>
                  • <strong>Communication:</strong> Sending order confirmations,
                  shipping updates, delivery notifications, and customer support
                  responses
                </li>
                <li>
                  • <strong>Personalization:</strong> Customizing your shopping
                  experience and showing relevant product recommendations
                </li>
                <li>
                  • <strong>Quality Improvement:</strong> Analyzing usage
                  patterns to enhance website functionality and user experience
                </li>
                <li>
                  • <strong>Marketing Communications:</strong> Sending
                  promotional offers, new product announcements, and special
                  deals (only with your explicit consent)
                </li>
                <li>
                  • <strong>Security & Fraud Prevention:</strong> Protecting
                  against unauthorized access and fraudulent activities
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-amber-800 mb-4 border-b border-amber-200 pb-2">
                Information Sharing & Disclosure
              </h2>
              <p className="text-amber-700 mb-4 leading-relaxed">
                We respect your privacy and{" "}
                <strong>never sell, rent, or trade</strong> your personal
                information to third parties for their marketing purposes.
                However, we may share your information in the following limited
                circumstances:
              </p>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-amber-800 mb-3">
                  Trusted Service Partners
                </h3>
                <ul className="text-amber-700 ml-6 space-y-2">
                  <li>
                    • Fulfillment centers and production partners for order
                    processing
                  </li>
                  <li>
                    • Shipping and logistics companies for delivery services
                  </li>
                  <li>• Payment processors for secure transaction handling</li>
                  <li>• Customer support platforms for service management</li>
                  <li>
                    • Analytics providers for website performance insights
                  </li>
                </ul>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-amber-800 mb-3">
                  Legal Requirements
                </h3>
                <p className="text-amber-700 leading-relaxed">
                  We may disclose information when required by law, court
                  orders, government requests, or to protect our rights,
                  property, and safety of our customers and business operations.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-amber-800 mb-4 border-b border-amber-200 pb-2">
                Cookies & Website Tracking
              </h2>
              <p className="text-amber-700 mb-4 leading-relaxed">
                Our website uses cookies and similar technologies to improve
                your browsing experience and understand how you interact with
                our platform:
              </p>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-amber-800 mb-3">
                  Types of Cookies We Use
                </h3>
                <ul className="text-amber-700 ml-6 space-y-2">
                  <li>
                    • <strong>Essential Cookies:</strong> Required for basic
                    website functionality and security
                  </li>
                  <li>
                    • <strong>Performance Cookies:</strong> Help us understand
                    website usage and improve performance
                  </li>
                  <li>
                    • <strong>Preference Cookies:</strong> Remember your
                    settings and personalize your experience
                  </li>
                  <li>
                    • <strong>Marketing Cookies:</strong> Enable targeted
                    advertising and measure campaign effectiveness
                  </li>
                </ul>
              </div>
              <p className="text-amber-700 mb-6 leading-relaxed">
                You can control cookie preferences through your browser
                settings. Please note that disabling certain cookies may affect
                website functionality and your user experience.
              </p>

              <h2 className="text-2xl font-bold text-amber-800 mb-4 border-b border-amber-200 pb-2">
                Data Security & Protection
              </h2>
              <p className="text-amber-700 mb-4 leading-relaxed">
                We implement robust security measures to protect your personal
                information from unauthorized access, alteration, disclosure, or
                destruction:
              </p>
              <ul className="text-amber-700 mb-6 ml-6 space-y-2">
                <li>• SSL encryption for all data transmission</li>
                <li>
                  • Secure servers with regular security updates and monitoring
                </li>
                <li>
                  • Access controls and authentication protocols for internal
                  systems
                </li>
                <li>• Regular security audits and vulnerability assessments</li>
                <li>
                  • Employee training on data protection and privacy practices
                </li>
                <li>
                  • Incident response procedures for potential security breaches
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-amber-800 mb-4 border-b border-amber-200 pb-2">
                Your Privacy Rights & Choices
              </h2>
              <p className="text-amber-700 mb-4 leading-relaxed">
                You have several rights regarding your personal information, and
                we're committed to helping you exercise them:
              </p>
              <ul className="text-amber-700 mb-6 ml-6 space-y-2">
                <li>
                  • <strong>Access:</strong> Request a copy of the personal
                  information we hold about you
                </li>
                <li>
                  • <strong>Correction:</strong> Update or correct any
                  inaccurate or incomplete information
                </li>
                <li>
                  • <strong>Deletion:</strong> Request deletion of your personal
                  information (subject to legal requirements)
                </li>
                <li>
                  • <strong>Portability:</strong> Receive your data in a
                  commonly used, machine-readable format
                </li>
                <li>
                  • <strong>Marketing Opt-out:</strong> Unsubscribe from
                  promotional emails and marketing communications
                </li>
                <li>
                  • <strong>Object to Processing:</strong> Object to certain
                  types of data processing activities
                </li>
              </ul>
              <p className="text-amber-700 mb-6 leading-relaxed">
                To exercise any of these rights, please contact us at{" "}
                <strong>chakachakteam@gmail.com</strong>. We'll respond to your
                request within 30 days and may need to verify your identity for
                security purposes.
              </p>

              <h2 className="text-2xl font-bold text-amber-800 mb-4 border-b border-amber-200 pb-2">
                Data Retention Policy
              </h2>
              <p className="text-amber-700 mb-6 leading-relaxed">
                We retain your personal information only as long as necessary to
                fulfill the purposes outlined in this policy, comply with legal
                obligations, resolve disputes, and enforce our agreements. Order
                and transaction data may be retained for accounting and legal
                compliance purposes as required by Indian law.
              </p>

              <h2 className="text-2xl font-bold text-amber-800 mb-4 border-b border-amber-200 pb-2">
                Third-Party Links & Services
              </h2>
              <p className="text-amber-700 mb-6 leading-relaxed">
                Our website may contain links to third-party websites, social
                media platforms, or services. This privacy policy does not apply
                to these external sites. We encourage you to review the privacy
                policies of any third-party services you visit or use.
              </p>

              <h2 className="text-2xl font-bold text-amber-800 mb-4 border-b border-amber-200 pb-2">
                Children's Privacy
              </h2>
              <p className="text-amber-700 mb-6 leading-relaxed">
                Chaka-Chak does not knowingly collect personal information from
                children under 18 years of age. If you are under 18, please
                obtain parental consent before using our services. If we become
                aware that we have collected information from a child without
                parental consent, we will take steps to delete such information.
              </p>

              <h2 className="text-2xl font-bold text-amber-800 mb-4 border-b border-amber-200 pb-2">
                International Data Transfers
              </h2>
              <p className="text-amber-700 mb-6 leading-relaxed">
                While we primarily operate within India, some of our service
                providers may be located in other countries. When we transfer
                your information internationally, we ensure appropriate
                safeguards are in place to protect your data in accordance with
                applicable privacy laws.
              </p>

              <h2 className="text-2xl font-bold text-amber-800 mb-4 border-b border-amber-200 pb-2">
                Policy Updates & Changes
              </h2>
              <p className="text-amber-700 mb-6 leading-relaxed">
                We may update this Privacy Policy periodically to reflect
                changes in our practices, technology, legal requirements, or
                business operations. When we make significant changes, we'll
                notify you via email or through a prominent notice on our
                website. The most current version will always be available on
                this page with the updated effective date.
              </p>

              <h2 className="text-2xl font-bold text-amber-800 mb-4 border-b border-amber-200 pb-2">
                Contact Us About Privacy
              </h2>
              <p className="text-amber-700 mb-4 leading-relaxed">
                If you have any questions, concerns, or requests regarding this
                Privacy Policy or how we handle your personal information, we're
                here to help:
              </p>
              <div className="mb-6">
                <ul className="text-amber-700 ml-6 space-y-2">
                  <li>
                    • <strong>Email:</strong> chakachakteam@gmail.com
                  </li>
                  <li>
                    • <strong>Instagram:</strong> @chakachakteam
                  </li>
                  <li>
                    • <strong>Response Time:</strong> We typically respond
                    within 24-48 hours
                  </li>
                </ul>
              </div>
              <p className="text-amber-700 mb-6 leading-relaxed">
                Your privacy is important to us, and we're committed to
                addressing any concerns you may have promptly and transparently.
              </p>

              <div className="mt-8">
                <p className="text-amber-800 font-medium">
                  Last Updated: June 18, 2025
                </p>
              </div>

              <div className="mt-12 text-center py-8">
                <div className="inline-block transform hover:scale-105 transition-all duration-300">
                  <p className="text-2xl sm:text-3xl text-amber-800 font-bold mb-2">
                    Questions about your privacy?
                  </p>
                  <p className="text-lg sm:text-xl text-amber-700 font-medium">
                    We're always here to help and ensure your data is protected!
                    🔒
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

"use client";

import MainLayout from "@/components/layouts/MainLayout";

export default function ShippingAndDeliveryPolicyPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
        <div className="w-full px-4 sm:px-10 lg:px-20 py-14 sm:py-20 lg:py-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-amber-800 mb-4 leading-tight tracking-tight">
                Shipping & Delivery Policy
              </h1>
              <div className="w-24 h-1.5 bg-gradient-to-r from-amber-600 to-orange-600 mx-auto rounded-full"></div>
            </div>

            <div className="max-w-none">
              <h2 className="text-2xl font-bold text-amber-800 mb-4 border-b border-amber-200 pb-2">
                Order Processing & Fulfillment
              </h2>
              <p className="text-amber-700 mb-4 leading-relaxed">
                Once you place an order with us, we process and forward your
                order details to our trusted fulfillment partners who handle the
                production, packaging, and shipping of your custom products.
                This allows us to provide you with high-quality products while
                maintaining efficient delivery services across India.
              </p>
              <p className="text-amber-700 mb-6 leading-relaxed">
                Our fulfillment partners are carefully selected based on their
                quality standards, reliability, and commitment to customer
                satisfaction. They manage the entire process from production to
                delivery on our behalf.
              </p>

              <h2 className="text-2xl font-bold text-amber-800 mb-4 border-b border-amber-200 pb-2">
                Processing Time
              </h2>
              <p className="text-amber-700 mb-4 leading-relaxed">
                Order processing typically takes 1-3 business days after payment
                confirmation. During this time, your custom product is prepared
                for production and quality checks are performed. Processing time
                may extend during peak seasons, festivals, or high-demand
                periods.
              </p>
              <ul className="text-amber-700 mb-6 ml-6 space-y-2">
                <li>• Standard Orders: 1-2 business days</li>
                <li>• Custom Print Orders: 2-3 business days</li>
                <li>• Bulk Orders (10+ items): 3-5 business days</li>
                <li>• Festival/Peak Season: 3-7 business days</li>
              </ul>

              <h2 className="text-2xl font-bold text-amber-800 mb-4 border-b border-amber-200 pb-2">
                Shipping Methods & Timeline
              </h2>
              <p className="text-amber-700 mb-4 leading-relaxed">
                We offer reliable shipping services across India through our
                fulfillment partners who work with reputed courier services
                including India Post, Delhivery, Bluedart, DTDC, and other
                regional carriers.
              </p>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-amber-800 mb-3">
                  Standard Delivery
                </h3>
                <ul className="text-amber-700 ml-6 space-y-2">
                  <li>• Metro Cities: 3-5 business days</li>
                  <li>• Tier 1 Cities: 4-6 business days</li>
                  <li>• Tier 2 Cities: 5-7 business days</li>
                  <li>• Remote Areas: 7-10 business days</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-amber-800 mb-3">
                  Express Delivery
                </h3>
                <ul className="text-amber-700 ml-6 space-y-2">
                  <li>• Metro Cities: 2-3 business days (where available)</li>
                  <li>• Additional charges may apply for express delivery</li>
                  <li>
                    • Subject to product availability and location
                    serviceability
                  </li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-amber-800 mb-4 border-b border-amber-200 pb-2">
                Shipping Charges
              </h2>
              <p className="text-amber-700 mb-4 leading-relaxed">
                Shipping charges are calculated based on the delivery location,
                product weight, and shipping method selected. The exact shipping
                cost will be displayed at checkout before you complete your
                order.
              </p>
              <ul className="text-amber-700 mb-6 ml-6 space-y-2">
                <li>• Free shipping on orders above ₹499 (within India)</li>
                <li>
                  • Standard shipping charges: ₹49-₹99 depending on location
                </li>
                <li>• Express delivery charges: ₹99-₹199 (where available)</li>
                <li>• Remote area surcharge may apply for certain pin codes</li>
              </ul>

              <h2 className="text-2xl font-bold text-amber-800 mb-4 border-b border-amber-200 pb-2">
                Order Tracking
              </h2>
              <p className="text-amber-700 mb-4 leading-relaxed">
                Once your order is shipped, you will receive a tracking number
                via email and SMS. You can track your order status through:
              </p>
              <ul className="text-amber-700 mb-6 ml-6 space-y-2">
                <li>• Your account dashboard under "My Orders"</li>
                <li>• Direct courier company tracking portals</li>
                <li>• Our customer support team</li>
                <li>• Real-time SMS and email updates</li>
              </ul>

              <h2 className="text-2xl font-bold text-amber-800 mb-4 border-b border-amber-200 pb-2">
                Delivery Areas & Serviceability
              </h2>
              <p className="text-amber-700 mb-4 leading-relaxed">
                We currently deliver across India through our fulfillment
                network. However, certain remote locations may have limited
                serviceability or extended delivery times.
              </p>
              <ul className="text-amber-700 mb-6 ml-6 space-y-2">
                <li>• Pan-India delivery available</li>
                <li>• Pin code serviceability check available at checkout</li>
                <li>• Delivery to PO Box addresses may not be available</li>
                <li>• International shipping not currently available</li>
              </ul>

              <h2 className="text-2xl font-bold text-amber-800 mb-4 border-b border-amber-200 pb-2">
                Delivery Process
              </h2>
              <p className="text-amber-700 mb-4 leading-relaxed">
                Our delivery partners will attempt to deliver your order to the
                address provided during checkout. Please ensure someone is
                available to receive the package during business hours.
              </p>
              <ul className="text-amber-700 mb-6 ml-6 space-y-2">
                <li>• Delivery attempts: Up to 3 attempts will be made</li>
                <li>• Valid ID proof may be required for delivery</li>
                <li>• Delivery during business hours (10 AM - 7 PM)</li>
                <li>• Saturday delivery available in most areas</li>
                <li>• Sunday and holiday deliveries may be limited</li>
              </ul>

              <h2 className="text-2xl font-bold text-amber-800 mb-4 border-b border-amber-200 pb-2">
                Failed Delivery & Return to Origin (RTO)
              </h2>
              <p className="text-amber-700 mb-4 leading-relaxed">
                If delivery cannot be completed due to incorrect address,
                recipient unavailability, or refusal to accept, the package will
                be returned to our fulfillment center. Additional charges may
                apply for re-delivery attempts.
              </p>
              <ul className="text-amber-700 mb-6 ml-6 space-y-2">
                <li>• RTO charges: ₹99-₹149 depending on location</li>
                <li>• Refund processing after deducting RTO charges</li>
                <li>• Refund timeline: 7-10 business days after RTO</li>
                <li>• Address correction may be possible before RTO</li>
              </ul>

              <h2 className="text-2xl font-bold text-amber-800 mb-4 border-b border-amber-200 pb-2">
                Damaged or Lost Shipments
              </h2>
              <p className="text-amber-700 mb-4 leading-relaxed">
                In rare cases of damaged or lost shipments during transit, we
                work closely with our logistics partners to resolve the issue
                promptly. Please contact our customer support immediately if you
                receive a damaged package.
              </p>
              <ul className="text-amber-700 mb-6 ml-6 space-y-2">
                <li>• Report damaged packages within 24 hours of delivery</li>
                <li>• Provide unboxing photos/videos as evidence</li>
                <li>
                  • Replacement or refund will be processed after investigation
                </li>
                <li>• Insurance coverage available for high-value shipments</li>
              </ul>

              <h2 className="text-2xl font-bold text-amber-800 mb-4 border-b border-amber-200 pb-2">
                Delivery Address Guidelines
              </h2>
              <p className="text-amber-700 mb-4 leading-relaxed">
                To ensure smooth delivery, please provide complete and accurate
                delivery information:
              </p>
              <ul className="text-amber-700 mb-6 ml-6 space-y-2">
                <li>• Complete address with landmark references</li>
                <li>• Correct pin code and area name</li>
                <li>• Active contact number for delivery coordination</li>
                <li>• Alternative contact number (recommended)</li>
                <li>• Specific delivery instructions if needed</li>
              </ul>

              <h2 className="text-2xl font-bold text-amber-800 mb-4 border-b border-amber-200 pb-2">
                Festive Season & Peak Period Deliveries
              </h2>
              <p className="text-amber-700 mb-4 leading-relaxed">
                During festival seasons, peak shopping periods, or adverse
                weather conditions, delivery timelines may be extended. We
                recommend placing orders in advance during such periods.
              </p>
              <ul className="text-amber-700 mb-6 ml-6 space-y-2">
                <li>• Extended processing time: 3-7 business days</li>
                <li>• Delivery delays: Additional 2-4 days possible</li>
                <li>• Priority processing available for urgent orders</li>
                <li>• Regular updates provided during peak periods</li>
              </ul>

              <h2 className="text-2xl font-bold text-amber-800 mb-4 border-b border-amber-200 pb-2">
                Customer Support & Assistance
              </h2>
              <p className="text-amber-700 mb-4 leading-relaxed">
                Our customer support team is available to assist you with any
                shipping or delivery related queries. We're committed to
                providing you with the best possible service experience.
              </p>
              <ul className="text-amber-700 mb-6 ml-6 space-y-2">
                <li>• Email: chakachakteam@gmail.com</li>
                <li>• Instagram: @chakachakteam</li>
                {/* <li>• Phone: +91-XXXXXXXXXX</li> */}
              </ul>

              <h2 className="text-2xl font-bold text-amber-800 mb-4 border-b border-amber-200 pb-2">
                Force Majeure & Unforeseen Circumstances
              </h2>
              <p className="text-amber-700 mb-6 leading-relaxed">
                Delivery timelines may be affected by circumstances beyond our
                control including but not limited to natural disasters, strikes,
                lockdowns, government regulations, or other force majeure
                events. We will communicate any such delays promptly and work to
                minimize impact on your orders.
              </p>

              <h2 className="text-2xl font-bold text-amber-800 mb-4 border-b border-amber-200 pb-2">
                Policy Updates
              </h2>
              <p className="text-amber-700 mb-4 leading-relaxed">
                This shipping and delivery policy is subject to change without
                prior notice. Any updates will be reflected on this page with
                the revised effective date. We recommend reviewing this policy
                periodically to stay informed about our current shipping terms
                and procedures.
              </p>

              <div className="mt-8">
                <p className="text-amber-800 font-medium">
                  Last Updated: June 18, 2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

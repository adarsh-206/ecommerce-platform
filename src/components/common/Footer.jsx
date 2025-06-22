import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-sm bg-gradient-to-r from-amber-50 via-orange-50 to-rose-50 text-amber-900">
      <div className="max-w-full mx-auto pt-12 pb-4 px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 text-amber-700">
              About Chaka-Chak
            </h3>
            <ul className="space-y-2">
              {["Home", "About Us", "Contact Us", "Privacy Policy"].map(
                (item, idx) => {
                  const path =
                    item === "Home"
                      ? "/"
                      : `/${item.toLowerCase().replace(/\s+/g, "-")}`;
                  return (
                    <li key={idx}>
                      <Link
                        href={path}
                        className="text-amber-600 hover:text-amber-800 transition-colors duration-200"
                      >
                        {item}
                      </Link>
                    </li>
                  );
                }
              )}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-amber-700">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { name: "FAQs", path: "/faqs" },
                {
                  name: "Cancellation & Refund Policy",
                  path: "/cancellation-refund-policy",
                },
                {
                  name: "Shipping & Delivery Policy",
                  path: "/shipping-delivery-policy",
                },
                {
                  name: "Terms & Conditions",
                  path: "/terms-and-conditions",
                },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.path}
                    className="text-amber-600 hover:text-amber-800 transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-3 text-amber-700">
              Customer Support
            </h3>
            <p className="text-amber-600 text-sm leading-relaxed">
              Need help? Write to
              <br />
              <a
                href="mailto:chakachakteam@gmail.com"
                className="text-amber-700 font-medium hover:underline break-all"
              >
                chakachakteam@gmail.com
              </a>
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-amber-700">
              Connect With Us
            </h3>
            <div className="flex space-x-5">
              {[
                {
                  name: "Instagram",
                  href: "https://www.instagram.com/chakachakteam",
                  svgPath:
                    "M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465.668.25 1.235.585 1.8 1.15.565.565.9 1.132 1.15 1.8.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.15 1.8c-.565.565-1.132.9-1.8 1.15-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.8-1.15 4.902 4.902 0 01-1.15-1.8c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.15-1.8A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z",
                },
                {
                  name: "YouTube",
                  href: "https://www.youtube.com/@chaka-chak-team",
                  svgPath:
                    "M19.615 3.184C21.3 3.64 22 5.006 22 8.008v7.984c0 3.003-.7 4.368-2.385 4.824-2.095.558-9.615.558-9.615.558s-7.52 0-9.615-.558C.7 20.36 0 18.995 0 15.992V8.008C0 5.006.7 3.64 2.385 3.184 4.48 2.626 12 2.626 12 2.626s7.52 0 9.615.558zM9.545 15.568l6.091-3.568-6.091-3.568v7.136z",
                },
                {
                  name: "X",
                  href: "https://x.com/chakachakteam",
                  svgPath:
                    "M22.162 1.845h-4.352l-5.372 7.088L6.4 1.845H.772l7.62 9.81L.178 22.158h4.357l5.943-7.844 6.299 7.844h5.821l-8.134-10.48 7.698-9.833z",
                },
                {
                  name: "Threads",
                  href: "https://www.threads.com/@chakachakteam",
                  icon: "@",
                },
              ].map(({ name, href, svgPath, icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="text-amber-600 hover:text-amber-800 transition-colors duration-200"
                >
                  {svgPath ? (
                    <svg
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d={svgPath} />
                    </svg>
                  ) : icon === "@" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-8 w-8"
                    >
                      <text
                        x="3"
                        y="13"
                        fontSize="16"
                        fontFamily="Arial, sans-serif"
                        fill="currentColor"
                      >
                        @
                      </text>
                    </svg>
                  ) : null}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <p className="mt-8 text-sm text-amber-700">
            &copy; {new Date().getFullYear()}{" "}
            <Link href="/seller/login" className="hover:text-amber-900">
              Chaka-Chak
            </Link>{" "}
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

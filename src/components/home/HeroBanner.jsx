import Link from "next/link";

export default function HeroBanner() {
  return (
    <div className="relative bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Premium Custom Apparel
            </h1>
            <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
              Express yourself with high-quality custom t-shirts, hoodies, and
              accessories. Design your unique look with our easy customization
              tools.
            </p>
            <div className="mt-10 flex justify-center space-x-4">
              <Link
                href="/products/t-shirts"
                className="rounded-md bg-indigo-600 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700"
              >
                Shop T-Shirts
              </Link>
              <Link
                href="/products/hoodies"
                className="rounded-md bg-white px-5 py-3 text-base font-medium text-gray-900 hover:bg-gray-50"
              >
                Browse Hoodies
              </Link>
            </div>
            <div className="mt-6">
              <Link
                href="/custom-design"
                className="inline-flex items-center text-indigo-300 hover:text-indigo-200"
              >
                Create Custom Design
                <svg
                  className="ml-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black opacity-70"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-indigo-900 opacity-40"></div>
      </div>
    </div>
  );
}

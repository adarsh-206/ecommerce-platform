import Link from "next/link";

export default function HeroBanner() {
  return (
    <div className="relative bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Summer Collection 2025
            </h1>
            <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
              Discover the latest trends and must-have items for your summer
              wardrobe. Up to 40% off on selected items.
            </p>
            <div className="mt-10 flex justify-center space-x-4">
              <Link
                href="/collections/summer"
                className="rounded-md bg-indigo-600 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700"
              >
                Shop Collection
              </Link>
              <Link
                href="/sale"
                className="rounded-md bg-white px-5 py-3 text-base font-medium text-gray-900 hover:bg-gray-50"
              >
                View Sale
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black opacity-50"></div>
    </div>
  );
}

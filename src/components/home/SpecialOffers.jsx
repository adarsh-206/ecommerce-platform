import Link from "next/link";

export default function SpecialOffers() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
          Special Offers
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="relative rounded-lg overflow-hidden shadow-lg">
            <img
              src="https://img.pikbest.com/backgrounds/20180613/taobao-sale-purple-background-simple-style-poster-banner_1831925.jpg!w700wp"
              alt="Summer Sale"
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-800 opacity-70"></div>
            <div className="absolute inset-0 flex flex-col justify-center px-8">
              <h3 className="text-3xl font-bold text-white mb-2">
                Summer Sale
              </h3>
              <p className="text-xl text-white mb-4">
                Up to 40% off seasonal items
              </p>
              <Link
                href="/sales/summer"
                className="bg-white text-purple-800 hover:bg-gray-100 px-6 py-2 rounded-md font-medium inline-block w-max"
              >
                Shop Now
              </Link>
            </div>
          </div>

          <div className="relative rounded-lg overflow-hidden shadow-lg">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/020/240/397/small_2x/3d-purple-white-geometric-abstract-background-overlap-layer-on-bright-space-with-cutout-decoration-simple-graphic-design-element-future-style-concept-for-banner-flyer-card-cover-or-brochure-vector.jpg"
              alt="New Collection"
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-800 opacity-70"></div>
            <div className="absolute inset-0 flex flex-col justify-center px-8">
              <h3 className="text-3xl font-bold text-white mb-2">
                New Collection
              </h3>
              <p className="text-xl text-white mb-4">
                Discover our latest arrivals
              </p>
              <Link
                href="/collections/new"
                className="bg-white text-indigo-800 hover:bg-gray-100 px-6 py-2 rounded-md font-medium inline-block w-max"
              >
                Explore
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

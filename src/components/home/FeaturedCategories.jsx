import Link from "next/link";

export default function FeaturedCategories() {
  const categories = [
    {
      name: "Clothing",
      image:
        "https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg?cs=srgb&dl=pexels-pixabay-325876.jpg&fm=jpg",
      href: "/categories/clothing",
    },
    {
      name: "Electronics",
      image: "https://www.matric.com/hubfs/classes%20of%20electronics.jpg",
      href: "/categories/electronics",
    },
    {
      name: "Home & Garden",
      image:
        "https://m.media-amazon.com/images/I/51khQ-xSjQL._AC_UF894,1000_QL80_.jpg",
      href: "/categories/home",
    },
    {
      name: "Beauty",
      image:
        "https://media.istockphoto.com/id/1296705483/photo/make-up-products-prsented-on-white-podiums-on-pink-pastel-background.jpg?s=612x612&w=0&k=20&c=j3Vfpo81L5I2g0uJ5tArBC3l_fcPtPAcLzzT4pq5BLY=",
      href: "/categories/beauty",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
          Featured Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.name} href={category.href} className="group">
              <div className="relative overflow-hidden rounded-lg shadow-md">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black opacity-60"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-xl font-bold text-white">
                    {category.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

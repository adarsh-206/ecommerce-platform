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
      name: "Accessories",
      image:
        "https://img.freepik.com/free-photo/top-view-accessoires-travel-with-women-clothing-concept-white-mobilephone-watch-bag-hat-map-camera-necklace-trousers-sunglasses-white-wood-table_1921-106.jpg?semt=ais_hybrid&w=740",
      href: "/categories/accessories",
    },
    {
      name: "Headwear",
      image:
        "https://c8.alamy.com/comp/2C44AWK/headwear-hats-men-and-women-elegant-headwear-modern-and-retro-caps-stylish-hats-and-caps-fashion-accessories-vector-illustration-icons-set-2C44AWK.jpg",
      href: "/categories/headwear",
    },
    {
      name: "Pet Products",
      image:
        "https://img.freepik.com/free-photo/pet-accessories-still-life-with-chew-bone-toys_23-2148949561.jpg",
      href: "/categories/pet-products",
    },
    {
      name: "Home & Living",
      image:
        "https://m.media-amazon.com/images/I/51khQ-xSjQL._AC_UF894,1000_QL80_.jpg",
      href: "/categories/home-living",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
          Featured Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
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

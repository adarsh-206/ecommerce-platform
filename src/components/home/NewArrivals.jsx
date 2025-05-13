import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";

export default function NewArrivals() {
  const products = [
    {
      id: 1,
      name: "Cotton T-Shirt",
      price: 299,
      image: "https://m.media-amazon.com/images/I/71qMofG2mlL._AC_UY1100_.jpg",
      category: "Clothing",
      rating: 4.5,
      href: "/product/cotton-t-shirt",
    },
    {
      id: 2,
      name: "Wireless Headphones",
      price: 1899,
      image:
        "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Rockerz_551_ANC_Pro.347_1.jpg?v=1737546044",
      category: "Electronics",
      rating: 4.8,
      href: "/product/wireless-headphones",
    },
    {
      id: 3,
      name: "Ceramic Plant Pot",
      price: 449,
      image:
        "https://exclusivelane.com/cdn/shop/products/EL-021-081_A.jpg?v=1740474744",
      category: "Home & Garden",
      rating: 4.2,
      href: "/product/ceramic-plant-pot",
    },
    {
      id: 4,
      name: "Natural Face Serum",
      price: 655,
      image: "https://files.organicharvest.in/site-images/800x800/1-4ad.jpg",
      category: "Beauty",
      rating: 4.7,
      href: "/product/natural-face-serum",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            New Arrivals
          </h2>
          <Link
            href="/new-arrivals"
            className="text-indigo-600 hover:text-indigo-500 font-medium"
          >
            View All <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

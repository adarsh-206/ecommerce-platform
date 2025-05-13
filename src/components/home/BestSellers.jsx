import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";

export default function BestSellers() {
  const products = [
    {
      id: 5,
      name: "Athletic Sneakers",
      price: 999,
      image:
        "https://runners.ae/cdn/shop/products/ON-CLOUDSURFER-SHOES-FOR-MEN-ALL-BLACK-3MD10420485_2.jpg?v=1679564843&width=580",
      category: "Footwear",
      rating: 4.9,
      href: "/product/athletic-sneakers",
    },
    {
      id: 6,
      name: "Smart Watch",
      price: 1299,
      image: "https://m.media-amazon.com/images/I/51pipGoHHFL._SR290,290_.jpg",
      category: "Electronics",
      rating: 4.7,
      href: "/product/smart-watch",
    },
    {
      id: 7,
      name: "Stainless Steel Water Bottle",
      price: 349,
      image:
        "https://images.meesho.com/images/products/420914173/uh402_512.webp",
      category: "Home & Garden",
      rating: 4.8,
      href: "/product/stainless-steel-water-bottle",
    },
    {
      id: 8,
      name: "Vitamin C Moisturizer",
      price: 299,
      image:
        "https://plumgoodness.com/cdn/shop/files/VitaminCM_Nykaa_1000x1000_1_dc446057-e8d3-4954-859e-9ea3d54172d8.webp?v=1721642243",
      category: "Beauty",
      rating: 4.6,
      href: "/product/vitamin-c-moisturizer",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Best Sellers
          </h2>
          <Link
            href="/best-sellers"
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

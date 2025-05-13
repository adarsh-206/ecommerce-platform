import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";

export default function BestSellers() {
  const products = [
    {
      id: 1,
      name: "Oversized Cotton T-Shirt",
      price: 499,
      image:
        "https://5.imimg.com/data5/SELLER/Default/2023/4/302455745/DP/TX/KQ/7633002/terry-cotton-oversized-t-shirts.jpg",
      category: "Clothing",
      rating: 4.8,
      href: "/product/oversized-cotton-tshirt",
    },
    {
      id: 2,
      name: "Eco-Friendly Jute Tote",
      price: 299,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxL6Z-YNXlPr16vH3pDXN3r7mcn6xSeGNAXA&s",
      category: "Accessories",
      rating: 4.7,
      href: "/product/jute-tote-bag",
    },
    {
      id: 3,
      name: "Unisex Baseball Cap",
      price: 199,
      image: "https://m.media-amazon.com/images/I/514BX0olXHL._AC_UY1100_.jpg",
      category: "Headwear",
      rating: 4.9,
      href: "/product/unisex-baseball-cap",
    },
    {
      id: 4,
      name: "Cute Dog Hoodie",
      price: 399,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsUC0Qk6oKPrETX1X5bTU4c0a6tE2EL_iQsJb9JSklJU4rHY2dlJ7m-5gYRpNSwkkyAdc&usqp=CAU",
      category: "Pet Products",
      rating: 4.8,
      href: "/product/cute-dog-hoodie",
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

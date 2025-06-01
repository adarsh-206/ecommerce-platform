import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import { TrendingUp, ArrowRight } from "lucide-react";

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
    <section className="py-20 bg-gradient-to-r from-amber-50 via-orange-50 to-rose-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-amber-600 mr-4" />
            <h2 className="text-4xl font-extrabold text-amber-800">
              Best Sellers
            </h2>
          </div>
          <Link
            href="/best-sellers"
            className="group flex items-center px-6 py-3 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full text-amber-800 hover:text-orange-700 font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            View All
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

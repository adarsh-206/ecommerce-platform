import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";

export default function NewArrivals() {
  const products = [
    {
      id: 1,
      name: "Unisex Cotton T-Shirt",
      price: 399,
      image:
        "https://cms.cloudinary.vpsvc.com/image/upload/c_scale,dpr_auto,f_auto,q_70,w_auto:50:550/India%20LOB/Category%20Images/Premium-Men_s-Cotton-T-Shirt_Category-image_1x1",
      category: "Clothing",
      rating: 4.6,
      href: "/product/unisex-cotton-tshirt",
    },
    {
      id: 2,
      name: "Printed Tote Bag",
      price: 249,
      image: "https://m.media-amazon.com/images/I/61rorcTqRLL._AC_UY1100_.jpg",
      category: "Accessories",
      rating: 4.3,
      href: "/product/printed-tote-bag",
    },
    {
      id: 3,
      name: "Classic Baseball Cap",
      price: 199,
      image: "https://m.media-amazon.com/images/I/819D7Z-kFfL._AC_UY1000_.jpg",
      category: "Headwear",
      rating: 4.4,
      href: "/product/classic-baseball-cap",
    },
    {
      id: 4,
      name: "Pet Bandana – Small",
      price: 299,
      image:
        "https://images.meesho.com/images/products/425269760/3vjhn_512.webp",
      category: "Pet Products",
      rating: 4.5,
      href: "/product/pet-bandana-small",
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

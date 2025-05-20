"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SellerLayout from "@/components/layouts/SellerLayout";
import ProductsList from "@/components/seller/products/ProductsList";
import ProductForm from "@/components/seller/products/ProductForm";
import { PlusCircle, Filter, Search } from "lucide-react";

export default function SellerProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterSubcategory, setFilterSubcategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    {
      id: "clothing",
      name: "Clothing",
      subcategories: [
        { id: "mens", name: "Men's" },
        { id: "womens", name: "Women's" },
        { id: "unisex", name: "Unisex" },
        { id: "kids", name: "Kids" },
      ],
    },
    {
      id: "accessories",
      name: "Accessories",
      subcategories: [
        { id: "jewelry", name: "Jewelry" },
        { id: "watches", name: "Watches" },
        { id: "bags", name: "Bags & Wallets" },
        { id: "sunglasses", name: "Sunglasses" },
      ],
    },
    {
      id: "pet-products",
      name: "Pet Products",
      subcategories: [
        { id: "pet-clothing", name: "Pet Clothing" },
        { id: "pet-accessories", name: "Pet Accessories" },
        { id: "pet-food", name: "Pet Food" },
        { id: "pet-toys", name: "Pet Toys" },
      ],
    },
    {
      id: "home-living",
      name: "Home & Living",
      subcategories: [
        { id: "decor", name: "Home Decor" },
        { id: "kitchen", name: "Kitchen & Dining" },
        { id: "bedding", name: "Bedding" },
        { id: "furniture", name: "Furniture" },
      ],
    },
  ];

  useEffect(() => {
    // Mock data - In a real app, you would fetch from an API
    const mockProducts = [
      {
        id: "1",
        name: "Cotton Kurta",
        short_desc: "Lightweight cotton kurta for daily wear",
        long_desc:
          "This breathable and stylish kurta is perfect for everyday use. Made from 100% pure cotton for maximum comfort in Indian summers.",
        main_image:
          "https://www.bewakoof.com/blog/wp-content/uploads/2022/04/Best-Clothing-Colour-Combination-Ideas-for-Men-bewakoof-blog-1-1619420686.jpg",
        extra_images: [
          "https://m.media-amazon.com/images/I/61sucYObagL._AC_UY1100_.jpg",
          "https://www.bewakoof.com/blog/wp-content/uploads/2022/04/Best-Clothing-Colour-Combination-Ideas-for-Men-bewakoof-blog-1-1619420686.jpg",
          "https://m.media-amazon.com/images/I/61sucYObagL._AC_UY1100_.jpg",
        ],
        price: 799,
        sale_price: 599,
        stock: 120,
        category: "clothing",
        subcategory: "men",
        tags: ["kurta", "cotton", "ethnic wear"],
        featured: true,
        created_at: "2025-05-01",
      },
      {
        id: "2",
        name: "Analog Wrist Watch",
        short_desc: "Stylish watch for office and festive wear",
        long_desc:
          "An elegant analog watch with a stainless steel strap, ideal for professional and festive occasions. Water resistant with 1-year warranty.",
        main_image:
          "https://img.freepik.com/free-photo/stylish-golden-watch-white-surface_181624-27078.jpg?semt=ais_hybrid&w=740",
        extra_images: [
          "https://assets.ajio.com/medias/sys_master/root/20240509/dWay/663cb79e16fd2c6e6af6824d/-473Wx593H-467124908-black-MODEL.jpg",
          "https://assets.ajio.com/medias/sys_master/root/20240509/dWay/663cb79e16fd2c6e6af6824d/-473Wx593H-467124908-black-MODEL.jpg",
        ],
        price: 1999,
        sale_price: null,
        stock: 30,
        category: "accessories",
        subcategory: "watches",
        tags: ["watch", "men", "gift"],
        featured: false,
        created_at: "2025-05-03",
      },
      {
        id: "3",
        name: "Dog Chain with Bell",
        short_desc: "Strong metal chain for dogs",
        long_desc:
          "This durable dog chain comes with a safety bell and adjustable clip. Suitable for all Indian dog breeds, made with rust-free metal.",
        main_image:
          "https://m.media-amazon.com/images/I/61bHV-Kq3mL._AC_UF1000,1000_QL80_.jpg",
        extra_images: [
          "https://www.sprenger.de/cdn/shop/files/kettet-edelstahl.jpg?v=1731047373&width=1766",
          "https://m.media-amazon.com/images/I/61bHV-Kq3mL._AC_UF1000,1000_QL80_.jpg",
        ],
        price: 349,
        sale_price: 299,
        stock: 80,
        category: "pet-products",
        subcategory: "dog-accessories",
        tags: ["dog", "pet chain", "bell"],
        featured: false,
        created_at: "2025-05-07",
      },
      {
        id: "4",
        name: "Handmade Cushion Cover",
        short_desc: "Traditional Rajasthani design cushion cover",
        long_desc:
          "Add a cultural touch to your sofa or bed with this hand-stitched Rajasthani cushion cover. Made from premium cotton with vibrant prints.",
        main_image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf0omM4xiSLnf-TZOxiPpy664P7qbzZXzBzw&",
        extra_images: [
          "https://img.freepik.com/free-photo/beautiful-interior-decorations_23-2149155799.jpg?semt=ais_hybrid&w=740",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf0omM4xiSLnf-TZOxiPpy664P7qbzZXzBzw&",
        ],
        price: 499,
        sale_price: null,
        stock: 65,
        category: "home-living",
        subcategory: "decor",
        tags: ["cushion", "rajasthani", "home decor"],
        featured: true,
        created_at: "2025-05-09",
      },
    ];

    // Simulate API call
    setTimeout(() => {
      setProducts(mockProducts);
      setIsLoading(false);
    }, 500);
  }, []);

  const handleCreateProduct = () => {
    setSelectedProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = (productId) => {
    // In a real app, you would make an API call to delete the product
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );
    setProducts(updatedProducts);
  };

  const handleSaveProduct = (productData) => {
    // In a real app, you would make an API call to create/update the product
    if (selectedProduct) {
      // Update existing product
      const updatedProducts = products.map((product) =>
        product.id === selectedProduct.id
          ? { ...product, ...productData }
          : product
      );
      setProducts(updatedProducts);
    } else {
      // Create new product
      const newProduct = {
        id: Date.now().toString(),
        ...productData,
        created_at: new Date().toISOString().split("T")[0],
      };
      setProducts([...products, newProduct]);
    }
    setShowForm(false);
  };

  const handleCancelForm = () => {
    setShowForm(false);
  };

  const filteredProducts = products.filter((product) => {
    // Filter by category
    if (filterCategory !== "all" && product.category !== filterCategory) {
      return false;
    }

    // Filter by subcategory
    if (
      filterSubcategory !== "all" &&
      product.subcategory !== filterSubcategory
    ) {
      return false;
    }

    // Filter by search query
    if (
      searchQuery &&
      !product.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  const getSubcategories = () => {
    if (filterCategory === "all") {
      return [];
    }

    const category = categories.find((cat) => cat.id === filterCategory);
    return category ? category.subcategories : [];
  };

  return (
    <SellerLayout>
      <div className="min-h-screen">
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-black">
              Products Management
            </h1>
            <button
              onClick={handleCreateProduct}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              Add New Product
            </button>
          </div>

          {!showForm && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="flex items-center">
                  <Filter className="h-5 w-5 text-gray-500 mr-2" />
                  <select
                    className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={filterCategory}
                    onChange={(e) => {
                      setFilterCategory(e.target.value);
                      setFilterSubcategory("all");
                    }}
                  >
                    <option value="all">All Categories</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {filterCategory !== "all" && (
                  <div>
                    <select
                      className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={filterSubcategory}
                      onChange={(e) => setFilterSubcategory(e.target.value)}
                    >
                      <option value="all">All Subcategories</option>
                      {getSubcategories().map((subcategory) => (
                        <option key={subcategory.id} value={subcategory.id}>
                          {subcategory.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-700"></div>
                </div>
              ) : (
                <ProductsList
                  products={filteredProducts}
                  onEdit={handleEditProduct}
                  onDelete={handleDeleteProduct}
                />
              )}
            </div>
          )}

          {showForm && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <ProductForm
                product={selectedProduct}
                categories={categories}
                onSave={handleSaveProduct}
                onCancel={handleCancelForm}
              />
            </div>
          )}
        </div>
      </div>
    </SellerLayout>
  );
}

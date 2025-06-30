import MainLayout from "@/components/layouts/MainLayout";
import HeroBanner from "@/components/home/HeroBanner";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import NewArrivals from "@/components/home/NewArrivals";
import BestSellers from "@/components/home/BestSellers";
import BulkOrderCTA from "@/components/common/BulkOrderCTA";
import PromoFeatures from "@/components/home/PromoFeatures";
import CustomizeProduct from "@/components/common/CustomizeProduct";

export const homeMetadata = {
  title: "Chaka-Chak | Clean, Quirky, Totally You - Shop Unique Fashion Online",
  description:
    "Welcome to Chaka-Chak, India's most trusted online destination for clean, quirky, and totally unique fashion experiences. Discover an incredible world of trendy t-shirts, stylish apparel, eye-catching accessories, and contemporary home decor that perfectly captures your individual style and personality. Our carefully curated collection features everything from casual everyday wear to statement pieces that make heads turn. At Chaka-Chak, we understand that fashion is more than just clothing - it's a form of self-expression, a way to showcase your creativity, and a means to connect with like-minded individuals who appreciate quality and uniqueness. Browse through our extensive range of products including graphic tees with witty slogans, elegant formal wear, trendy streetwear, bohemian accessories, modern home decor items, and much more. We pride ourselves on offering competitive prices without compromising on quality, ensuring that everyone can access fashionable items that reflect their personal taste. With our user-friendly website, secure payment gateway, fast shipping across all major Indian cities, and excellent customer support, shopping at Chaka-Chak is always a delightful experience that keeps you coming back for more amazing finds.",
  keywords:
    "chaka chak, chaka-chak home, online shopping, quirky fashion India, trendy clothes, best deals, fashion marketplace",
  icons: {
    icon: "/chaka-chak-logo.ico",
    apple: "/chaka-chak-logo.png",
  },
};

export default function Home() {
  return (
    <MainLayout>
      <HeroBanner />
      <FeaturedCategories />
      <NewArrivals />
      <BestSellers />
      <CustomizeProduct />
      {/* <BulkOrderCTA /> */}
      <PromoFeatures />
    </MainLayout>
  );
}

import MainLayout from "@/components/layouts/MainLayout";
import HeroBanner from "@/components/home/HeroBanner";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import NewArrivals from "@/components/home/NewArrivals";
import BestSellers from "@/components/home/BestSellers";
import BulkOrderCTA from "@/components/common/BulkOrderCTA";
import PromoFeatures from "@/components/home/PromoFeatures";

export const metadata = {
  title: "Chaka-Chak",
  description: "Your one-stop shop for all your shopping needs",
  icons: {
    icon: "/chaka-chak-logo.ico",
  },
};

export default function Home() {
  return (
    <MainLayout>
      <HeroBanner />
      <FeaturedCategories />
      <NewArrivals />
      <BestSellers />
      <BulkOrderCTA />
      <PromoFeatures />
    </MainLayout>
  );
}

import MainLayout from "@/components/layouts/MainLayout";
import HeroBanner from "@/components/home/HeroBanner";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import NewArrivals from "@/components/home/NewArrivals";
import BestSellers from "@/components/home/BestSellers";
import SpecialOffers from "@/components/home/SpecialOffers";
import BulkOrderCTA from "@/components/common/BulkOrderCTA";

export const metadata = {
  title: "ChakaChak",
  description: "Your one-stop shop for all your shopping needs",
};

export default function Home() {
  return (
    <MainLayout>
      <HeroBanner />
      <FeaturedCategories />
      <NewArrivals />
      <BestSellers />
      <SpecialOffers />
      <BulkOrderCTA />
    </MainLayout>
  );
}

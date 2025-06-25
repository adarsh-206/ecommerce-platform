"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SellerDashboard from "@/components/seller/dashboard/SellerDashboard";

export const sellerDashboardMetadata = {
  title: "Seller Dashboard | Chaka-Chak - Manage Your Fashion Business",
  description:
    "Take control of your fashion business with Chaka-Chak's comprehensive seller dashboard, your central command center for managing all aspects of your online store and maximizing your success in India's most vibrant marketplace for unique fashion items. Your dashboard provides a complete overview of your business performance with real-time analytics, sales tracking, inventory management, and customer interaction tools all integrated into one powerful platform. Monitor your daily, weekly, and monthly sales performance through detailed graphs and reports that help you identify trends, understand customer behavior, and make data-driven decisions to grow your business. The dashboard includes sophisticated inventory management features that track stock levels, alert you to low inventory situations, and help you plan for seasonal demand fluctuations. You can easily manage your product catalog, update pricing, create promotional offers, and optimize your listings for better search visibility within the Chaka-Chak marketplace. The order management system streamlines your fulfillment process with automated notifications, integrated shipping label generation, and tracking updates that keep both you and your customers informed throughout the delivery process. Your dashboard also includes comprehensive customer management tools that help you maintain high service standards through efficient communication systems, review management, and customer feedback analysis. The platform provides access to marketing tools and promotional opportunities that can increase your product visibility, drive more traffic to your listings, and ultimately boost your sales revenue. Advanced reporting features give you insights into your best-performing products, peak selling times, customer demographics, and competitive positioning, enabling you to refine your business strategy and identify new growth opportunities in the ever-evolving fashion marketplace.",
  keywords:
    "chaka chak seller dashboard, manage business, seller tools, business analytics, store management",
  icons: {
    icon: "/chaka-chak-logo.ico",
    apple: "/chaka-chak-logo.png",
  },
};

export default function SellerDashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/admin");
    }
  }, []);

  return <SellerDashboard />;
}

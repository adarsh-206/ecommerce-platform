import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export const metadata = {
  title: "Chaka-Chak",
  description: "Your one-stop shop for all your shopping needs",
  icons: {
    icon: "/chaka-chak-logo.ico",
  },
};

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}

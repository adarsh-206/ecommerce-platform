import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "ShopEase - Online Shopping Made Easy",
    template: "%s | ShopEase",
  },
  description: "Your one-stop shop for all your shopping needs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

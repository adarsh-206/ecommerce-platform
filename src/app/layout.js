import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import ToastProvider from "@/components/common/ToastProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Chaka-Chak",
  description: "Your one-stop shop for all your shopping needs",
  icons: {
    icon: "/chaka-chak-logo.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

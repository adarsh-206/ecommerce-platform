import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import ToastProvider from "@/components/common/ToastProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

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
      <body className={poppins.className}>
        <ToastProvider />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

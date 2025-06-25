import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import ToastProvider from "@/components/common/ToastProvider";
import Head from "next/head";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Chaka-Chak | Clean, Quirky, Totally You",
  description:
    "Shop Chaka-Chak for bold fashion, eye-catching accessories, and stylish decor — made just for you. Unique finds, fast shipping, and good vibes only.",
  icons: {
    icon: "/chaka-chak-logo.ico",
    apple: "/chaka-chak-logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        {/* Primary Meta Tags */}
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href={metadata.icons.icon} />
        <link rel="apple-touch-icon" href={metadata.icons.apple} />

        {/* Open Graph Tags */}
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://chaka-chak.in" />
        <meta
          property="og:image"
          content="https://chaka-chak.in/chaka-chak-logo.png"
        />
        <meta property="og:site_name" content="Chaka-Chak" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta
          name="twitter:image"
          content="https://chaka-chak.in/chaka-chak-logo.png"
        />
        <meta name="twitter:site" content="@chakachakteam" />
      </Head>

      <body className={poppins.className}>
        <ToastProvider />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

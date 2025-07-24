import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import ToastProvider from "@/components/common/ToastProvider";
import Head from "next/head";
import Chatbot from "@/components/chatbot/Chatbot";
import Script from "next/script";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title:
    "Chaka-Chak | India's #1 Destination for Clean, Quirky Fashion & Lifestyle",
  description:
    "Welcome to Chaka-Chak – India’s favourite online store to buy t-shirts, fashion accessories, home items, and customized gifts. Everything here is clean, quirky, and full of fun. Looking for stylish t-shirts, trendy clothes, or cool gifts? At Chaka-Chak, we have a big collection of graphic t-shirts, unisex and oversized tees, fun accessories, and unique home decor to match your style. Want to buy customized gifts in India? We make it easy! You’ll find special designs for birthdays, anniversaries, or any special moment. From casual wear to eye-catching pieces, Chaka-Chak is perfect for people who love to be different. We also offer fast delivery across India, easy returns, secure payments, and great customer support. Thousands of happy buyers trust Chaka-Chak for affordable, stylish, and unique products. So next time you search for “buy t-shirts online,” “Chaka-Chak fashion,” or “quirky gifts India,” think of us. Whether it’s for yourself or someone special, we have something just right for you. Chaka-Chak is not just a shop – it’s a fresh and fun way to shop smart and stay stylish. Try Chaka-Chak today and feel the clean, quirky vibe!",
  keywords:
    "chaka chak, chaka-chak, online shopping India, quirky fashion, trendy clothes, t-shirt printing, accessories, home decor, unique fashion, affordable style, fast shipping",
  authors: [{ name: "Chaka-Chak Team" }],
  robots: "index, follow",
  openGraph: {
    title: "Chaka-Chak | India's #1 Destination for Clean, Quirky Fashion",
    description:
      "Shop Chaka-Chak for bold fashion, eye-catching accessories, and stylish decor — made just for you. Unique finds, fast shipping, and good vibes only.",
    url: "https://chaka-chak.in",
    siteName: "Chaka-Chak",
    images: [
      {
        url: "/chaka-chak-logo.png",
        width: 1200,
        height: 630,
        alt: "Chaka-Chak Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chaka-Chak | Clean, Quirky, Totally You",
    description:
      "India's premier destination for unique fashion and lifestyle products. Shop now!",
    images: ["/chaka-chak-logo.png"],
  },
  icons: {
    icon: "/chaka-chak-logo.ico",
    apple: "/chaka-chak-logo.png",
    shortcut: "/chaka-chak-logo.ico",
  },
  other: {
    "google-adsense-account": "ca-pub-1717608415698213",
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

        <meta
          name="google-adsense-account"
          content="ca-pub-1717608415698213"
        ></meta>

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta
          name="twitter:image"
          content="https://chaka-chak.in/chaka-chak-logo.png"
        />
        <meta name="twitter:site" content="@chakachakteam" />

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KQ7R8F7PM0"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KQ7R8F7PM0');
          `}
        </Script>
      </Head>

      <body className={poppins.className}>
        <ToastProvider />
        <Providers>{children}</Providers>
        {/* <Chatbot /> */}
      </body>
    </html>
  );
}

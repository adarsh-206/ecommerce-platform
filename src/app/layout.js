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
  title:
    "Chaka-Chak | India's #1 Destination for Clean, Quirky Fashion & Lifestyle",
  description:
    "Welcome to Chaka-Chak - India's premier online marketplace for clean, quirky, and totally unique fashion, accessories, and lifestyle products. Discover our extensive collection of trendy t-shirts, stylish apparel, eye-catching accessories, and home decor items that perfectly express your personality. At Chaka-Chak, we believe fashion should be fun, affordable, and accessible to everyone. Our curated selection features the latest trends, vintage-inspired pieces, and exclusive designs you won't find anywhere else. Whether you're looking for casual wear, party outfits, unique gifts, or statement pieces that make you stand out, Chaka-Chak has everything you need. Shop with confidence knowing we offer fast shipping across India, easy returns, secure payment options, and exceptional customer service. Join thousands of satisfied customers who choose Chaka-Chak for their fashion and lifestyle needs. From quirky graphic tees to elegant accessories, sustainable fashion choices to trending home decor - we're your one-stop destination for everything that's clean, quirky, and totally you. Experience the difference with Chaka-Chak today!",
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

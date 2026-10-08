import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { CartProvider } from "@/hooks/use-cart";
import { SITE_URL } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = SITE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "PhoneHub | Premium smartphones, new & refurbished",
    template: "%s | PhoneHub",
  },
  description:
    "Shop iPhone, Samsung Galaxy, Google Pixel and Xiaomi phones, new and certified refurbished, tested across 42 points and covered by a 24-month warranty.",
  keywords: [
    "buy phone online",
    "refurbished iPhone",
    "Samsung Galaxy price",
    "Google Pixel",
    "Xiaomi phones",
    "phone store",
  ],
  authors: [{ name: "PhoneHub" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "PhoneHub",
    title: "PhoneHub | Premium smartphones, new & refurbished",
    description:
      "Flagship phones without the flagship markup. New and certified refurbished iPhones, Galaxy, Pixel and Xiaomi with a 24-month warranty.",
  },
  twitter: {
    card: "summary_large_image",
    title: "PhoneHub | Premium smartphones, new & refurbished",
    description:
      "Flagship phones without the flagship markup. Free 2-day shipping and a 24-month warranty.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#06070c",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-background"
        >
          Skip to content
        </a>
        <CartProvider>
          <Navbar />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { ShopClient } from "@/components/shop/shop-client";

export const metadata: Metadata = {
  title: "Shop smartphones | iPhone, Galaxy, Pixel & Xiaomi",
  description:
    "Filter flagship and value phones by brand, price, condition and storage. New and certified refurbished stock with free 2-day shipping.",
  alternates: { canonical: "/shop" },
  openGraph: {
    title: "Shop smartphones | PhoneHub",
    description:
      "Filter by brand, price, condition and storage. New and certified refurbished stock with free 2-day shipping.",
    url: "/shop",
    type: "website",
  },
};

export default async function ShopPage({ searchParams }: PageProps<"/shop">) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q : "";

  return (
    <>
      <PageHeader
        eyebrow="The line-up"
        title="Shop every phone we stock"
        description="Filter by brand, price, condition and storage. Every device is unlocked, tested and shipped within 48 hours."
      />
      <ShopClient initialQuery={q} />
    </>
  );
}

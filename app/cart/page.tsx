import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { CartPageClient } from "@/components/cart/cart-page-client";

export const metadata: Metadata = {
  title: "Your cart",
  description: "Review the phones you have selected and head to checkout.",
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return (
    <>
      <PageHeader
        eyebrow="Checkout"
        title="Your cart"
        description="Review your devices, adjust quantities and head to checkout. Shipping is free over $99."
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <CartPageClient />
      </div>
    </>
  );
}

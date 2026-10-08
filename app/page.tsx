import { Hero } from "@/components/home/hero";
import { MarqueeBanner } from "@/components/home/marquee-banner";
import { BrandStrip } from "@/components/home/brand-strip";
import { BestSellers } from "@/components/home/best-sellers";
import { ValueProps } from "@/components/home/value-props";
import { PromoSection } from "@/components/home/promo";
import { Testimonials } from "@/components/home/testimonials";
import { bestSellers, featuredProduct } from "@/lib/catalog";

export default function HomePage() {
  const featured = featuredProduct();
  const best = bestSellers(6);

  return (
    <>
      <Hero product={featured} />
      <MarqueeBanner />
      <BrandStrip />
      <BestSellers products={best} />
      <ValueProps />
      <PromoSection />
      <Testimonials />
    </>
  );
}

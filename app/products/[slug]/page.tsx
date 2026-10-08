import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { getProduct, relatedProducts } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { unsplash } from "@/lib/images";
import { SITE_URL } from "@/lib/site";
import { ProductDetails } from "@/components/product/product-details";
import { ProductGrid } from "@/components/product/product-grid";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found" };

  const title = `${product.name} | ${formatPrice(product.price)}`;
  const description = `${product.shortDescription} ${product.brand} ${product.name}, ${
    product.condition === "refurbished" ? "certified refurbished" : "brand new"
  }, ${product.storages.map((s) => (s.size >= 1024 ? "1TB" : `${s.size}GB`)).join(" / ")}. Rated ${product.rating}/5.`;
  const image = unsplash(product.images[0], 1200);

  return {
    title,
    description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${title} | PhoneHub`,
      description,
      url: `/products/${product.slug}`,
      siteName: "PhoneHub",
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: `${product.name} product photo` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | PhoneHub`,
      description,
      images: [image],
    },
  };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = relatedProducts(product, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.id,
    brand: { "@type": "Brand", name: product.brand },
    description: product.shortDescription,
    image: product.images.map((src) => unsplash(src, 1200)),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviews,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: product.price,
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      itemCondition:
        product.condition === "refurbished"
          ? "https://schema.org/RefurbishedCondition"
          : "https://schema.org/NewCondition",
      url: `${SITE_URL}/products/${product.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:px-8">
        <ProductDetails product={product} />

        <section aria-labelledby="specs-heading" className="mt-20">
          <SectionHeading
            eyebrow="Technical specifications"
            title="Every number, up front"
            description="Straight from the manufacturer, no rounded-up battery claims."
            align="left"
          />

          <Reveal className="mt-8 overflow-hidden rounded-3xl glass">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">Specifications for {product.name}</caption>
              <tbody className="divide-y divide-white/10">
                {product.specs.map((row, i) => (
                  <tr
                    key={row.label}
                    className={i % 2 === 1 ? "bg-white/[0.02]" : undefined}
                  >
                    <th
                      scope="row"
                      className="w-40 px-5 py-4 font-medium text-muted sm:w-56 sm:px-7"
                    >
                      {row.label}
                    </th>
                    <td className="px-5 py-4 text-foreground sm:px-7">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </section>

        <section aria-labelledby="related-heading" className="mt-20">
          <SectionHeading
            eyebrow="You might also like"
            title="Related phones"
            description={`More ${product.brand} devices and close alternatives in the same budget.`}
            align="left"
          />
          <div className="mt-8">
            <ProductGrid products={related} />
          </div>
          <Reveal className="mt-8 flex justify-start">
            <Link
              href="/shop"
              className="rounded-full border border-white/12 bg-white/[0.04] px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent/60 hover:text-accent"
            >
              ← Back to all phones
            </Link>
          </Reveal>
        </section>
      </div>
    </>
  );
}

import type { Metadata } from "next";
import type { CategoryId } from "@/content/types";
import { CollectionFilter } from "@/components/products/CollectionFilter";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ShopButton } from "@/components/products/ShopButton";
import { TextLink } from "@/components/ui/Action";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHeader } from "@/components/ui/PageHeader";
import {
  getCategoriesWithCounts,
  getCategoryName,
  getProducts,
  getProductsByCategory,
} from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata({
  title: "Products",
  description:
    "Six pieces in heavyweight cotton and 14oz fleece — printed by hand in Atlanta, restocked rather than replaced, and never sold as a drop.",
  path: "/products",
});

type ProductsPageProps = {
  /** Next 16 passes search params as a promise. */
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function parseCollection(
  value: string | string[] | undefined,
  valid: CategoryId[],
): CategoryId | null {
  const candidate = Array.isArray(value) ? value[0] : value;
  return candidate && valid.includes(candidate as CategoryId)
    ? (candidate as CategoryId)
    : null;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const categories = getCategoriesWithCounts();
  const all = getProducts();

  /* An unknown ?collection= value falls back to the full list rather than an
     empty page — a mistyped URL should never look like a broken site. */
  const active = parseCollection(
    params.collection,
    categories.map((category) => category.id),
  );
  const products = active ? getProductsByCategory(active) : all;

  return (
    <>
      <PageHeader
        eyebrow={active ? `Collection — ${getCategoryName(active)}` : "The collection"}
        title={active ? getCategoryName(active) : "Six pieces, made properly"}
        lead={
          active
            ? categories.find((category) => category.id === active)?.description
            : "A short range. Every piece is explained here in full and sold through our authorised store."
        }
      >
        <CollectionFilter categories={categories} active={active} total={all.length} />
      </PageHeader>

      <section aria-labelledby="collection-heading" className="bg-paper py-16 lg:py-24">
        <Container width="wide">
          {/* The grid needs a real heading between the page <h1> and the <h3>
              on each product, or the document outline jumps a level. It is
              hidden because the masthead above already says this in display
              type — repeating it on screen would be noise. */}
          <h2 id="collection-heading" className="sr-only">
            {active ? `${getCategoryName(active)} collection` : "The full collection"}
          </h2>

          <div className="mb-12 flex flex-wrap items-baseline justify-between gap-4 border-b border-line pb-6">
            <p className="label text-graphite">
              Showing {String(products.length).padStart(2, "0")} of{" "}
              {String(all.length).padStart(2, "0")}
            </p>
            {active ? <TextLink href="/products">Clear filter</TextLink> : null}
          </div>

          <ProductGrid products={products} />
        </Container>
      </section>

      {/* Closing hand-off, so the page ends on where to actually buy. */}
      <section className="border-t border-line bg-bone py-16 lg:py-24">
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
            <div className="lg:col-span-7">
              <Eyebrow rule>Where to buy</Eyebrow>
              <p className="text-display-sm mt-8 max-w-2xl font-display">
                Read about them here. Order them from our authorised store.
              </p>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <ShopButton size="lg" withNote>
                Shop online
              </ShopButton>
            </div>
          </div>
        </Container>
      </section>

      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
        ])}
      />
    </>
  );
}

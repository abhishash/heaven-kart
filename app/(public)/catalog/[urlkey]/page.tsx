import { isArray } from '@/lib/type-guards'
import { ProductCard } from '@/components/elements/product-card'
import { fetchHandler, methods } from '@/lib/fetch-handler'
import { ProductResponse, ProductTypes } from '@/lib/types'
import { CATALOG_DETAIL, PRODUCTS_DETAIL } from '@/lib/constants'
import Categories from '@/components/elements/product/filter/categories'
import MobileFilter from '@/components/elements/product/filter/mobile-filter'
import Link from "next/link";
import { Sparkles, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import EmptyCategory from '@/components/elements/EmptyCategory'
import { CatalogCarousel } from '@/components/elements/Catalog-carousel'

export type SortOption = 'featured' | 'price-low' | 'price-high' | 'newest' | 'rating'

export const staticCatalogData = [
  {
    url: 'men',
    name: 'Men',
    image: '',
    products: 128,
  },
  {
    url: 'women',
    name: 'Women',
    image: '',
    products: 95,
  },
  {
    url: 'footwear',
    name: 'Footwear',
    image: '',
    products: 76,
  },
  {
    url: 'innerwear',
    name: 'Innerwear',
    image: '',
    products: 54,
  },
  {
    url: 'accessories',
    name: 'Accessories',
    image: '',
    products: 64,
  },
  {
    url: 'sports',
    name: 'Sports',
    image: '',
    products: 42,
  },
  {
    url: 'men',
    name: 'Men',
    image: '',
    products: 128,
  },
  {
    url: 'women',
    name: 'Women',
    image: '',
    products: 95,
  },
  {
    url: 'footwear',
    name: 'Footwear',
    image: '',
    products: 76,
  },
  {
    url: 'innerwear',
    name: 'Innerwear',
    image: 'https://cdn.zeptonow.com/production/tr:w-160,ar-280-356,pr-true,f-auto,q-40/inventory/banner/f1733864-a53a-4bb0-980d-9beb855c9021.png',
    products: 54,
  },
  {
    url: 'accessories',
    name: 'Accessories',
    image: 'https://cdn.zeptonow.com/production/tr:w-160,ar-280-356,pr-true,f-auto,q-40/inventory/banner/f1733864-a53a-4bb0-980d-9beb855c9021.png',

    products: 64,
  },
  {
    url: 'sports',
    name: 'Sports',
    image: '',
    products: 42,
  },
];

export default async function CatalogPage({ params }: {
  params: Promise<{ urlkey: string }>;
}) {

  const { urlkey } = await params;

  const productResponse = await fetchHandler<ProductResponse>({
    endpoint: `${CATALOG_DETAIL.endpoint}/${urlkey}`,
    method: CATALOG_DETAIL?.method as methods,
  });

  const productList: ProductTypes[] = productResponse?.data ?? [];
  const categoryResponse = productResponse?.categories;

  return (!isArray(productList) ? <EmptyCategory /> :
    <>
      <CatalogCarousel subCategories={staticCatalogData} />
      <div className="flex gap-8">
        {/* Desktop Category Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-16">
            <Categories categories={categoryResponse} />
          </div>
        </aside>

        {/* Products */}
        <main className="flex-1 min-w-0">
          {/* Product grid */}
          {isArray(productList) ? (
            <>
              <p className="mb-6 text-sm text-muted-foreground">
                Showing {productList.length} product
                {productList.length !== 1 ? 's' : ''}
              </p>

              <div className="grid gap-4 grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {productList.map((product, index) => (
                  <ProductCard key={product.url + index} {...product} />
                ))}
              </div>
            </>
          ) : (
            <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-border bg-card">
              <p className="text-lg font-medium">No products found</p>
              <p className="text-sm text-muted-foreground">
                Try adjusting your filters
              </p>
            </div>
          )}
        </main>
        {/* Mobile Category Sidebar */}
        <MobileFilter />
      </div>
    </>
  )
}

// import { useState, useMemo } from 'react'
// import { Search, Filter, ChevronDown, Heart, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { isArray } from '@/lib/type-guards'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ProductCard } from '@/components/elements/product-card'
import CategorySidebar from '@/components/elements/product/category-sidebar'
import { fetchHandler, methods } from '@/lib/fetch-handler'
import { ProductResponse, ProductTypes } from '@/lib/types'
import { CATALOG_DETAIL, PRODUCTS_DETAIL } from '@/lib/constants'
import { Filter } from 'lucide-react'
import CategoryFilter from '@/components/elements/product/categories-filter'


const CATEGORIES = ['All', 'Decor', 'Textiles', 'Furniture', 'Lighting']

export type SortOption = 'featured' | 'price-low' | 'price-high' | 'newest' | 'rating'

export default async function CatalogPage({ params }: {
    params: Promise<{ urlkey: string }>;
}) {

    const { urlkey } = await params;

    const productResponse = await fetchHandler<ProductResponse>({
        endpoint: `${CATALOG_DETAIL.endpoint}/${urlkey}`,
        method: CATALOG_DETAIL?.method as methods,
    });

    const productList: ProductTypes[] = productResponse?.data ?? [];

    // const [searchQuery, setSearchQuery] = useState('')
    // const [selectedCategory, setSelectedCategory] = useState('All')
    // const [sortBy, setSortBy] = useState<SortOption>('featured')
    // const [priceRange, setPriceRange] = useState<[number, number]>([0, 500])
    // const [showFilters, setShowFilters] = useState(true)

    // Filter and sort products
    // const filteredProducts = useMemo(() => {
    //     let filtered = PRODUCTS.filter((product) => {
    //         const matchesSearch = product.name
    //             .toLowerCase()
    //             .includes(searchQuery.toLowerCase())
    //         const matchesCategory =
    //             selectedCategory === 'All' || product.category === selectedCategory
    //         const matchesPrice =
    //             product.price >= priceRange[0] && product.price <= priceRange[1]

    //         return matchesSearch && matchesCategory && matchesPrice
    //     })

    //     // Sort products
    //     const sorted = [...filtered].sort((a, b) => {
    //         switch (sortBy) {
    //             case 'price-low':
    //                 return a.price - b.price
    //             case 'price-high':
    //                 return b.price - a.price
    //             case 'newest':
    //                 return b.id - a.id
    //             case 'rating':
    //                 return b.rating - a.rating
    //             case 'featured':
    //             default:
    //                 return 0
    //         }
    //     })

    //     return sorted
    // }, [searchQuery, selectedCategory, sortBy, priceRange])

    return (
        <div className="container mx-auto">
  <div className="flex gap-8">

    {/* Sidebar */}
    <aside className="hidden lg:block w-64 shrink-0">
      <div className="sticky top-16">
        <CategoryFilter />
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

            <div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
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

  </div>
</div>
    )

    
}

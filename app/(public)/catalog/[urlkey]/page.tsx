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
import { fetchHandler, methods } from '@/lib/api/auth'
import { ProductResponse, ProductTypes } from '@/lib/types'
import { CATALOG_DETAIL, PRODUCTS_DETAIL } from '@/lib/constants'
import { Filter } from 'lucide-react'


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
        <div className='container mx-auto'>
            <div className="flex flex-col lg:flex-row">
                {/* Sidebar - Hidden on mobile, toggleable */}
                <CategorySidebar
                    categories={CATEGORIES}

                />

                {/* Main Content */}
                <div className="flex-1">
                    {/* Top Filter Bar */}
                    <div className="border-b border-border bg-card p-4 lg:p-6">
                        <div className="">


                            <div className="flex gap-2">
                                {/* Toggle Filters Button - Mobile */}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="lg:hidden bg-transparent"
                                // onClick={() => setShowFilters(!showFilters)}
                                >
                                    <Filter className="mr-2 h-4 w-4" />
                                    Filters
                                </Button>

                                {/* Sort Dropdown */}
                                {/* <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                                    <SelectTrigger className="w-full md:w-48">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="featured">Featured</SelectItem>
                                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                                        <SelectItem value="newest">Newest</SelectItem>
                                        <SelectItem value="rating">Highest Rated</SelectItem>
                                    </SelectContent>
                                </Select> */}
                            </div>
                        </div>

                        {/* Active Filters Display */}
                        {/* {(searchQuery || selectedCategory !== 'All') && (
                            <div className="mt-4 flex flex-wrap gap-2">
                                {searchQuery && (
                                    <div className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm">
                                        <span>Search: {searchQuery}</span>
                                        <button
                                            onClick={() => setSearchQuery('')}
                                            className="text-muted-foreground hover:text-foreground"
                                        >
                                            ×
                                        </button>
                                    </div>
                                )}
                                {selectedCategory !== 'All' && (
                                    <div className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm">
                                        <span>{selectedCategory}</span>
                                        <button
                                            onClick={() => setSelectedCategory('All')}
                                            className="text-muted-foreground hover:text-foreground"
                                        >
                                            ×
                                        </button>
                                    </div>
                                )}
                            </div>
                        )} */}
                    </div>
                </div>

                {/* Products Grid */}
                <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
                    {isArray(productList) ? (
                        <>
                            <p className="mb-6 text-sm text-muted-foreground">
                                Showing {productList.length} product
                                {productList.length !== 1 ? 's' : ''}
                            </p>
                            <div className="grid gap-4 grid-cols-4">
                                {productList.map((product, index) => (
                                    <ProductCard key={product.url + index} {...product} />
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-border bg-card">
                            <p className="text-lg font-medium text-foreground">No products found</p>
                            <p className="text-sm text-muted-foreground">
                                Try adjusting your filters or search query
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

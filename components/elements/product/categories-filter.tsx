"use client";
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

import { useState } from "react"
import { SortOption } from "@/lib/types";
const CategoryFilter = () => {
    const [sortBy, setSortBy] = useState<SortOption>('featured');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    return (
       
                            <div className="  p-4 lg:p-6">
                                <div className="w-full">
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
                                        <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
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
                                        </Select>
                                    </div>
                                </div>
        
                                {/* Active Filters Display */}
                                {(searchQuery || selectedCategory !== 'All') && (
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
                                )}
                            </div>
                       
    )
}


export default CategoryFilter
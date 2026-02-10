'use client'

import { SortOption } from '@/app/(public)/catalog/[urlkey]/page'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { X } from 'lucide-react'
import { useState } from 'react'

interface SidebarProps {
  categories: string[]
}

export default function CategorySidebar({
  categories,
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState<SortOption>('featured')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500])
  const [showFilters, setShowFilters] = useState(true)

  return (
    <>
      {/* Mobile Overlay */}
      {showFilters && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setShowFilters(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 transform overflow-y-auto bg-card transition-transform duration-300 ease-in-out lg:static lg:top-0 lg:h-auto lg:translate-x-0 lg:transform-none ${showFilters ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="border-r border-border p-6">
          {/* Mobile Close Button */}
          <button
            onClick={() => setShowFilters(false)}
            className="absolute right-4 top-4 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Categories */}
          <div className="mb-8">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setShowFilters(false);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${selectedCategory === category
                    ? 'bg-primary text-primary-foreground font-medium'
                    : 'text-foreground hover:bg-secondary'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-8">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Price Range</h3>
            <div className="space-y-4">
              <Slider
                value={[priceRange[0], priceRange[1]]}
                onValueChange={(values) => {
                  if (values.length === 2) {
                    setPriceRange([values[0], values[1]])
                  }
                }}
                min={0}
                max={500}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-foreground">Collections</h3>
            <div className="space-y-2">
              {['New Arrivals', 'Best Sellers', 'Sale Items'].map((collection) => (
                <button
                  key={collection}
                  className="block w-full text-left px-3 py-2 text-foreground hover:bg-secondary rounded-lg transition-colors"
                >
                  {collection}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

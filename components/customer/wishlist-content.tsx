'use client'

import { useState } from 'react'
import { Heart, ArrowLeft, ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { WishlistCard } from './wishlist-card'

interface WishlistProduct {
    id: string
    name: string
    image: string
    price: number
    originalPrice?: number
    discount?: number
    inStock: boolean
}

export function WishlistContent() {
    const [wishlist, setWishlist] = useState<WishlistProduct[]>([
        {
            id: '1',
            name: 'Fresh Organic Apples - 1kg',
            image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&h=300&fit=crop',
            price: 249,
            originalPrice: 349,
            discount: 28,
            inStock: true,
        },
        {
            id: '2',
            name: 'Whole Wheat Bread',
            image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop',
            price: 45,
            inStock: true,
        },
        {
            id: '3',
            name: 'Almond Butter - 500g',
            image: 'https://images.unsplash.com/photo-1599599810694-2e8b56a6d0ae?w=400&h=300&fit=crop',
            price: 399,
            originalPrice: 499,
            discount: 20,
            inStock: false,
        },
        {
            id: '4',
            name: 'Greek Yogurt - 400g',
            image: 'https://images.unsplash.com/photo-1488477304666-e20ffe768ffd?w=400&h=300&fit=crop',
            price: 89,
            inStock: true,
        },
        {
            id: '5',
            name: 'Orange Juice - 1L',
            image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop',
            price: 65,
            originalPrice: 85,
            discount: 23,
            inStock: true,
        },
        {
            id: '6',
            name: 'Mixed Nuts - 250g',
            image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&h=300&fit=crop',
            price: 299,
            inStock: true,
        },
    ])

    const handleRemove = (id: string) => {
        setWishlist((prev) => prev.filter((item) => item.id !== id))
    }

    const handleAddToCart = (id: string) => {
        console.log('[v0] Added to cart:', id)
        // Integration point for cart functionality
    }

    return (
        <main className="flex-1 bg-gray-50 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="flex items-center gap-4 py-4 px-6" >
                    {/* Header */}
                    <div className="bg-white    flex items-center gap-4">
                        <button className="text-gray-600 hover:text-foreground">
                            <ChevronLeft size={24} />
                        </button>
                        <h1 className="text-xl font-semibold text-foreground">My Wishlist                        </h1>
                    </div>

                    <span className="ml-auto text-lg font-semibold text-gray-500">
                        {wishlist.length} items
                    </span>
                </div>
            </div>

            {/* Orders List */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
                {/* Content */}
                {wishlist.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-96 gap-4">
                        <Heart size={64} className="text-gray-300" />
                        <h2 className="text-2xl font-semibold text-gray-600">Your wishlist is empty</h2>
                        <p className="text-gray-500">Add items to your wishlist to keep track of them</p>
                    </div>
                ) : (
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
                            {wishlist.map((product) => (
                                <WishlistCard
                                    key={product.id}
                                    product={product}
                                    onRemove={handleRemove}
                                    onAddToCart={handleAddToCart}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </main>

    )
}

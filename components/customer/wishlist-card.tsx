'use client'

import { useState } from 'react'
import { Heart, ShoppingCart, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface WishlistProduct {
  id: string
  name: string
  image: string
  price: number
  originalPrice?: number
  discount?: number
  inStock: boolean
}

interface WishlistCardProps {
  product: WishlistProduct
  onRemove: (id: string) => void
  onAddToCart: (id: string) => void
}

export function WishlistCard({ product, onRemove, onAddToCart }: WishlistCardProps) {
  const [imageError, setImageError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const discountPercentage = product.discount || 0

  return (
    <div
      className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative w-full h-48 bg-gray-100 overflow-hidden group">
        {!imageError ? (
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
            crossOrigin="anonymous"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-sm text-gray-400">No image</span>
          </div>
        )}

        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
            {discountPercentage}% OFF
          </div>
        )}

        {/* Heart Icon */}
        <button className="absolute top-2 cursor-pointer left-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors">
          <Heart size={18} className="text-red-500 fill-red-500" />
        </button>

        {/* Stock Status */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="text-white font-semibold">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground truncate mb-2">{product.name}</h3>

        {/* Pricing */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-foreground">₹{product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={() => onAddToCart(product.id)}
            disabled={!product.inStock}
            className="flex-1 bg-green-600 cursor-pointer text-white hover:bg-green-700 rounded-lg h-10 flex items-center justify-center gap-2"
          >
            <ShoppingCart size={16} />
            <span>Add to Cart</span>
          </Button>
          <Button
            onClick={() => onRemove(product.id)}
            variant="outline"
            className="p-2 border border-gray-200 hover:bg-gray-50 rounded-lg"
          >
            <Trash2 size={16} className="text-green-500" />
          </Button>
        </div>
      </div>
    </div>
  )
}

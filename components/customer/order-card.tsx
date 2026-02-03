'use client'

import { useState } from 'react'
import { ChevronRight, Check } from 'lucide-react'
import Image from 'next/image'

export function OrderCard({ order }: {
  order: {

    items:
    {
      id: number,
      name: string,
      image: string,
    }[],
    status: string,
    date: string,
    amount: string,
    rating: number,

  }
}) {
  const [imageError, setImageError] = useState<{ [key: number]: boolean }>({})

  const handleImageError = (itemId: number) => {
    setImageError((prev) => ({ ...prev, [itemId]: true }))
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Items Preview */}
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {order.items.slice(0, 12).map((item, index: number) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-20 h-20 rounded-lg bg-gray-100 overflow-hidden"
            >
              {!imageError[item.id] ? (
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(item.id)}
                  crossOrigin="anonymous"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-xs text-gray-400">No image</span>
                </div>
              )}
            </div>
          ))}
          {order.items.length > 12 && (
            <div className="flex-shrink-0 w-20 h-20 rounded-lg bg-gray-200 flex items-center justify-center">
              <span className="text-xs font-medium text-gray-600">+{order.items.length - 12}</span>
            </div>
          )}
        </div>
      </div>

      {/* Order Details */}
      <div className="px-6 py-4 space-y-3">
        {/* Status */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-teal-100">
              <Check size={14} className="text-teal-600" />
            </span>
            <span className="font-semibold text-foreground">{order.status}</span>
          </div>
        </div>

        {/* Date */}
        <p className="text-sm text-gray-500">{order.date}</p>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-600">Your delivery experience rating:</span>
          <div className="flex gap-0.5">
            {Array.from({ length: order.rating }).map((_, i) => (
              <span key={i} className="text-red-400">★</span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
        <span className="font-semibold text-lg text-foreground">{order.amount}</span>
        <ChevronRight size={20} className="text-gray-400" />
      </div>
    </div>
  )
}

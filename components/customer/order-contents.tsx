'use client'

import { ChevronLeft, ChevronRight, Check } from 'lucide-react'
import { OrderCard } from './order-card'

const orders = [
  {
    id: 1,
    items: [
      {
        id: 1,
        name: 'Mixed Vegetables',
        image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=150&h=150&fit=crop',
      },
    ],
    status: 'Order delivered',
    date: 'Placed at 9th Jan 2026, 11:34 pm',
    amount: '₹471',
    rating: 5,
  },
  {
    id: 2,
    items: [
      {
        id: 1,
        name: 'Chips',
        image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd64371?w=150&h=150&fit=crop',
      },
      {
        id: 2,
        name: 'Juice',
        image: 'https://images.unsplash.com/photo-1600788148184-403f7cae9acf?w=150&h=150&fit=crop',
      },
      {
        id: 3,
        name: 'Biscuits',
        image: 'https://images.unsplash.com/photo-1599599810239-a82bbbfc0c2f?w=150&h=150&fit=crop',
      },
      {
        id: 4,
        name: 'Photo',
        image: 'https://images.unsplash.com/photo-1588195538326-c5b1e62f6124?w=150&h=150&fit=crop',
      },
      {
        id: 5,
        name: 'Snacks',
        image: 'https://images.unsplash.com/photo-1585707272881-720a08355fad?w=150&h=150&fit=crop',
      },
      {
        id: 6,
        name: 'Bread',
        image: 'https://images.unsplash.com/photo-1586190936529-0d4c2173a0c5?w=150&h=150&fit=crop',
      },
      {
        id: 7,
        name: 'Strawberry',
        image: 'https://images.unsplash.com/photo-1464454709131-ffd692591ee5?w=150&h=150&fit=crop',
      },
      {
        id: 8,
        name: 'Chocolate',
        image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd64371?w=150&h=150&fit=crop',
      },
      {
        id: 9,
        name: 'Candy',
        image: 'https://images.unsplash.com/photo-1599599810231-ae2a5b5b1fa6?w=150&h=150&fit=crop',
      },
      {
        id: 10,
        name: 'Energy Drink',
        image: 'https://images.unsplash.com/photo-1554617202-5a74ee28a11c?w=150&h=150&fit=crop',
      },
      {
        id: 11,
        name: 'Cereal',
        image: 'https://images.unsplash.com/photo-1585707272881-720a08355fad?w=150&h=150&fit=crop',
      },
      {
        id: 12,
        name: 'Nuts',
        image: 'https://images.unsplash.com/photo-1599599810635-ffb2b3f20140?w=150&h=150&fit=crop',
      },
    ],
    status: 'Order delivered',
    date: 'Placed at 6th Jan 2026, 09:26 pm',
    amount: '₹696',
    rating: 5,
  },
  {
    id: 3,
    items: [
      {
        id: 1,
        name: 'Coffee',
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b3f4?w=150&h=150&fit=crop',
      },
    ],
    status: 'Order delivered',
    date: 'Placed at 22nd Dec 2025, 02:15 pm',
    amount: '₹174',
    rating: 5,
  },
]

export function OrdersContent() {
  return (
    <main className="flex-1 bg-gray-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4">
        <button className="text-gray-600 hover:text-foreground">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-semibold text-foreground">Orders</h1>
      </div>

      {/* Orders List */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </main>
  )
}

'use client'

import { useState } from 'react'
import { Plus, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AddressCard } from './address-card'

interface Address {
  id: string
  type: 'home' | 'work' | 'other'
  title: string
  address: string
}

export function AddressesContent() {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      type: 'home',
      title: 'Home',
      address: 'Floor 2, Block Gali no 1.1, Shajda communication, Shajda communication, Vijay Nagar, Bahr ampur, Budh Vihar, Gzb',
    },
    {
      id: '2',
      type: 'work',
      title: 'Work',
      address: 'H-28 & fllor second, Arv park, Arv Park, H 28 H 28, H Block, Sector 63, Noida, Uttar Pradesh 201301, India',
    },
    {
      id: '3',
      type: 'other',
      title: 'Other',
      address: 'gali no 2, Gali No. 2, Vijay Nagar, Bahrampur, Budh Vihar, Gzb',
    },
    {
      id: '4',
      type: 'other',
      title: 'Other',
      address: '0 floor, hindan river, Vijay Nagar, Bahrampur, Budh Vihar, Gzb',
    },
    {
      id: '5',
      type: 'other',
      title: 'Other',
      address: 'indian petrol pump, Jasola Vihar, New Delhi',
    },
  ])

  const handleAddAddress = () => {
    console.log('[v0] Add new address clicked')
  }

  const handleEditAddress = (id: string) => {
    console.log('[v0] Edit address:', id)
  }

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter(addr => addr.id !== id))
  }

  return (
    <main className="flex-1 bg-gray-50 p-6 overflow-auto">
      <div className="w-full mx-auto">
        {/* Add New Address Button */}
        <div className="bg-white sticky top-0 rounded-lg border border-gray-200 p-4 mb-6 cursor-pointer hover:shadow-sm transition-shadow">
          <button className="w-full flex items-center justify-between text-green-500 font-semibold">
            <span className="flex items-center gap-2">
              <Plus size={20} />
              Add New Address
            </span>
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Saved Addresses Section */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Saved Addresses</h2>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            {addresses.map((addr) => (
              <AddressCard
                key={addr.id}
                type={addr.type}
                title={addr.title}
                address={addr.address}
                onEdit={() => handleEditAddress(addr.id)}
                onDelete={() => handleDeleteAddress(addr.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

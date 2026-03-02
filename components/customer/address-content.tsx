'use client'

import { useState } from 'react'
import { Plus, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AddressCard } from './address-card'
import { useMutation, useQuery } from '@tanstack/react-query'
import { fetchHandler, methods } from '@/lib/fetch-handler'
import { ADDRESSES } from '@/lib/constants'
import { useSession } from 'next-auth/react'
import { UserAddress } from '@/lib/types'
import { AddAddressModal } from './add-address-modal'

interface Address {
  id: string
  type: 'home' | 'work' | 'other'
  title: string
  address: string
}

export function AddressesContent() {

  const { data: session } = useSession();
  const { data, isPending, refetch } = useQuery<{ data: UserAddress[] }>({
    queryKey: ["address"],
    queryFn: () =>
      fetchHandler({
        ...ADDRESSES as {
          endpoint: string;
          method: methods;
        },
        token: session?.user?.accessToken
      }),
  });

  const addresses = data?.data;


  const handleEditAddress = (id: number) => {
    console.log('[v0] Edit address:', id)
  }


  return (
    <main className="flex-1 bg-gray-50 p-6 overflow-auto">
      <div className="w-full mx-auto">
        <AddAddressModal refetch={refetch} />
        {/* Saved Addresses Section */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Saved Addresses</h2>
          {
            isPending ? "Fetching Addresss.." :
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                {addresses?.map((addr) => (
                  <AddressCard
                    key={addr.id}
                    address={addr}
                    refetch={refetch}
                    onEdit={() => handleEditAddress(addr.id)}
                  />
                ))}
              </div>
          }
        </div>
      </div>
    </main>
  )
}

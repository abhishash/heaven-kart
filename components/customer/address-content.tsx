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
import { ScrollArea } from '../ui/scroll-area'


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

  return (
    <main className="flex-1 bg-gray-50 p-6 max-h-[682px] overflow-hidden">
      <div className="w-full mx-auto">
        <AddAddressModal refetch={refetch} />
        {/* Saved Addresses Section */}
        <div>
          <h2 className="text-lg font-semibold text-foreground px-1 mb-2">Saved Addresses</h2>
          {
            isPending ? "Fetching Addresss.." :
            <ScrollArea className="h-[550px] pr-4 ">
              <div className=" flex flex-col gap-y-2 ">
                {addresses?.map((addr, index) => (
                  <AddressCard
                    key={addr.id}
                    address={addr}
                    refetch={refetch}
                    isBorder={(addresses.length-1) === index}
                  />
                ))}
              </div>
            </ScrollArea>
          }
        </div>
      </div>
    </main>
  )
}

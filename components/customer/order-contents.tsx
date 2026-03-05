'use client'

import { ChevronLeft, ChevronRight, Check, Plus } from 'lucide-react'
import { OrderCard } from './order-card'
import { useQuery } from '@tanstack/react-query';
import { fetchHandler, methods } from '@/lib/fetch-handler';
import { ORDERS } from '@/lib/constants';
import { useSession } from 'next-auth/react';
import { OrderProducts } from '@/lib/types';
import { ScrollArea } from '../ui/scroll-area';
import { Button } from '../ui/button';
import { isArray } from '@/lib/type-guards';

export function OrdersContent() {
  const { data: session } = useSession();
  const { data, isPending, refetch } = useQuery<{ data: OrderProducts[] }>({
    queryKey: ["orders"],
    queryFn: () =>
      fetchHandler({
        ...ORDERS as {
          endpoint: string;
          method: methods;
        },
        token: session?.user?.accessToken
      }),
  });
  const orders = data?.data;
  return (
    <div className="w-full mx-auto">
      {/* Header */}
      <div className=' rounded-lg border border-gray-200 mb-2 cursor-pointer transition-shadow'>
        <Button variant="default" className='w-full bg-white !py-6 flex items-center justify-between text-green-500 font-semibold'>  <span className="flex items-center gap-2">
          <ChevronLeft size={20} />
          Order
        </span>
        </Button>
      </div>
      {/* Product List */}
      <div className='mt-4'>
        {
          isPending ? "Fetching orders..." :
            <ScrollArea className="h-[560px] pr-3">
              {
                isArray(orders) ? <div className="flex-1 overflow-y-auto px-0 py-0 space-y-4">
                  {
                    orders?.map((order) => (
                      <OrderCard key={order?.id} refetch={refetch} order={order} />
                    ))
                  }
                </div> : "No Orders Found"
              }
            </ScrollArea>
        }
      </div>


    </div>
  )
}

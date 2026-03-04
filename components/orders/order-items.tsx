'use client';

import { Card } from '@/components/ui/card';
import { OrderItemCard } from './order-item-card';
import { OrderItem } from '@/lib/types';

interface OrderItemsProps {
  items: Array<OrderItem>;
  refetch: () => void;
}

export function OrderItems({ items, refetch }: OrderItemsProps) {
  const totalItems = items.length;

  return (
    <div className="border bg-white rounded-md px-4 border-border/40 shadow-sm">
      {/* Header */}
      <div className="border-b border-border/40 px-6 py-4 md:px-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">Order Items</h2>
          <span className="text-sm font-semibold text-muted-foreground">
            {totalItems} {totalItems === 1 ? 'item' : 'items'}
          </span>
        </div>
      </div>

      {/* Items List */}
      <div className="divide-y divide-border/40">
        {items.map((item, index) => (
          <OrderItemCard key={item.id} refetch={refetch} isBorder={(items.length - 1) === index} item={item} />
        ))}
      </div>
    </div>
  );
}

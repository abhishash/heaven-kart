'use client';

import { Card } from '@/components/ui/card';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: string;
  image?: string;
}

interface OrderItemsProps {
  items: OrderItem[];
}

export function OrderItems({ items }: OrderItemsProps) {
  return (
    <Card className="p-6 bg-card border border-border">
      <h3 className="text-lg font-semibold text-foreground mb-4">Order Items</h3>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between pb-4 border-b border-border last:border-b-0">
            <div className="flex-1">
              <p className="font-medium text-foreground">{item.name}</p>
              <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
            </div>
            <p className="font-semibold text-accent">{item.price}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

'use client';

import { Card } from '@/components/ui/card';

interface OrderDetailsProps {
  orderId: string;
  orderDate: string;
  estimatedDelivery: string;
  total: string;
}

export function OrderDetails({
  orderId,
  orderDate,
  estimatedDelivery,
  total,
}: OrderDetailsProps) {
  return (
    <Card className="p-6 bg-card border border-border">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <p className="text-sm text-muted-foreground font-medium">Order ID</p>
          <p className="text-lg font-semibold text-foreground mt-1">{orderId}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground font-medium">Order Date</p>
          <p className="text-lg font-semibold text-foreground mt-1">{orderDate}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground font-medium">Est. Delivery</p>
          <p className="text-lg font-semibold text-foreground mt-1">{estimatedDelivery}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground font-medium">Total Amount</p>
          <p className="text-lg font-semibold text-accent">{total}</p>
        </div>
      </div>
    </Card>
  );
}

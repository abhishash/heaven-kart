'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Clock, Package, AlertCircle } from 'lucide-react';
import { formatIndianDateTime } from '@/lib/utils';
import { Order } from '@/lib/types';

interface OrderHeaderProps {
  order?: Order;
}

export default function OrderHeader({ order }: OrderHeaderProps) {
  const getStatusConfig = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed':
      case 'delivered':
        return {
          icon: CheckCircle2,
          label: 'Delivered',
          className: 'bg-primary text-primary-foreground',
        };
      case 'processing':
        return {
          icon: Package,
          label: 'Processing',
          className: 'bg-secondary text-secondary-foreground',
        };
      case 'pending':
        return {
          icon: Clock,
          label: 'Pending',
          className: 'bg-secondary text-secondary-foreground',
        };
      case 'cancelled':
        return {
          icon: AlertCircle,
          label: 'Cancelled',
          className: 'bg-destructive text-destructive-foreground',
        };
      default:
        return {
          icon: Package,
          label: 'Unknown',
          className: 'bg-muted text-muted-foreground',
        };
    }
  };

  const paymentMethodDisplay: Record<string, string> = {
    cod: 'Cash on Delivery',
    card: 'Credit/Debit Card',
    upi: 'UPI',
    wallet: 'Digital Wallet',
  };

  const statusConfig = getStatusConfig(order?.status as string);
  const StatusIcon = statusConfig.icon;

  

  return (
    <Card className="overflow-hidden border border-border/40 bg-card shadow-sm">
      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-r from-primary via-secondary to-primary" />

      <div className="p-2 md:p-4">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-3">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Order Number
              </p>
              <h1 className="text-xl font-bold tracking-tight text-foreground md:text-2xl">
                #{order?.order_no}
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Placed on {formatIndianDateTime(order?.created_at as string)} at {formatIndianDateTime(order?.created_at as string)}
              </p>
            </div>

            {/* Status with Icon */}
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Order Status
              </p>
              <div className="flex items-center gap-3">
                <div className={`rounded-lg p-2.5 ${statusConfig.className}`}>
                  <StatusIcon className="h-5 w-5" strokeWidth={2.5} />
                </div>
                <div>
                  <Badge className={`${statusConfig.className} px-4 py-1.5 text-xs font-semibold uppercase tracking-wide`}>
                    {statusConfig.label}
                  </Badge>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Last updated {formatIndianDateTime(order?.updated_at as string)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Payment Method Card */}
            <div className="rounded-lg border border-border/40 bg-muted/30 p-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Payment Method
              </p>
              <p className="text-base font-semibold text-foreground">
                {paymentMethodDisplay[order?.payment_method as keyof typeof paymentMethodDisplay] ||
                  order?.payment_method}
              </p>
            </div>

            {/* Payment Status Card */}
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Payment Status
              </p>
              <div className="flex items-center justify-between">
                <p className="text-base font-semibold capitalize text-primary">
                  {order?.payment_status}
                </p>
                <div className="h-2 w-2 rounded-full bg-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

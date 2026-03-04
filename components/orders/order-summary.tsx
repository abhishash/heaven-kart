'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Download,
  Truck,
  HelpCircle,
  Shield,
  RotateCcw,
  Package,
} from 'lucide-react';
import { Order, OrderItem, Product } from '@/lib/types';

interface OrderSummaryProps {
  order: Order;
}

export function OrderSummary({ order }: OrderSummaryProps) {
  const totalAmount = parseFloat(order.total_amount);
  const totalDiscount = parseFloat(order.total_discount);
  const finalAmount = parseFloat(order.final_amount);
  const itemCount = order.items.length;

  return (
    <div className="sticky top-8 space-y-6">
      {/* Summary Card */}
      <Card className="border border-border/40 bg-card shadow-sm">
        {/* Header with gradient */}
        <div className="border-b border-border/40 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 px-6 py-6">
          <h3 className="text-xl font-bold text-foreground">Order Summary</h3>
        </div>

        <div className="p-6 space-y-6">
          {/* Pricing Breakdown */}
          <div className="space-y-3 border-b border-border/40 pb-6">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Package className="h-4 w-4" />
                <span>{itemCount} {itemCount === 1 ? 'Item' : 'Items'}</span>
              </div>
              <span className="font-semibold text-foreground">
                ₹{totalAmount.toFixed(2)}
              </span>
            </div>

            {totalDiscount > 0 && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Discount</span>
                <span className="font-semibold text-primary">
                  -₹{totalDiscount.toFixed(2)}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="font-semibold text-primary">Free</span>
            </div>
          </div>

          {/* Total Amount */}
          <div className="rounded-lg bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 p-4">
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Total Amount
            </p>
            <p className="text-3xl font-bold text-primary">
              ₹{finalAmount.toFixed(2)}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <Button className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              <Download className="h-4 w-4" />
              Download Invoice
            </Button>
            <Button
              variant="outline"
              className="w-full gap-2 border-border/40 text-foreground hover:bg-muted"
            >
              <HelpCircle className="h-4 w-4" />
              Need Help?
            </Button>
          </div>
        </div>
      </Card>

      {/* Info Cards */}
      <div className="space-y-3">
        <Card className="border border-border/40 bg-primary/5 p-4 shadow-sm">
          <div className="flex gap-3">
            <Shield className="h-5 w-5 flex-shrink-0 text-primary" />
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Secure Payment
              </p>
              <p className="text-sm text-foreground">
                Your payment is protected with advanced encryption
              </p>
            </div>
          </div>
        </Card>

        <Card className="border border-border/40 bg-secondary/5 p-4 shadow-sm">
          <div className="flex gap-3">
            <RotateCcw className="h-5 w-5 flex-shrink-0 text-secondary" />
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Easy Returns
              </p>
              <p className="text-sm text-foreground">
                30-day return policy on eligible items
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

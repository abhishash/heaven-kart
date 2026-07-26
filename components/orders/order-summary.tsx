'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Download,
  HelpCircle,
  Shield,
  RotateCcw,
  Package,
  Receipt,
  CreditCard,
  CalendarDays,
  Truck,
} from 'lucide-react';
import { Order } from '@/types/service/order.types';
import InvoiceModal from './pop-up/invoice-modal';
import { useState } from 'react';

interface OrderSummaryProps {
  order: Order;
  orderId: string;
}

export function OrderSummary({ order, orderId }: OrderSummaryProps) {
  const [openInvoice, setOpenInvoice] = useState(false);
  const subtotal = Number(order.total_amount);
  const discount = Number(order.total_discount);
  const deliveryCharge = Number(order.delhivery_charge);
  const total = Number(order.final_amount);

  return (
    <div className="sticky top-8 space-y-6">
      <Card className="overflow-hidden">
        {/* Header */}
        <div className="bg-primary px-6 py-5 text-primary-foreground">
          <div className="flex items-center gap-3">
            <Receipt className="h-6 w-6" />
            <div>
              <h2 className="text-lg font-bold">Invoice Summary</h2>
              <p className="text-sm opacity-80">
                Order #{order.order_no}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6 p-4">
          {/* Amount Details */}

          <div className="space-y-3 rounded-lg border p-5">

            <div className="flex justify-between">
              <span className="flex items-center gap-2 text-muted-foreground">
                <Package className="h-4 w-4" />
                Subtotal
              </span>

              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Discount</span>

              <span className="text-green-600">
                -₹{discount.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="flex items-center gap-2 text-muted-foreground">
                <Truck className="h-4 w-4" />
                Delivery Charge
              </span>

              <span>₹{deliveryCharge.toFixed(2)}</span>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between text-xl font-bold">
                <span>Total Payable</span>
                <span className="text-primary">
                  ₹{total.toFixed(2)}
                </span>
              </div>
            </div>

          </div>

          {/* Payment Info */}

          <Card className="bg-muted/30 p-4">
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-primary" />

              <div>
                <p className="font-semibold">
                  Payment Type
                </p>

                <p className="text-sm text-muted-foreground capitalize">
                  {order.payment_type}
                </p>
              </div>
            </div>
          </Card>

          {/* Buttons */}

          <div className="space-y-3">

            <Button onClick={() => setOpenInvoice(true)} className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download Invoice
            </Button>

            <Button
              variant="outline"
              className="w-full"
            >
              <HelpCircle className="mr-2 h-4 w-4" />
              Need Help
            </Button>
            <InvoiceModal
              isOpen={openInvoice}
              onClose={() => setOpenInvoice(false)}
              orderId={orderId}
            />
          </div>

        </div>
      </Card>
    </div>
  );
}
'use client';

import { Card } from '@/components/ui/card';
import { Package, Truck, CheckCircle2 } from 'lucide-react';

export function NextSteps() {
  const steps = [
    {
      icon: Package,
      title: 'Order Confirmed',
      description: 'We\'ve received your order and are preparing it for shipment.',
      status: 'completed',
    },
    {
      icon: Truck,
      title: 'Shipping',
      description: 'Your order will be shipped within 2-3 business days.',
      status: 'pending',
    },
    {
      icon: CheckCircle2,
      title: 'Delivered',
      description: 'Receive and enjoy your order.',
      status: 'pending',
    },
  ];

  return (
    <Card className="p-6 bg-card border border-border">
      <h3 className="text-lg font-semibold text-foreground mb-6">What\'s Next</h3>
      <div className="space-y-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = step.status === 'completed';
          
          return (
            <div key={index} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`rounded-full p-2 ${isCompleted ? 'bg-accent' : 'bg-muted'}`}>
                  <Icon className={`w-5 h-5 ${isCompleted ? 'text-accent-foreground' : 'text-muted-foreground'}`} />
                </div>
                {index < steps.length - 1 && (
                  <div className="w-0.5 h-12 bg-border mt-2" />
                )}
              </div>
              <div className="flex-1 pt-1">
                <p className={`font-medium ${isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {step.title}
                </p>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

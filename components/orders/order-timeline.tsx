'use client';

import { Card } from '@/components/ui/card';
import { CheckCircle2, Clock, Package, Truck, Home } from 'lucide-react';

interface OrderTimelineProps {
  status?: string;
}

export function OrderTimeline({ status }: OrderTimelineProps) {
  const timelineSteps = [
    {
      id: 1,
      title: 'Order Placed',
      description: 'Your order has been received',
      icon: CheckCircle2,
      completed: true,
    },
    {
      id: 2,
      title: 'Pending',
      description: 'We are preparing your order',
      icon: Package,
      completed: ['Pending', 'shipped', 'delivered', 'completed'].includes(
        status?.toLowerCase() || ''
      ),
    },
    {
      id: 3,
      title: 'Shipped',
      description: 'Your order is on the way',
      icon: Truck,
      completed: ['shipped', 'delivered', 'completed'].includes(
        status?.toLowerCase() || ''
      ),
    },
    {
      id: 4,
      title: 'Delivered',
      description: 'Order reached your location',
      icon: Home,
      completed: ['delivered', 'completed'].includes(status?.toLowerCase() || ''),
    },
  ];

  return (
    <Card className="border border-border/40 bg-card p-8">
      <h3 className="mb-8 text-xl font-bold text-foreground">Order Progress</h3>

      <div className="space-y-4">
        {timelineSteps.map((step, index) => {
          const Icon = step.icon;
          const isLast = index === timelineSteps.length - 1;

          return (
            <div key={step.id} className="relative">
              {/* Connection Line */}
              {!isLast && (
                <div
                  className={`absolute left-5 top-12 h-12 w-0.5 transition-colors ${
                    step.completed
                      ? 'bg-gradient-to-b from-primary to-secondary'
                      : 'bg-border'
                  }`}
                />
              )}

              {/* Step Item */}
              <div className="flex gap-4">
                {/* Icon Circle */}
                <div
                  className={`relative z-10 mt-0.5 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                    step.completed
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-muted text-muted-foreground'
                  }`}
                >
                  <Icon className="h-5 w-5" strokeWidth={2.5} />
                </div>

                {/* Step Content */}
                <div className="flex-1 pb-4">
                  <div className="flex items-center justify-between">
                    <h4
                      className={`font-semibold transition-colors ${
                        step.completed
                          ? 'text-foreground'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {step.title}
                    </h4>
                    {step.completed && (
                      <span className="text-xs font-medium text-primary">
                        Completed
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

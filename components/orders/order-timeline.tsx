'use client';

import { Card } from '@/components/ui/card';
import { CheckCircle2, Clock, Package, Truck, Home } from 'lucide-react';

interface OrderTimelineProps {
  status?: string;
}

export function OrderTimeline({ status }: OrderTimelineProps) {
  const normalizedStatus = status?.trim().toLowerCase() ?? '';

  const getProgressStep = (currentStatus: string) => {
    switch (currentStatus) {
      case 'pending':
        return 1;
      case 'confirm order':
      case 'confirmed':
        return 2;
      case 'processing':
        return 3;
      case 'shipped':
        return 4;
      case 'delivered':
      case 'completed':
        return 5;
      default:
        return 0;
    }
  };

  const completedStep = getProgressStep(normalizedStatus);

  const timelineSteps = [
    {
      id: 1,
      title: 'Pending',
      description: 'Your order is waiting to be processed',
      icon: Clock,
    },
    {
      id: 2,
      title: 'Confirmed',
      description: 'Your order has been confirmed',
      icon: CheckCircle2,
    },
    {
      id: 3,
      title: 'Processing',
      description: 'Your order is being prepared',
      icon: Package,
    },
    {
      id: 4,
      title: 'Shipped',
      description: 'Your order is on the way',
      icon: Truck,
    },
    {
      id: 5,
      title: 'Delivered',
      description: 'Order reached your location',
      icon: Home,
    },
  ];

  return (
    <Card className="border border-border/40 bg-card p-4">
      <h3 className="text-xl font-bold text-foreground">Order Progress</h3>

      <div className="space-y-4">
        {timelineSteps.map((step, index) => {
          const Icon = step.icon;
          const isLast = index === timelineSteps.length - 1;
          const completed = index + 1 <= completedStep;

          return (
            <div key={step.id} className="relative">
              {/* Connection Line */}
              {!isLast && (
                <div
                  className={`absolute left-5 top-12 h-12 w-0.5 transition-colors ${completed
                    ? 'bg-gradient-to-b from-primary to-secondary'
                    : 'bg-border'
                    }`}
                />
              )}

              {/* Step Item */}
              <div className="flex gap-4">
                {/* Icon Circle */}
                <div
                  className={`relative z-10 mt-0.5 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${completed
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
                      className={`font-semibold transition-colors ${completed
                        ? 'text-foreground'
                        : 'text-muted-foreground'
                        }`}
                    >
                      {step.title}
                    </h4>
                    {completed && (
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

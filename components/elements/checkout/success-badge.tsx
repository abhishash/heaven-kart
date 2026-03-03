'use client';

import { CheckCircle2 } from 'lucide-react';

export function SuccessBadge() {
  return (
    <div className="flex justify-center">
      <div className="relative">
        <div className="absolute inset-0 bg-accent rounded-full opacity-20 animate-pulse" />
        <div className="relative bg-green-50 rounded-full p-4">
          <CheckCircle2 className="w-24 h-24 text-green-700" strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
}

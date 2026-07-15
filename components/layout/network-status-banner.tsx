"use client";

import { Wifi, WifiOff } from "lucide-react";
import { useNetwork } from "@/app/providers/NetworkProvider";

export default function NetworkStatusBanner() {
  const { isOnline } = useNetwork();

  if (isOnline) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 backdrop-blur-md">
      <div className="mx-5 w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl">

        {/* Icon */}
        <div
          className={`mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full
          ${
            !isOnline
              ? "bg-primary/10 text-primary"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {!isOnline ? (
            <WifiOff className="h-12 w-12" />
          ) : (
            <Wifi className="h-12 w-12" />
          )}
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-slate-900">
          {!isOnline
            ? "You're Offline"
            : "Slow Internet Connection"}
        </h2>

        {/* Message */}
        <p className="mt-4 text-sm leading-6 text-slate-600">
          {!isOnline
            ? "We can't connect to Heaven Kart right now. Please check your internet connection. We'll automatically reconnect as soon as you're back online."
            : "Your internet connection appears to be slow. Some pages and images may take a little longer to load."}
        </p>

        {/* Status */}
        <div
          className={`mt-8 rounded-xl px-4 py-3 text-sm font-semibold
          ${
            !isOnline
              ? "bg-primary/10 text-primary"
              : "bg-yellow-50 text-yellow-700"
          }`}
        >
          {!isOnline
            ? "Waiting for connection..."
            : "Optimizing for slow network..."}
        </div>

        {/* Loader */}
        {!isOnline && (
          <div className="mt-6 flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
          </div>
        )}
      </div>
    </div>
  );
}
"use client";

import { useQuery } from "@tanstack/react-query";
import { BrandCarousel } from "./brand-carousel";
import { fetchHandler, methods } from "@/lib/api/auth";
import { BRAND_LOGOS } from "@/lib/constants";

export function BrandLogoInfinite() {
    const { data, isPending } = useQuery({
      queryKey: ["brands"],
      queryFn: () =>
        fetchHandler({
          ...BRAND_LOGOS as {
            endpoint: string;
            method: methods;
          },
        }),
    });
  
    const brands = data?.data ?? [];
  
    if (isPending) {
      return (
        <div className="px-4 py-6 animate-pulse flex gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="min-w-40 min-h-40 rounded-full bg-slate-200"
            />
          ))}
        </div>
      );
    }
  
    return <BrandCarousel brands={brands} />;
  }
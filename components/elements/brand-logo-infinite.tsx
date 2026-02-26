"use client";

import { useQuery } from "@tanstack/react-query";
import { BrandCarousel } from "./brand-carousel";
import { fetchHandler, methods } from "@/lib/fetch-handler";
import { BRAND_LOGOS } from "@/lib/constants";
import { useIsMobile } from "../hooks/useIsMobile";

export function BrandLogoInfinite() {
   const isMobile = useIsMobile();
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
        <div className="px-0 sm:px-4 py-3 sm:py-6 animate-pulse justify-center flex gap-2 sm:gap-6">
          {
             Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="sm:min-w-40 min-h-20 min-w-20 sm:min-h-40 rounded-full bg-slate-200"
            />
             ))
          }
         
        </div>
      );
    }
  
    return <BrandCarousel brands={brands} />;
  }
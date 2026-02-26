"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ProductCard } from "./product-card";
import useEmblaCarousel from "embla-carousel-react";
import { ProductTypes } from "@/lib/types";
import clsx from "clsx";
import Link from "next/link";

export interface Product {
  id: string;
  image: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  quantity: string;
  category: string;
  rating: number;
  reviewCount: number;
}

interface ProductCarouselProps {
  title: string;
  products: ProductTypes[];
  isBanner : boolean;
  url?: string;
}

export function ProductCarousel({ title, products, isBanner, url }: ProductCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
  slidesToScroll: 1,
  breakpoints: {
    "(min-width: 768px)": { slidesToScroll: 2 },
    "(min-width: 1024px)": { slidesToScroll: 4 },
  },
});
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const productsMemo = useMemo(() => products, [products]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
  
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  
    // 🔥 VERY IMPORTANT: Call once on mount
    onSelect();
  
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);


  return (
    <section className={clsx(isBanner ? "col-span-12 sm:col-span-12" : "col-span-12")}>
      {/* Header */}
      <div className="flex items-center justify-between mb-2 md:mb-6 px-0">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900">{title}</h2>
        <Link
          href={`/catalog/${url || "/"}`}
          className="text-green-600 hover:text-green-700 font-semibold text-xs sm:text-sm flex items-center gap-1"
        >
          See All
          <ChevronRight size={16} />
        </Link>
      </div>
      {/* Carousel Container */}
      <div className="relative">
        {/* Left Navigation Button */}
        <button
          onClick={scrollPrev}
          disabled={prevBtnDisabled}
          className="absolute md:block hidden left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl disabled:opacity-50 active:cursor-pointer disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft size={20} className="text-slate-900" />
        </button>
        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-2 px-0 md:px-6">
            {productsMemo?.map((product) => (
              <div key={product.url} className="flex-shrink-0 mr-1 sm:mr-4">
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </div>

        {/* Right Navigation Button */}
        <button
          onClick={scrollNext}
          disabled={nextBtnDisabled}
          className="absolute md:block hidden right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl disabled:opacity-50 active:cursor-pointer disabled:cursor-not-allowed transition-all"
        >
          <ChevronRight size={20} className="text-slate-900" />
        </button>
      </div>
    </section>
  );
}

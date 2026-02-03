"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { ProductCard } from "./product-card";
import useEmblaCarousel from "embla-carousel-react";

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
  products: Product[];
}

export function ProductCarousel({ title, products }: ProductCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ slidesToScroll: 4 });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

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
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 px-0">
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
        <a
          href="#"
          className="text-green-600 hover:text-green-700 font-semibold text-sm flex items-center gap-1"
        >
          See All
          <ChevronRight size={16} />
        </a>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Left Navigation Button */}
        <button
          onClick={scrollPrev}
          disabled={prevBtnDisabled}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft size={20} className="text-slate-900" />
        </button>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex px-4 md:px-6">
            {products.map((product) => (
              <div key={product.id} className="flex-shrink-0 mr-4">
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </div>

        {/* Right Navigation Button */}
        <button
          onClick={scrollNext}
          disabled={nextBtnDisabled}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <ChevronRight size={20} className="text-slate-900" />
        </button>
      </div>
    </section>
  );
}

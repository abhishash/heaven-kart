"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { imageBaseUrl } from "@/lib/constants";

interface Brand {
  id: number;
  name: string;
  image: string;
}

interface BrandCarouselProps {
  title?: string;
  brands: Brand[];
}







export function BrandCarousel({ title = "Our Brands", brands }: BrandCarouselProps) {


  const extendedBrands = [...brands];
  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: true,
    align: "start",
  });

  const rafId = useRef<number | null>(null);
  const isPaused = useRef(false);
  const speed = 0.6;

  const startAutoScroll = () => {
    if (!emblaApi || isPaused.current || rafId.current) return;

    const engine = emblaApi.internalEngine();

    const scroll = () => {
      if (isPaused.current) return;
      // 🔥 move RIGHT ➝ LEFT
      engine.location.add(-speed);
      engine.translate.to(engine.location.get());

      rafId.current = requestAnimationFrame(scroll);
    };

    rafId.current = requestAnimationFrame(scroll);
  };

  const stopAutoScroll = () => {
    isPaused.current = true;
    if (rafId.current) {
      if(extendedBrands?.length < 10) return;
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
  };

  const resumeAutoScroll = () => {
    isPaused.current = false;
    startAutoScroll();
  };

  useEffect(() => {
    if (!emblaApi || extendedBrands?.length < 10) return;
    startAutoScroll();
    return () => stopAutoScroll();
  }, [emblaApi]);

  return (
    <section className="w-full bg-white py-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-4 px-4">
        {title}
      </h2>

      <div
        ref={emblaRef}
        onMouseEnter={stopAutoScroll}
        onMouseLeave={resumeAutoScroll}
        className="overflow-hidden px-2"
      >
        <div className="flex gap-10 items-center">
          {extendedBrands.map((brand, index) => (
            <div
              key={`${brand.id}-${index}`}
              className="flex-shrink-0 w-40 h-40 flex items-center justify-center overflow-hidden rounded-full transition"
            >
              <Image
                src={`${imageBaseUrl}${brand.image}`}
                alt={brand.name}
                width={120}
                height={80}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
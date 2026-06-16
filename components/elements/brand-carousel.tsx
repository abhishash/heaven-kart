"use client";

import Image from "next/image";
import { useEffect, useRef, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { imageBaseUrl } from "@/lib/constants";
import Link from "next/link";

interface Brand {
  id: number;
  name: string;
  image: string;
  url: string;
}

interface BrandCarouselProps {
  title?: string;
  brands: Brand[];
}

export function BrandCarousel({
  title = "Our Brands",
  brands,
}: BrandCarouselProps) {

  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: true,
    align: "start",
    loop: true,
  });

  const animationRef = useRef<number | null>(null);
  const pausedRef = useRef(false);

  const AUTO_SCROLL_SPEED = 0.6;

  const stopAutoScroll = useCallback(() => {
    pausedRef.current = true;

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  const startAutoScroll = useCallback(() => {
    if (!emblaApi || pausedRef.current || animationRef.current) return;

    const engine = emblaApi.internalEngine();

    const animate = () => {
      if (pausedRef.current) return;

      engine.location.add(-AUTO_SCROLL_SPEED);
      engine.translate.to(engine.location.get());

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
  }, [emblaApi]);

  const resumeAutoScroll = useCallback(() => {
    pausedRef.current = false;
    startAutoScroll();
  }, [startAutoScroll]);

  useEffect(() => {
    if (!emblaApi || brands.length < 10) return;

    startAutoScroll();

    return () => {
      stopAutoScroll();
    };
  }, [emblaApi, brands.length, startAutoScroll, stopAutoScroll]);

  return (
    <section className="w-full bg-white py-4 sm:py-6">
      <h2 className="mb-4 px-0  text-lg font-bold text-yellow-400 sm:px-0 sm:text-2xl">
        {title}
      </h2>

      <div
        ref={emblaRef}
        className="overflow-hidden"
      // onMouseEnter={stopAutoScroll}
      // onMouseLeave={resumeAutoScroll}
      >
        <div className="flex items-center gap-6 sm:gap-10">
          {brands?.map((brand) => (
            <Link
              key={brand.id}
              href={`/catalog/${brand.url}`}
              className="
    group
    w-36 sm:w-40
    overflow-hidden
    rounded-xl
    bg-white
    border border-slate-200
    shadow-sm
    hover:shadow-2xl
    transition-all duration-300
  "
            >
              <div className="relative h-36 sm:h-48 bg-gradient-to-b from-green-700 to-green-200">
                <Image
                  src={`${imageBaseUrl}${brand.image}`}
                  alt={brand.name}
                  fill
                  className="object-contain rounded-xl px-3 py-3 transition-transform duration-500"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
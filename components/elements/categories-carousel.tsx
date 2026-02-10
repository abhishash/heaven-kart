"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { ProductCard } from "./product-card";
import useEmblaCarousel from "embla-carousel-react";
import { ProductTypes, SubCategory } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import { imageNotFound } from "@/lib/constants";

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
    subCategories: SubCategory[];
}

export function CategoriesCarousel({ title, subCategories }: ProductCarouselProps) {
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

  emblaApi.on("select", onSelect);
  emblaApi.on("reInit", onSelect);

  // cleanup
  return () => {
    emblaApi.off("select", onSelect);
    emblaApi.off("reInit", onSelect);
  };
}, [emblaApi, onSelect]);


    return (
        <section className="space-y-6">
            {/* Section Title */}
            <h1 className="text-2xl  font-semibold text-slate-900 px-4">
                {title}
            </h1>

            {/* Cards Row */}
            <div className="grid grid-cols-6 gap-4 overflow-x-auto px-4 pb-4 scrollbar-hide">
                {subCategories?.map((product) => (
                    <Link
                        key={product.url}
                        href={`/${product.url}`}
                        className="flex-shrink-0"
                    >
                        <div
                            className="
            w-auto
            bg-white
            rounded-3xl
            overflow-hidden
            hover:-translate-y-1
            transition-all
            duration-300
            group
          "
                        >
                            {/* Image */}
                            <div className="relative bg-slate-100 rounded-2xl h-56 flex items-center justify-center">
                                <SafeImage
                                    src={product.image}
                                    alt={product.name}
                                    width={160}
                                    height={160}
                                    className="
    object-contain
    transition-transform
    duration-300
    rounded-2xl
    group-hover:scale-105
  "
                                />
                            </div>

                            {/* Content */}
                            <div className="p-4 text-center">
                                <h2 className="text-2xl font-semibold text-slate-900 line-clamp-2">
                                    {product.name}
                                </h2>


                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}





interface SafeImageProps {
    src?: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
}

export function SafeImage({
    src,
    alt,
    width,
    height,
    className,
}: SafeImageProps) {
    const [imgSrc, setImgSrc] = useState(
        src ? `${process.env.ASSET_ENDPOINS}${src}` : imageNotFound
    );

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      onError={() => setImgSrc(imageNotFound)}
      className={className}
    />
  );
}

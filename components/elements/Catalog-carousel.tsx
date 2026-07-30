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
    title?: string;
    subCategories?: SubCategory[];
}



export function CatalogCarousel({ title, subCategories }: ProductCarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ slidesToScroll: 3 });
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
        onSelect();

        return () => {
            emblaApi.off("select", onSelect);
            emblaApi.off("reInit", onSelect);
        };
    }, [emblaApi, onSelect]);

    return (
        <section className="space-y-3 my-8 sm:space-y-6">
            <div className="relative">
                <button
                    type="button"
                    onClick={scrollPrev}
                    disabled={prevBtnDisabled}
                    className="inline-flex h-9 w-9 absolute left-0 z-[49] top-[40%] items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 shadow-sm transition hover:border-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Scroll previous"
                >
                    <ChevronLeft size={18} />
                </button>
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex gap-3 pb-4">
                        {subCategories?.map((product) => (
                            <Link
                                key={product.url}
                                href={product?.products ? `/catalog/${product.url}` : "/"}
                                className="flex-shrink-0 w-[165px] sm:w-[170px]"
                            >
                                <div className="relative flex flex-col items-center bg-white rounded-xl border border-slate-200 overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group">

                                    <div className="relative w-full h-24 sm:h-28 overflow-hidden rounded-t-xl">
                                        <SafeImage
                                            src={product.image}
                                            alt={product.name}
                                            width={240}
                                            height={240}
                                            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                        />

                                        {product?.products === 0 ? (
                                            <span className="absolute top-2 right-3 bg-white/90 backdrop-blur-sm text-orange-600 text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full shadow-md border border-orange-200">
                                                Coming Soon
                                            </span>
                                        ) : (
                                            <span className="absolute top-2 right-3 bg-green-600 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-md">
                                                {product?.products}+
                                            </span>
                                        )}
                                    </div>

                                    <div className="py-2 sm:py-3 text-left px-3 w-full">
                                        <h2 className="text-sm sm:text-base line-clamp-1 font-semibold text-gray-800">
                                            {product.name}
                                        </h2>
                                        <p className="text-xs text-left text-green-600 font-bold">View Store</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                <button
                    type="button"
                    onClick={scrollNext}
                    disabled={nextBtnDisabled}
                    className="inline-flex h-9 w-9 absolute right-0 top-[40%] items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 shadow-sm transition hover:border-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Scroll next"
                >
                    <ChevronRight size={18} />
                </button>
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

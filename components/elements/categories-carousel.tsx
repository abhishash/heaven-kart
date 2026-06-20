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
        <section className="space-y-3 sm:space-y-6">
            {/* Section Title */}
            <h1 className="text-lg sm:text-xl font-bold text-yellow-400">
                {title}
            </h1>

            {/* Cards Row */}
            <div className="grid grid-cols-3 sm:grid-cols-7 gap-2 overflow-x-auto px-0  pb-4 scrollbar-hide">
                {subCategories?.map((product) => (
                    <Link
                        key={product.url}
                        href={product?.products ? `/catalog/${product.url}` : "/"}
                        className="flex-shrink-0"
                    >
                        <div className="relative flex flex-col items-center bg-white rounded-xl border border-slate-200 overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group">

                            {/* Image */}
                            <div className="relative w-32 h-24 sm:w-40 sm:h-32 overflow-hidden rounded-t-lg">
                                <SafeImage
                                    src={product.image}
                                    alt={product.name}
                                    width={160}
                                    height={160}
                                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                />

                                {/* Status Badge */}
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

                            {/* Content */}
                            <div className="py-3 text-center w-full">
                                <h2 className="text-xs sm:text-base line-clamp-1 font-semibold text-gray-800">
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

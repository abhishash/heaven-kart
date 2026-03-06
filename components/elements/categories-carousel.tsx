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
            <h1 className="text-lg sm:text-xl font-bold text-slate-900">
                {title}
            </h1>

            {/* Cards Row */}
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-4 overflow-x-auto px-0  pb-4 scrollbar-hide">
                {subCategories?.map((product) => (
                    <Link
                        key={product.url}
                        href={`/catalog/${product.url}`}
                        className="flex-shrink-0 py-4 border rounded-lg border-slate-200"
                    >
                        <div
                            className=" flex justify-center flex-col items-center bg-white rounded-lg overflow-hidden hover:-translate-y-1 transition-all duration-300 group"
                        >
                            {/* Image */}
                            <SafeImage
                                src={product.image}
                                alt={product.name}
                                width={160}
                                height={160}
                                className="object-cover w-32 h-32 transition-transform duration-300  group-hover:scale-105"
                            />

                            {/* Content */}
                            <div className="space-y-1 pt-2 text-center">
                                <h2 className="text-base line-clamp-1 font-semibold text-gray-700">
                                    {product.name}
                                </h2>
                                <p className="text-xs text-green-700">{product?.products} Items</p>
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

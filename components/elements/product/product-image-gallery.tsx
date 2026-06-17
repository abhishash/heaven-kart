"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { GalleryImage } from "@/lib/types";
import { imageBaseUrl } from "@/lib/constants";

interface ProductImageGalleryProps {
    discountPercent: number;
    images: GalleryImage[];
    thumbnailImg: string;
}

export default function ProductImageGallery({
    discountPercent,
    images,
    thumbnailImg,
}: ProductImageGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(0);
    const [loading, setLoading] = useState(true);

    const activeImage =
        images?.[selectedImage]?.image || thumbnailImg;

    useEffect(() => {
        setLoading(true);
    }, [selectedImage]);

    return (
        <div className="flex flex-col  gap-4">
            <div className="md:sticky md:top-24">
                <div className="flex flex-col gap-2 sm:flex-row-reverse">
                    {/* Main Image */}
                    <div className="relative max-w-[325px] ms:w-full overflow-hidden rounded-2xl border bg-background shadow-sm">
                        <div className="relative aspect-square md:aspect-[1/1]">
                            <Image
                                src={`${imageBaseUrl}/${activeImage}`}
                                alt="Product image"
                                fill
                                priority
                                onLoad={() => setLoading(false)}
                                sizes="(max-width:768px)100vw,50vw"
                                className="object-contain transition-transform duration-500 hover:scale-110"
                            />

                            {loading && (
                                <div className="absolute inset-0 animate-pulse bg-muted" />
                            )}

                            {/* Discount Badge */}
                            {discountPercent > 0 && (
                                <div className="absolute top-4 right-4 rounded-full bg-primary px-4 py-2 shadow-lg">
                                    <span className="text-xs font-bold text-primary-foreground">
                                        {discountPercent}% OFF
                                    </span>
                                </div>
                            )}

                            {/* Image Counter */}
                            <div className="absolute bottom-4 right-4 rounded-full bg-black/70 px-3 py-1 text-xs text-white backdrop-blur">
                                {selectedImage + 1} / {images.length}
                            </div>
                        </div>
                    </div>

                    {/* Thumbnails */}
                    <div className="relative max-w-[320px] sm:w-[90px]">
                        {/* Mobile Left Shadow */}
                        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-8 bg-gradient-to-r from-background to-transparent sm:hidden" />

                        {/* Mobile Right Shadow */}
                        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8 bg-gradient-to-l from-background to-transparent sm:hidden" />

                        {/* Desktop Top Shadow */}
                        <div className="pointer-events-none absolute top-0 left-0 z-10 hidden h-8 w-full bg-gradient-to-b from-background to-transparent sm:block" />

                        {/* Desktop Bottom Shadow */}
                        <div className="pointer-events-none absolute bottom-0 left-0 z-10 hidden h-8 w-full bg-gradient-to-t from-background to-transparent sm:block" />

                        <div className=" flex
  flex-row
  gap-2
  overflow-x-auto
  overflow-y-hidden
  scrollbar-hide
  py-1
  sm:max-h-[440px]
  sm:flex-col
  sm:overflow-y-auto
  sm:overflow-x-hidden">
                            {images.map((image, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImage(idx)}
                                    className={`group relative
  h-16 w-16
  sm:h-20 sm:w-20
  shrink-0
  cursor-pointer
  overflow-hidden
  rounded-xl
  border-2
  transition-all duration-300
  ${selectedImage === idx
                                            ? "border-primary shadow-lg ring-2 ring-primary/20"
                                            : "border-border hover:border-primary/50"
                                        }
`}
                                >
                                    <Image
                                        src={`${imageBaseUrl}/${image.image}`}
                                        alt={`Thumbnail ${idx + 1}`}
                                        fill
                                        sizes="80px"
                                        className={`object-cover transition-transform duration-300 group-hover:scale-110 ${selectedImage === idx ? "scale-105" : ""
                                            }`}
                                    />

                                    {selectedImage === idx && (
                                        <div className="absolute inset-0 bg-primary/10" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
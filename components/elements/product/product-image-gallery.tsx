"use client";

import { useState } from "react";
import { GalleryImage } from "@/lib/types";
import Image from "next/image";
import { imageBaseUrl } from "@/lib/constants";

export default function ProductImageGallery({ images, thumbnailImg }: { images: GalleryImage[], thumbnailImg: string }) {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);


    return (
        <div className="flex flex-col  gap-4">
            <div className="sticky top-[100px]">
                <div className="flex flex-row-reverse gap-x-3">
                    {/* Main Image */}
                    <div className="relative w-full overflow-hidden rounded-lg border border-border bg-muted aspect-square">
                        <Image
                            src={images?.[selectedImage]?.image ? ` ${imageBaseUrl}/${images?.[selectedImage]?.image}` : `${imageBaseUrl}/${thumbnailImg}`}
                            alt="Product image"
                            fill
                            className="object-cover"
                            onLoadingComplete={() => setIsLoading(false)}
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                        />
                        {isLoading && (
                            <div className="absolute inset-0 animate-pulse bg-muted" />
                        )}
                        {/* Badge */}
                        <div className="absolute top-4 right-4 rounded-full bg-primary px-3 py-1">
                            <span className="text-xs font-semibold text-primary-foreground">
                                -25%
                            </span>
                        </div>
                    </div>

                    {/* Thumbnail Images */}
                    <div className="flex max-h-[520px] flex-col gap-2">
                        {images.map((image, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedImage(idx)}
                                className={`relative cursor-pointer w-full min-w-16 min-h-16 overflow-hidden rounded-lg border-2 transition-colors aspect-square ${selectedImage === idx
                                    ? 'border-primary'
                                    : 'border-border hover:border-muted-foreground'
                                    }`}
                            >
                                <Image
                                    src={`${imageBaseUrl}/${image?.image}` || "/placeholder.svg"}
                                    alt={`Product thumbnail ${idx + 1}`}
                                    fill
                                    className="object-cover"
                                    sizes="100px"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    );
}

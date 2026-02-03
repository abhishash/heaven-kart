'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  images: string[];
  selectedIndex: number;
  onSelectImage: (index: number) => void;
}

export default function ProductGallery({
  images,
  selectedIndex,
  onSelectImage,
}: ProductGalleryProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="flex flex-row-reverse gap-x-3">
      {/* Main Image */}
      <div className="relative w-full overflow-hidden rounded-lg border border-border bg-muted aspect-square">
        <Image
          src={images[selectedIndex] || "/placeholder.svg"}
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
            onClick={() => onSelectImage(idx)}
            className={`relative cursor-pointer w-full min-w-16 min-h-16 overflow-hidden rounded-lg border-2 transition-colors aspect-square ${
              selectedIndex === idx
                ? 'border-primary'
                : 'border-border hover:border-muted-foreground'
            }`}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`Product thumbnail ${idx + 1}`}
              fill
              className="object-cover"
              sizes="100px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

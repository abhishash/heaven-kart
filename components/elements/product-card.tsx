"use client";

import Image from "next/image";
import { Heart, Star } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface ProductCardProps {
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

export function ProductCard({
  id,
  image,
  title,
  description,
  price,
  originalPrice,
  quantity,
  category,
  rating,
  reviewCount,
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const discountPercent = Math.round(
    ((originalPrice - price) / originalPrice) * 100,
  );

  return (
    <div className="flex-shrink-0 w-40 bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      {/* Image Container */}
      <div className="relative bg-slate-50 h-40 flex items-center justify-center overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={160}
          height={160}
          className="object-contain w-full h-full p-2"
        />

        {/* Discount Badge */}
        {discountPercent > 0 && (
          <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
            {discountPercent}% OFF
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-sm hover:shadow-md transition-shadow"
        >
          <Heart
            size={16}
            className={
              isWishlisted ? "fill-red-500 text-red-500" : "text-slate-400"
            }
          />
        </button>

        {/* Add Button */}
        <button className="absolute bottom-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full px-3 py-1 text-xs font-bold transition-colors">
          ADD
        </button>
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Price */}
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
            ₹{price}
          </span>
          <span className="text-xs text-slate-500 line-through">
            ₹{originalPrice}
          </span>
        </div>

        {/* Title */}
        <Link href={"product-details"}>
          <h3 className="text-xs font-bold text-slate-900 line-clamp-2 mb-1">
            {title}
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-600 line-clamp-1 mb-2">
            {description}
          </p>
        </Link>

        {/* Quantity */}
        <p className="text-xs text-slate-600 mb-2">{quantity}</p>

        {/* Category */}
        <p className="text-xs text-green-600 font-semibold mb-2">{category}</p>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <Star size={12} className="fill-green-600 text-green-600" />
          <span className="text-xs font-bold text-slate-900">
            {rating}
            <span className="text-slate-600">
              {" "}
              ({reviewCount.toLocaleString()})
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { Heart, Star } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { ProductTypes } from "@/lib/types";

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
  url,
  name,
  image,
  price,
  ac_price,
  stock,
  in_stock,
  summer_id,
  slug,
  discount,
  brand
}: ProductTypes) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const discountPercent = Math.round(
    ((parseFloat(ac_price) - parseFloat(price)) / parseFloat(ac_price)) * 100,
  );

  const isOutOfStock = Number(in_stock) === 0;
  return (
    <div
      className={`
    flex-shrink-0 w-56 bg-white border border-slate-200 rounded-lg overflow-hidden
    transition-all
    ${isOutOfStock
          ? "opacity-60 cursor-not-allowed pointer-events-none"
          : "hover:shadow-md"
        }
  `}
    >
      {/* Image Container */}
      <div className="relative bg-slate-50 h-60 flex items-center justify-center overflow-hidden">
        <Image
          src={`${process.env.ASSET_ENDPOINS}${image}` || "/placeholder.svg"}
          alt={name}
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

        {isOutOfStock ? (
          <div className="absolute bottom-2 right-2 bg-red-500/90 text-white rounded-full px-3 py-1 text-xs font-bold">
            OUT OF STOCK
          </div>
        ) : (
          <button className="absolute bottom-2 cursor-pointer right-2 bg-red-500 hover:bg-red-600 text-white rounded-full px-3 py-1 text-xs font-bold transition-colors">
            ADD
          </button>
        )}

      </div>

      {/* Content */}
      <div className="p-3">
        {/* Price */}
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
            ₹{price}
          </span>
          <span className="text-xs text-slate-500 line-through">
            ₹{ac_price}
          </span>
        </div>

        {/* Title */}
        <Link href={`/product/${url}`}>
          <h3 className="text-xs font-bold text-slate-900 line-clamp-2 mb-1">
            {name}
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-600 line-clamp-1 mb-2">
            {name}
          </p>
        </Link>

        {/* Quantity */}
        <p className="text-xs text-slate-600 mb-2">{stock ?? 0}  Quantity</p>

        {/* Rating */}
        {/* <div className="flex items-center gap-1">
          <Star size={12} className="fill-green-600 text-green-600" />
          <span className="text-xs font-bold text-slate-900">
            {rating}
            <span className="text-slate-600">
              {" "}
              ({reviewCount.toLocaleString()})
            </span>
          </span>
        </div> */}
      </div>
    </div>
  );
}

"use client";

import { Heart, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import { useState } from "react";

interface Product {
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  sku: string;
  color: string;
  warranty: string;
}

interface ProductInfoProps {
  product: Product;
  isFavorite: boolean;
  onFavoriteChange: (value: boolean) => void;
}

export default function ProductInfo({
  product,
  onFavoriteChange,
}: ProductInfoProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const discountPercentage = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100,
  );

  return (
    <div className="space-y-4">
      {/* Brand and Title */}
      <div>
        <p className="text-sm font-semibold text-primary">{product.brand}</p>
        <div className="flex justify-between items-start">
          <h1 className="mt-2 text-xl font-bold text-foreground">
            {product.name}
          </h1>
          <Button
            variant="ghost"
            size="lg"
            className="cursor-pointer"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-green-600 stroke-green-600" : ""}`} />
          </Button>
        </div>

        <div className="flex items-center gap-x-2 mt-1">
          <div>
            <p className="text-sm  font-semibold text-muted-foreground">
              Net Qty: 1 pack (500ml)
            </p>
          </div>
          {/* Rating */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-green-500 text-green-400" />
              <span className="font-semibold text-foreground">
                {product.rating}
              </span>
            </div>
            <span className="text-sm text-muted-foreground">
              ({product.reviewCount.toLocaleString()} reviews)
            </span>
          </div>
        </div>
      </div>

      <div className="">
        {/* Product Details */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground text-base">SKU:</span>
            <span className="font-medium text-foreground text-base">
              {product.sku}
            </span>
          </div>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-center gap-4">
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-foreground">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-base text-muted-foreground line-through">
            ${product.originalPrice.toFixed(2)}
          </span>
        </div>
        <Badge className="bg-red-100 text-red-800">
          {discountPercentage}% OFF
        </Badge>
      </div>

      {/* Stock Status */}
      <div className="flex items-center gap-2">
        <div
          className={`h-3 w-3 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`}
        />
        <span
          className={`font-medium ${product.inStock ? "text-green-600" : "text-red-600"}`}
        >
          {product.inStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      {/* Quantity Selector */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Quantity</label>
        <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-2">
          <button className="h-8 w-8 rounded hover:bg-muted">−</button>
          <input
            type="text"
            defaultValue="1"
            readOnly
            className="flex-1 text-center font-semibold"
          />
          <button className="h-8 w-8 rounded hover:bg-muted">+</button>
        </div>
      </div>
    </div>
  );
}

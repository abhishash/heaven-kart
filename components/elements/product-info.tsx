"use client";

import { Heart, Minus, Plus, Share2, ShoppingCart, Star, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import { useState } from "react";
import { Product } from "@/lib/types";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface ProductInfoProps {
  product: Product;
  productUrl: string;
}

export default function ProductInfo({ product, productUrl }: ProductInfoProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const discountPercentage = Math.round(
    ((parseFloat(product.ac_price) - parseFloat(product.price)) /
      parseFloat(product.ac_price)) *
    100,
  );

  const [qty, setQty] = useState(1);

  const increaseQty = () => setQty(qty + 1);
  const decreaseQty = () => {
    if (qty > 1) setQty(qty - 1);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: "Check out this product!",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied!");
    }
  };

  return (
    <div className="space-y-4">
      {/* Brand and Title */}
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link className="text-base" href={`/product/${productUrl}`}>
                  {product?.brand_name}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            {product?.sub_category_url && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link
                      className="text-base"
                      href={`/catalog/${product?.sub_category_url}`}
                    >
                      {product?.sub_category}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
            {product?.category && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink>
                    <Link
                      href={`/catalog/${product?.category_url}`}
                      className="text-primary text-base"
                    >
                      {product?.category}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>

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
            <Heart
              className={`h-5 w-5 ${isFavorite ? "fill-green-600 stroke-green-600" : ""}`}
            />
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
                {/* {product.rating} */} 0
              </span>
            </div>
            <span className="text-sm text-muted-foreground">
              {/* ({product.reviewCount.toLocaleString()} reviews) */} 21
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
            ${parseInt(product.price).toFixed(2)}
          </span>
          <span className="text-base text-muted-foreground line-through">
            ${parseInt(product.ac_price).toFixed(2)}
          </span>
        </div>
        <Badge className="bg-red-100 text-red-800">
          {discountPercentage}% OFF
        </Badge>
      </div>
      {/* Stock Status */}
      <div className="flex items-center gap-2">
        <div
          className={`h-3 w-3 rounded-full ${parseInt(product?.in_stock) ? "bg-green-500" : "bg-red-500"}`}
        />
        <span
          className={`font-medium ${parseInt(product?.in_stock) ? "text-green-600" : "text-red-600"}`}
        >
          {parseInt(product?.in_stock) ? "In Stock" : "Out of Stock"}
        </span>
      </div>
      <div className="space-y-5">
        {/* Quantity + Wishlist */}
        <div className="flex items-center justify-between gap-4">
          {/* Quantity */}
          <div className="flex items-center justify-between  min-w-36 gap-3 border rounded-xl px-3 py-2">
            <button onClick={decreaseQty} className="cursor-pointer">
              <Minus className="h-4 w-4" />
            </button>

            <span className="font-medium min-w-8 text-center">{qty}</span>

            <button onClick={increaseQty} className="cursor-pointer">
              <Plus className="h-4 w-4" />
            </button>
          </div>

          {/* Add to Cart */}
          <Button
            size="lg"
            className="flex-1 cursor-pointer bg-green-400 hover:bg-green-500 text-white text-sm font-semibold py-4 rounded-lg shadow-md hover:scale-[1.02] active:scale-[0.98] transition"
          >
           <ShoppingCart /> Add to Cart
          </Button>
        </div>



        {/* Buy Now */}
        <Button
          variant="outline"
          size="lg"
          className="w-full border-2 border-green-600 text-green-600 hover:bg-green-50 text-lg font-semibold py-4 rounded-xl transition-all duration-200"
        >
          ⚡ Buy Now
        </Button>

        {/* Divider */}
        <div className="border-t pt-4 flex items-center justify-between">
          <span className="text-sm text-gray-500">Share this product</span>

          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: "Product Name",
                  text: "Check out this product!",
                  url: window.location.href,
                });
              } else {
                navigator.clipboard.writeText(window.location.href);
              }
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition text-sm font-medium"
          >
            <Share2 className="h-4 w-4" />
            Share
          </button>
        </div>
      </div>
    </div>
  );
}

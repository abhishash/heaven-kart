"use client";

import {
  Heart,
  Minus,
  Plus,
  Share2,
  ShoppingBasket,
  ShoppingCart,
  Star,
  Zap,
} from "lucide-react";
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
import { useMutation } from "@tanstack/react-query";
import { fetchHandler } from "@/lib/fetch-handler";
import { addToCart } from "./store/cartSlice";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { Input } from "../ui/input";
import { Field, FieldLabel } from "../ui/field";
import { FieldValues, useForm } from "react-hook-form";

interface ProductInfoProps {
  product: Product;
  productUrl: string;
}

export default function ProductInfo({ product, productUrl }: ProductInfoProps) {
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);
  const { data: session } = useSession();

  const discountPercentage = Math.round(
    ((parseFloat(product.ac_price) - parseFloat(product.price)) /
      parseFloat(product.ac_price)) *
    100,
  );

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: {
      product_id: number;
      qty: number;
      price: number;
      type: "custom" | "remove" | "add";
    }) =>
      fetchHandler({
        endpoint: "cart/add",
        method: "POST",
        data: payload,
        token: session?.user?.accessToken,
      }),
  });

  const [qty, setQty] = useState(1);

  const increaseQty = () => setQty(qty + 1);
  const decreaseQty = () => {
    if (qty > 1) setQty(qty - 1);
  };
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      qty: 1
    }
  });

  const handleAddToCart = async (data: FieldValues) => {
    try {
      await mutateAsync({
        product_id: product?.id,
        qty: data?.qty || 1,
        price: parseInt(product?.ac_price),
        type: "custom",
      }).then((res) => {
        if (res?.status) {
          dispatch(addToCart({ ...res?.data })); // ✅ Redux update
        }
      });
    } catch (error) {
      console.error(error);
      alert("Error adding to cart");
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
              {/* ({product.reviewCount.toLocaleString()} reviews) */}
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
      <div className="space-y-6">
        {/* Stock Info */}
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-600">
            Available:
            <span className="ml-2 text-green-700 font-semibold">
              {product?.stock} in stock
            </span>
          </p>
        </div>

        {/* Quantity + Add To Cart */}
        <form
          onSubmit={handleSubmit(handleAddToCart)}
          className="flex flex-col sm:flex-row gap-4"
        >
          {/* Quantity Selector */}
          <div className="flex items-center border border-green-500 rounded-xl overflow-hidden shadow-sm">
            <button
              type="button"
              onClick={() => setValue("qty", Math.max(1, Number(watch("qty")) - 1))}
              className="px-4 py-0 bg-gray-50 hover:bg-gray-100 transition text-lg font-semibold"
            >
              −
            </button>

            <input
              {...register("qty")}
              type="number"
              min={1}
              className="w-12 text-center border-0 !outline-0 !focus:ring-0 text-sm font-medium"
            />

            <button
              type="button"
              onClick={() =>
                setValue(
                  "qty",
                  Math.min(parseInt(product?.stock)  || 1, Number(watch("qty")) + 1)
                )
              }
              className="px-4 py-0 bg-gray-50 hover:bg-gray-100 transition text-lg font-semibold"
            >
              +
            </button>
          </div>

          {/* Add to Cart Button */}
          <Button
            size="lg"
            type="submit"
            disabled={isPending}
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-16 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98]"
          >
            <ShoppingCart className="h-5 w-5" />
            Add to Cart
          </Button>
        </form>

        {/* Buy Now + Share */}
        <div className="flex flex-wrap gap-4 items-center">
          <Button
            variant="outline"
            size="lg"
            className="flex items-center  !bg-white gap-2 border-2 border-green-600  hover:bg-green-50 rounded-xl px-12 font-medium transition"
          >
            <ShoppingBasket className="h-5 w-5" />
            Buy Now
          </Button>

          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: product?.name,
                  text: "Check out this product!",
                  url: window.location.href,
                });
              } else {
                navigator.clipboard.writeText(window.location.href);
              }
            }}
            className="flex items-center gap-2 px-12 cursor-pointer py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition text-sm font-medium"
          >
            <Share2 className="h-4 w-4" />
            Share this Product
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { Heart, Star } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { ProductTypes } from "@/lib/types";
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { fetchHandler } from "@/lib/fetch-handler";
import { FieldValues } from "react-hook-form";
import { addToCart } from "./store/cartSlice";
import { useDispatch } from "react-redux";
import Spinner from "../ui/spinner";
import clsx from "clsx";

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
  brand,
  id
}: ProductTypes) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const discountPercent = Math.round(
    ((parseFloat(ac_price) - parseFloat(price)) / parseFloat(ac_price)) * 100,
  );
  const isOutOfStock = Number(in_stock) === 0;
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: {
      product_id: number;
      qty: number;
      type: "custom" | "remove" | "add";
    }) =>
      fetchHandler({
        endpoint: "cart/add",
        method: "POST",
        data: payload,
        token: session?.user?.accessToken,
      }),
  });
  const handleAddToCart = async (product_id: number) => {
    try {
      await mutateAsync({
        product_id: product_id,
        qty: 1,
        type: "add",
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
    <div
      className={`group shrink-0 w-24 md:w-56 bg-white rounded-lg overflow-hidden transition-all ${isOutOfStock
        ? "opacity-60 cursor-not-allowed pointer-events-none"
        : "hover:shadow-none"
        }`}
    >
      {/* Image Container */}
      <div className="relative bg-slate-50 h-24 sm:h-60 flex items-center justify-center overflow-hidden">
        <Image
          src={`${process.env.ASSET_ENDPOINS}${image}` || "/placeholder.svg"}
          alt={name}
          width={160}
          height={160}
          className="object-contain w-full h-full p-0 sm:p-2 transition-transform duration-500 ease-out group-hover:scale-110"
        />

        {/* Discount Badge */}
        {discountPercent > 0 && (
          <div className="absolute top-2 left-2 bg-green-600 text-white text-[9px] sm:text-xs font-bold px-1 py-0.5 sm:px-2 sm:py-1 rounded">
            {discountPercent}% <span className="hidden sm:inline">OFF</span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-2 right-2 bg-white rounded-full p-0.5 sm:p-2 shadow-sm hover:shadow-md transition-shadow"
        >
          <Heart
            className={
              isWishlisted ? "fill-red-500 text-red-500 size-3 sm:size-4" : "text-slate-400 size-3 sm:size-4"
            }
          />
        </button>

        {isOutOfStock ? (
          <div className="absolute bottom-2 right-2 bg-red-500/90 text-white rounded-full px-1 sm:px-3 py-0.5 sm:py-1 text-[9px] sm:text-xs font-bold">
            OUT OF STOCK
          </div>
        ) : (
          <button disabled={isPending} onClick={() => handleAddToCart(id)} className="absolute bottom-1 sm:bottom-2 cursor-pointer right-2 bg-red-500 hover:bg-red-600 text-white rounded-full px-1.5 sm:px-3 py-0.5 sm:py-1 text-[9px] sm:text-xs font-bold transition-colors">
            {isPending ? <div className="py-1"><div className='flex space-x-0.5 justify-center items-center  h-fit'>
              <span className='sr-only'>Loading...</span>
              <div className={clsx('size-1.5 rounded-full animate-bounce [animation-delay:-0.3s]', "bg-white")}></div>
              <div className={clsx('size-2 rounded-full animate-bounce [animation-delay:-0.15s]', "bg-white")}></div>
              <div className={clsx('size-1.5 rounded-full animate-bounce', "bg-white")}></div>
            </div></div> : "ADD"}
          </button>
        )}

      </div>

      {/* Content */}
      <div className="p-0">
        {/* Price */}
        <div className="flex items-center gap-0.5 sm:gap-2 my-2">
          <span className="bg-green-600 text-white text-[9px] sm:text-xs font-bold px-1 sm:px-2 py-0.5 sm:py-1 rounded">
            ₹{price}
          </span>
          <span className="text-[10px] sm:text-xs text-slate-500 line-through">
            ₹{ac_price}
          </span>
        </div>

        {/* Title */}
        <Link href={`/product/${url}`}>
          <h3 className="text-[10px] sm:text-xs font-bold line-clamp-2 text-slate-900  mb-1">
            {name}
          </h3>

          {/* Description */}
          <p className="text-[9px] sm:text-xs text-slate-600 mb-1 sm:mb-2 line-clamp-2">
            {name}
          </p>
        </Link>

        {/* Quantity */}
        <p className="text-[9px] sm:text-xs text-slate-600 mb-0 sm:mb-2">{stock ?? 0}  Quantity</p>

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

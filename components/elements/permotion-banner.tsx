"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { ProductCard } from "./product-card";
import useEmblaCarousel from "embla-carousel-react";
import { PermotionsTypes, ProductTypes } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import { imageBaseUrl } from "@/lib/constants";

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



export function PermotionBanner({ values }: { values: PermotionsTypes }) {

    return (
        <section className="">
            {/* Carousel Container */}
            <Link target="_blank" href={values?.url_link} className="relative  rounded-2xl h-full w-full max-h-64 flex items-center justify-center">
                <Image
                    src={`${imageBaseUrl}${values?.image}` || "/placeholder.svg"}
                    alt={values?.name}
                    width={160}
                    height={160}
                    className="object-center w-full h-full"
                />
                <span className="absolute left-8 animate-pulse  bottom-6 rounded-md px-4 py-1 bg-red-500 text-white">
                    <h3 className="text-2xl italic font-semibold text-white line-clamp-2 mb-1">
                        {values?.name}
                    </h3>
                </span>
            </Link >

        </section>
    );
}

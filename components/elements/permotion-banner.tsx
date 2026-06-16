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
    <section>
      <Link
        target="_blank"
        href={values?.url_link}
        className="relative block h-[180px] sm:h-[220px] w-full overflow-hidden rounded-xl"
      >
        <Image
          src={`${imageBaseUrl}${values?.image}`}
          alt={values?.name}
          fill
          className="object-fill"
        />
      </Link>
    </section>
  );
}

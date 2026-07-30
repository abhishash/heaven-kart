"use client";

import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

import { useGetRecentProductsQuery } from "@/redux/services/recentlyViewApi";
import { isArray } from "@/lib/type-guards";
import Title from "../../Tittle";
import { ProductCard } from "../../product-card";
import { useSession } from "next-auth/react";

export default function RecentlyViewedProducts() {
  const { data: session } = useSession();
  const { data, isLoading } = useGetRecentProductsQuery();

  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const targetScrollLeft = useRef(0);
  const animationFrame = useRef<number | null>(null);

  const [activePage, setActivePage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const update = () => {
      const pages = Math.max(1, Math.ceil(el.scrollWidth / el.clientWidth));
      const current = Math.round(el.scrollLeft / el.clientWidth);

      setPageCount(pages);
      setActivePage(current);
    };

    update();
    el.addEventListener("scroll", update);
    window.addEventListener("resize", update);

    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [data]);

  const scrollToPage = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;

    targetScrollLeft.current = el.clientWidth * index;

    el.scrollTo({
      left: el.clientWidth * index,
      behavior: "smooth",
    });
  };

  const stopAnimation = () => {
    if (animationFrame.current !== null) {
      cancelAnimationFrame(animationFrame.current);
      animationFrame.current = null;
    }
  };

  const animateScroll = () => {
    const el = scrollRef.current;

    if (!el) {
      animationFrame.current = null;
      return;
    }

    const delta = targetScrollLeft.current - el.scrollLeft;

    if (Math.abs(delta) < 0.5) {
      el.scrollLeft = targetScrollLeft.current;
      animationFrame.current = null;
      return;
    }

    el.scrollLeft += delta * 0.18;
    animationFrame.current = requestAnimationFrame(animateScroll);
  };

  const startAnimation = () => {
    if (animationFrame.current !== null) {
      return;
    }

    animationFrame.current = requestAnimationFrame(animateScroll);
  };

  const handlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;

    // Don't drag when clicking card/button.
    if (target.closest("a") || target.closest("button")) {
      return;
    }

    if (e.button !== 0) {
      return;
    }

    const el = scrollRef.current;
    if (!el) return;

    isDragging.current = true;
    startX.current = e.clientX;
    scrollLeft.current = el.scrollLeft;
    targetScrollLeft.current = el.scrollLeft;

    el.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el || !isDragging.current) {
      return;
    }

    const move = e.clientX - startX.current;
    targetScrollLeft.current = scrollLeft.current - move;
    startAnimation();
  };

  const stopDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = scrollRef.current;

    isDragging.current = false;
    stopAnimation();

    if (el?.hasPointerCapture(e.pointerId)) {
      el.releasePointerCapture(e.pointerId);
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;

    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    }
  };

  if (isLoading) {
    return (
      <div className="h-80 animate-pulse rounded-xl bg-gray-100" />
    );
  }

  if (!isArray(data)) {
    return null;
  }

  return (
    <section className="relative w-full py-8">
      <div className="rounded-xl bg-green-600 px-4 py-5 sm:px-8">
        <div className="mb-2">
          <Title
            className="!text-white"
            title="Continue Your Shopping Journey"
          />
          <p className="text-sm text-white">Pick up where you left off</p>
        </div>

        <div className="relative">
          <div
            ref={scrollRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={stopDrag}
            onPointerCancel={stopDrag}
            onPointerLeave={stopDrag}
            onWheel={handleWheel}
            className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory px-12 py-3 [&::-webkit-scrollbar]:hidden cursor-grab active:cursor-grabbing select-none"
          >
            {data?.map((product) => (
              <div
                key={product.product_id}
                className="w-fit flex-shrink-0 snap-start sm:w-[220px]"
              >
                <Link href={`/product/${product.url}`} draggable={false}>
                  <ProductCard imageClass="!h-24 sm:!h-48" {...(product as any)} />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {pageCount > 1 && (
          <div className="mt-5 flex justify-center gap-2">
            {Array.from({ length: pageCount }).map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToPage(i)}
                className={`h-2 rounded-full transition-all ${activePage === i ? "w-8 bg-white" : "w-2 bg-green-200"
                  }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

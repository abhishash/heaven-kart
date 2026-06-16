"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { PermotionBanner } from "./permotion-banner";

interface PromotionCarouselProps {
    promotions: any[];
}

export default function PromotionCarousel({
    promotions,
}: PromotionCarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "start",
        slidesToScroll: 3,
    });

    const [selectedIndex, setSelectedIndex] = useState(0);

    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const isPaused = useRef(false);

    const stopAutoScroll = useCallback(() => {
        isPaused.current = true;

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    const startAutoScroll = useCallback(() => {
        if (!emblaApi || intervalRef.current) return;

        intervalRef.current = setInterval(() => {
            if (!isPaused.current) {
                emblaApi.scrollNext();
            }
        }, 3000);
    }, [emblaApi]);

    const resumeAutoScroll = useCallback(() => {
        isPaused.current = false;
        startAutoScroll();
    }, [startAutoScroll]);

    useEffect(() => {
        if (!emblaApi) return;

        const onSelect = () => {
            setSelectedIndex(emblaApi.selectedScrollSnap());
        };

        onSelect();

        emblaApi.on("select", onSelect);

        startAutoScroll();

        return () => {
            emblaApi.off("select", onSelect);

            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [emblaApi, startAutoScroll]);

    if (!promotions?.length) return null;

    return (
        <div className="w-full">
            {/* Carousel */}
            <div
                ref={emblaRef}
                className="overflow-hidden"
                onMouseEnter={stopAutoScroll}
                onMouseLeave={resumeAutoScroll}
            >
                <div className="flex gap-x-4">
                    {promotions.map((item, index) => (
                        <div
                            key={index}
                            className="
                shrink-0
                overflow-hidden
                basis-full
                rounded-xl
                md:basis-1/2
                lg:basis-[32.5%]
              "
                        >
                            <PermotionBanner values={item} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Pagination Dots */}
            <div className="mt-5 flex justify-center gap-2">
                {Array.from(
                    {
                        length: emblaApi?.scrollSnapList().length || 0,
                    },
                    (_, index) => (
                        <button
                            key={index}
                            onClick={() => emblaApi?.scrollTo(index)}
                            className={`h-2 rounded-full transition-all duration-300 ${selectedIndex === index
                                    ? "w-8 bg-green-600"
                                    : "w-2 bg-slate-300 hover:bg-slate-400"
                                }`}
                        />
                    )
                )}
            </div>
        </div>
    );
}
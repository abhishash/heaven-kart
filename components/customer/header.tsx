"use client";

import { User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cart from "../elements/cart";
import { SearchBar } from "../layout/Search-bar";
import Image from "next/image";

export function Header() {
  const [showSearch, setShowSearch] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const shouldShow = currentScrollY <= 80 || currentScrollY < lastScrollY;
          setShowSearch(shouldShow);
          lastScrollY = currentScrollY;
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="border-b bg-white">
      <div className="fixed left-0 right-0 top-0 z-50 bg-white shadow-md transition-all duration-300">
        <div className="container mx-auto px-4 lg:px-12 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="text-xl font-semibold text-green-600 md:text-2xl"
              >
                <Image src={"/logo.png"} alt="Heaven-logo" width={180} height={100} />
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <div
                className={`hidden w-[400px] transition-all duration-300 ease-in-out md:block ${
                  showSearch
                    ? "max-h-12 translate-y-0 opacity-100"
                    : "pointer-events-none max-h-0 -translate-y-2 opacity-0"
                }`}
              >
                <SearchBar placeholder="Search products..." />
              </div>
              <Link href="/customer/profile">
                <User className="h-5 w-5 text-gray-600 hover:text-black" />
              </Link>
              <Cart />
            </div>
          </div>

          <div
            className={`mt-3 overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
              showSearch
                ? "max-h-12 translate-y-0 opacity-100"
                : "pointer-events-none max-h-0 -translate-y-2 opacity-0"
            }`}
          >
            <SearchBar placeholder="Search products..." />
          </div>
        </div>
      </div>
    </header>
  );
}

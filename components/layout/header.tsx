"use client";

import { User } from "lucide-react";
import Link from "next/link";

import Cart from "../elements/cart";
import { useEffect, useState } from "react";
import { SearchBar } from "./Search-bar";
import { Category } from "./types";
import Image from "next/image";
import { imageBaseUrl } from "@/lib/constants";
import { SafeImage } from "../elements/categories-carousel";
import { usePathname } from "next/navigation";


export function Header({ categories }: {
  categories: Category[]
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pathname = usePathname();
  const slug = pathname.split("/")[2];

  return (
    <>


      <header className="bg-white border-b">
        {/* 🔥 Fixed Header */}
        <div
          className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${scrolled ? "shadow-md" : ""
            }`}
        >
          <div className="container mx-auto px-4 py-3 sm:py-3">
            {/* 🔹 Top Row */}
            <div className="flex items-center justify-between">
              {/* LEFT */}
              <div className="flex items-center gap-3">
                {/* Logo */}
                <Link
                  href="/"
                  className="text-xl md:text-2xl font-semibold text-green-600"
                >
                  HeavenKart
                </Link>
              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-4">
                {/* Desktop Search */}
                <div className="hidden md:block w-[400px]">
                  <SearchBar placeholder="Search products..." />
                </div>
                <Link href="/customer/profile">
                  <User className="h-5 w-5 text-gray-600 hover:text-black" />
                </Link>
                <Cart />
              </div>
            </div>

            {/* Mobile Search */}
            <div className="mt-3 md:hidden">
              <SearchBar placeholder="Search products..." />
            </div>
          </div>
        </div>

        {/* Spacer */}
        <div className="h-[110px] md:h-[70px] " />

        {/* 🔥 Categories */}
        <nav className="border-t bg-white">
          <div className="container mx-auto px-4">
            {/* Mobile */}
            <div className="flex gap-6 overflow-x-auto no-scrollbar hide-scrollbar scrollbar-none md:hidden">
              {categories?.map((c, i) => (
                <CategoryItem key={c.name} item={c} active={slug === c.url} />
              ))}
            </div>

            {/* Desktop */}
            <div className="hidden md:flex overflow-x-auto no-scrollbar hide-scrollbar scrollbar-none gap-8">
              <CategoryItem key={"All"} item={{ name: "All", url: "/", image: "" }} active={(pathname.split("/")[1] === "catalog" && !pathname.split("/")[2])} />
              {categories?.map((c, i) => (
                <CategoryItem key={c.name} item={c} active={slug === c.url} />
              ))}
            </div>
          </div>
        </nav>
      </header>
    </>

  );
}

/* 🔥 Reusable Component */
function CategoryItem({
  item,
  active,
}: {
  item: Category;
  active: boolean;
}) {
  return (
    <div className="flex flex-col">
      <Link
        href={`/catalog/${item.url}`}
        className={`flex items-center gap-2 py-1.5 sm:py-3 text-sm font-semibold ${active ? "text-green-700" : "text-gray-700"}`}
      >
        {item.name}
      </Link>

      <div
        className={`h-1 rounded-t-lg transition-all duration-300 ${active ? "bg-green-600" : "bg-transparent"
          }`}
      />
    </div>
  );
}
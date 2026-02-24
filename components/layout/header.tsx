"use client";

import { User, ChevronDown, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import Cart from "../elements/cart";
import { useEffect, useState } from "react";
import { SearchBar } from "./Search-bar";

const categories = [
  { label: "All", icon: "🛍️", href: "/catalog" },
  { label: "Cafe", icon: "☕", href: "/catalog" },
  { label: "Home", icon: "🏠", href: "/catalog" },
  { label: "Toys", icon: "🧸", href: "/catalog" },
  { label: "Fresh", icon: "🥬", href: "/catalog" },
  { label: "Electronics", icon: "📱", href: "/catalog" },
  { label: "Mobiles", icon: "📲", href: "/catalog" },
  { label: "Beauty", icon: "💄", href: "/catalog" },
  { label: "Fashion", icon: "👔", href: "/catalog" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="bg-white border-b">
      {/* 🔥 Fixed Header */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        <div className="container mx-auto px-4 py-3">
          {/* 🔹 Top Row */}
          <div className="flex items-center justify-between">
            {/* LEFT */}
            <div className="flex items-center gap-3">
              {/* ✅ SHADCN SIDEBAR */}
              <Sheet>
                <SheetTrigger asChild>
                  <Menu className="h-6 w-6 md:hidden cursor-pointer" />
                </SheetTrigger>

                <SheetContent side="left" className="w-[260px] p-4">
                  {/* Header */}
                  <div className="text-lg font-semibold text-green-600 mb-6">
                    HeavenKart
                  </div>

                  {/* Categories */}
                  <div className="space-y-2">
                    {categories.map((c, i) => (
                      <Link
                        href={c.href}
                        key={c.label}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                          i === 0
                            ? "bg-green-100 text-green-600"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <span className="text-lg">{c.icon}</span>
                        {c.label}
                      </Link>
                    ))}
                  </div>

                  <div className="my-6 border-t" />

                  {/* Extra */}
                  <div className="space-y-3 text-sm text-gray-600">
                    <Link href="#">My Account</Link>
                    <Link href="#">Orders</Link>
                    <Link href="#">Wishlist</Link>
                    <Link href="#">Support</Link>
                  </div>
                </SheetContent>
              </Sheet>

              {/* Logo */}
              <Link
                href="/"
                className="text-xl md:text-2xl font-semibold text-green-600"
              >
                HeavenKart
              </Link>

              {/* Location */}
              <div className="hidden md:block">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex gap-2">
                      Select Location
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem>Delhi</DropdownMenuItem>
                    <DropdownMenuItem>Mumbai</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
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
      <div className="h-[110px] md:h-[70px]" />

      {/* 🔥 Categories */}
      <nav className="border-t bg-white">
        <div className="container mx-auto px-4">
          {/* Mobile */}
          <div className="flex gap-6 overflow-x-auto no-scrollbar md:hidden">
            {categories.map((c, i) => (
              <CategoryItem key={c.label} item={c} active={i === 0} />
            ))}
          </div>

          {/* Desktop */}
          <div className="hidden md:flex gap-8">
            {categories.map((c, i) => (
              <CategoryItem key={c.label} item={c} active={i === 0} />
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}

/* 🔥 Reusable Component */
function CategoryItem({
  item,
  active,
}: {
  item: { label: string; icon: string; href: string };
  active: boolean;
}) {
  return (
    <Link
      href={item.href}
      className={`flex items-center gap-2 py-3 text-sm font-medium border-b-2 ${
        active
          ? "text-green-600 border-green-600"
          : "border-transparent text-gray-700 hover:text-black"
      }`}
    >
      <span>{item.icon}</span>
      {item.label}
    </Link>
  );
}
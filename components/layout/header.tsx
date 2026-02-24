"use client";

import { User, ChevronDown, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="bg-white border-b">
      {/* 🔥 Fixed Header */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
          scrolled ? "shadow-lg" : "shadow-none"
        }`}
      >
        <div className="container mx-auto px-4 py-3">
          {/* 🔹 Top Row */}
          <div className="flex items-center justify-between">
            {/* Left */}
            <div className="flex items-center gap-3">
              {/* Mobile Menu */}
              <Menu className="h-6 w-6 md:hidden" />

              <div className="text-xl md:text-2xl font-semibold text-green-600">
                <Link href="/">HeavenKart</Link>
              </div>
               {/* Desktop Location */}
            <div className="hidden md:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex gap-2">
                    Select Location
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem>New York</DropdownMenuItem>
                  <DropdownMenuItem>Los Angeles</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            </div>

           

            {/* Right */}
            <div className="flex items-center gap-3">
              {/* 🔹 Desktop Search */}
              <div className="hidden md:block">
                <SearchBar placeholder="Search by name, description, or category..." />
              </div>
              <Link href="/customer/profile">
                <User className="h-5 w-5 text-gray-500" />
              </Link>
              <Cart />
            </div>
          </div>

          {/* 🔹 Mobile Search */}
          <div className="mt-3 md:hidden">
            <SearchBar placeholder="Search products..." />
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="h-[110px] md:h-[60px]" />

      {/* 🔥 Categories */}
      <nav className="border-t bg-white">
        <div className="container mx-auto px-4">
          {/* Mobile → scroll */}
          <div className="flex gap-6 overflow-x-auto no-scrollbar md:hidden">
            {categories.map((c, i) => (
              <Link
                href={c.href}
                key={c.label}
                className={`flex flex-col items-center py-3 text-xs min-w-[60px] ${
                  i === 0 ? "text-green-600" : "text-gray-600"
                }`}
              >
                <span className="text-lg">{c.icon}</span>
                {c.label}
              </Link>
            ))}
          </div>

          {/* Desktop */}
          <div className="hidden md:flex gap-8">
            {categories.map((c, i) => (
              <Link
                href={c.href}
                key={c.label}
                className={`flex gap-2 py-4 text-sm font-medium border-b-2 ${
                  i === 0
                    ? "text-green-600 border-green-600"
                    : "border-transparent text-gray-700 hover:text-black"
                }`}
              >
                <span>{c.icon}</span>
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}

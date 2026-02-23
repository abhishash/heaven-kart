"use client";

import { Search, ShoppingCart, User, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Cart from "../elements/cart";
import { useEffect, useState } from "react";

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
      setScrolled(window.scrollY > 10); // 👈 scroll threshold
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header className="bg-white border-b">
      {/* ✅ FIXED Top Bar ONLY */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 
        ${scrolled ? "shadow-lg" : "shadow-none"}`}
      >
        <div className="container mx-auto flex items-center justify-between gap-6 px-6 py-4">
          {/* Logo & Location */}
          <div className="flex items-center gap-6">
            <div className="text-2xl font-semibold text-green-600">
              <Link href="/">HeavenKart</Link>
            </div>

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
                <DropdownMenuItem>Chicago</DropdownMenuItem>
                <DropdownMenuItem>Houston</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input placeholder='Search for "amul butter"' className="pl-10" />
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-3">
            {/* <Button
              variant="ghost"
              size="icon"
              aria-label="User profile"
              className="text-gray-700 hover:text-gray-900"
            > */}
            <Link
              href={"/customer/profile"}
              className="text-gray-900 cursor-pointer font-normal text-sm flex gap-x-1"
            >
              <User className="h-5 w-5" /> Login
            </Link>
            {/* </Button> */}
            <Cart />
          </div>
        </div>
      </div>

      {/* ✅ Spacer for fixed header height */}
      <div className="h-[68px]" />

      {/* ❌ NOT fixed – scrolls normally */}
      <nav className="border-t bg-white">
        <div className="container mx-auto flex gap-8 px-6">
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
      </nav>
    </header>
  );
}

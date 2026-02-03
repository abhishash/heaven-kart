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

const categories = [
  { label: "All", icon: "🛍️" },
  { label: "Cafe", icon: "☕" },
  { label: "Home", icon: "🏠" },
  { label: "Toys", icon: "🧸" },
  { label: "Fresh", icon: "🥬" },
  { label: "Electronics", icon: "📱" },
  { label: "Mobiles", icon: "📲" },
  { label: "Beauty", icon: "💄" },
  { label: "Fashion", icon: "👔" },
];

export function Header() {
  return (
    <header className="bg-white border-b">
      {/* ✅ FIXED Top Bar ONLY */}
      <div className="fixed top-0 left-0 shadow-xl right-0 z-50 bg-white border-b">
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
            <Link href={"/customer/profile"} className="text-gray-900 cursor-pointer font-semibold flex gap-x-1">
              <User className="h-6 w-6" /> Login
            </Link>
            {/* </Button> */}
            <Cart  />
          </div>
        </div>
      </div>

      {/* ✅ Spacer for fixed header height */}
      <div className="h-[68px]" />

      {/* ❌ NOT fixed – scrolls normally */}
      <nav className="border-t bg-white">
        <div className="container mx-auto flex gap-8 px-6">
          {categories.map((c, i) => (
            <button
              key={c.label}
              className={`flex gap-2 py-4 text-sm font-medium border-b-2 ${i === 0
                ? "text-green-600 border-green-600"
                : "border-transparent text-gray-700 hover:text-black"
                }`}
            >
              <span>{c.icon}</span>
              {c.label}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}

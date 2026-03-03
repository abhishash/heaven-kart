"use client";

import { User } from "lucide-react";
import Link from "next/link";
import Cart from "../elements/cart";
import { SearchBar } from "../layout/Search-bar";

export function Header() {
    return (
         <header className="bg-white border-b">
      {/* 🔥 Fixed Header */}
      <div
        className={`fixed top-0 left-0 right-0 shadow-md z-50 bg-white transition-all duration-300`}
      >
        <div className="container mx-auto px-4 py-3">
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


     
    </header>
    );
}

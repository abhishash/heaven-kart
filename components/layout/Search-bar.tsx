"use client";

import { useCallback, useState, useRef, useEffect } from "react";
import { Search, Loader2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { ScrollArea } from "../ui/scroll-area";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

interface SearchBarProps {
  placeholder?: string;
}

export function SearchBar({
  placeholder = "Search products...",
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 🔥 Optimized API Call
  const fetchProducts = async (query: string) => {
    if (!query.trim() || query.length < 2) {
      setResults([]);
      return;
    }

    try {
      setIsLoading(true);

      // Cancel previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const controller = new AbortController();
      abortControllerRef.current = controller;

      const response = await fetch(`/api/search?${query.toString()}`, {
        signal: controller.signal,
      });

      const data = await response.json();
      setResults(data.products || []);
    } catch (error: any) {
      if (error.name !== "AbortError") {
        console.error("Search error:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 🔥 Debounced Input Handler
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchQuery(value);
      setIsOpen(true);

      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(() => {
        fetchProducts(value);
      }, 300);
    },
    [],
  );

  const handleClear = () => {
    setSearchQuery("");
    setResults([]);
    setIsOpen(false);
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
  };

  // 🔥 Close dropdown outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, []);

  return (
    <div className="sm:min-w-sm w-full relative" ref={dropdownRef}>
      <div className="relative flex items-center">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder={placeholder}
          className="pl-10 pr-10"
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => setIsOpen(true)}
        />

        {isLoading && (
          <Loader2 className="absolute right-3 h-5 w-5 animate-spin" />
        )}

        {searchQuery && !isLoading && (
          <button
            onClick={handleClear}
            className="absolute cursor-pointer right-3"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {isOpen && searchQuery && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg z-50 animate-in fade-in zoom-in-95 duration-150">
          <ScrollArea className="h-80 py-4">
            {results.length > 0 ? (
              <div className="divide-y">
                {results.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-gray-500 truncate">
                        {product.description}
                      </p>
                      <p className="text-sm font-semibold">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              !isLoading && (
                <div className="h-60 flex flex-col items-center justify-center text-sm text-gray-500 text-center gap-2">
                  <Image
                    src="/image.png"
                    alt="No products found"
                    width={80}
                    height={80}
                  />
                  <span>No products found</span>
                </div>
              )
            )}
          </ScrollArea>
        </div>
      )}
    </div>
  );
}

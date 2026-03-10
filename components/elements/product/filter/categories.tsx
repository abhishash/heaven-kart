"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { Category } from "../types";
import { SafeImage } from "../../categories-carousel";
import { motion, AnimatePresence } from "framer-motion";
import { isArray } from "@/lib/type-guards";

type Props = {
  categories: Category[];
};

export default function Categories({ categories }: Props) {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggleCategory = (url: string) => {
    setOpenCategory((prev) => (prev === url ? null : url));
  };

  return (
    <div className="w-full border-r min-h-[70vh] border-border pr-2 space-y-4">
      <h2 className="text-lg font-semibold px-3">Categories</h2>

      {categories?.map((category) => {
        const isOpen = openCategory === category.url;

        return (
          <div key={category.url} className=" rounded-lg  overflow-hidden">
            {/* Category */}
            <button
              onClick={() => toggleCategory(category.url)}
              className="flex items-center justify-between w-full px-3 py-1.5 hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <SafeImage
                  src={category.image}
                  alt={category.name}
                  width={32}
                  height={32}
                  className="rounded-md h-8 max-w-8 object-cover"
                />
                <span className="text-sm font-medium">{category.name}</span>
              </div>
              {
                isArray(category?.subcategories) ? <ChevronDown
                  className={`size-4 transition-transform text-gray-600 duration-300 ${isOpen ? "rotate-180" : ""
                    }`}
                /> : null
              }

            </button>

            {/* Animated Subcategories */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className=" pl-10 overflow-hidden"
                >
                  {category?.subcategories?.map((sub) => (
                    <Link
                      key={sub.url}
                      href={`/catalog/${sub.url}`}
                      className="flex justify-between px-4 py-1 text-sm hover:bg-gray-50"
                    >
                      <span>{sub.name}</span>
                      <span className="text-gray-500">({sub.products})</span>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
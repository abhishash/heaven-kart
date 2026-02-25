"use client";

import { Instagram, Twitter, Facebook, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import HowToWorks from "../homepage/how-to-work";
const popularSearches = {
  products: [
    "Avocado",
    "Strawberry",
    "Pomegranate",
    "Beetroot",
    "Ash gourd",
    "Bottle gourd",
    "Lady finger",
    "Potato",
    "Lemon",
    "Dalchini",
    "Fennel seeds",
    "Blueberry",
    "Papaya",
    "Jeera",
    "Mushroom",
    "Lettuce",
  ],
  brands: [
    "Yakult",
    "My Muse",
    "Aashirvaad Atta",
    "Too Yumm",
    "Lays",
    "Figaro Olive Oil",
    "Nandini Milk",
    "Amul",
    "Mother Dairy Near Me",
    "Fortune Oil",
    "Superyou",
    "Durex Condoms",
    "Ferns and Petals",
  ],
  categories: [
    "Grocery",
    "Cigarettes",
    "Chips",
    "Curd",
    "Hukka flavour",
    "Paan shop near me",
    "Eggs price",
    "Cheese slice",
    "Fresh fruits",
    "Fresh vegetables",
    "Refined oil",
    "Butter price",
    "Paneer price",
  ],
};

const categories = [
  [
    "Fruits & Vegetables",
    "Baby Food",
    "Breakfast & Sauces",
    "Cleaning Essentials",
    "Homegrown Brands",
  ],
  [
    "Atta, Rice, Oil & Dals",
    "Dairy, Bread & Eggs",
    "Tea, Coffee & More",
    "Home Needs",
    "Paan Corner",
  ],
  [
    "Masala & Dry Fruits",
    "Cold Drinks & Juices",
    "Biscuits",
    "Electricals & Accessories",
  ],
  ["Sweet Cravings", "Munchies", "Makeup & Beauty", "Hygiene & Grooming"],
  [
    "Frozen Food & Ice Creams",
    "Meats, Fish & Eggs",
    "Bath & Body",
    "Health & Baby Care",
  ],
];

export function Footer() {
  return (
    <>
      <HowToWorks />
      <footer className="bg-white space-y-12">
        <div className="container mx-auto border-y py-8 sm:py-12 px-4">

  {/* Popular Searches Section */}
  <section className="pb-10">
    <h1 className="text-lg sm:text-xl font-semibold text-slate-900 mb-6 sm:mb-8">
      Popular Searches
    </h1>

    <div className="space-y-6">

      {/* Reusable Row */}
      {[
        { label: "Products", data: popularSearches.products },
        { label: "Brands", data: popularSearches.brands },
        { label: "Categories", data: popularSearches.categories },
      ].map((section, idx) => (
        <div
          key={idx}
          className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4"
        >
          {/* Label */}
          <span className="text-sm font-semibold text-slate-900 sm:w-24">
            {section.label}
          </span>

          {/* Links */}
          <div className="flex flex-wrap text-sm text-slate-600">
            <span className="hidden sm:inline text-slate-400 mr-2">:</span>

            {section.data.map((item, index) => (
              <span key={index} className="flex items-center">
                <Link
                  href="#"
                  className="hover:text-slate-900 transition-colors"
                >
                  {item}
                </Link>

                {index < section.data.length - 1 && (
                  <span className="mx-2 text-slate-400">|</span>
                )}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>

  {/* Categories Section */}
  <section>
    <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-6 sm:mb-8">
      Categories
    </h2>

    {/* Responsive Grid */}
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-4 gap-x-6">
      {categories.flat().map((category, index) => (
        <Link
          key={index}
          href="#"
          className="block text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
        >
          {category}
        </Link>
      ))}
    </div>
  </section>
</div>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-10">
            {/* Logo + Social */}
            <div>
              <div className="text-2xl font-bold text-green-600 mb-6">
                HeavenKart
              </div>

              <div className="flex gap-4 mb-6">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Instagram className="size-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Twitter className="size-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Facebook className="size-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Linkedin className="size-6" />
                </Button>
              </div>

              <div className="text-xs text-gray-500 space-y-1">
                <p>© HeavenKart Shop Marketplace Private Limited</p>
                <p>FSSAI lic no : XXXXXXXXXX</p>
              </div>
            </div>

            <div className="flex justify-evenly col-span-2">
              {/* Company */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
                <ul className="space-y-2">
                  {[
                    "Home",
                    "Delivery Areas",
                    "Careers",
                    "Customer Support",
                    "Press",
                  ].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-sm text-gray-700 hover:text-green-600 transition"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
                <ul className="space-y-2">
                  {[
                    "Privacy Policy",
                    "Terms of Use",
                    "Responsible Disclosure Policy",
                    "Sell on HeavenKart",
                    "Deliver with HeavenKart",
                    "Franchise with HeavenKart",
                  ].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-sm text-gray-700 hover:text-green-600 transition"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* App Download */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Download App</h3>

              <div className="flex flex-row sm:flex-col gap-3">
                <Button className="justify-start w-fit gap-2 text-xs sm:text-sm border border-green-600 text-green-600 bg-white hover:bg-green-100">
                  <svg className="size-5 fill-green-600" viewBox="0 0 640 640">
                    <path d="M389.6 298.3L168.9 77L449.7 238.2L389.6 298.3zM111.3 64C98.3 70.8 89.6 83.2 89.6 99.3L89.6 540.6C89.6 556.7 98.3 569.1 111.3 575.9L367.9 319.9L111.3 64zM536.5 289.6L477.6 255.5L411.9 320L477.6 384.5L537.7 350.4C555.7 336.1 555.7 303.9 536.5 289.6zM168.9 563L449.7 401.8L389.6 341.7L168.9 563z" />
                  </svg>
                  Get it on Play Store
                </Button>

                <Button className="justify-start gap-2 w-fit text-xs sm:text-sm border border-green-600 text-green-600 bg-white hover:bg-green-100">
                  <svg className="size-6 fill-green-600" viewBox="0 0 640 640">
                    <path d="M447.1 332.7C446.9 296 463.5 268.3 497.1 247.9C478.3 221 449.9 206.2 412.4 203.3C376.9 200.5 338.1 224 323.9 224C308.9 224 274.5 204.3 247.5 204.3C191.7 205.2 132.4 248.8 132.4 337.5C132.4 363.7 137.2 390.8 146.8 418.7C159.6 455.4 205.8 545.4 254 543.9C279.2 543.3 297 526 329.8 526C361.6 526 378.1 543.9 406.2 543.9C454.8 543.2 496.6 461.4 508.8 424.6C443.6 393.9 447.1 334.6 447.1 332.7z" />
                  </svg>
                  Get it on App Store
                </Button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

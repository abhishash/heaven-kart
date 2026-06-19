"use client";

import { ShoppingCart, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {

  console.error("Application crashed:", error);

  return (
    <html lang="en">
      <body>
        <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center px-5">

          <div className="max-w-lg w-full text-center">

            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-2 text-3xl font-extrabold">
                <div className="bg-green-600 text-white p-3 rounded-2xl shadow-lg">
                  <ShoppingCart size={32} />
                </div>

                <span className="text-green-600">
                  Heaven
                </span>

                <span className="text-gray-900">
                  Kart
                </span>

              </div>
            </div>


            {/* Error Card */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">


              <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-red-50">

                <span className="text-5xl">
                  😟
                </span>

              </div>


              <h1 className="text-3xl font-bold text-gray-900">
                Oops! Something went wrong
              </h1>


              <p className="mt-4 text-gray-500 leading-relaxed">
                We are unable to load Heaven Kart right now.
                Please try again or return to shopping.
              </p>


              {/* Error message only development */}
              {process.env.NODE_ENV === "development" && (
                <div className="mt-5 rounded-xl bg-red-50 p-4 text-left text-sm text-red-600">
                  {error.message}
                </div>
              )}



              <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">


                <button
                  onClick={() => reset()}
                  className="
                    flex items-center justify-center gap-2
                    rounded-xl
                    bg-green-600
                    px-6
                    py-3
                    text-white
                    font-semibold
                    hover:bg-green-700
                    transition
                    shadow-md
                  "
                >

                  <RefreshCcw size={18} />

                  Try Again

                </button>



                <Link
                  href="/"
                  className="
                    flex items-center justify-center gap-2
                    rounded-xl
                    border
                    border-gray-200
                    px-6
                    py-3
                    font-semibold
                    text-gray-700
                    hover:bg-gray-50
                    transition
                  "
                >

                  <Home size={18} />

                  Home

                </Link>


              </div>


            </div>



            <p className="mt-6 text-sm text-gray-400">
              © {new Date().getFullYear()} Heaven Kart. Happy Shopping 🛒
            </p>


          </div>


        </main>
      </body>
    </html>
  );
}
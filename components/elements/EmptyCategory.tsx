"use client";

import Link from "next/link";
import { Sparkles, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function EmptyCategory() {
    return (
        <div className="
      min-h-[70vh] sm:min-h-[75vh]
      flex
      items-center
      justify-center
      px-4
      bg-gradient-to-b
      from-white
      to-green-50
    ">
            <motion.div
                initial={{
                    opacity: 0,
                    y: 40
                }}

                animate={{
                    opacity: 1,
                    y: 0
                }}

                transition={{
                    duration: .6
                }}

                className="
        text-center

        max-w-md
        "
            >



                {/* Floating Icon */}
                <motion.div

                    animate={{
                        y: [0, -10, 0]
                    }}

                    transition={{
                        repeat: Infinity,
                        duration: 3
                    }}

                    className="
          mx-auto

          mb-6

      

          flex
          items-center
          justify-center

          "
                >



                    <Image src="/icon/placeholder.png" alt="Not Found Image" width={120} height={120} />

                </motion.div>





                {/* Title */}
                <div className="
          flex items-baseline
          sm:items-center
          justify-center
          gap-2
        ">

                    <h1
                        className="
            text-2xl
            sm:text-3xl

            font-bold

            text-slate-900
            "
                    >
                        New Styles Coming Soon
                    </h1>


                    <Sparkles
                        className="text-yellow-500"
                        size={26}
                    />

                </div>





                {/* Description */}
                <p
                    className="
          mt-4

          text-sm

          sm:text-base

          text-slate-600

          leading-relaxed
          "
                >
                    We are curating something beautiful for this collection.
                    Stay tuned for fresh fashion picks from HeavenKart ✨
                </p>





                {/* Button */}
                <Link
                    href="/"
                    className="
          inline-flex

          mt-7

          items-center

          gap-2

          bg-green-600

          hover:bg-green-700

          text-white

          px-7

          py-3

          rounded-full

          font-semibold

          shadow-lg

          transition
          "
                >

                    Explore Latest Collection

                    <ShoppingBag size={18} />

                </Link>




                {/* Small Trust Text */}
                <p
                    className="
          mt-5

          text-xs

          text-slate-400
          "
                >
                    Trendy shoes • Elegant bangles • Fashion clothes
                </p>


            </motion.div>


        </div>
    );
}
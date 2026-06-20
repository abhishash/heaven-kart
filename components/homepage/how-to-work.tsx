"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const steps = [
  {
    title: "Explore HeavenKart",
    description:
      "Discover trendy shoes, stylish bangles, and fashionable clothes curated for your everyday style",
    icon: "/icon/smartphone.png",
  },
  {
    title: "Add to cart",
    description:
      "Choose your favourite fashion products, select your size & style, and place your order easily",
    icon: "/icon/order.png",
  },
  {
    title: "Fast & safe delivery",
    description:
      "Get your fashion essentials delivered quickly with a smooth and reliable shopping experience",
    icon: "/icon/tracking.png",
  },
];

export default function HowToWorks() {
  return (
    <main className="py-10 bg-gradient-to-b
      from-white
      to-green-50">

      <div className="max-w-6xl mx-auto px-4">


        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >

          <h1 className="text-2xl sm:text-4xl font-bold text-slate-900">
            How HeavenKart Works
          </h1>


          <p className="text-sm text-slate-500 mt-2">
            Shop your favourite fashion products in 3 simple steps
          </p>

        </motion.div>




        {/* Timeline */}
        <div className="relative">


          {/* Desktop Horizontal Line */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="
              hidden
              md:block

              absolute

              top-[45%]

              left-0

              h-1

              bg-green-300

              -translate-y-1/2
            "
          />



          {/* Mobile Vertical Line */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="
              block
              md:hidden

              absolute

              left-1/2

              top-0

              w-1

              bg-green-300

              -translate-x-1/2
            "
          />





          <div
            className="
            flex

            flex-col

            md:flex-row

            items-center

            justify-between

            gap-12

            relative

            z-10
            "
          >


            {steps.map((step, index) => (

              <div
                key={index}
                className="
                flex

                flex-col

                items-center

                w-full

                md:w-[32%]
                "
              >



                {/* Number */}
                <motion.div

                  animate={{
                    scale: [1, 1.15, 1]
                  }}

                  transition={{
                    repeat: Infinity,
                    duration: 2
                  }}

                  className="
                  mb-4

                  md:mb-6

                  w-10

                  h-10

                  rounded-full

                  bg-green-600

                  text-white

                  flex

                  items-center

                  justify-center

                  font-bold

                  shadow-lg

                  border-4

                  border-white

                  z-20
                  "
                >
                  {index + 1}
                </motion.div>




                {/* Card */}
                <motion.div

                  initial={{
                    opacity: 0,
                    y: 50
                  }}

                  whileInView={{
                    opacity: 1,
                    y: 0
                  }}

                  viewport={{
                    once: true
                  }}

                  whileHover={{
                    y: -10,
                    scale: 1.03
                  }}

                  transition={{
                    duration: .5
                  }}

                  className="
                  w-[280px]

                  sm:w-[320px]

                  md:w-full


                  bg-white

                  rounded-3xl

                  p-5


                  border

                  border-slate-200


                  shadow-[0_15px_35px_rgba(0,0,0,0.08)]
                  "
                >



                  {/* Icon */}
                  <motion.div

                    animate={{
                      y: [0, -8, 0]
                    }}

                    transition={{
                      repeat: Infinity,
                      duration: 3
                    }}

                    className="
                    mx-auto

                    mb-4

                    w-20

                    h-20


                    rounded-2xl


                    bg-green-50


                    flex

                    items-center

                    justify-center
                    "
                  >

                    <Image
                      src={step.icon}
                      alt={step.title}
                      width={55}
                      height={55}
                    />

                  </motion.div>





                  <h2
                    className="
                    text-lg

                    font-bold

                    text-center

                    text-slate-900
                    "
                  >
                    {step.title}
                  </h2>




                  <p
                    className="
                    text-sm

                    text-center

                    text-slate-600

                    mt-2

                    leading-relaxed
                    "
                  >
                    {step.description}
                  </p>



                </motion.div>



              </div>

            ))}


          </div>



        </div>



      </div>


    </main>
  );
}
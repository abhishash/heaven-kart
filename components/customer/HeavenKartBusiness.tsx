"use client";

import {
    ShoppingBag,
    Users,
    Truck,
    ShieldCheck,
    PackageCheck,
    Star,
} from "lucide-react";


export default function HeavenKartCustomerPanel() {


    const features = [
        {
            icon: Users,
            title: "10M+",
            desc: "Happy Customers",
        },
        {
            icon: ShoppingBag,
            title: "50K+",
            desc: "Products Available",
        },
        {
            icon: Truck,
            title: "Fast Delivery",
            desc: "Across India",
        },
        {
            icon: ShieldCheck,
            title: "100%",
            desc: "Secure Shopping",
        },
    ];



    const categories = [
        "Groceries",
        "Electronics",
        "Fashion",
        "Beauty",
        "Home",
        "Lifestyle",
        "Daily Needs",
    ];



    return (

        <div className="
      flex
      flex-col
      justify-between
      mx-auto
      px-0 sm:px-5
    ">


            {/* Hero */}


            <div className="
        flex
        flex-col
        items-center
        text-center
      ">


                <div className="
          h-20
          w-20
          rounded-3xl
          bg-green-100
          flex
          items-center
          justify-center
        ">

                    <ShoppingBag
                        size={42}
                        className="text-green-600"
                    />

                </div>



                <h5 className="
          mt-5
          text-gray-500
          font-medium
        ">
                    Everything you need,
                </h5>



                <h2 className="
          mt-2
          text-3xl
          md:text-3xl
          font-bold
          bg-gradient-to-r
          from-green-700
          to-green-500
          bg-clip-text
          text-transparent
        ">
                    Delivered by HeavenKart
                </h2>



                <p className="
          mt-3
          text-gray-500
          max-w-xl
        ">
                    Shop groceries, electronics, fashion and daily essentials
                    with fast delivery and trusted service.
                </p>


            </div>

            {/* Trust Section */}


            <div className="
        mt-12
        rounded-3xl
        bg-green-50
        p-6
        md:p-8
      ">


                <div className="
          flex justify-center
          items-center
          gap-3
          mb-2
        ">

                    <PackageCheck
                        className="text-green-600"
                    />


                    <h3 className=" text-center
            font-bold
            text-lg
          ">
                        Why Customers Love HeavenKart
                    </h3>


                </div>



                <p className="text-center
          text-gray-600
          font-medium
        ">

                    Millions of customers trust{" "}


                    <span className="
            text-green-700
            font-bold
          ">
                        HeavenKart
                    </span>


                    {" "}for quality products,
                    secure payments and reliable delivery.

                </p>










            </div>






            {/* Rating */}


            <div className="
        flex
        justify-center
        gap-2
        mt-8
        text-green-600
        font-semibold
      ">

                <Star fill="currentColor" />

                4.8/5 Customer Rating


            </div>



        </div>

    );
}
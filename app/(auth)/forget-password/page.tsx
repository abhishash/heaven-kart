"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FormValues = {
    password: string;
    email: string;
};

const ForgetPassowrd = () => {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormValues>();

    const onSubmit = async (data: FormValues) => {
      
    };




    return (
        <div className="flex h-screen w-full">
            {/* LEFT */}
            <div className="flex-1 bg-[#F8EAFF] relative px-6">
                {/* Header */}
                <header className="flex items-center h-20">
                    <img
                        src="http://brands-onboarding.zepto.co.in/assets/icons/zepto-icon.svg"
                        alt="Zepto"
                        className="w-8 h-8 mr-3"
                    />
                    <h1 className="text-xl font-bold bg-gradient-to-r from-[#3C006B] to-[#8C1D75] bg-clip-text text-transparent">
                        Vendor Portal
                    </h1>
                </header>

                {/* Form Card */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8"
                    >
                        <h2 className="text-lg font-semibold text-gray-900">
                            Welcome to Zepto
                        </h2>
                        <p className="text-sm text-gray-500 mb-6">
                            Create your account to start selling
                        </p>

                        <div className="flex flex-col gap-y-1.5 justify-end">
                            <Input color="secondary" {...register("email", { required: "Email is required" })} type="email" />

                            <Link href="/login" className="bg-linear-to-br ml-auto font-medium bg-clip-text text-transparent bg-gradient-to-r from-[#3C006B] from-[7.58%] to-[#8C1D75] to-[98.88%]" >Back to Login </Link>
                        </div>
                        
                        {/* Submit */}
                        <Button
                            type="submit"
                            // isLoading={loading}
                            // disabled={loading}
                            // isDisabled={loading}
                            className="w-full mt-6 py-6 text-base cursor-pointer rounded-md text-white font-semibold bg-gradient-to-r from-[#3C006B] to-[#8C1D75] hover:opacity-90 transition"
                        >
                            Generate New Password
                        </Button>
                    </form>
                </div>
            </div>

            {/* RIGHT */}
            <div className="flex-1 px-6 w-full relative bg-white">
                <div className="flex items-center h-20 relative z-10 justify-end">
                    <p className="MuiTypography-root MuiTypography-body1 font-medium text-primary-700  p-4">Not a User?</p>
                    <button className="px-4 py-2 rounded-lg cursor-pointer text-white bg-linear-to-r from-[#3C006B] from-[7.58%] to-[#8C1D75] to-[98.88%] " type="button">
                        <Link aria-label="login-button" href="/signup" >Create Account
                        </Link> <span className="MuiTouchRipple-root css-w0pj6f"></span></button>
                </div>
                <div className="flex flex-col justify-between h-[calc(100%-5rem)] py-20 w-10/12 mx-auto">
                    <div className="w-full px-4 flex-1 xl:pt-16">
                        <div className="flex flex-col w-full items-center">
                            <img alt="rocket icon" src="http://brands-onboarding.zepto.co.in/assets/icons/rocket.svg" className="h-18 w-18" />
                            <h5 className="MuiTypography-root MuiTypography-h5 !font-medium !mt-4 text-gray-500 css-owt45">Grow your Business Faster By</h5>
                            <h4 className="MuiTypography-root MuiTypography-h4 !font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#3C006B] from-[7.58%] to-[#8C1D75] to-[98.88%] css-iqeqln">Selling through Zepto</h4>
                        </div>
                        <div className="mt-8 grid grid-cols-2 gap-8">
                            <div className="flex items-center">
                                <img alt="customer icon" src="http://brands-onboarding.zepto.co.in/assets/icons/customer-icon.svg" className="w-14 h-14" />
                                <div className="ml-4 flex flex-col"><h5 className="MuiTypography-root MuiTypography-h5 !font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#3C006B] from-[7.58%] to-[#8C1D75] to-[98.88%] css-owt45">55 Million+</h5>
                                    <p className="text-gray-500 text-sm font-medium leading-3">Customer Reach PAN India</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <img alt="cart icon" src="http://brands-onboarding.zepto.co.in/assets/icons/cart.svg" className="w-14 h-14" />
                                <div className="ml-4 flex flex-col">
                                    <h5 className="MuiTypography-root MuiTypography-h5 !font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#3C006B] from-[7.58%] to-[#8C1D75] to-[98.88%] css-owt45">1100+ Stores</h5>
                                    <p className="text-gray-500 text-sm font-medium leading-3">Serviceable Stores PAN India</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <img alt="store icon" src="http://brands-onboarding.zepto.co.in/assets/icons/store.svg" className="w-14 h-14" />
                                <div className="ml-4 flex flex-col">
                                    <h5 className="MuiTypography-root MuiTypography-h5 !font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#3C006B] from-[7.58%] to-[#8C1D75] to-[98.88%] css-owt45">320+ Categories</h5>
                                    <p className="text-gray-500 text-sm font-medium leading-3">Category agnostic, customer obsessed</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <img alt="delivery boy icon" src="http://brands-onboarding.zepto.co.in/assets/icons/delivery-boy.svg" className="w-14 h-14" />
                                <div className="ml-4 flex flex-col">
                                    <h5 className="MuiTypography-root MuiTypography-h5 !font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#3C006B] from-[7.58%] to-[#8C1D75] to-[98.88%] css-owt45">60Cr+ Deliveries</h5>
                                    <p className="text-gray-500 text-sm font-medium leading-3">till now across multiple pincodes</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#F8EAFF] rounded-xl p-9 w-full">
                        <p className=" text-gray-500 font-bold text-base">Over <span className="text-[#3C006B] font-semibold">10K+ Brands</span> trust Zepto to help grow their business from <span className="text-[#3C006B] font-bold">2X to 10X across 1500+ Pincodes.</span></p>
                        <div className="flex justify-between h-10 mt-4 gap-x-1 items-center overflow-auto">
                            <img alt="brand icon" src="http://brands-onboarding.zepto.co.in/assets/icons//brands/cadbury.svg" className="min-w-9 xl:min-w-10" />
                            <img alt="brand icon" src="http://brands-onboarding.zepto.co.in/assets/icons//brands/coca-cola.svg" className="min-w-9 xl:min-w-10" />
                            <img alt="brand icon" src="http://brands-onboarding.zepto.co.in/assets/icons//brands/sugar.svg" className="min-w-9 xl:min-w-10" />
                            <img alt="brand icon" src="http://brands-onboarding.zepto.co.in/assets/icons//brands/whole-truth.svg" className="min-w-9 xl:min-w-10" />
                            <img alt="brand icon" src="http://brands-onboarding.zepto.co.in/assets/icons//brands/minimalist.svg" className="min-w-9 xl:min-w-10" />
                            <img alt="brand icon" src="http://brands-onboarding.zepto.co.in/assets/icons//brands/itc.svg" className="min-w-9 xl:min-w-10" />
                            <img alt="brand icon" src="http://brands-onboarding.zepto.co.in/assets/icons//brands/id.svg" className="min-w-9 xl:min-w-10" />
                            <img alt="brand icon" src="http://brands-onboarding.zepto.co.in/assets/icons//brands/storia.svg" className="min-w-9 xl:min-w-10" />
                            <img alt="brand icon" src="http://brands-onboarding.zepto.co.in/assets/icons//brands/beyond-snack.svg" className="min-w-9 xl:min-w-10" />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassowrd;

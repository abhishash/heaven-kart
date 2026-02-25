"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";

type FormValues = {
  password: string;
  email: string;
};

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    setLoading(true);

    try {
      const response = await signIn("credentials", {
        username: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: "/",
      });

      if (response?.ok) {
        router.push("/");
      } else {
        toast.success(response?.error);
      }
    } catch (error) {
      console.log(error)
      toast.warning("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex md:flex-row flex-col min-h-screen w-full">
      {/* LEFT */}
      <div className="flex-1 flex relative flex-col bg-green-50  px-4 md:px-6">
        {/* Header */}
        <header className="flex items-center h-20">
          <img
            src="http://brands-onboarding.zepto.co.in/assets/icons/zepto-icon.svg"
            alt="Zepto"
            className="w-8 h-8 mr-3"
          />
          <h1 className="text-xl font-bold bg-linear-to-r from-green-700 to-[#4ADE80] bg-clip-text text-transparent">
            Vendor Portal
          </h1>
        </header>
        <div className=" flex-col md:hidden pb-6 flex  w-full items-center">
              <img
                alt="rocket icon"
                src="http://brands-onboarding.zepto.co.in/assets/icons/rocket.svg"
                className="h-18 w-18"
              />
              <h5 className=" !font-medium !mt-4 text-gray-500 css-owt45">
                Grow your Business Faster By
              </h5>
              <h4 className=" !font-semibold bg-clip-text text-transparent bg-gradient-to-r from-green-700 from-[7.58%] to-primary to-[98.88%]">
                Selling through HeavenKart
              </h4>
        </div>

         <div className="flex md:hidden items-center h-20 relative z-10 justify-between md:justify-end">
          <p className="font-medium text-base text-primary-700  p-4">
            Not a User?
          </p>
          <button
            className="px-4 py-2 rounded-lg cursor-pointer text-base font-semibold text-white bg-linear-to-r from-green-700 to-[#4ADE80]"
            type="button"
          >
            <Link aria-label="login-button" href="/signup">
              Create Account
            </Link>{" "}
          </button>
        </div>
           
        {/* Form Card */}
        <div className="inset-0 static md:absolute flex flex-col md:flex-row items-center justify-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-lg bg-white rounded-xl shadow-none md:shadow-lg p-4 md:p-8"
          >
            <h2 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-green-700 from-[7.58%] to-primary to-[98.88%]">
              Welcome to HeavenKart
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Create your account to start selling
            </p>
            <div className="flex flex-col gap-y-4">
              <Field className="flex flex-col gap-y-2">
                <FieldLabel htmlFor="input-email" className="font-medium text-green-700">Email</FieldLabel>
                <Input
                  color="secondary"
                  id="input-email"
                  {...register("email", { required: "Email is required" })}
                  type="email"
                  className="!bg-white border border-green-600"
                  placeholder="Example@gmail.com"
                />
              </Field>
              <Field className="flex flex-col gap-y-2">
                <FieldLabel htmlFor="input-password" className="font-medium text-green-700">Password</FieldLabel>
                <Input
                  color="secondary"
                  id="input-password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="!bg-white border border-green-600"
                  placeholder="abc@123"
                />
              </Field>

              
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full mt-6 py-5 text-base cursor-pointer rounded-md text-white font-semibold bg-gradient-to-r from-green-700 to-primary hover:opacity-90 transition"> 
              {loading ? "Logging..." : "Login"}
            </Button>
          </form>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex-1 px-4 md:px-6 w-full bg-white">
        <div className="hidden md:flex items-center h-20 relative z-10 justify-between md:justify-end">
          <p className="font-medium text-base text-primary-700  p-4">
            Not a User?
          </p>
          <button
            className="px-4 py-2 rounded-lg cursor-pointer text-base font-semibold text-white bg-linear-to-r from-green-700 to-[#4ADE80]"
            type="button"
          >
            <Link aria-label="login-button" href="/signup">
              Create Account
            </Link>{" "}
          </button>
        </div>
        <div className="flex flex-col rela justify-between h-[calc(100%-5rem)] py-2 md:py-20 w-full md:w-10/12 mx-auto">
          <div className="w-full px-0 flex-1 xl:pt-16">
            <div className="flex-col md:flex hidden w-full items-center">
              <img
                alt="rocket icon"
                src="http://brands-onboarding.zepto.co.in/assets/icons/rocket.svg"
                className="h-18 w-18"
              />
              <h5 className=" !font-medium !mt-4 text-gray-500 css-owt45">
                Grow your Business Faster By
              </h5>
              <h4 className=" !font-semibold bg-clip-text text-transparent bg-gradient-to-r from-green-700 from-[7.58%] to-primary to-[98.88%]">
                Selling through HeavenKart
              </h4>
            </div>
            <div className="my-4 md:mb-0 md:mt-4 grid grid-cols-2 gap-4 md:gap-8">
              <div className="flex items-center flex-col justify-center md:flex-row">
                <img
                  alt="customer icon"
                  src="http://brands-onboarding.zepto.co.in/assets/icons/customer-icon.svg"
                  className="w-14 h-14"
                />
                <div className="ml-4 flex flex-col">
                  <h5 className=" !font-semibold bg-clip-text text-transparent bg-gradient-to-r from-green-700 from-[7.58%] to-primary to-[98.88%]">
                    55 Million+
                  </h5>
                  <p className="text-gray-500 text-xs md:text-sm font-medium ">
                    Customer Reach PAN India
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-y-2 flex-col justify-center md:flex-row">
                <img
                  alt="cart icon"
                  src="http://brands-onboarding.zepto.co.in/assets/icons/cart.svg"
                  className="w-14 h-14"
                />
                <div className="ml-4 flex flex-col">
                  <h5 className=" !font-semibold bg-clip-text text-transparent bg-gradient-to-r from-green-700 from-[7.58%] to-primary to-[98.88%]">
                    1100+ Stores
                  </h5>
                  <p className="text-gray-500 text-xs md:text-sm font-medium ">
                    Serviceable Stores PAN India
                  </p>
                </div>
              </div>
              <div className="flex items-center flex-col justify-center md:flex-row">
                <img
                  alt="store icon"
                  src="http://brands-onboarding.zepto.co.in/assets/icons/store.svg"
                  className="w-14 h-14"
                />
                <div className="ml-4 flex flex-col">
                  <h5 className="!font-semibold bg-clip-text text-transparent bg-gradient-to-r from-green-700 from-[7.58%] to-primary to-[98.88%]">
                    320+ Categories
                  </h5>
                  <p className="text-gray-500 text-xs md:text-sm font-medium ">
                    Category agnostic, customer obsessed
                  </p>
                </div>
              </div>
              <div className="flex items-center flex-col justify-center md:flex-row">
                <img
                  alt="delivery boy icon"
                  src="http://brands-onboarding.zepto.co.in/assets/icons/delivery-boy.svg"
                  className="w-14 h-14"
                />
                <div className="ml-4 flex flex-col">
                  <h5 className="!font-semibold bg-clip-text text-transparent bg-gradient-to-r from-green-700 from-[7.58%] to-primary to-[98.88%]">
                    60Cr+ Deliveries
                  </h5>
                  <p className="text-gray-500 text-xs md:text-sm font-medium ">
                    till now across multiple pincodes
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-green-50 rounded-xl mb-6 md:mb-0 p-4 md:p-9 w-full">
            <p className=" text-gray-500 font-bold text-base">
              Over{" "}
              <span className="text-[#3C006B] font-semibold">10K+ Brands</span>{" "}
              trust Zepto to help grow their business from{" "}
              <span className="text-[#3C006B] font-bold">
                2X to 10X across 1500+ Pincodes.
              </span>
            </p>
            <div className="flex justify-between h-10 mt-4 gap-x-1 items-center overflow-auto">
              <img
                alt="brand icon"
                src="http://brands-onboarding.zepto.co.in/assets/icons//brands/cadbury.svg"
                className="min-w-9 xl:min-w-10"
              />
              <img
                alt="brand icon"
                src="http://brands-onboarding.zepto.co.in/assets/icons//brands/coca-cola.svg"
                className="min-w-9 xl:min-w-10"
              />
              <img
                alt="brand icon"
                src="http://brands-onboarding.zepto.co.in/assets/icons//brands/sugar.svg"
                className="min-w-9 xl:min-w-10"
              />
              <img
                alt="brand icon"
                src="http://brands-onboarding.zepto.co.in/assets/icons//brands/whole-truth.svg"
                className="min-w-9 xl:min-w-10"
              />
              <img
                alt="brand icon"
                src="http://brands-onboarding.zepto.co.in/assets/icons//brands/minimalist.svg"
                className="min-w-9 xl:min-w-10"
              />
              <img
                alt="brand icon"
                src="http://brands-onboarding.zepto.co.in/assets/icons//brands/itc.svg"
                className="min-w-9 xl:min-w-10"
              />
              <img
                alt="brand icon"
                src="http://brands-onboarding.zepto.co.in/assets/icons//brands/id.svg"
                className="min-w-9 xl:min-w-10"
              />
              <img
                alt="brand icon"
                src="http://brands-onboarding.zepto.co.in/assets/icons//brands/storia.svg"
                className="min-w-9 xl:min-w-10"
              />
              <img
                alt="brand icon"
                src="http://brands-onboarding.zepto.co.in/assets/icons//brands/beyond-snack.svg"
                className="min-w-9 xl:min-w-10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

"use client";

import { EyeFilledIcon, EyeSlashFilledIcon } from "@/components/icons";
import { fetchHandler } from "@/lib/api/auth";
import { Input } from "@heroui/input";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { Checkbox } from "@heroui/checkbox";
import { useForm } from "react-hook-form";
import { Button } from "@heroui/button";
import { addToast, useToast } from "@heroui/toast";
import { InputOtp } from "@heroui/input-otp";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

type FormValues = {
  phone: string;
  password: string;
  email: string;
  communication: boolean;
  name: string;
  otp: string;
};

const SignupPage = () => {

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();


  const { data, mutateAsync, isPending } = useMutation({
    mutationFn: (payload: { name: string; phone: string, email: string, password: string }) =>
      fetchHandler({
        endpoint: "register",
        method: "POST",
        data: payload,
      })
  });

  const { mutateAsync: verifyOtp, isPending: isOtpPending } = useMutation({
    mutationFn: (payload: { email: string, otp: string }) =>
      fetchHandler({
        endpoint: "verify-otp",
        method: "POST",
        data: payload,
      })
  });

  const [isOtp, setIsOtp] = useState(false);
  const router = useRouter();
  const onSubmit = async (data: FormValues) => {
    setLoading(true)
    if (isOtp) {
      verifyOtp({
        otp: data?.otp,
        email: data?.email,
      })?.then(async (res) => {
        if (res?.status) {
          // setIsOtp(true);
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
              addToast({
                description: response?.error,
                color: "danger",
              });
            }
          } catch (error) {
            addToast({
              description: "Something went wrong",
              color: "danger",
            });
          } finally {
            setLoading(false);
          }
        } else {
          addToast({
            description: res?.errors?.email?.[0],
            color: "danger",
            variant: "bordered"
          })
        }
      }).catch((error) => {
        addToast({
          description: "Something Wrong",
          color: "danger",
        });
      });
    } else {
      const payload = { name: data?.name, phone: data?.phone, email: data?.email, password: data?.password };
      mutateAsync(payload)?.then((res) => {
        if (res?.status) {
          setIsOtp(true);
          addToast({
            description: "OTP has been send your registered email",
            color: "success",
          })
          return;
        }
        addToast({
          description: res?.errors?.email?.[0],
          color: "danger",
          variant: "bordered"
        })
      }).catch((error) => {
        addToast({
          description: "Something Wrong",
          color: "danger",
        });
      });
    }
    setLoading(false)
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
            {
              isOtp ? <div className="flex justify-center">
                <InputOtp
                  isRequired
                  aria-label="OTP input field"
                  length={4}
                  {...register("otp", { required: "OTP is required" })}
                  color="secondary"
                  size="lg"
                  placeholder="Enter code"
                />
              </div> :
                <>
                  <div className="grid grid-cols-1 w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <Input label="Name" color="secondary"   {...register("name", { required: "Name is required" })}
                      type="text" variant="bordered" />
                    <Input label="Email" color="secondary" {...register("email", { required: "Email is required" })} type="email" variant="bordered" />
                    <Input label="Phone" color="secondary" {...register("phone", { required: "Phone is required" })} type="number" variant="bordered" />
                    <Input label="Password" color="secondary" {...register("password", { required: "Password is required" })} type={isVisible ? "text" : "password"} variant="bordered" endContent={
                      <button
                        aria-label="toggle password visibility"
                        className="focus:outline-solid outline-transparent"
                        type="button"
                        onClick={toggleVisibility}
                      >
                        {isVisible ? (
                          <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    } />
                  </div>
                  {/* Checkbox */}
                  <div className="mt-4">
                    <Checkbox defaultSelected color="secondary" classNames={{
                      label: "text-gray-500 text-sm"
                    }} className="text-gray-400" >
                      I want to receive important updates on Email & WhatsApp
                    </Checkbox>
                  </div>

                </>
            }
            {/* Submit */}
            <Button
              disabled={isPending || isOtpPending || loading}
              isLoading={isPending || isOtpPending || loading}
              type="submit"
              className="w-full mt-6 py-6 cursor-pointer rounded-md text-white font-semibold bg-gradient-to-r from-[#3C006B] to-[#8C1D75] hover:opacity-90 transition"
            > {
                isOtp ? "Verify Account" : "Create Account"
              }
            </Button>
          </form>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex-1 px-6 w-full relative bg-white">
        <div className="flex items-center h-20 relative z-10 justify-end">
          <p className="MuiTypography-root MuiTypography-body1 font-medium text-primary-700  p-4">Already a User?</p>
          <button className="px-4 py-2 rounded-lg text-white cursor-pointer bg-linear-to-r from-[#3C006B] from-[7.58%] to-[#8C1D75] to-[98.88%] " type="button">
            <Link aria-label="login-button" href="/login" >Log In
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

export default SignupPage;

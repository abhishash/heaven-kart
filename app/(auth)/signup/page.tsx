"use client";

import { fetchHandler } from "@/lib/fetch-handler";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldLabel } from "@/components/ui/field";

import Image from "next/image";
import HeavenKartBusiness from "@/components/customer/HeavenKartBusiness";


type FormValues = {
  phone: string;
  password: string;
  email: string;
  communication: boolean;
  name: string;
};


const SignupPage = () => {


  const [loading, setLoading] = useState(false);

  const router = useRouter();


  const {
    register,
    handleSubmit,
  } = useForm<FormValues>();



  const { mutateAsync, isPending } = useMutation({

    mutationFn: (payload: {
      name: string;
      phone: string;
      email: string;
      password: string;
    }) =>

      fetchHandler({
        endpoint: "register",
        method: "POST",
        data: payload
      })

  });




  const onSubmit = async (data: FormValues) => {


    setLoading(true);


    try {


      const res = await mutateAsync({

        name: data.name,
        phone: data.phone,
        email: data.email,
        password: data.password

      });



      if (res?.status) {


        const login = await signIn("credentials", {

          username: data.email,
          password: data.password,
          redirect: false

        });



        if (login?.ok) {

          router.push("/");

        }

        else {

          toast.warning(
            login?.error || "Login failed"
          );

        }


      }

      else {


        if (res?.errors) {

          Object.values(res.errors).forEach((messages: any) => {

            messages.forEach((msg: string) => {

              toast.warning(msg);

            })

          })

        }

        else {

          toast.warning(
            res?.message || "Something went wrong"
          )

        }


      }



    }
    catch (error: any) {


      toast.error(
        error?.response?.data?.message ||
        "Something went wrong"
      );


    }
    finally {

      setLoading(false);

    }



  };





  return (

    <div
      className="
flex
md:flex-row
flex-col
min-h-screen
w-full
overflow-hidden
"
    >


      {/* LEFT */}


      <div
        className="
flex-1
flex
relative
flex-col
bg-green-50
px-5
sm:px-8
md:px-6
"
      >


        {/* Logo */}

        <Link
          href="/"
          className="pt-4"
        >

          <Image

            src="/logo.png"

            alt="Heaven Kart"

            width={120}

            height={120}

            className="h-16 w-auto"

          />

        </Link>





        {/* Mobile login */}


        <div
          className="
flex
md:hidden
items-center
justify-between
mt-4
"
        >


          <p className="text-sm font-medium">

            Already a User?

          </p>



          <Link

            href="/login"

            className="
px-4
py-2
rounded-lg
text-white
font-semibold
bg-gradient-to-r
from-green-700
to-green-400
"

          >

            Login

          </Link>


        </div>







        {/* FORM */}


        <div
          className="
flex
items-center
justify-center
py-8
md:absolute
inset-0
"
        >


          <form

            onSubmit={handleSubmit(onSubmit)}

            className="
w-full
max-w-lg
bg-white
rounded-2xl
p-5
sm:p-8
md:shadow-lg
"


          >


            <h2
              className="
text-xl
font-bold
bg-gradient-to-r
from-green-700
to-green-500
bg-clip-text
text-transparent
"
            >

              Welcome to HeavenKart

            </h2>



            <p
              className="
text-sm
text-gray-500
mt-2
mb-6
"
            >

              Create your account and start shopping

            </p>





            <div
              className="
grid
gap-2
"
            >



              <div
                className="grid grid-cols-2 gap-2"
              >


                <Field>

                  <FieldLabel>
                    Name
                  </FieldLabel>


                  <Input

                    className="border-green-600"

                    placeholder="Your name"

                    {...register("name")}

                  />


                </Field>



                <Field>

                  <FieldLabel>
                    Phone
                  </FieldLabel>


                  <Input

                    className="border-green-600"

                    placeholder="790XXXXXXXX"

                    {...register("phone")}

                  />


                </Field>


              </div>





              <Field>

                <FieldLabel>
                  Email
                </FieldLabel>


                <Input

                  type="email"

                  className="border-green-600"

                  placeholder="example@gmail.com"

                  {...register("email")}

                />


              </Field>





              <Field>

                <FieldLabel>
                  Password
                </FieldLabel>


                <Input

                  type="password"

                  className="border-green-600"

                  placeholder="********"

                  {...register("password")}

                />


              </Field>


            </div>





            <div className="mt-5 flex items-start gap-2">


              <Checkbox />


              <p
                className="
text-xs
text-gray-500
"
              >

                Receive important updates on Email & WhatsApp

              </p>


            </div>






            <Button

              disabled={loading || isPending}

              type="submit"

              className="
w-full
mt-6
py-5
rounded-xl
bg-gradient-to-r
from-green-700
to-green-500
text-white
font-semibold
"

            >

              {
                loading || isPending
                  ?
                  "Creating..."
                  :
                  "Create Account"
              }
            </Button>
          </form>
        </div>
      </div>
      {/* RIGHT */}


      <div

        className="
flex-1
bg-white
py-6 sm:py-0
px-5
sm:px-8
md:px-6
"

      >


        <div

          className="
hidden
md:flex
justify-end
items-center
h-20
"

        >


          <p className="mr-3">

            Already a User?

          </p>



          <Link

            href="/login"

            className="
px-5
py-2
rounded-lg
text-white
font-semibold
bg-gradient-to-r
from-green-700
to-green-400
"

          >

            Login

          </Link>


        </div>




        <HeavenKartBusiness />


      </div>



    </div>


  )

};


export default SignupPage;
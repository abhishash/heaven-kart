"use client";

import HeavenKartBusiness from "@/components/customer/HeavenKartBusiness";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { fetchHandler } from "@/lib/fetch-handler";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";


type FormValues = {
  email: string;
};



const ForgetPassword = () => {


  const {
    register,
    handleSubmit,
  } = useForm<FormValues>();



  const { mutateAsync, isPending } = useMutation({

    mutationFn: (payload: { email: string }) =>

      fetchHandler({

        endpoint: "forget/password",
        method: "POST",
        data: payload

      })

  });





  const onSubmit = async (data: FormValues) => {


    try {


      const res = await mutateAsync({

        email: data.email

      });



      const response = res?.data;



      if (response?.status) {

        toast.success(
          response?.message
        );

        return;

      }



      toast.warning(
        res?.message || "Something went wrong"
      );



    }

    catch (error: any) {


      toast.error(
        error?.message || "Something went wrong"
      );


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






        {/* Mobile Header */}



        <div

          className="
flex
md:hidden
items-center
justify-between
mt-5
"


        >


          <p
            className="
font-medium
text-sm
"
          >

            New User?

          </p>



          <Link

            href="/signup"

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

            Create Account

          </Link>



        </div>








        {/* FORM */}



        <div

          className="
flex
items-center
justify-center py-6 sm:py-0
sm:py-10
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

              Forgot Password?

            </h2>




            <p

              className="
text-sm
text-gray-500
mt-2
mb-6
"

            >

              Enter your email to receive password reset instructions.

            </p>







            <Field

              className="
flex
flex-col
gap-2
"

            >


              <FieldLabel

                className="
text-green-700
font-medium
"

              >

                Email

              </FieldLabel>



              <Input


                id="email"


                type="email"


                placeholder="example@gmail.com"


                className="
bg-white
border
border-green-600
"


                {...register("email", {

                  required: "Email is required"

                })}


              />



            </Field>







            <Link

              href="/login"

              className="
block
text-right
mt-3
text-sm
font-semibold
bg-gradient-to-r
from-green-700
to-green-500
bg-clip-text
text-transparent
"

            >

              Back to Login

            </Link>







            <Button


              disabled={isPending}


              type="submit"


              className="

w-full

mt-6

py-5

rounded-xl

text-white

font-semibold

bg-gradient-to-r

from-green-700

to-green-500

hover:opacity-90

transition

"

            >


              {

                isPending

                  ?

                  "Generating..."

                  :

                  "Generate New Password"

              }


            </Button>





          </form>


        </div>



      </div>









      {/* RIGHT */}



      <div

        className="
flex-1 py-8
bg-white
px-5
sm:px-8
md:px-6
"


      >




        <div

          className="
hidden
md:flex
items-center
justify-end
h-20
gap-3
"


        >


          <p className="font-medium text-sm">

            New User?

          </p>




          <Link

            href="/signup"

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

            Create Account

          </Link>



        </div>





        <HeavenKartBusiness />


      </div>





    </div>


  )

};


export default ForgetPassword;
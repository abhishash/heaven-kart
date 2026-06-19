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

import Image from "next/image";
import HeavenKartCustomerPanel from "@/components/customer/HeavenKartBusiness";


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
  } = useForm<FormValues>();






  const onSubmit = async (data: FormValues) => {


    setLoading(true);


    try {


      const response = await signIn("credentials", {

        username: data.email,

        password: data.password,

        redirect: false,

        callbackUrl: "/"

      });



      if (response?.ok) {

        router.push("/");

      }

      else {

        toast.warning(
          response?.error || "Invalid credentials"
        );

      }



    }

    catch (error: any) {

      toast.error(
        error?.message || "Something went wrong"
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









        {/* Login Form */}



        <div

          className="
flex
items-center
justify-center
py-10
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

              Welcome Back to HeavenKart

            </h2>




            <p

              className="
text-sm
text-gray-500
mt-2
mb-6
"

            >

              Login to continue shopping

            </p>







            <div

              className="
flex
flex-col
gap-4

"

            >





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








              <div

                className="
flex
flex-col
gap-2
"

              >


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

                    Password

                  </FieldLabel>




                  <Input


                    type="password"


                    placeholder="********"


                    className="
bg-white
border
border-green-600
"


                    {...register("password", {

                      required: "Password is required"

                    })}


                  />



                </Field>





                <Link


                  href="/forget-password"


                  className="
text-right
text-sm
font-semibold
bg-gradient-to-r
from-green-700
to-green-500
bg-clip-text
text-transparent

"

                >

                  Forgot Password?

                </Link>



              </div>





            </div>








            <Button


              disabled={loading}


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

                loading

                  ?

                  "Logging..."

                  :

                  "Login"

              }


            </Button>






          </form>



        </div>






      </div>









      {/* RIGHT */}



      <div

        className="
flex-1 py-6 sm:py-0
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
gap-3
h-20

"

        >


          <p className="text-sm font-medium">

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






        <HeavenKartCustomerPanel />



      </div>






    </div>



  )

};


export default LoginPage;
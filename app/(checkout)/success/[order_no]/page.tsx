import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Package, CheckCircle2, Truck, ShieldCheck, Sparkles } from "lucide-react";
import { SuccessBadge } from "@/components/elements/checkout/success-badge";
import { decodeId } from "@/lib/utils";
import Image from "next/image";

export const metadata = {
  title: "Order Success | Your Store",
  description:
    "Your order has been successfully placed. Track your order and view details here.",
};

type Props = {
  params: Promise<{ order_no: string }>;
};

export default async function OrderSuccessPage({ params }: Props) {

  const { order_no } = await params;
  const orderNumber = decodeId(decodeURIComponent(order_no));

  return (
    <main className="relative overflow-hidden min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100 flex items-center justify-center">

      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-green-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-green-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative z-10 w-full sm:max-w-3xl mx-auto px-5 py-4 sm:py-6">

        <div className="backdrop-blur-xl px-0 sm:px-16">

          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <Image className="sm:w-36 w-24 h-24 sm:h-36" src="/favicon.png" alt="place-order" width={124} height={124} />
            </div>
          </div>

          {/* Heading */}
          <div className="mt-2 sm:mt-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-1 text-green-700 text-xs sm:text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Order Successfully Placed
            </div>

            <h1 className="mt-3 sm:mt-5 text-3xl sm:text-4xl font-bold">
              Thank You For Your Purchase 🎉
            </h1>

            <p className="sm:mt-3 mt-2 text-sm sm:text-lg text-gray-600 max-w-xl mx-auto">
              Your order has been received successfully. We're preparing it
              carefully and will notify you as soon as it ships.
            </p>
          </div>
          {/* Order Number */}
          <div className="bg-secondary/10 text-center border border-secondary/20 rounded-lg p-3">
            <p className="text-sm text-muted-foreground mb-1">
              Order Number
            </p>

            <p className="text-base sm:text-xl font-semibold text-foreground tracking-wide">
              #{orderNumber}
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-4 sm:mt-10 flex flex-col md:flex-row gap-4">

            <Link
              href="/customer/orders"
              className="flex-1"
            >
              <Button
                variant="outline"
                className="w-full h-12 border-2 cursor-pointer border-green-600 text-green-700 hover:bg-green-50"
              >
                View My Orders
              </Button>
            </Link>

            <Link
              href="/"
              className="flex-1"
            >
              <Button className="w-full h-12 bg-gradient-to-r cursor-pointer from-green-600 to-emerald-600 hover:opacity-90">
                Continue Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-500">
            Need help?
            <Link
              href="/contact"
              className="text-green-600 font-medium ml-1 hover:underline"
            >
              Contact Support
            </Link>
          </div>

        </div>

      </div>

    </main>
  );
}
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Package, CheckCircle2 } from "lucide-react";
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
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5 flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 py-16">

        {/* Success Card */}
        <div className="text-center space-y-4">
          {/* Success Icon */}
          <div className="flex justify-center">
            <Image className="w-36 h-36" src="/thumb-up.gif" alt="place-order" width={124} height={124} />
          </div>
          {/* Heading */}
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Order Confirmed 🎉
            </h1>

            <p className="text-muted-foreground text-lg">
              Thank you for your purchase. Your order has been placed
              successfully.
            </p>
          </div>

          {/* Order Number */}
          <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-3">
            <p className="text-sm text-muted-foreground mb-1">
              Order Number
            </p>

            <p className="text-xl font-semibold text-foreground tracking-wide">
              #{orderNumber}
            </p>
          </div>

          {/* Email Confirmation */}
          <div className="flex items-start gap-3 bg-green-50 p-5 rounded-lg border">
            <Package className="w-5 h-5 text-foreground mt-1" />

            <div className="text-left">
              <p className="font-medium text-foreground">
                Confirmation email sent
              </p>

              <p className="text-sm text-muted-foreground">
                We've sent a confirmation email with order details and tracking
                information.
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link href="/customer/orders">
              <Button variant="outline" className="w-full px-4 !cursor-pointer border !bg-white !text-green-700 !border-green-700 sm:w-auto">
                View Orders
              </Button>
            </Link>

            <Link href="/">
              <Button className="w-full !cursor-pointer !rounded-md sm:w-auto bg-gradient-to-r from-green-700 to-primary gap-2">
                Continue Shopping
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
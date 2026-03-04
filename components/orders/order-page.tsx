'use client';

import { useSession } from "next-auth/react";
import OrderHeader from "./order-header";
import { OrderItems } from "./order-items";
import { OrderSummary } from "./order-summary";
import { OrderTimeline } from "./order-timeline";
import { useQuery } from "@tanstack/react-query";
import { Order, OrderResponse } from "@/lib/types";
import { fetchHandler } from "@/lib/fetch-handler";
import { ScrollArea } from "../ui/scroll-area";

export default function OrderPage({ orderNumber }: { orderNumber: string }) {

  const { data: session } = useSession();
  const { data, isPending, refetch } = useQuery<OrderResponse>({
    queryKey: [`orders`, orderNumber],
    enabled: !!orderNumber,
    queryFn: () =>
      fetchHandler({
        endpoint: `orders/${orderNumber}`,
        method: "GET",
        token: session?.user?.accessToken
      }),
  });

  const order = data?.data;

  return (
    <div className="w-full mx-auto">
      {/* Header Section */}
      <div className="mb-3">
        <h2 className=" text-balance text-xl font-bold tracking-tight text-foreground sm:text-xl">
          Order Details
        </h2>
        <p className="text-xs text-muted-foreground">
          Track your order and manage your purchase
        </p>
      </div>
      <ScrollArea className="h-[550px] pr-4 ">
        {
          isPending ? "fetching order details" :
            <div className="">
              {/* Left Column - Main Content */}
              <div className="space-y-6 lg:col-span-2">
                {/* Order Header Card */}
                <OrderHeader order={order} />

                {/* Order Timeline */}
                <OrderTimeline status={order?.status} />

                {/* Order Items */}
                <OrderItems items={order?.items || []} refetch={refetch} />

                
              </div>

              {/* Right Column - Summary Sidebar */}
              <div className="lg:col-span-1">
                <OrderSummary order={order as Order} />
              </div>
            </div>
        }
      </ScrollArea>

    </div>
  );
}

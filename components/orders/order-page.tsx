'use client';

import OrderHeader from "./order-header";
import { OrderItems } from "./order-items";
import { OrderSummary } from "./order-summary";
import { OrderTimeline } from "./order-timeline";
import { ScrollArea } from "../ui/scroll-area";
import { InvoiceData } from "./types";
import InvoiceModal from "./pop-up/invoice-modal";
import { useState } from "react";
import { useGetOrdersDetailsQuery } from "@/redux/services/order-api";
import { ReceiptText } from "lucide-react";
import { Order } from "@/types/service/order.types";

export default function OrderPage({ orderNumber }: { orderNumber: string }) {

  const { data: order, isLoading, refetch } = useGetOrdersDetailsQuery(Number(orderNumber), { skip: !orderNumber });

  return (
    <div className="w-full mx-auto">
      {/* Header Section */}
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className=" text-balance text-xl font-bold tracking-tight text-foreground sm:text-xl">
            Order Details
          </h2>
          <p className="text-xs text-muted-foreground">
            Track your order and manage your purchase
          </p>
        </div>

      </div>

      <ScrollArea className="h-[550px] pr-4 ">
        {
          isLoading ? "fetching order details" :
            <div className="">
              {/* Left Column - Main Content */}
              <div className="space-y-4 lg:col-span-2">
                {/* Order Header Card */}
                <OrderHeader order={order} />

                {/* Order Timeline */}
                <OrderTimeline status={order?.status} />

                {/* Order Items */}
                <OrderItems items={order?.items || []} refetch={refetch} />

              </div>

              {/* Right Column - Summary Sidebar */}
              <div className="lg:col-span-1 mt-3">
                <OrderSummary order={order as Order} orderId={orderNumber} />
              </div>
            </div>
        }
      </ScrollArea>

    </div>
  );
}

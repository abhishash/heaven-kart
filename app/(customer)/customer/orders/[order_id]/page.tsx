import { authOptions } from "@/auth";
import OrderPage from "@/components/orders/order-page";
import { InvoiceResponse } from "@/components/orders/types";
import { fetchHandler } from "@/lib/fetch-handler";
import { decodeId } from "@/lib/utils";
import { getServerSession } from "next-auth";

type Props = {
  params: Promise<{ order_id: string }>;
};
export default async function Order({ params }: Props) {
  const { order_id } = await params;
  const orderNumber = decodeId(decodeURIComponent(order_id));
  const session = await getServerSession(authOptions);
  const response = await  fetchHandler<InvoiceResponse>({
        endpoint: `orders/${orderNumber}/invoice`,
        method: "GET",
        token: session?.user?.accessToken,
      });
  const invoice = response?.data;
  
  return (
    <OrderPage orderNumber={orderNumber} invoice={invoice}/>
  )
}

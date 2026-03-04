import OrderPage from "@/components/orders/order-page";
import { decodeId } from "@/lib/utils";

type Props = {
  params: Promise<{ order_id: string }>;
};
export default async function Order({ params }: Props) {
  const { order_id } = await params;
  const orderNumber = decodeId(decodeURIComponent(order_id));

  return (
    <OrderPage orderNumber={orderNumber}/>
  )
}

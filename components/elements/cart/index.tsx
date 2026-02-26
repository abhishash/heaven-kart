import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  ShoppingCart,
  ChevronLeft,
  MoveLeftIcon,
  ArrowLeft,
  Check,
  BadgePercent,
  Zap,
  Minus,
  Plus,
  CirclePlus,
  X,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { ChevronRightIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { OrderDetails } from "./order-details";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { imageBaseUrl } from "@/lib/constants";
import Image from "next/image";
import { useCartDetail } from "@/components/hooks/useCartDetails";
import { CartItem } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { fetchHandler } from "@/lib/fetch-handler";
import { useSession } from "next-auth/react";
import { addToCart, removeFromCart } from "../store/cartSlice";

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(2);
  useCartDetail()

  const { items, totalAmount, loading } = useSelector(
    (state: RootState) => state.cart
  );

  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items);

  return (
    <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <button disabled={loading} className="text-gray-900 bg-transparent relative text-sm cursor-pointer font-normal flex gap-x-1">
          <ShoppingCart className="h-5 w-5 text-gray-500" />
          {totalAmount > 0 && (
            <span className="absolute -top-2 -right-4 bg-green-400 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
              {totalAmount}
            </span>
          )}
        </button >
      </DrawerTrigger>
      <DrawerContent className="w-[420px] sm:w-[500px] md:min-w-[400px]">
        <DrawerHeader className="shadow-xl py-0 px-0">
          <DrawerTitle
            onClick={() => setIsOpen(false)}
            className="flex gap-x-1 cursor-pointer group px-3 !py-2"
          >
            <ArrowLeft className="group-hover:stroke-green-400 transition-all duration-300" />
            Cart
          </DrawerTitle>
          <DrawerDescription className="bg-green-50 tracking-wide text-green-500  py-3 px-3">
            Set your <strong>daily activity</strong> goal.
          </DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="no-scrollbar overflow-y-auto bg-gray-50/20 px-3">
          {/* <div className="no-scrollbar overflow-y-auto bg-gray-50/20 px-3"> */}
          {/* {/* No Fees Section /} */}


          {/* Promo Code Section */}
          <div className="bg-green-50 p-2 mt-2 rounded-lg mb-4 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <BadgePercent size={40} className="fill-green-500 text-white" />
                <div className="space-y-2">
                  <p className="font-semibold text-xs text-gray-900">
                    Save ₹50 more on this order
                  </p>
                  <p className="text-xs text-gray-600">Code: ZEPBENEFIT50</p>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              color="primary"
              className="border-green-300 cursor-pointer text-green-600 hover:text-green-700 hover:bg-green-50 font-semibold px-6 bg-transparent"
            >
              Apply
            </Button>
          </div>

          {/* View all coupons */}
          <button className="text-sm ml-auto text-gray-700 cursor-pointer hover:text-gray-900 font-medium flex items-center gap-1 mb-4">
            View all coupons <ChevronRightIcon size={20} />
          </button>

          {/* Delivery Time */}
          <div className="flex items-center bg-white rounded-sm shadow-xs gap-3 py-4 px-2 mb-4">
            <Zap size={20} className="text-gray-800" />
            <p className="font-semibold text-gray-900">Delivery in 6 mins</p>
          </div>

          {/* Product Card */}
          <ScrollArea className="h-[50vh] pr-3">
            <div className="flex flex-col gap-y-2">
              {cart?.map((item) => (
                <CartItemList key={item.cart_id} item={item} />
              ))}
            </div>
          </ScrollArea>

          {/* Bill Summary */}
          <div className="mt-4 rounded-md p-2 border border-gray-300/20 shadow-xs">
            <div className="flex items-center gap-2 mb-4 pb-4 border-b">
              <div className="w-5 h-5 border border-green-300/20 rounded flex items-center justify-center">
                📋
              </div>
              <h3 className="font-bold text-gray-900">Bill summary</h3>
            </div>

            <div className="space-y-1 mb-4">
              <div className="flex justify-between text-xs">
                <p className="text-gray-600">Item Total</p>
                <div className="text-right">
                  <p className="text-gray-400 line-through text-xs">
                    ₹{(1716).toLocaleString("en-IN")}
                  </p>
                  <p className="font-semibold text-gray-900">
                    ₹{(1310).toLocaleString("en-IN")}
                  </p>
                </div>
              </div>

              <div className="flex justify-between text-xs">
                <p className="text-gray-600">Handling Fee</p>
                <p className="text-green-600 font-medium">FREE</p>
              </div>

              <div className="flex justify-between text-xs">
                <p className="text-gray-600">Delivery Fee</p>
                <p className="text-green-600 font-medium">FREE</p>
              </div>
            </div>

            <div className="border-t pt-2 flex justify-between items-center">
              <p className="font-semibold text-gray-900">To Pay</p>
              <div className="text-right">
                <p className="text-gray-400 line-through text-sm">
                  ₹{(1747).toLocaleString("en-IN")}
                </p>
                <p className="text-xl font-bold text-gray-900">
                  ₹{(1310).toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          </div>

          <OrderDetails />
          {/* </div> */}
        </ScrollArea>
        <DrawerFooter>
          {/* Missed Something */}
          <div className="flex items-center justify-between mb-1 px-4 py-2 bg-gray-50 rounded-lg">
            <p className="font-medium text-gray-900">Missed something?</p>
            <Button
              variant="outline"
              color="primary"
              className="border-green-300 cursor-pointer text-green-600 hover:text-green-700 hover:bg-green-50 font-semibold px-6 bg-transparent"
            >
              <Plus size={18} />
              Add More Items
            </Button>
          </div>
          <Link
            href={"/checkout"}
            className="cursor-pointer rounded-lg py-2.5 bg-primary text-center text-white text-lg font-semibold"
          >
            Checkout
          </Link>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}


export const CartItemList = ({ item }: { item: CartItem }) => {
  // const [quantity, setQuantity] = useState(2);
  const { data: session } = useSession();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: {
      product_id: string;
      qty: number;
      price: number;
      type: "custom" | "remove" | "add";
    }) =>
      fetchHandler({
        endpoint: "cart/add",
        method: "POST",
        data: payload,
        token: session?.user?.accessToken,
      }),
  });

  const { mutateAsync: removeCartItem, isPending: isRemoveCartLoading } = useMutation({
    mutationFn: (payload: {
      cart_id: number;
    }) =>
      fetchHandler({
        endpoint: "cart/remove",
        method: "DELETE",
        data: payload,
        token: session?.user?.accessToken,
      }),
  });
  const dispatch = useDispatch();

  const setQuantity = async (type: "add" | "remove", id: string) => {
    try {
      await mutateAsync({
        product_id: id,
        qty: 1,
        price: (item?.price),
        type: type,
      }).then((res) => {
        if (res?.status) {
          dispatch(addToCart({ ...res?.data })); // ✅ Redux update
        }
      });
    } catch (error) {
      console.error(error);
      alert("Error adding to cart");
    }
  }

  const removeItem = async (id: number) => {
    try {
      await removeCartItem({
        cart_id: id,
      }).then((res) => {
        if (res?.status) {
          dispatch(removeFromCart(res?.remove_cart_id)); // ✅ Redux update
        }
      });
    } catch (error) {
      console.error(error);
      alert("Error adding to cart");
    }
  }
  return (
    <div key={item?.id} className="p-4 bg-green-50 shadow-none">
      <div className="flex gap-4">
        <div className="w-12 h-12 relative bg-gray-400/20 rounded flex items-center justify-center flex-shrink-0">
          <button className="border bg-red-500 rounded-full border-red-500 absolute -top-2 left-0" onClick={() => removeItem(item?.cart_id)} >
            <X className="size-4 text-white" />
          </button>
          <Image
            src={`${imageBaseUrl}${item?.image}`}
            alt={item?.name}
            height={80}
            width={80}
          />
        </div>

        <div className="flex-1">
          <h4 className="font-semibold text-xs text-gray-900">
            {item?.name}
          </h4>
          <p className="text-xs text-gray-500">1 pack (5 L)</p>
        </div>

        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={() => { item?.qty === 1 ? removeItem(item?.cart_id) : setQuantity("remove", item.product_id) }}
              disabled={isPending}
              className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100"
            >
              <Minus size={14} />
            </button>

            <span className="w-6 text-center font-semibold">
              {item?.qty}
            </span>

            <button
              onClick={() => setQuantity("add", item.product_id)}
              disabled={isPending}
              className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100"
            >
              <Plus size={14} />
            </button>
          </div>

          <div className="text-right flex items-end gap-x-1.5">
            <p className="font-bold text-gray-900 text-xs">
              ₹{(item?.price).toLocaleString("en-IN")}
            </p>
            <p className="text-xs text-gray-400 line-through">
              ₹{(1716).toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
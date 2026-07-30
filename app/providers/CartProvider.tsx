"use client";

import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { isObject } from "framer-motion";
import { RootState } from "@/redux/store";
import { fetchCart } from "@/redux/slices/cartSlice";

export default function CartProvider({ children, session }: { children: ReactNode, session: any }) {
  const dispatch = useDispatch();
  const initialized = useSelector(
    (state: RootState) => state.cart.initialized
  );

  useEffect(() => {
    if (!initialized) {
      if (isObject(session?.user)) {
        dispatch(fetchCart(session?.user?.accessToken) as any); // ✅ only once
      } else {
        dispatch({
          items: [],
          totalAmount: 0,
          totalPrice: 0,
          loading: false,
          initialized: false,
          type: ""
        });
      }
    }
  }, [initialized, dispatch]);

  return children;
}
"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { AppDispatch } from "../elements/store/store";
import { fetchHandler, methods } from "@/lib/fetch-handler";
import { setCart, setCartLoading } from "../elements/store/cartSlice";
import { CART_DETAILS } from "@/lib/constants";

export const useCartDetail = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { data: session, status } = useSession();

    useEffect(() => {
        const loadCart = async () => {
            if (!session?.user?.accessToken) return;
            try {
                dispatch(setCartLoading(true));
                const cartData = await fetchHandler({
                    //   session.user.accessToken
                    endpoint: `${CART_DETAILS.endpoint}`,
                    method: CART_DETAILS.method as methods,
                    token: session?.user?.accessToken,
                })

                dispatch(setCart({ total: cartData.total, data: cartData.data }));
            } catch (error) {
                console.error("Cart fetch error:", error);
            } finally {
                dispatch(setCartLoading(false));
            }
        };

        if (status === "authenticated") {
            loadCart();
        }
    }, [session, status, dispatch]);
};
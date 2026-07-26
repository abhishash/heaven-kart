import { InvoiceData, InvoiceResponse } from "@/components/orders/types";
import { RECENTLY_VIEW, RECENTLY_VIEW_PRODUCT } from "@/lib/constants";
import { RecentlyViewedProduct, RecentlyViewedResponse } from "@/types/product";
import { Order, OrderDetailsResponse } from "@/types/service/order.types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const APIENDPOINT = process.env.API_ENDPOINT;

export const ordersApi = createApi({
    reducerPath: "ordersApi",

    baseQuery: fetchBaseQuery({
        baseUrl: APIENDPOINT,
        prepareHeaders: async (headers) => {
            const session = await getSession();
            const token = session?.user?.accessToken;

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            headers.set("Content-Type", "application/json");
            return headers;
        },
    }),

    tagTypes: ["recently_view"],

    endpoints: (builder) => ({

        // GET PRODUCTS
        getOrdersDetails: builder.query<Order, number>({
            query: (orderId) => ({
                url: `orders/details/${orderId}`,
                method: "GET",
            }),
            transformResponse: (response: OrderDetailsResponse) => response.data,
        }),

        // GET PRODUCTS
        getInvoiceDetails: builder.query<InvoiceData, number>({
            query: (orderId) => ({
                url: `orders/${orderId}/invoice`,
                method: "GET",
            }),
            transformResponse: (response: InvoiceResponse) => response.data,
        }),


    }),
});


export const {
    useGetOrdersDetailsQuery,
    useGetInvoiceDetailsQuery
} = ordersApi;
import { InvoiceData, InvoiceResponse } from "@/components/orders/types";
import { baseQuery } from "@/lib/api/baseQuery";
import { Order, OrderDetailsResponse } from "@/types/service/order.types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const APIENDPOINT = process.env.API_ENDPOINT;

export const ordersApi = createApi({
    reducerPath: "ordersApi",

    baseQuery,

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
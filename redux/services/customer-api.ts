import { InvoiceData, InvoiceResponse } from "@/components/orders/types";
import { FaqItems, FaqResponseTypes, User, UserResponse } from "@/types/service/customer.types";
import { Order, OrderDetailsResponse } from "@/types/service/order.types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const APIENDPOINT = process.env.API_ENDPOINT;

export const customerApi = createApi({
    reducerPath: "customerApi",

    baseQuery: fetchBaseQuery({
        baseUrl: APIENDPOINT,
        prepareHeaders: async (headers) => {
            const session = await getSession();
            const token = session?.user?.accessToken;

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),

    tagTypes: ["recently_view"],

    endpoints: (builder) => ({

        // GET Customer Profile
        getCustomerProfile: builder.query<User, void>({
            query: (orderId) => ({
                url: `user-profile`,
                method: "GET",
            }),
            transformResponse: (response: UserResponse) => response.user,
        }),

        // GET FAQ
        getFAQs: builder.query<FaqItems[], void>({
            query: () => ({
                url: `faq`,
                method: "GET",
            }),
            transformResponse: (response: FaqResponseTypes) => response.data,
        }),

        // GET FAQ
        updateProfile: builder.mutation<any, FormData>({
            query: (body) => ({
                url: `edit-profile`,
                method: "POST",
                body
            }),
        }),
    }),
});


export const {
    useGetCustomerProfileQuery,
    useGetFAQsQuery,
    useUpdateProfileMutation
} = customerApi;
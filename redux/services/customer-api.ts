import { FaqItems, FaqResponseTypes, User, UserResponse } from "@/types/service/customer.types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/lib/api/baseQuery";

export const customerApi = createApi({
    reducerPath: "customerApi",

    baseQuery,

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
import { RECENTLY_VIEW, RECENTLY_VIEW_PRODUCT } from "@/lib/constants";
import { RecentlyViewedProduct, RecentlyViewedResponse } from "@/types/product";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const APIENDPOINT = process.env.API_ENDPOINT;

export const recentlyViewApi = createApi({
  reducerPath: "recentlyViewApi",

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
    getRecentProducts: builder.query<RecentlyViewedProduct[], void>({
      query: () => ({
        url: RECENTLY_VIEW.endpoint,
        method: RECENTLY_VIEW.method,
      }),
      transformResponse: (response: RecentlyViewedResponse) => response.data,
      providesTags: ["recently_view"],
    }),

    saveToRecentlyView: builder.mutation<RecentlyViewedProduct, {
      id: number
    }>({
      query: (data) => ({
        url: RECENTLY_VIEW_PRODUCT.endpoint,
        method: "POST",
        body: {
          product_id : data?.id
        },
      }),

      invalidatesTags: ["recently_view"],
    }),

  }),
});


export const {
  useGetRecentProductsQuery,
  useSaveToRecentlyViewMutation,
} = recentlyViewApi;
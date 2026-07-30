import { RECENTLY_VIEW, RECENTLY_VIEW_PRODUCT } from "@/lib/constants";
import { RecentlyViewedProduct, RecentlyViewedResponse } from "@/types/product";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/lib/api/baseQuery";

export const recentlyViewApi = createApi({
  reducerPath: "recentlyViewApi",

  baseQuery,

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
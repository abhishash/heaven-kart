import { configureStore } from "@reduxjs/toolkit";
import { recentlyViewApi } from "./services/recentlyViewApi";
import cartReducer from "./slices/cartSlice";
import { ordersApi } from "./services/order-api";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        [recentlyViewApi.reducerPath]: recentlyViewApi.reducer,
        [ordersApi.reducerPath]: ordersApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(recentlyViewApi.middleware).concat(ordersApi.middleware)
});


export type RootState =
    ReturnType<typeof store.getState>


export type AppDispatch =
    typeof store.dispatch
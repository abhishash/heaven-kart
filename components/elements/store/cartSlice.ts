import { CartItem, CartState } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const exist = state.cart.find(
        (item) => item.id === action.payload.id
      );

      if (exist) {
        exist.qty += 1;
      } else {
        state.cart.push({ ...action.payload, qty: 1 });
      }
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter(
        (item) => item.id !== action.payload
      );
    },

    updateQty: (
      state,
      action: PayloadAction<{ id: number; qty: number }>
    ) => {
      const { id, qty } = action.payload;
      const item = state.cart.find((i) => i.id === id);
      if (item) item.qty = qty;
    },

    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQty,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
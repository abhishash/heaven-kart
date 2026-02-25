import { CartItem, CartItemPayload, CartState } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CartState = {
  // cart: [],
  items: [],
  totalAmount: 0,
  loading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    addToCart: (state, action: PayloadAction<CartItemPayload>) => {
      const exist = state.items.find(
        (item) => item.cart_id === action.payload.cart_id
      );

      if (exist) {
        exist.qty = parseInt(action.payload.qty) ;
      } else {
        state.items.push({ ...action.payload, qty : parseInt(action.payload.qty)  });
      }

      // 🔥 Recalculate total properly
      state.totalAmount = state.items.reduce(
        (acc, item) => acc + (item.qty),
        0
      );
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      // state.cart = state.cart.filter(
      //   (item) => item.id !== action.payload
      // );
    },

    setCart(state, action: PayloadAction<{ total: number, data: CartItem[] }>) {
      const { total, data } = action.payload;
      state.items = data;
      state.totalAmount = total;
    },

    updateQty: (
      state,
      action: PayloadAction<{ id: number; qty: number }>
    ) => {
      // const { id, qty } = action.payload;
      // const item = state.cart.find((i) => i.id === id);
      // if (item) item.qty = qty;
    },

    clearCart: (state) => {
      // state.cart = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQty,
  clearCart,
  setCart,
  setCartLoading
} = cartSlice.actions;

export default cartSlice.reducer;
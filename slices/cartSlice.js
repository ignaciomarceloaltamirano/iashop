import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const id = action.payload.id;
      const existItem = state.items.find((item) => item.id === id);

      if (!existItem) {
        state.items = [...state.items, { ...action.payload, qty: 1 }];
        toast.success(`${action.payload.title} added to your cart.`);
      }

      if (existItem) {
        toast.success(`${action.payload.title} is already in your cart.`);
        return;
      }
    },
    increaseQty: (state, action) => {
      const itemInCart = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (itemInCart) {
        itemInCart.qty++;
      } else {
        state.items.push(action.payload);
      }
    },
    decreaseQty: (state, action) => {
      const itemInCart = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (itemInCart) {
        itemInCart.qty--;
        if (itemInCart.qty < 1) {
          state.items = state.items.filter((item) => item.id !== itemInCart.id);
          toast.error(`${itemInCart.title} removed from your cart.`);
        }
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      const itemInCart = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (itemInCart) {
        state.items = state.items.filter((item) => item.id !== itemInCart.id);
        toast.error(`${itemInCart.title} removed from your cart.`);
      }
    },
    reset(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  addToCart,
  decreaseQty,
  increaseQty,
  removeFromCart,
  reset,
} = cartSlice.actions;

export const selectItems = (state) => state.cart.items;
export const selectTotal = (state) =>
  state.cart.items.reduce(
    (amount, current) => amount + current.price * current.qty,
    0
  );

export default cartSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartItems: [],
  isLoading: false,
};

export const addToCartItem = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }) => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/carts/add`,
      {
        userId,
        productId,
        quantity,
      }
    );
    return data;
  }
);

export const getAllCart = createAsyncThunk(
  "cart/getAllCart",
  async (userId) => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/carts/get/${userId}`
    );
    return data;
  }
);

export const editCart = createAsyncThunk(
  "cart/editCart",
  async ({ userId, productId, quantity }) => {
    const { data } = await axios.put(
      `${import.meta.env.VITE_BASE_URL}/carts/update-cart`,
      {
        userId,
        productId,
        quantity,
      }
    );
    return data;
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ userId, productId }) => {
    const { data } = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/carts/${userId}/${productId}`
    );
    return data;
  }
);

const shopCartSlice = createSlice({
  name: "shopCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(addToCartItem.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(getAllCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(getAllCart.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(editCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(editCart.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(deleteCartItem.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      });
  },
});

export default shopCartSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  orders: [],
  orderDetails: null,
};

export const getAllOrdersByAdmin = createAsyncThunk(
  "/admin/orders",
  async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/stripe/admin/orders`
    );
    return data;
  }
);

export const getOrderDetailsForAdmin = createAsyncThunk(
  "/order/getOrderDetailsForAdmin",
  async (id) => {
    const {data} = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/stripe/admin/details/${id}`
    );

    return data;
  }
);

export const updateOrderStatus = createAsyncThunk(
  "/order/updateOrderStatus",
  async ({ id, orderStatus }) => {
    const { data } = await axios.put(
      `${import.meta.env.VITE_BASE_URL}/stripe/admin/update/${id}`,
      {
        orderStatus,
      }
    );

    return data;
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrderSlice",
  initialState,
  reducers: {
    resetOrders: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrdersByAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersByAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.data;
      })
      .addCase(getAllOrdersByAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orders = [];
      })
      .addCase(getOrderDetailsForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetailsForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const { resetOrders } = adminOrderSlice.actions;

export default adminOrderSlice.reducer;

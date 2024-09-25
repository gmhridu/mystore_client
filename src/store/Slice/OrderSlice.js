import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  order: null,
  orderId: null,
  sessionId: null,
  error: null,
  paymentDetails: null,
};

export const makePaymentFromStripe = createAsyncThunk(
  "/stripe/makePayment",
  async ({ cartItems, userId, totalAmount, address, cartId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/stripe/create-order`,
        { cartItems, userId, totalAmount, address, cartId }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const capturePayment = createAsyncThunk(
  "/stripe/capturePayment",
  async ({ paymentId, orderId }, { rejectWithValue }) => { 
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/stripe/capture`,
        { paymentId, orderId }
      );
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  })

export const getAllPaymentDetails = createAsyncThunk(
  "get/paymentDetails",
  async ({userId}) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/stripe/list/${userId}`
      );
      return data.data; 
    } catch (error) {
      throw error;
    }
  }
);

export const getOrderDetails = createAsyncThunk("/order/getOrderDetails", async (id) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/stripe/details/${id}`
  );
  return data;
});



const shippingOrderSlice = createSlice({
  name: "shippingOrders",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.order = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(makePaymentFromStripe.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(makePaymentFromStripe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sessionId = action.payload.id;
        state.orderId = action.payload.orderId;
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(action.payload.orderId)
        );
      })
      .addCase(makePaymentFromStripe.rejected, (state, action) => {
        state.isLoading = false;
        state.sessionId = null;
        state.orderId = null;
        state.error = action.payload;
      })
      .addCase(getAllPaymentDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPaymentDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.paymentDetails = action.payload;
      })
      .addCase(getAllPaymentDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload.data;
        state.error = null;
      }).addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.order = null;
        state.error = action.payload;
      });
  },
});

export const { resetOrderDetails } = shippingOrderSlice.actions;

export default shippingOrderSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  reviews: [],
};

export const addNewReview = createAsyncThunk(
  "/order/reviews",
  async (reviewsData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/reviews/add-review`,
        reviewsData
      );
      return data;
    } catch (error) {
      console.error("API error response:", error.response);
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);


export const getProductReviews = createAsyncThunk(
  "/order/reviews",
  async (productId, { rejectWithValue }) => {
     try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/reviews/get/${productId}`,
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
;
    }
  });

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProductReviews.pending, (state) => {
      state.isLoading = true;
    }).addCase(getProductReviews.fulfilled, (state, action) => {
      state.isLoading = false;
      state.reviews = action.payload.reviews;
    }).addCase(getProductReviews.rejected, (state) => {
      state.isLoading = false;
      state.reviews = [];
    });
  },
});

export default reviewSlice.reducer;

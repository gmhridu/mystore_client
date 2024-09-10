import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

export const addNewProducts = createAsyncThunk(
  "/products/addNewProducts",
  async (formData) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/products/add`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getProducts = createAsyncThunk('/products/getProducts', async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/products/get`
  );
  return data;
});

export const updateProduct = createAsyncThunk('/products/updateProduct', async ({id, formData}) => { 
  const { data } = await axios.put(
    `${import.meta.env.VITE_BASE_URL}/products/edit/${id}`, formData
  );
  return data;
})

export const deleteProduct = createAsyncThunk('/products/deleteProduct', async (productId) => { 
  const { data } = await axios.delete(
    `${import.meta.env.VITE_BASE_URL}/products/delete/${productId}`
  );
  return data;
})

const adminProductSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default adminProductSlice.reducer;

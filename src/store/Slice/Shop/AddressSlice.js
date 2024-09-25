import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  addressList: [],
};

export const addNewAddress = createAsyncThunk(
  "/addAddress/addNewAddress",
  async (formData) => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/address/add`,
      formData
    );
    return data ;
  }
);

export const fetchAddressList = createAsyncThunk(
  "/address/fetchAddressList",
  async (userId) => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/address/get/${userId}`
    );
    return data;
  }
);

export const editAddress = createAsyncThunk(
  "/address/editAddress",
  async ({userId, addressId, formData}) => {
    const { data } = await axios.put(
      `${import.meta.env.VITE_BASE_URL}/address/update/${userId}/${addressId}`,
      formData
    );
    return data;
  }
);

export const deleteAddress = createAsyncThunk(
  "/address/deleteAddress",
  async ({userId, addressId}) => {
    const { data } = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/address/delete/${userId}/${addressId}`
    );
    return data;
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewAddress.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addNewAddress.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAddressList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAddressList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(fetchAddressList.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      });
  },
});

export default addressSlice.reducer;

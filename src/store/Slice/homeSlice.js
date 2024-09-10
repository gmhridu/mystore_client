import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  filter: {
    category: [],
    brand: [],
    color: [],
    price: [0, 2000],
  },
  searchText: "",
  sort: "",
  currentPage: 1,
  itemsPerPage: 6,
  products: [],
  totalProducts: 0,
  isLoading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "home/fetchProducts",
  async (_, { getState }) => {
    const { home } = getState();
    const { currentPage, itemsPerPage, filter, sort, searchText } = home;

    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/products/filters?page=${currentPage}&size=${itemsPerPage}&filter=${encodeURIComponent(
        JSON.stringify(filter)
      )}&sort=${sort}&search=${encodeURIComponent(searchText)}`
    );

    return data;
  }
);

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setFilter(state, action) {
      state.filter = { ...state.filter, ...action.payload };
    },
    setSearchText(state, action) {
      state.searchText = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    resetFilters(state) {
      state.filter = initialState.filter;
      state.searchText = "";
      state.sort = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products;
        state.totalProducts = action.payload.totalProducts;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setFilter,
  setSearchText,
  setSort,
  setCurrentPage,
  resetFilters,
} = homeSlice.actions;

export default homeSlice.reducer;

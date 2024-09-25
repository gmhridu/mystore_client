import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  searchResults : [],
}

export const getSearchResult = createAsyncThunk('/search/result', async (keyword) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/search/${keyword}`
  );
  return data;
})

const searchSlice = createSlice({
  name: 'searchSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSearchResult.pending, (state) => {
      state.isLoading = true;
    }).addCase(getSearchResult.fulfilled, (state, action) => {
      state.isLoading = false;
      state.searchResults = action.payload.data;
    }).addCase(getSearchResult.rejected, (state) => {
      state.isLoading = false;
      state.searchResults = [];
    })
  }
});

export default searchSlice.reducer;
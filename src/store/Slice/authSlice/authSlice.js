import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  accessToken: null,
};

export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData) => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/auth/register`,
      formData,
      {
        withCredentials: true,
      }
    );
    return data;
  }
);

export const loginUser = createAsyncThunk('/auth/login', async (formData) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/auth/login`,
    formData,
    {
      withCredentials: true,
    }
  );
  return data;
});

export const refreshToken = createAsyncThunk('/auth/refresh-token', async () => { 
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/auth/refresh-token`,
      {},
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
})

export const googleSingIn = createAsyncThunk(
  "/auth/google",
  async (token, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/google`,
        {
          token,
        }
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const checkAuth = createAsyncThunk('/auth/check-auth', async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/auth/check-auth`, {
    withCredentials: true,
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      Expires: '0',
    }
  }
  );
  return data;
});

export const logoutUser = createAsyncThunk('/auth/logout', async () => {
  const {data} = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/auth/logout`,
    {},
    {
      withCredentials: true,
    }
  );
  return data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
       state.isLoading = false;
       state.isAuthenticated = action.payload.success;
       state.user = action.payload.success ? action.payload.user : null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(googleSingIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(googleSingIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(googleSingIn.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = action.payload.success;
        state.user = action.payload.success ? action.payload.user : null;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      }).addCase(refreshToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.accessToken = action.payload.token;
      }).addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;

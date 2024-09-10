import { configureStore } from "@reduxjs/toolkit";
import adminProductReducer from "./Slice/productSlice";
import homeReducer from "./Slice/homeSlice";
import authReducer from './Slice/authSlice/authSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProduct: adminProductReducer,
    home: homeReducer,
  },
});

export default store;

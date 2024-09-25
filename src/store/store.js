import { configureStore } from "@reduxjs/toolkit";
import adminProductReducer from "./Slice/productSlice";
import homeReducer from "./Slice/homeSlice";
import authReducer from './Slice/authSlice/authSlice'
import shopProductReducer from './Slice/Shop/shopProductSlice';
import shopCartSlice from './Slice/Shop/cartSlice';
import addressSlice from './Slice/Shop/AddressSlice';
import shippingOrderSlice from './Slice/OrderSlice';
import adminOrderSlice from './Slice/AdminOrderSlice';
import shopSearchSlice from './Slice/Shop/SearchSlice'
import reviewSlice from './Slice/Shop/ReviewSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProduct: adminProductReducer,
    shopProducts: shopProductReducer,
    shopCart: shopCartSlice,
    shopAddress: addressSlice,
    home: homeReducer,
    orders: shippingOrderSlice,
    adminOrders: adminOrderSlice,
    shopSearch: shopSearchSlice,
    shopReview: reviewSlice,
  },
});

export default store;

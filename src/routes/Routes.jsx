import Main from "@/layouts/Main";
import Login from "@/pages/Authentication/Login";
import Register from "@/pages/Authentication/Register";
import Home from "@/pages/Home/Home";
import { createBrowserRouter } from "react-router-dom";
import AddProduct from "@/components/AddProduct/AddProduct";
import Auth from "@/components/Auth/Auth";
import AdminLayout from "@/components/AdminLayout/AdminLayout";
import AdminDashboard from "@/pages/AdminView/AdminDashboard";
import AdminProducts from "@/pages/AdminView/AdminProducts";
import AdminOrders from "@/pages/AdminView/AdminOrders";
import AdminFeatures from "@/pages/AdminView/AdminFeatures";
import ShoppingLayout from "@/components/ShoppingLayout/ShoppingLayout";
import NotFound from "@/pages/NotFound/NotFound";
import ShoppingHome from "@/pages/ShoppingView/ShoppingHome";
import ShoppingListing from "@/pages/ShoppingView/ShoppingListing";
import Checkout from "@/pages/ShoppingView/Checkout";
import Account from "@/pages/ShoppingView/Account";
import PrivateRoutes from "@/components/Common/PrivateRoutes";
import UnauthPage from "@/pages/UnauthPage/UnauthPage";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: (
      <PrivateRoutes>
        <Main />
      </PrivateRoutes>
    ),
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <PrivateRoutes>
        <AdminLayout />
      </PrivateRoutes>
    ),
    children: [
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "products",
        element: <AdminProducts />,
      },
      {
        path: "orders",
        element: <AdminOrders />,
      },
      {
        path: "features",
        element: <AdminFeatures />,
      },
    ],
  },
  {
    path: "/shop",
    element: (
      <PrivateRoutes>
        <ShoppingLayout />
      </PrivateRoutes>
    ),
    children: [
      {
        path: "home",
        element: <ShoppingHome />,
      },
      {
        path: "listing",
        element: <ShoppingListing />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "account",
        element: <Account />,
      },
    ],
  },
  {
    path: '/unauth-page',
    element: <UnauthPage/>
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;

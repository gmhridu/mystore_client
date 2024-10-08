import Main from "@/layouts/Main";
import Login from "@/pages/Authentication/Login";
import Register from "@/pages/Authentication/Register";
import { createBrowserRouter } from "react-router-dom";
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
import OrderProcessing from "@/components/ShoppingLayout/OrderProcessing";
import PaymentSuccessful from "@/components/ShoppingLayout/PaymentSuccessful";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const RootRedirect = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth/login", { replace: true });
    } else if (user && isAuthenticated) {
      if (user?.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/shop/home", { replace: true });
      }
    }
  }, [isAuthenticated, user, navigate]);

  return null;
};


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootRedirect/>
  },
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
      {
        path: "payment-return",
        element: <OrderProcessing />,
      },
      {
        path: "success",
        element: <PaymentSuccessful />,
      },
    ],
  },
  {
    path: "/unauth-page",
    element: <UnauthPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;

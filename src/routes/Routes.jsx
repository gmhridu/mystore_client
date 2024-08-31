import Main from "@/layouts/Main";
import Login from "@/pages/Authentication/Login";
import Register from "@/pages/Authentication/Register";
import Home from "@/pages/Home/Home";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import AddProduct from "@/components/AddProduct/AddProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoutes>
            <Home />
          </PrivateRoutes>
        ),
      },
      {
        path: "/add-product",
        element: <AddProduct />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default router;

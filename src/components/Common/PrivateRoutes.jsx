import { checkAuth } from "@/store/Slice/authSlice/authSlice";
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Loader from "../shared/Loader/Loader";

const PrivateRoutes = ({ children }) => {
  const location = useLocation();
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <Loader />;

  if (location?.pathname === '/') {
    if (!isAuthenticated) {
      return <Navigate to="/auth/login" />;
    } else {
      if (user?.role === "admin") {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to="/shop/home" />;
      }
    }
  }
  if (
    !isAuthenticated &&
    !location.pathname.includes("/login") &&
    !location.pathname.includes("/register")
  ) {
    return <Navigate to="/auth/login" state={{from: location}}/>;
  }

  if (isAuthenticated) {
    if (
      location.pathname.includes("/login") ||
      location.pathname.includes("/register") || 
      location.pathname === "/"
    ) {
      if (user?.role === "admin") {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to="/shop/home" />;
      }
    }

    if (user?.role !== "admin" && location.pathname.includes("/admin")) {
      return <Navigate to="/unauth-page" />;
    }

    if (user?.role === "admin" && location.pathname.includes("/shop")) {
      return <Navigate to="/admin/dashboard" />;
    }
  }

  return <>{children}</>;
};

export default PrivateRoutes;

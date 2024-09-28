import { checkAuth, logoutUser } from "@/store/Slice/authSlice/authSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../shared/Loader/Loader";
import { useNavigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(checkAuth()).then((data) => {
      if (!data.payload.success) {
        toast.error("Session expired. Please login again.");
        dispatch(logoutUser());
        navigate("/auth/login", { replace: true });
      }
    });
  }, [dispatch, navigate]);

  if (isLoading) return <Loader />;

  if (
    !isAuthenticated &&
    !["/auth/login", "/auth/register"].includes(location.pathname)
  ) {
    return <Navigate to="/auth/login" state={{ from: location }} />;
  }

  if (
    isAuthenticated &&
    ["/auth/login", "/auth/register"].includes(location.pathname)
  ) {
    return user?.role === "admin" ? (
      <Navigate to="/admin/dashboard" />
    ) : (
      <Navigate to="/shop/home" />
    );
  }

  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("/admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("/shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
};

export default PrivateRoutes;

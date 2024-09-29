import { checkAuth } from "@/store/Slice/authSlice/authSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import Loader from "../shared/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { replace } from "react-router-dom";

// private routes

const PrivateRoutes = ({ children }) => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(checkAuth());
    }
  }, [dispatch, isAuthenticated]);

  
  if (isLoading) return <Loader />;

  
  if (!isAuthenticated) {
    if (
      location.pathname.includes("login") ||
      location.pathname.includes("register")
    ) {
      return <>{children}</>; 
    }
    return navigate('/auth/login', {state: {from: location}}, replace);
  }


  if (isAuthenticated) {
    if (
      location.pathname.includes("login") ||
      location.pathname.includes("register")
    ) {
      return user?.role === "admin"
        ? navigate("/admin/dashboard", { state: { from: location } }, replace)
        : navigate("/shop/home", { state: { from: location } }, replace);
    }

    
    if (location.pathname.startsWith("/shop")) {
      return <>{children}</>;
    }

    
    if (user?.role === "admin" && location.pathname.startsWith("/admin")) {
      return <>{children}</>;
    }

    
    if (user?.role === "admin" && location.pathname.startsWith("/shop")) {
      return navigate(
        "/admin/dashboard",
        { state: { from: location } },
        replace
      );
    }

    
    if (user?.role !== "admin" && location.pathname.startsWith("/admin")) {
      return navigate(
        "/unauth/page",
        { state: { from: location } },
        replace
      );
    }
  }

  return <>{children}</>; 
};

export default PrivateRoutes;

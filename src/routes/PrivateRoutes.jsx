import useAuth from "@/components/hooks/useAuth";
import Loader from "@/components/shared/Loader/Loader";
import React from "react";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const PrivateRoutes = ({children}) => {
    const {user, loading} = useAuth();

    const location = useLocation();

    if(loading) return <Loader/>;
    if(user)return children;
  return <Navigate to={'/login'} state={location.pathname} replace={true}/>
};

export default PrivateRoutes;

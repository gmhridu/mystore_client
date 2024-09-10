import Auth from "@/components/Auth/Auth";
import Footer from "@/components/shared/Footer/Footer";
import Navbar from "@/components/shared/Navbar/Navbar";
import React from "react";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Auth/>
    </div>
  );
};

export default Main;

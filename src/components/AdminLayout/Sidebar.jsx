import { ChartNoAxesCombined } from "lucide-react";
import React from "react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import AdminMenuItems from "./AdminMenuItems";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <Fragment>
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex text-xl items-center gap-2 cursor-pointer"
        >
          <ChartNoAxesCombined size={30} />
          <h1 className="text-2xl font-extrabold">Admin Panel</h1>
        </div>
        <AdminMenuItems />
      </aside>
    </Fragment>
  );
};

export default Sidebar;

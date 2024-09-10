import { ShoppingBasket } from "lucide-react";
import { BadgeCheck } from "lucide-react";
import { LayoutDashboard } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icons: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icons: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icons: <BadgeCheck />,
  },
];

const AdminMenuItems = ({ toggleSideBar }) => {
  return (
    <nav className="-mt-[32rem] lg:mt-8 flex-col flex gap-2">
      {adminSidebarMenuItems?.map((menuItem) => (
        <NavLink
          to={menuItem?.path}
          key={menuItem?.id}
          className={({ isActive }) =>
            `flex items-center gap-2 rounded-md px-3 py-2 hover:bg-muted text-foreground ${isActive ? "bg-muted border text-muted-foreground" : ""}`
          }
          onClick={toggleSideBar}
        >
          {menuItem?.icons}
          <span>{menuItem?.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default AdminMenuItems;

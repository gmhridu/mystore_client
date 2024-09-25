import React from "react";
import { useLocation, NavLink } from "react-router-dom";

const ShoppingViewMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "men",
    label: "Men",
    path: "/shop/listing?Category=men",
  },
  {
    id: "women",
    label: "Women",
    path: "/shop/listing?Category=women",
  },
  {
    id: "kids",
    label: "Kids",
    path: "/shop/listing?Category=kids",
  },
  {
    id: "accessories",
    label: "Accessories",
    path: "/shop/listing?Category=accessories",
  },
  {
    id: "footwear",
    label: "Footwear",
    path: "/shop/listing?Category=footwear",
  },
];

const ShoppingMenuItems = ({ toggleSideBar }) => {
  const location = useLocation();

  const isActive = (path) => {
    const params = new URLSearchParams(location.search);
    const category = params.get("Category");

    const pathCategory = path.split("Category=")[1];

    return category?.toLowerCase() === pathCategory?.toLowerCase();
  };

  return (
    <nav className="flex flex-col mb-3 mt-8 lg:mb-0 lg:mt-0 lg:items-center gap-6 lg:flex-row">
      {ShoppingViewMenuItems?.map((menuItem) => (
        <NavLink
          to={menuItem?.path}
          key={menuItem?.id}
          className={({ isActive: isNavLinkActive }) =>
            `flex items-center gap-2 rounded-md px-3 py-2 hover:bg-muted text-foreground ${
              isActive(menuItem?.path)
                ? "bg-muted border text-muted-foreground"
                : ""
            }`
          }
          onClick={toggleSideBar}
        >
          {menuItem?.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default ShoppingMenuItems;

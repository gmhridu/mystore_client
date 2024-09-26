import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const ShoppingViewMenuItems = [
  { id: "home", label: "Home", path: "/shop/home" },
  { id: "men", label: "Men" },
  { id: "women", label: "Women" },
  { id: "kids", label: "Kids" },
  { id: "accessories", label: "Accessories" },
  { id: "footwear", label: "Footwear" },
];

const useActivePath = (location) => {
  const params = new URLSearchParams(location.search);
  return params.get("Category")?.toLowerCase() || "home";
};

const ShoppingMenuItems = ({ toggleSideBar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentCategory = useActivePath(location);

  const handleNavigation = (category) => {
    const path =
      category === "home" ? "/shop/home" : `/shop/listing?Category=${category}`;
    navigate(path);
    toggleSideBar();
  };

  return (
    <nav className="flex flex-col mb-3 mt-8 lg:mb-0 lg:mt-0 lg:items-center gap-6 lg:flex-row">
      {ShoppingViewMenuItems.map(({ id, label }) => (
        <Button
          key={id}
          variant="ghost"
          className={`flex items-center gap-2 rounded-md px-3 py-2 hover:bg-muted text-foreground  ${
            currentCategory === id
              ? "bg-muted border text-muted-foreground"
              : ""
          }`}
          onClick={() => handleNavigation(id === "home" ? null : id)}
          type="button"
        >
          {label}
        </Button>
      ))}
    </nav>
  );
};

export default ShoppingMenuItems;

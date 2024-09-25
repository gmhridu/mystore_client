import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSelector } from "react-redux";
import { UserCog } from "lucide-react";
import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/Slice/authSlice/authSlice";
import toast from "react-hot-toast";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import CartWrapper from "./CartWrapper";
import { useEffect } from "react";
import { getAllCart } from "@/store/Slice/Shop/cartSlice";
import { Badge } from "../ui/badge";
import { useState } from "react";

const HeaderRightContent = ({ toggleSideBar }) => {
  const [openSheet, setOpenSheet] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const dispatch = useDispatch();

  const handleToggleSheet = () => {
    setOpenSheet(!openSheet);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success("Logged out successfully");
  };

  useEffect(() => {
    dispatch(getAllCart(user?.id));
  }, [dispatch]);

  const getName = () => {
    const name = user?.userName;
    if (name) {
      const nameParts = name.split(" ");
      const firstInitial = nameParts[0][0].toUpperCase();
      const lastInitial = nameParts[1] ? nameParts[1][0].toUpperCase() : "";
      return `${firstInitial}${lastInitial ? ` ${lastInitial}.` : ""}`;
    }
    return "UN";
  };

  const totalQuantity = cartItems?.items?.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetTrigger asChild>
          <div className="relative flex">
            <Button variant="outline" size="icon" className="hidden lg:block">
              <ShoppingCart className="w-6 h-6 inline-flex items-center justify-center" />
              <span className="sr-only">User Cart</span>
            </Button>
            {totalQuantity >= 0 && (
              <Badge className="absolute -top-2 -right-2 bg-red-500 rounded-full text-white p-1 font-semibold text-xs w-5 h-5 inline-flex items-center justify-center">
                {totalQuantity}
              </Badge>
            )}
          </div>
        </SheetTrigger>
        <CartWrapper
          cartItems={cartItems}
          handleToggleSheet={handleToggleSheet}
        />
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black cursor-pointer" title={user?.userName}>
            {/* <AvatarImage src="https://github.com/shadcn.png" alt="avatar" /> */}
            <AvatarFallback className="bg-black text-white font-extrabold">
              {getName()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel className="text-center">
            {user?.userName}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup className="cursor-pointer">
            <Link to={"/shop/account"} onClick={toggleSideBar}>
              <DropdownMenuItem className="cursor-pointer">
                <UserCog className="mr-2 h-4 w-4" />
                <span>Account</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                handleLogout();
                toggleSheet();
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default HeaderRightContent;

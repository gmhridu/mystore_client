import { HousePlug } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import ShoppingMenuItems from "./ShoppingMenuItems";
import HeaderRightContent from "./HeaderRightContent";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

const ShoppingHeader = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const toggleSheet = () => setIsSheetOpen(!isSheetOpen);
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to={"/shop/home"} className="flex items-center gap-2">
          <HousePlug className="h-6 w-6" />
          <span className="text-xl font-bold">E-Commerce</span>
        </Link>
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <div className="flex gap-x-2 lg:hidden">
            
            <Button variant="outline" size="icon">
              <ShoppingCart className="w-6 h-6" />
              <span className="sr-only">User Cart</span>
            </Button>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle header menu</span>
              </Button>
            </SheetTrigger>
          </div>
          <SheetContent side="left" className="w-full max-w-xs">
            <ShoppingMenuItems toggleSideBar={toggleSheet}/>
            <HeaderRightContent toggleSideBar={toggleSheet} />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <ShoppingMenuItems />
        </div>
        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
};

export default ShoppingHeader;

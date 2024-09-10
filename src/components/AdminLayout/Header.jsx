import React from "react";
import { Button } from "../ui/button";
import { AlignJustify } from "lucide-react";
import { LogOut } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { ChartNoAxesCombined } from "lucide-react";
import AdminMenuItems from "./AdminMenuItems";

const Header = () => {
  const [openSideBar, setOpenSideBar] = React.useState(false);
  const toggleSideBar = () => setOpenSideBar(!openSideBar);
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Sheet open={openSideBar} onOpenChange={setOpenSideBar}>
        <SheetTrigger asChild>
          <Button className="lg:hidden sm:block">
            <AlignJustify />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mb-3 mt-4">
                <ChartNoAxesCombined size={30} />
                <h1 className="text-2xl font-extrabold">Admin Panel</h1>
              </SheetTitle>
            </SheetHeader>
          </div>
          <AdminMenuItems toggleSideBar={toggleSideBar} />
        </SheetContent>
      </Sheet>

      <div className="flex flex-1 justify-end">
        <Button className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow">
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
};

export default Header;

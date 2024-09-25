import React from "react";
import accImg from "../../assets/account.jpg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ShopOrders from "./ShopOrders";
import ShopAddress from "./ShopAddress";

const Account = () => {
  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={accImg}
          alt="account image"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
        <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
          <Tabs defaultValue="orders">
            <TabsList className="flex items-center justify-center mx-auto w-[40%]">
              <TabsTrigger value="orders" className="w-56">
                Orders
              </TabsTrigger>
              <TabsTrigger value="address" className="w-56">
                Address
              </TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <ShopOrders/>
            </TabsContent>
            <TabsContent value="address">
              <ShopAddress/>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Account;

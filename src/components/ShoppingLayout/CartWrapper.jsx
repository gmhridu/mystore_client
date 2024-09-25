import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import CartContent from "./CartContent";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const CartWrapper = ({ cartItems, handleToggleSheet }) => {

  
  const totalCartAmount =
    cartItems && cartItems?.items?.length > 0
      ? cartItems?.items?.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <SheetContent className="sm:max-w-md overflow-auto">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cartItems && cartItems?.items?.length > 0
          ? cartItems?.items?.map((item) => <CartContent key={item?._id} item={item} />)
          : null}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-semibold">Total</span>
          <span className="font-semibold">${totalCartAmount}</span>
        </div>
      </div>
      <Link to={"/shop/checkout"} onClick={handleToggleSheet}>
        <Button className="w-full mt-6">Checkout</Button>
      </Link>
    </SheetContent>
  );
};

export default CartWrapper;

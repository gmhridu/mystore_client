import React, { useEffect, useState } from "react";
import accountImg from "../../assets/account.jpg";
import ShopAddress from "./ShopAddress";
import { useSelector, useDispatch } from "react-redux";
import CartContent from "@/components/ShoppingLayout/CartContent";
import { Button } from "@/components/ui/button";
import { loadStripe } from "@stripe/stripe-js";
import {
  getAllPaymentDetails,
  makePaymentFromStripe,
} from "@/store/Slice/OrderSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { sessionId, isLoading, error, paymentDetails } = useSelector(
    (state) => state.orders
  );

  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);

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
  

  const handlePayment = async () => {
    const stripe = await loadStripe(
      import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
    );

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems?.items?.map((item) => ({
        productId: item?.productId,
        title: item?.title,
        imageUrl: item?.imageUrl,
        price: item?.salePrice > 0 ? item?.salePrice : item?.price,
        quantity: item?.quantity,
      })),
      address: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        state: currentSelectedAddress.state,
        zip: currentSelectedAddress?.zip,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "stipe",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
    };

    try {
      const { payload } = await dispatch(
        makePaymentFromStripe(orderData)
      );
      if (payload && payload.id) {
        orderData.sessionId = payload.id;
        const result = await stripe.redirectToCheckout({
          sessionId: payload.id,
        });

        if (result.error) {
          console.error("Error during redirect:", result.error.message);
        }
      } else {
        await dispatch(getAllPaymentDetails({ userId: user?.id }));
        console.error("No sessionId received from the server.");
      }
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  useEffect(() => {
    if (user?._id && !paymentDetails) {
      dispatch(getAllPaymentDetails(user?._id));
    }
  }, [dispatch, user?._id, paymentDetails]);


  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={accountImg}
          alt="Checkout"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <ShopAddress
          showForm={false}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
          selectedId={currentSelectedAddress}
        />
        <div className="flex flex-col gap-4 mt-3">
          {cartItems && cartItems?.items?.length > 0
            ? cartItems?.items?.map((item) => (
                <CartContent key={item._id} item={item} />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">${totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button
              onClick={handlePayment}
              className="w-full"
              disabled={
                !cartItems ||
                cartItems?.items?.length === 0 ||
                !currentSelectedAddress
              }
            >
              {isLoading ? "Processing..." : "Checkout with Stripe"}
            </Button>
          </div>
          {error && <p className="text-red-500">{error.message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Checkout;

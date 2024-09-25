import React, { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import successJson from "../../assets/successfull.json";
import { useSelector, useDispatch } from "react-redux";
import { capturePayment, getAllPaymentDetails } from "@/store/Slice/OrderSlice";
import { getAllCart } from "@/store/Slice/Shop/cartSlice";
import toast from "react-hot-toast";

const PaymentSuccessful = () => {
  const { user } = useSelector((state) => state.auth); 
  const { paymentDetails } = useSelector((state) => state.orders); 
  const dispatch = useDispatch();


  const [isPaymentProcessed, setIsPaymentProcessed] = useState(false);

  const processedPayments = useRef(new Set());

  
  useEffect(() => {
    if (user?.id) {
      dispatch(getAllPaymentDetails({ userId: user.id }));
    }
  }, [dispatch, user?.id]);

 
  useEffect(() => {
    if (isPaymentProcessed || !paymentDetails || !Array.isArray(paymentDetails))
      return;

    const processPayments = async () => {
      for (const item of paymentDetails) {
        const paymentId = item?.paymentDetails?.id;
        const orderId = item?._id;

        if (paymentId && orderId && !processedPayments.current.has(paymentId)) {
          processedPayments.current.add(paymentId);

          try {
            const { payload } = await dispatch(
              capturePayment({ paymentId, orderId })
            );

            
            if (payload?.orderStatus === "confirmed") {
              await dispatch(getAllCart(user?.id));
              setIsPaymentProcessed(true);
              toast.success("Payment Success");
            }
          } catch (error) {
            console.error("Error processing payment:", error);
            toast.error("Payment Error");
          }
        }
      }
    };

    processPayments();
  }, [dispatch, paymentDetails, isPaymentProcessed, user?.id]);

  return (
    <div className="flex flex-col h-[70vh] items-center justify-center">
      <div className="flex items-center text-center">
        <Lottie
          animationData={successJson}
          loop
          autoplay
          style={{ height: "64px", width: "64px" }}
        />
        <h1 className="text-2xl font-semibold text-center">
          Order Placed Successfully!
        </h1>
      </div>

      
      <Link to={"/shop/account"}>
        <Button>Back to Order Page</Button>
      </Link>
    </div>
  );
};

export default PaymentSuccessful;

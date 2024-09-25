import React from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { capturePayment, getAllPaymentDetails } from "@/store/Slice/OrderSlice";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle } from "../ui/card";

const OrderProcessing = () => {
  const { user } = useSelector((state) => state.auth);
  const { paymentDetails } = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (paymentDetails && Array.isArray(paymentDetails)) {
      paymentDetails.forEach((item) => {
        const paymentId = item?.paymentDetails?.id;
        const orderId = item?._id;

        console.log(paymentId, orderId);

        if (paymentId && orderId) {
          dispatch(capturePayment({ paymentId, orderId })).then((data) => {
            if (data?.success) {
              navigate("/shop/success", { replace: true });
            } else {
              navigate("/shop/checkout", { replace: true });
            }
          });
        }
      });
    }
  }, [dispatch, paymentDetails]);

  useEffect(() => {
    if (user?._id && !paymentDetails) {
      dispatch(getAllPaymentDetails(user?._id));
    }
  }, [dispatch, user?._id, paymentDetails]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Payment...Please wait!</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default OrderProcessing;

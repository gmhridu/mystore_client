import ShoppingOrderDetails from "@/components/ShoppingLayout/ShoppingOrderDetails";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllPaymentDetails, getOrderDetails, resetOrderDetails } from "@/store/Slice/OrderSlice";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const ShopOrders = () => {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, paymentDetails, order } = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleOrderDetails = (getId) => {
    dispatch(getOrderDetails(getId));
  }

  const handleDialogChange = () => {
    setOpen(false);
    dispatch(resetOrderDetails());
  }

  useEffect(() => {
    dispatch(getAllPaymentDetails({ userId: user?.id }));
  }, [dispatch]);

  useEffect(() => {
    if (order !== null) setOpen(true);
  }, [order]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span>Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paymentDetails && paymentDetails?.length > 0
              ? paymentDetails?.map((item) => (
                  <TableRow key={item?._id}>
                    <TableCell>{item?._id}</TableCell>
                    <TableCell>{item?.createdAt.split("T")[0]}</TableCell>
                    <TableCell>
                      <Badge
                        className={`px-2 py-1 ${item?.orderStatus === "confirmed" ? "bg-green-700 text-white" : item?.item === "rejected" ? "bg-red-600 text-white" : item?.orderStatus === "processing" ? "bg-yellow-800 text-white" : ""} `}
                      >
                        {item?.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>${item?.totalAmount}</TableCell>
                    <TableCell>
                      <Dialog open={open} onOpenChange={handleDialogChange}>
                        <DialogTrigger asChild>
                          <Button onClick={() => handleOrderDetails(item?._id)}>
                            View Details
                          </Button>
                        </DialogTrigger>
                        <ShoppingOrderDetails orderDetails={order} />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ShopOrders;

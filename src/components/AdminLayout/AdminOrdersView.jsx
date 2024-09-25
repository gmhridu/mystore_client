import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { useState } from "react";
import AdminOrderDetails from "./AdminOrderDetails";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllOrdersByAdmin, getOrderDetailsForAdmin, resetOrders } from "@/store/Slice/AdminOrderSlice";
import { Badge } from "../ui/badge";

const AdminOrdersView = () => {
  const [open, setOpen] = useState(false);
  const { orders, orderDetails } = useSelector((state) => state.adminOrders);
  const dispatch = useDispatch();

 const handleDialogChange = () => {
   setOpen(false);
   dispatch(resetOrders());
 };

    const handleOrderDetails = (getId) => {
      dispatch(getOrderDetailsForAdmin(getId));
    };

  useEffect(() => {
    dispatch(getAllOrdersByAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) setOpen(true);
  }, [orderDetails]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
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
            {orders && orders?.length > 0
              ? orders?.map((item) => (
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
                        <AdminOrderDetails orderDetails={orderDetails} />
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

export default AdminOrdersView;

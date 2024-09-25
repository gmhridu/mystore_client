import React from "react";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { adminOrderDetailsSelect } from "../Common/config/config";
import AdminOrderUpdate from "../Common/AdminOrderUpdate/AdminOrderUpdate";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../ui/table";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllOrdersByAdmin, getOrderDetailsForAdmin, updateOrderStatus } from "@/store/Slice/AdminOrderSlice";
import toast from "react-hot-toast";

const AdminOrderDetails = ({ orderDetails }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onSubmit = async(data) => {
    const status = data.orderStatus;

    await dispatch(updateOrderStatus({ id: orderDetails?._id, orderStatus: status }))
      .then((data) => {
        if (data?.payload?.success) {
          toast.success('Updated Successfully');
          dispatch(getOrderDetailsForAdmin(orderDetails?._id));
          dispatch(getAllOrdersByAdmin());
        }
    })
  };
  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex items-center justify-between mt-6">
            <p
              className="font-medium
            "
            >
              Order ID
            </p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex items-center justify-between">
            <p
              className="font-medium
            "
            >
              Order Date
            </p>
            <Label>{orderDetails?.createdAt.split("T")[0]}</Label>
          </div>
          <div className="flex items-center justify-between">
            <p
              className="font-medium
            "
            >
              Order Price
            </p>
            <Label>${orderDetails?.totalAmount}</Label>
          </div>
          <div className="flex items-center justify-between">
            <p
              className="font-medium
            "
            >
              Payment Status
            </p>
            <Label>{orderDetails?.paymentDetails?.status}</Label>
          </div>
          <div className="flex items-center justify-between">
            <p
              className="font-medium
            "
            >
              Order Status
            </p>
            <Label>
              <Badge
                className={`px-2 py-1 ${orderDetails?.orderStatus === "confirmed" ? "bg-green-700 text-white" : orderDetails?.orderStatus === "rejected" ? "bg-red-600 text-white" : orderDetails?.orderStatus === "processing" ? "bg-yellow-800 text-white" : ""} `}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-2">
          <div className="font-medium">
            Order Details
            <Separator className="my-2" />
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderDetails?.cartItems &&
                  orderDetails?.cartItems?.length > 0
                    ? orderDetails.cartItems?.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item?.title}</TableCell>
                          <TableCell>{item?.quantity}</TableCell>
                          <TableCell>${item?.price}</TableCell>
                        </TableRow>
                      ))
                    : null}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell>Total Amount</TableCell>
                    <TableCell></TableCell>
                    <TableCell>$ {orderDetails?.totalAmount}</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </Card>
            <Separator className="my-2" />
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">
              Shipping Info
              <Separator className="my-2" />
              <div className="grid gap-0.5 text-muted-foreground">
                <div className="flex items-center gap-x-2">
                  <span>Name:</span>
                  <span>{user?.userName}</span>
                </div>
                <div className="flex items-center gap-x-2">
                  <span>Address:</span>
                  <span>{orderDetails?.address?.address}</span>
                </div>
                <div className="flex items-center gap-x-2">
                  <span>City:</span>
                  <span>{orderDetails?.address?.city}</span>
                </div>
                <div className="flex items-center gap-x-2">
                  <span>Zip:</span>
                  <span>{orderDetails?.address?.zip}</span>
                </div>
                <div className="flex items-center gap-x-2">
                  <span>Phone:</span>
                  <span>{orderDetails?.address?.phone}</span>
                </div>
                <div className="flex items-center gap-x-2">
                  <span>Notes:</span>
                  <span>{orderDetails?.address?.notes}</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <AdminOrderUpdate
              onSubmit={onSubmit}
              orderStatusOptions={adminOrderDetailsSelect}
              buttonText={"Update"}
            />
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default AdminOrderDetails;

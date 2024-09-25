import React, { useEffect } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import Image from "../Image/Image";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import "@smastrom/react-rating/style.css";
import { Rating } from "@smastrom/react-rating";
import { Input } from "../ui/input";
import { setProductDetails } from "@/store/Slice/Shop/shopProductSlice";
import { Badge } from "../ui/badge";
import {
  addNewReview,
  getProductReviews,
} from "@/store/Slice/Shop/ReviewSlice";
import toast from "react-hot-toast";
import { Label } from "../ui/label";
import { useForm } from "react-hook-form";
import { Skeleton } from "../ui/skeleton";

const ProductDetails = ({ open, setOpen, handleAddToCart }) => {
  const { user } = useSelector((state) => state.auth);
  const { productDetails, isLoading } = useSelector(
    (state) => state.shopProducts
  );
  const { reviews } = useSelector((state) => state.shopReview);
  const dispatch = useDispatch();

  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      reviewMessage: "",
      reviewValue: 0,
    },
    mode: "onSubmit",
  });

  const handleDialogClose = () => {
    setOpen(false);
    dispatch(setProductDetails());
  };

  useEffect(() => {
    if (productDetails !== null) {
      setOpen(true);
      dispatch(getProductReviews(productDetails?._id));
    }
  }, [productDetails, dispatch, setOpen]);

  const averageRating = reviews?.length
    ? reviews.reduce((acc, review) => acc + review?.reviewValue, 0) /
      reviews.length
    : 0;

  const onSubmit = async (data) => {
    const reviewData = {
      productId: productDetails?._id,
      userId: user?.id,
      userName: user?.userName,
      reviewMessage: data.reviewMessage,
      reviewValue: data.reviewValue,
    };

    try {
      const result = await dispatch(addNewReview(reviewData));
      if (result?.payload?.success) {
        dispatch(getProductReviews(productDetails?._id));
        toast.success("Review Added Successfully!");
        reset();
      } else {
        toast.error(result?.payload || "Failed to submit review");
        reset();
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Something went wrong");
    }
  };

  if(isLoading) <Skeleton/>

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:p-12 max-w-[24rem] h-[97vh] sm:max-w-[95vw] sm:h-[68vh] lg:max-w-[95vw] lg:h-[65vh] xl:max-w-[50vw]">
        {isLoading ? (
          <Skeleton width={600} height={600} className={"w-full h-full"} />
        ) : (
          <div className="relative overflow-hidden rounded-lg">
            <Image
              src={productDetails?.imageUrl?.split("/").pop().split(".")[0]}
              alt={productDetails?.title}
              width={600}
              height={600}
              className="aspect-square w-full h-full object-cover"
            />
            {productDetails?.totalStock === 0 ? (
              <Badge className="absolute top-2 left-2 bg-red-600 hover:bg-red-800 text-white cursor-pointer">
                Out Of Stock
              </Badge>
            ) : productDetails?.totalStock < 10 ? (
              <Badge className="absolute top-2 left-2 bg-red-600 hover:bg-red-800 text-white cursor-pointer">
                {`Only ${productDetails?.totalStock} item left`}
              </Badge>
            ) : productDetails?.salePrice > 0 ? (
              <Badge className="absolute top-2 left-2 bg-red-600 hover:bg-red-800 text-white cursor-pointer">
                Sale
              </Badge>
            ) : null}
          </div>
        )}
        <div className="space-y-3">
          <div>
            <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
            <p className="text-muted-foreground">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`text-xl font-bold text-primary ${productDetails?.salePrice > 0 ? "line-through" : ""}`}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="text-xl font-bold text-muted-foreground">
                ${productDetails?.salePrice}
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-0.5">
            <Rating
              style={{ maxWidth: 100 }}
              value={averageRating || 0}
              readOnly
            />
            <span className="text-muted-foreground">
              ({averageRating?.toFixed(1) || 0})
            </span>
          </div>
          <div className="mt-3">
            {productDetails?.totalStock === 0 ? (
              <Button
                className="w-full disabled:opacity-50 cursor-not-allowed"
                disabled
              >
                Out of Stock
              </Button>
            ) : (
              <Button
                onClick={() =>
                  handleAddToCart(
                    productDetails?._id,
                    productDetails?.totalStock
                  )
                }
                className="w-full"
              >
                Add to cart
              </Button>
            )}
          </div>
          <Separator />
          <div className="overflow-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid gap-6">
              {reviews?.map((review) => (
                <div key={review?._id} className="flex gap-4">
                  <Avatar>
                    <AvatarFallback>
                      {review?.userName
                        ? review?.userName.substring(0, 2).toUpperCase()
                        : "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <div className="flex items-center gap-1">
                      <h3 className="font-semibold text-base">
                        {review?.userName}
                      </h3>
                    </div>
                    <div>
                      <Rating
                        style={{ maxWidth: 100 }}
                        value={review?.reviewValue}
                        readOnly
                      />
                    </div>
                    <p className="text-muted-foreground">
                      {review?.reviewMessage}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {/* Post review */}
            <div className="mt-6 mx-1 mb-1">
              <form onSubmit={handleSubmit(onSubmit)}>
                <Label className="text-base font-semibold">
                  Rate Our Product
                </Label>
                <div className="flex flex-col gap-2">
                  <Rating
                    style={{ maxWidth: 120 }}
                    value={watch("reviewValue")}
                    onChange={(value) => setValue("reviewValue", Number(value))}
                  />
                  <Input
                    placeholder="Drop a comment here"
                    {...register("reviewMessage", { required: true })}
                  />
                  <Button type="submit">Submit</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetails;

import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { useInView } from "react-intersection-observer";
import Loader from "../shared/Loader/Loader";
import Image from "../Image/Image";
import { useSelector } from "react-redux";

const ProductCard = ({ product, isLoading, handleEditProduct, onDelete }) => {
  const { user } = useSelector((state) => state.auth);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  if (isLoading) return <Loader />;
  return (
    <Card key={product?._id} className="w-full max-w-sm mx-auto">
      <CardHeader>
        <div ref={ref}>
          {inView ? (
            <Image
              src={product?.imageUrl?.split("/").pop().split(".")[0]}
              alt={product?.title}
              width={256}
              height={208}
              className="w-full h-full object-cover rounded-sm"
            />
          ) : (
            <div className="w-64 h-52 bg-gray-200 rounded-sm" />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="font-semibold text-nowrap line-clamp-1">
          {product?.title}
        </h3>
        <div className="flex justify-between items-center mb-2">
          <span
            className={`${product?.salePrice > 0 ? "line-through" : ""} text-lg font-semibold text-primary`}
          >
            ${product?.price}
          </span>
          <span className="text-lg font-bold">${product?.salePrice}</span>
        </div>
      </CardContent>
      <CardFooter>
        {user?.role === "admin" ? (
          <>
            <Button
              className="w-full bg-muted border text-muted-foreground hover:text-white"
              onClick={() => handleEditProduct(product)}
            >
              Edit
            </Button>
            <Button
              className="w-full ml-2 text-white bg-red-600"
              onClick={() => onDelete(product?._id)}
            >
              Delete
            </Button>
          </>
        ) : (
          <Button className="w-full">View Details</Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

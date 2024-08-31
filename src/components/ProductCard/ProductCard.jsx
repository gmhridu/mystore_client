import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { useInView } from "react-intersection-observer";
import Loader from "../shared/Loader/Loader";
import Image from "../Image/Image";

const ProductCard = ({ product, isLoading }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  console.log(product?.productImage);

  if (isLoading) return <Loader />;
  return (
    <Card key={product?._id}>
      <CardHeader>
        <div ref={ref}>
          {inView ? (
            <Image
              src={product?.productImage?.split("/").pop().split(".")[0]}
              alt={product?.productName}
              width={256}
              height={208}
              className="w-64 h-52 object-cover rounded-sm"
            />
          ) : (
            <div className="w-64 h-52 bg-gray-200 rounded-sm" />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="font-semibold text-nowrap line-clamp-1">
          {product?.productName}
        </h3>
        <p>
          <span className="text-sm text-gray-600">
            Price: ${product?.price}
          </span>
        </p>
        <div className="py-2">
          <Button className="w-full">View Details</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;

import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import LazyLoad from "react-lazy-load";
import { useInView } from "react-intersection-observer";
import Loader from "../shared/Loader/Loader";

const ProductCard = ({ product, isLoading }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  if(isLoading) return <Loader/>
  return (
    <Card key={product?._id}>
      <CardHeader>
        <div ref={ref}>
          {inView ? (
            <img
              src={product?.productImage}
              alt={product?.productName}
              className="w-68 h-52 object-cover rounded-sm"
            />
          ) : (
            <div className="w-68 h-52 bg-gray-200 rounded-sm" />
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

import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Image from "../Image/Image";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "../Common/config/config";
import Loader from "../shared/Loader/Loader";

const ShoppingProductTile = ({
  product,
  isLoading,
  handleGetProductDetails,
  handleAddToCart,
}) => {
  if (isLoading) return <Loader />;
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div onClick={() => handleGetProductDetails(product?._id)}>
        <CardHeader>
          <div className="relative">
            <Image
              src={product?.imageUrl?.split("/").pop().split(".")[0]}
              alt={product?.title}
              width={256}
              height={208}
              className="w-full h-full object-cover rounded-sm cursor-pointer"
            />
            {product?.totalStock === 0 ? (
              <Badge className="absolute top-2 left-2 bg-red-600 hover:bg-red-800 text-white cursor-pointer">
                Out Of Stock
              </Badge>
            ) : product?.totalStock < 10 ? (
              <Badge className="absolute top-2 left-2 bg-red-600 hover:bg-red-800 text-white cursor-pointer">
                {`Only ${product?.totalStock} item left`}
              </Badge>
            ) : product?.salePrice > 0 ? (
              <Badge className="absolute top-2 left-2 bg-red-600 hover:bg-red-800 text-white cursor-pointer">
                Sale
              </Badge>
            ) : null}
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2 line-clamp-1">
            {product?.title}
          </h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-sm text-muted-foreground">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${product?.salePrice > 0 ? "line-through" : ""} text-lg font-semibold text-primary`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-semibold text-primary">
                ${product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>
      <CardFooter>
        {product?.totalStock === 0 ? (
          <Button
            className="w-full disabled:opacity-50 cursor-not-allowed"
            disabled
          >
            Out of Stock
          </Button>
        ) : (
          <Button
            className="w-full"
            onClick={() => handleAddToCart(product?._id, product?.totalStock)}
          >
            Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ShoppingProductTile;

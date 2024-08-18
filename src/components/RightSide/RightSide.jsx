import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";

const RightSide = ({ products }) => {
  console.table(products);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-3 gap-3">
      {products?.map((product) => (
        <Card key={product?._id}>
          <CardHeader>
            <img
              src={product?.productImage}
              alt={product?.productName}
              className="w-68 h-52 object-cover rounded-sm"
            />
          </CardHeader>
          <CardContent>
            <h3 className="font-semibold text-nowrap line-clamp-1">{product?.productName}</h3>
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
      ))}
    </div>
  );
};

export default RightSide;

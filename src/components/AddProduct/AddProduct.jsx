import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ImageUpload from "../Image/ImageUpload";
import toast from "react-hot-toast";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useDispatch } from "react-redux";
// import { addNewProduct } from "@/store/Slice/productSlice";

const productSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Description is required"),
  price: z
    .string()
    .min(1, "Price is required")
    .transform((value) => parseFloat(value))
    .refine((value) => !isNaN(value) && value > 0, {
      message: "Price must be a valid number greater than zero",
    }),
  category: z.string().min(1, "Category is required"),
  brandName: z.string().min(1, "Brand name is required"),
  color: z.string().min(1, "Color is required"),
  productImage: z.string().min(1, "Image is required"),
});

const AddProduct = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: zodResolver(productSchema),
  });

 const onSubmit = async (data) => {
   try {
     const formattedData = {
       ...data,
       price: parseFloat(data.price),
     };

     const result = await dispatch(addNewProduct(formattedData));

     if (addNewProduct.fulfilled.match(result)) {
       toast("Product added successfully!");
       reset();
     } else {
       toast("Failed to add the product. Please try again.");
     }
   } catch (error) {
     console.error("Error adding product:", error);
     toast("An error occurred while adding the product. Please try again.");
   }
 };

  const handleImageUpload = (imageUrl) => {
    setValue("productImage", imageUrl);
  };

  return (
    <div className="flex flex-col items-center justify-center my-10 md:h-[70vh]">
      <Card>
        <CardHeader>Add Product</CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label>Product Name</Label>
              <Input
                placeholder="Enter product name"
                {...register("productName")}
              />
              {errors.productName && <p>{errors.productName.message}</p>}
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                placeholder="Enter product description"
                {...register("description")}
              />
              {errors.description && <p>{errors.description.message}</p>}
            </div>
            <div>
              <Label>Price</Label>
              <Input
                placeholder="Enter product price"
                type="number"
                step="0.01"
                {...register("price")}
              />
              {errors.price && <p>{errors.price.message}</p>}
            </div>
            <div>
              <Label>Category</Label>
              <Input
                placeholder="Enter product category"
                {...register("category")}
              />
              {errors.category && <p>{errors.category.message}</p>}
            </div>
            <div>
              <Label>Brand Name</Label>
              <Input
                placeholder="Enter brand name"
                {...register("brandName")}
              />
              {errors.brandName && <p>{errors.brandName.message}</p>}
            </div>
            <div>
              <Label>Color</Label>
              <Input placeholder="Enter product color" {...register("color")} />
              {errors.color && <p>{errors.color.message}</p>}
            </div>

            <ImageUpload onImageUpload={handleImageUpload} />
            {errors.productImage && <p>{errors.productImage.message}</p>}

            <Button type="submit" className="w-full">
              Add Product
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProduct;

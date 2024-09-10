import AdminProductTile from "@/components/AdminLayout/AdminProductTile";
import ProductImageUpload from "@/components/AdminLayout/ProductImageUpload";
import CommonForm from "@/components/Common/CommonForm/CommonForm";
import { addProductFormElements } from "@/components/Common/config/config";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  addNewProducts,
  deleteProduct,
  getProducts,
  updateProduct,
} from "@/store/Slice/productSlice";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";

const AdminProducts = () => {
  const [openSheet, setOpenSheet] = useState(false);
  const formInstance = useForm({
    mode: "onChange",
  });
  const { isValid } = formInstance.formState;
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const { productList } = useSelector((state) => state.adminProduct);
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const onSubmit = async (data) => {
    if (!uploadedImageUrl && !editMode) {
      toast.error("Image upload is required");
      return;
    }

    const formData = {
      ...data,
      imageUrl: uploadedImageUrl || data.imageUrl,
    };

    try {
      let result;
      if (editMode) {
        result = await dispatch(
          updateProduct({ id: currentProduct?._id, formData })
        ).unwrap();
      } else {
        result = await dispatch(addNewProducts(formData)).unwrap();
      }

      if (editMode) {
        if (result?.success) {
          toast.success("Product updated successfully!");
        } else {
          toast.error("Failed to update product");
        }
      } else {
        if (result && result?._id) {
          toast.success("Product added successfully!");
        } else {
          toast.error("Failed to add product");
        }
      }
      setOpenSheet(false);
      formInstance.reset();
      setImageFile(null);
      setImageLoadingState(false);
      setEditMode(false);
      setCurrentProduct(null);
      dispatch(getProducts());
    } catch (error) {
      console.error("Error:", error);
      toast.error(editMode ? "Error updating product" : "Error adding product");
    }
  };

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleOpenSheet = (openState) => {
    setOpenSheet(openState);
    if (!openState) {
      setImageFile(null);
      setUploadedImageUrl("");
      setImageLoadingState(false);
      setEditMode(false);
      formInstance.reset();
      setCurrentProduct(null);
    }
  };

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setEditMode(true);
    setUploadedImageUrl(product?.imageUrl);
    formInstance.reset(product);
    setOpenSheet(true);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const result = await dispatch(deleteProduct(productId)).unwrap();
      if (result?.success) {
        toast.success("Product deleted successfully!");
        dispatch(getProducts());
      } else {
        toast.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error deleting product");
    }
  };
  return (
    <>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenSheet(true)}>Add New Product</Button>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((product) => (
              <AdminProductTile
                key={product?._id}
                product={product}
                handleEditProduct={handleEditProduct}
                onDelete={handleDeleteProduct}
              />
            ))
          : null}
        <Sheet open={openSheet} onOpenChange={handleOpenSheet}>
          <SheetContent side="right" className="overflow-auto">
            <SheetHeader>
              <SheetTitle>
                {editMode ? "Edit Product" : "Add New Product"}
              </SheetTitle>
              <Separator />
            </SheetHeader>
            <ProductImageUpload
              imageFile={imageFile}
              setImageFile={setImageFile}
              uploadedImageUrl={uploadedImageUrl}
              setUploadedImageUrl={setUploadedImageUrl}
              imageLoadingState={imageLoadingState}
              setImageLoadingState={setImageLoadingState}
              editMode={editMode}
            />
            <div className="py-6">
              <CommonForm
                fields={addProductFormElements(formInstance.control)}
                onSubmit={onSubmit}
                showPasswordToggle={false}
                buttonText={editMode ? "Update Product" : "Add Product"}
                defaultValues={editMode ? currentProduct : undefined}
                isValid={isValid}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default AdminProducts;

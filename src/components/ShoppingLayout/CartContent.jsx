import { deleteCartItem, editCart, getAllCart } from "@/store/Slice/Shop/cartSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Image from "../Image/Image";
import { Button } from "../ui/button";
import { Minus } from "lucide-react";
import { Plus } from "lucide-react";
import { X } from "lucide-react";

const CartContent = ({ item }) => {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { productList: products } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();

  const handleUpdateQuantity = (cartItem, typeOfAction) => {
    if (!cartItems?.items?.length || !products?.length) {
      toast.error("Cart items or products data is missing");
      return;
    }

    let updatedQuantity = cartItem?.quantity;

    if (typeOfAction === "plus") {
      const currentCartItem = cartItems?.items?.find(
        (item) => item?.productId === cartItem?.productId
      );
      const currentProduct = products?.find(
        (product) => product?._id === cartItem?.productId
      );

      if (currentCartItem && currentProduct) {
        const availableStock = currentProduct?.totalStock;

        if (updatedQuantity + 1 > availableStock) {
          toast.error("You can't add more than available stock");
          return;
        }
      }

      updatedQuantity++;
    } else if (typeOfAction === "minus") {
      updatedQuantity--;
    }

    if (updatedQuantity > 0) {
      dispatch(
        editCart({
          userId: user?.id,
          productId: cartItem?.productId,
          quantity: updatedQuantity,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          toast.success("Quantity updated in cart");
        } else {
          toast.error("Failed to update quantity");
        }
      });
    }
  };


  const handleRemoveItem = (productId) => {
    dispatch(deleteCartItem({ userId: user?.id, productId })).then((data) => {
      if (data?.payload?.success) {
        toast.success("Item removed from cart");
        dispatch(getAllCart(user?.id));
      } else {
        toast.error("Failed to remove item");
      }
    });
  };

  return (
    <div className="flex items-center space-x-4 border p-1 rounded-md relative">
      <Image
        src={item?.imageUrl?.split("/").pop().split(".")[0]}
        alt={item?.title}
        height={200}
        width={200}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-semibold">{item?.title}</h3>
        <div className="flex items-center mt-1 gap-x-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full w-7 h-7"
            disabled={item?.quantity === 1}
            onClick={() => handleUpdateQuantity(item, "minus")}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="w-10 h-8 text-center border inline-flex items-center justify-center rounded-md">
            {item?.quantity}
          </span>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full w-7 h-7"
            onClick={() => handleUpdateQuantity(item, "plus")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end pr-1">
        <p className="font-medium">
          $
          {(
            (item?.salePrice > 0 ? item?.salePrice : item?.price) *
            item?.quantity
          ).toFixed(2)}
        </p>
        <Button
          onClick={() => handleRemoveItem(item?.productId)}
          className="cursor-pointer mt-1 text-white absolute -right-2 -top-4 rounded-full border bg-red-600 p-1 hover:bg-red-800 w-7 h-7"
          size="icon"
        >
          <X size={25} />
        </Button>
      </div>
    </div>
  );
};

export default CartContent;

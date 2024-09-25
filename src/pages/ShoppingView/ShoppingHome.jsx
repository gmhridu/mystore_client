import React from "react";
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
import { Button } from "@/components/ui/button";
import { ChevronsLeft } from "lucide-react";
import { ChevronsRight } from "lucide-react";
import { ShirtIcon } from "lucide-react";
import { CloudLightning } from "lucide-react";
import { BabyIcon } from "lucide-react";
import { WatchIcon } from "lucide-react";
import { UmbrellaIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getProductDetails,
  getShopProducts,
} from "@/store/Slice/Shop/shopProductSlice";
import { useSelector } from "react-redux";
import ShoppingProductTile from "@/components/ShoppingLayout/ShoppingProductTile";
import { addToCartItem, getAllCart } from "@/store/Slice/Shop/cartSlice";
import { Codepen } from "lucide-react";
import { Shirt } from "lucide-react";
import { WashingMachine } from "lucide-react";
import { ShoppingBasket } from "lucide-react";
import { Images } from "lucide-react";
import { Heater } from "lucide-react";
import { Airplay } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import ProductDetails from "@/components/ShoppingLayout/ProductDetails";
import Loader from "@/components/shared/Loader/Loader";

const categories = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
];

const brands = [
  { id: "nike", label: "Nike", icon: Shirt },
  { id: "adidas", label: "Adidas", icon: WashingMachine },
  { id: "puma", label: "Puma", icon: ShoppingBasket },
  { id: "levi", label: "Levi's", icon: Airplay },
  { id: "zara", label: "Zara", icon: Images },
  { id: "h&m", label: "H&M", icon: Heater },
];

const ShoppingHome = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList: products, isLoading } = useSelector((state) => state.shopProducts);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const slides = [bannerOne, bannerTwo, bannerThree];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get("Category");
  const selectedBrand = queryParams.get("Brand");

  useEffect(() => {
    const filterParams = {
      ...(selectedCategory && { Category: selectedCategory }),
      ...(selectedBrand && { Brand: selectedBrand }),
    };
    dispatch(getShopProducts({ filterParams, sortParams: "price-lowtohigh" }));
  }, [selectedCategory, selectedBrand, dispatch]);

  const handleNavigate = (getCurrentItem, section) => {
    sessionStorage.removeItem("filters");
    const currentFilters = JSON.parse(sessionStorage.getItem("filters")) || {};
    currentFilters[section] = [getCurrentItem.id];
    sessionStorage.setItem("filters", JSON.stringify(currentFilters));

    const params = new URLSearchParams(location.search);
    params.set(section, getCurrentItem.id);
    navigate(`/shop/listing?${params.toString()}`);
  };  

  //get product details
  const handleGetProductDetails = async (productId) => {
    await dispatch(getProductDetails(productId));
  };

  // Add to cart
  const handleAddToCart = async (productId, getTotalStock) => {
    let getCartItems = cartItems?.items || [];

    if (getCartItems?.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === productId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;

        if (getQuantity + 1 > getTotalStock) {
          toast.error("You can't add more than available stock");
          return;
        }
      }
    }
    await dispatch(
      addToCartItem({ userId: user?.id, productId: productId, quantity: 1 })
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success("Product is added to cart");
        dispatch(getAllCart(user?.id));
      }
    });
  };

  if (isLoading) <Loader />;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden]">
        {slides?.map((slide, index) => (
          <img
            src={slide}
            alt={index}
            key={index}
            className={`${index === currentSlide ? "opacity-100" : "opacity-0"} absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
          />
        ))}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/80 text-white rounded-full w-12 h-12"
        >
          <ChevronsLeft className="w-5 h-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/80 text-white rounded-full w-12 h-12"
        >
          <ChevronsRight className="w-5 h-5" />
        </Button>
      </div>
      {/* categories */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories?.map((item) => (
              <Card
                onClick={() => handleNavigate(item, "Category")}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <item.icon
                    className="w-12
                    h-12 mb-4 text-primary"
                  />
                  <span className="font-bold">{item?.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* brands */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brands?.map((item) => (
              <Card
                onClick={() => handleNavigate(item, "Brand")}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <item.icon
                    className="w-12
                    h-12 mb-4 text-primary"
                  />
                  <span className="font-bold">{item?.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 ">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products && products.length > 0
              ? products?.map((product) => (
                  <ShoppingProductTile
                    product={product}
                    isLoading={isLoading}
                    handleGetProductDetails={handleGetProductDetails}
                    handleAddToCart={handleAddToCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>
      <ProductDetails
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        handleAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default ShoppingHome;

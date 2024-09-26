import { sortOptions } from "@/components/Common/config/config";
import ProductFilter from "@/components/ShoppingLayout/ProductFilter";
import ShoppingProductTile from "@/components/ShoppingLayout/ShoppingProductTile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  getProductDetails,
  getShopProducts,
} from "@/store/Slice/Shop/shopProductSlice";
import { ArrowUpDownIcon } from "lucide-react";
import React, { useEffect, useState, useMemo } from "react";
import { debounce } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Loader from "@/components/shared/Loader/Loader";
import ProductDetails from "@/components/ShoppingLayout/ProductDetails";
import { addToCartItem, getAllCart } from "@/store/Slice/Shop/cartSlice";
import toast from "react-hot-toast";
import notFound from "../../assets/empty.webp";
import { Link } from "react-router-dom";
import { useTransition } from "react";

const createSearchParamsHelper = (filterParams, sort) => {
  const queryParams = Object.entries(filterParams)
    .filter(([, value]) => Array.isArray(value) && value.length > 0)
    .map(([key, value]) => `${key}=${encodeURIComponent(value.join(","))}`);

  if (sort) queryParams.push(`sortBy=${encodeURIComponent(sort)}`);

  return queryParams.join("&");
};

const ShoppingListing = () => {
  const [sort, setSort] = useState("price-lowtohigh");
  const [filter, setFilter] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFiltersLoaded, setIsFiltersLoaded] = useState(false);
  const dispatch = useDispatch();
  const { productList: products, isLoading } = useSelector(
    (state) => state.shopProducts
  );
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [loading, setLoading] = useState(false);
  const productCount = useMemo(() => products?.length || 0, [products]);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Add to cart
  const handleAddToCart = async (productId, getTotalStock) => {
    let getCartItems = cartItems?.items || [];

    if (getCartItems?.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === productId
      );
      if(indexOfCurrentItem > -1){
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

  // sort
  const handleSort = debounce((value) => {
    setSort(value);
    sessionStorage.setItem("sort", value);

    const queryString = createSearchParamsHelper(filter, value);
    setSearchParams(new URLSearchParams(queryString));
  }, 300);

  // filters
  const handleFilter = debounce((sectionId, optionId) => {
  
      setFilter((prev) => {
        const updatedFilter = { ...prev };
        if (!updatedFilter[sectionId]) updatedFilter[sectionId] = [optionId];
        else {
          const idx = updatedFilter[sectionId].indexOf(optionId);
          if (idx > -1) updatedFilter[sectionId].splice(idx, 1);
          else updatedFilter[sectionId].push(optionId);
        }
        if (updatedFilter[sectionId].length === 0)
          delete updatedFilter[sectionId];
  
        sessionStorage.setItem("filters", JSON.stringify(updatedFilter));
        const queryString = createSearchParamsHelper(updatedFilter, sort);
        setSearchParams(new URLSearchParams(queryString));
        return updatedFilter;
      });
  }, 300);

  // reset filters
  const resetFilters = () => {
    setFilter({});
    sessionStorage.removeItem("filters");
    setSearchParams({});
    dispatch(
      getShopProducts({ filterParams: {}, sortParams: "price-lowtohigh" })
    );
  };

  // get product details
  const handleGetProductDetails = async (productId) => {
    await dispatch(getProductDetails(productId));
  };

  useEffect(() => {
    const storedFilters = JSON.parse(sessionStorage.getItem("filters")) || {};
    const storedSort = sessionStorage.getItem("sort") || "price-lowtohigh";

    const queryCategory = searchParams.get("Category");
    const queryBrand = searchParams.get("Brand");
    const querySortBy = searchParams.get("sortBy");

    const initialFilter = { ...storedFilters };
    if (queryCategory) initialFilter.Category = queryCategory.split(",");
    if (queryBrand) initialFilter.Brand = queryBrand.split(",");

    const initialSort = querySortBy || storedSort;

    setFilter(initialFilter);
    setSort(initialSort);

    setIsFiltersLoaded(true);
  }, [searchParams]);

  useEffect(() => {
    if (isFiltersLoaded) {
      setLoading(true);
      dispatch(
        getShopProducts({ filterParams: filter, sortParams: sort })
      ).then(() => {
        setLoading(false);
      });
    }
  }, [dispatch, filter, sort, searchParams, isFiltersLoaded]);

  if (loading) return <Loader />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter
        filter={filter}
        handleFilter={handleFilter}
        onReset={resetFilters}
        isLoading={isLoading}
      />
      <div className="w-full bg-background rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              {productCount} products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions?.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
            {products && products.length > 0
              ? products?.map((product) => (
                  <ShoppingProductTile
                    key={product?._id}
                    product={product}
                    handleGetProductDetails={handleGetProductDetails}
                    handleAddToCart={handleAddToCart}
                    isLoading={isLoading}
                  />
                ))
              : null}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[80%] mx-auto space-y-3">
            <div className="flex flex-col items-center justify-center">
                <img className="w-32 h-full" src={notFound} alt="Empty Product"/>
            </div>
            <div className="flex flex-col items-center justify-center space-y-3">
              <h2>No Result found!!!</h2>
              <Link to={"/shop/home"}>
                <Button>Go Back To HomePage</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
      <ProductDetails
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        handleAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default ShoppingListing;

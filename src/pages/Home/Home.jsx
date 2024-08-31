import useAuth from "@/components/hooks/useAuth";
import useAxiosCommon from "@/components/hooks/useAxiosCommon/useAxiosCommon";
import LeftSide from "@/components/LeftSide/LeftSide";
import RightSide from "@/components/RightSide/RightSide";
import { Input } from "@/components/ui/input";
import { Heart, ShoppingCart, Search, Menu } from "lucide-react";
import React, { useState, useEffect, useCallback } from "react";
import { useQuery } from "react-query";

const Home = () => {
  const axiosCommon = useAxiosCommon();
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState({
    category: [],
    brand: [],
    color: [],
    price: [0, 2000],
  });
  const [searchText, setSearchText] = useState("");

  const itemsPerPage = 6;

  // Debounce function using setTimeout
  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearchText(value);
    }, 500),
    []
  );

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handlePaginationButton = (value) => {
    setCurrentPage(value);
  };

  const handleFilterChange = (filterType, newValue) => {
    setFilter((prev) => ({
      ...prev,
      [filterType]: newValue,
    }));
  };

  const handleReset = () => {
    setFilter({ category: [], brand: [], color: [], price: [0, 2000] });
    setSort("");
    setSearchText("");
  };

  const fetchProducts = async () => {
    const { data } = await axiosCommon(
      `/products?page=${currentPage}&size=${itemsPerPage}&filter=${encodeURIComponent(
        JSON.stringify(filter)
      )}&sort=${sort}&search=${searchText}`
    );
    return data;
  };

  const { data, isLoading, isFetched, isSuccess, isError, isFetching } =
    useQuery(
      ["products", currentPage, filter, sort, searchText],
      fetchProducts,
      {
        keepPreviousData: true,
        staleTime: 0,
        cacheTime: 5 * 60 * 1000,
      }
    );

  const products = data?.products || [];
  const count = data?.totalProducts || 0;
  const numberOfPages = Math.ceil(count / itemsPerPage);

  return (
    <div className="my-6">
      <div className="bg-[#F5F5F3] py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between px-6 gap-4">
          <div className="flex gap-x-2 items-center leading-tight">
            <Menu />
            <h2 className="text-sm">Shop by Category</h2>
          </div>
          {/* Search */}
          <div className="flex-grow items-center relative md:px-4">
            <Input
              type="search"
              placeholder="Search your products here"
              className="outline-none border-none"
              value={searchText}
              onChange={handleSearchTextChange}
            />
            <Search
              className="absolute md:right-8 right-2 top-2"
              onClick={() => setSearchText(searchText)}
            />
          </div>
          {/* Icons */}
          <div className="flex items-center gap-2">
            <Heart />
            <ShoppingCart />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row container justify-between gap-x-6 my-6">
        <LeftSide
          products={products}
          onFilterChange={handleFilterChange}
          filters={filter}
          onReset={handleReset}
        />

        <RightSide
          className="flex-1"
          products={products}
          isLoading={isLoading}
          isSuccess={isSuccess}
          isFetched={isFetched}
          isFetching={isFetching}
          onPageChange={handlePaginationButton}
          currentPage={currentPage}
          pageSize={itemsPerPage}
          totalPages={numberOfPages}
        />
      </div>
    </div>
  );
};

export default Home;

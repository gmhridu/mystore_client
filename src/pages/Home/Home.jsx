import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  resetFilters,
  setCurrentPage,
  setFilter,
  setSearchText,
} from "@/store/Slice/homeSlice";
import LeftSide from "@/components/LeftSide/LeftSide";
import RightSide from "@/components/RightSide/RightSide";
import { Input } from "@/components/ui/input";
import { Search, Menu } from "lucide-react";

const Home = () => {
  const dispatch = useDispatch();
  const {
    products,
    totalProducts,
    currentPage,
    itemsPerPage,
    isLoading,
    filter,
    sort,
    searchText,
  } = useSelector((state) => state.home);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, currentPage, itemsPerPage, filter, sort, searchText]);

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedSearch = useCallback(
    debounce((value) => {
      dispatch(setSearchText(value));
    }, 500),
    [dispatch]
  );

  const handleSearchTextChange = (e) => {
    debouncedSearch(e.target.value);
  };

  const handlePaginationButton = (value) => {
    dispatch(setCurrentPage(value));
  };

  const handleFilterChange = (filterType, newValue) => {
    dispatch(setFilter({ [filterType]: newValue }));
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

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
            <Search className="absolute md:right-8 right-2 top-2" />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row container justify-between gap-x-6 my-6">
        <LeftSide
          onFilterChange={handleFilterChange}
          filters={filter}
          onReset={handleReset}
        />
        <RightSide
          className="flex-1"
          products={products}
          isLoading={isLoading}
          currentPage={currentPage}
          onPageChange={handlePaginationButton}
          pageSize={itemsPerPage}
          totalPages={Math.ceil(totalProducts / itemsPerPage)}
        />
      </div>
    </div>
  );
};

export default Home;

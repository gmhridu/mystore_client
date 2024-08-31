import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "../ui/pagination";
import Loader from "../shared/Loader/Loader";
import useAuth from "../hooks/useAuth";
import { Skeleton } from "../ui/skeleton";

const RightSide = ({
  className,
  products,
  onPageChange,
  currentPage,
  totalPages,
  isLoading,
}) => {
  const { loading } = useAuth();
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );
  if (isLoading || loading) return <Loader />;

  return (
    <div className={className}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.length === 0 ? (
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ) : (
          products.map((product) => (
            <ProductCard
              isLoading={isLoading}
              key={product._id}
              product={product}
            />
          ))
        )}
      </div>

      <Pagination className="my-3">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-black cursor-pointer"
              }`}
            />
          </PaginationItem>

          {pageNumbers.map((page) => (
            <PaginationItem className="cursor-pointer" key={page}>
              <PaginationLink
                onClick={() => handlePageChange(page)}
                className={`${
                  page === currentPage ? "bg-black text-white" : ""
                } px-4 py-2 rounded-md`}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {totalPages > 5 && currentPage < totalPages - 2 && (
            <PaginationItem className="cursor-pointer">
              <PaginationEllipsis />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-black cursor-pointer"
              }`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default RightSide;

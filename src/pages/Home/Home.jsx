import useAxiosCommon from "@/components/hooks/useAxiosCommon/useAxiosCommon";
import LeftSide from "@/components/LeftSide/LeftSide";
import RightSide from "@/components/RightSide/RightSide";
import { Input } from "@/components/ui/input";
import { Heart } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { Search } from "lucide-react";
import { Menu } from "lucide-react";
import React from "react";
import { useQuery } from "react-query";

const Home = () => {
    const axiosCommon = useAxiosCommon();

    const {data:products =[], isLoading} = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const {data} = await axiosCommon.get('/products');
            return data;
        }
    });

    // console.table(products);

  return (
    <div className="my-6">
      <div className="bg-[#F5F5F3] py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between px-6 gap-4">
        <div className="flex gap-x-2 items-center leading-tight">
        <Menu /> 
        <h2 className="text-sm">Shop by Category</h2>
        </div> 
        {/* search */}
        <div className="flex-grow items-center relative md:px-4">
        <Input type="search" placeholder="Search your products here" className="outline-none border-none"/>
        <Search className="absolute md:right-8 right-2 top-2"/>
        </div>
        {/* icons */}
        <div className="flex items-center gap-2">
        <Heart />
        <ShoppingCart />
        </div>
        </div>
      </div>

      <div className="flex container justify-between gap-x-6 my-6">
        <LeftSide products={products}/>
        <RightSide className="flex-1" products={products}/>
      </div>
    </div>
  );
};

export default Home;

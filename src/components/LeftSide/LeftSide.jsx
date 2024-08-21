import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Checkbox } from "../ui/checkbox";
import { Slider } from "../ui/slider";
import { Button } from "../ui/button";
import { useSearchParams } from "react-router-dom";

import useAxiosCommon from "../hooks/useAxiosCommon/useAxiosCommon";
import { useQuery } from "react-query";

const LeftSide = ({ onFilterChange, filters, onReset }) => {
  const [priceRange, setPriceRange] = useState(filters.price || [0, 2000]);
  const axiosCommon = useAxiosCommon();
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: categoryData } = useQuery({
    queryKey: "category",
    queryFn: async () => {
      try {
        const { data } = await axiosCommon.get(
          "/categories"
        );
        return data;
      } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
      }
    },
  });

  const { data: brandData } = useQuery({
    queryKey: "brand",
    queryFn: async () => {
      try {
        const { data } = await axiosCommon.get("/brands");
        return data;
      } catch (error) {
        console.error("Error fetching brands:", error);
        return [];
      }
    },
  });

  const { data: colorData } = useQuery({
    queryKey: "color",
    queryFn: async () => {
      try {
        const { data } = await axiosCommon.get("/colors");
        return data;
      } catch (error) {
        console.error("Error fetching colors:", error);
        return [];
      }
    },
  });

  const uniqueCategories = categoryData?.map((item) => item.name) || [];
  const uniqueBrands = brandData?.map((item) => item.name) || [];
  const uniqueColors = colorData?.map((item) => item.name) || [];

  useEffect(() => {
    onFilterChange("price", priceRange);
  }, [priceRange]);

  const handleCategoryChange = (category) => {
    const newCategories = filters.category.includes(category)
      ? filters.category.filter((c) => c !== category)
      : [...filters.category, category];
    onFilterChange("category", newCategories);
    setSearchParams((prevParams) => {
      const params = new URLSearchParams(prevParams);
      params.set("category", JSON.stringify(newCategories));
      return params;
    });
  };

  const handleBrandChange = (brand) => {
    const newBrands = filters.brand.includes(brand)
      ? filters.brand.filter((b) => b !== brand)
      : [...filters.brand, brand];
    onFilterChange("brand", newBrands);
    setSearchParams((prevParams) => {
      const params = new URLSearchParams(prevParams);
      params.set("brand", JSON.stringify(newBrands));
      return params;
    });
  };

  const handleColorChange = (color) => {
    const newColors = filters.color.includes(color)
      ? filters.color.filter((c) => c !== color)
      : [...filters.color, color];
    onFilterChange("color", newColors);
    setSearchParams((prevParams) => {
      const params = new URLSearchParams(prevParams);
      params.set("color", JSON.stringify(newColors));
      return params;
    });
  };

  return (
    <div>
      <h1 className="font-black text-3xl">Products</h1>

      <div className="flex flex-col justify-between gap-6">
        {/* Shop by Category */}
        <Accordion type="single" collapsible className="w-full my-4">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-xl font-bold text-nowrap">
              Shop by Category
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col">
                {uniqueCategories?.map((category) => (
                  <div key={category} className="flex items-center gap-4">
                    <Checkbox
                      id={category}
                      checked={filters.category.includes(category)}
                      onCheckedChange={() => handleCategoryChange(category)}
                    />
                    <label
                      htmlFor={category}
                      className="text-sm font-medium text-nowrap"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        {/* Shop by Brand */}
        <Accordion type="single" collapsible className="w-full my-4">
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-xl font-bold text-nowrap">
              Shop by Brand
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col">
                {uniqueBrands?.map((brand) => (
                  <div key={brand} className="flex items-center gap-4">
                    <Checkbox
                      id={brand}
                      checked={filters.brand.includes(brand)}
                      onCheckedChange={() => handleBrandChange(brand)}
                    />
                    <label
                      htmlFor={brand}
                      className="text-sm font-medium text-nowrap"
                    >
                      {brand}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        {/* Shop by Color */}
        <Accordion type="single" collapsible className="w-full my-4">
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-xl font-bold text-nowrap">
              Shop by Color
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col">
                {uniqueColors?.map((color) => (
                  <div key={color} className="flex items-center gap-4">
                    <Checkbox
                      id={color}
                      checked={filters.color.includes(color)}
                      onCheckedChange={() => handleColorChange(color)}
                    />
                    <label
                      htmlFor={color}
                      className="text-sm font-medium text-nowrap"
                    >
                      {color}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        {/* Shop by Price */}
        <Accordion type="single" collapsible className="w-full my-4">
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-xl font-bold text-nowrap">
              Shop by Price
            </AccordionTrigger>
            <AccordionContent>
              <div className="my-6">
                <Slider
                  className="cursor-pointer"
                  defaultValue={[priceRange[0], priceRange[1]]}
                  max={2000}
                  step={1}
                  value={priceRange}
                  onValueChange={(value) => setPriceRange(value)}
                />
                <div className="flex justify-between items-center gap-4 my-2 mx-2">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Button onClick={onReset}>Reset Filters</Button>
      </div>
    </div>
  );
};

export default LeftSide;

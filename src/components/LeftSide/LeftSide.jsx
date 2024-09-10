import React, { useState, useEffect, useCallback } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Checkbox } from "../ui/checkbox";
import { Slider } from "../ui/slider";
import { Button } from "../ui/button";
import { useQuery } from "react-query";
import axios from "axios";

const LeftSide = ({ onFilterChange, filters, onReset }) => {
  const [priceRange, setPriceRange] = useState(filters.price || [0, 2000]);

  const { data: categoryData = [] } = useQuery("category", async () => {
    const { data } = await axios.get("/categories");
    return data;
  });

  const { data: brandData = [] } = useQuery("brand", async () => {
    const { data } = await axios.get("/brands");
    return data;
  });

  const { data: colorData = [] } = useQuery("color", async () => {
    const { data } = await axios.get("/colors");
    return data;
  });

  const uniqueCategories = categoryData.map((item) => item.name);
  const uniqueBrands = brandData.map((item) => item.name);
  const uniqueColors = colorData.map((item) => item.name);

  const handleCategoryChange = useCallback(
    (category) => {
      const newCategories = filters.category.includes(category)
        ? filters.category.filter((c) => c !== category)
        : [...filters.category, category];
      onFilterChange("category", newCategories);
    },
    [filters.category, onFilterChange]
  );

  const handleBrandChange = useCallback(
    (brand) => {
      const newBrands = filters.brand.includes(brand)
        ? filters.brand.filter((b) => b !== brand)
        : [...filters.brand, brand];
      onFilterChange("brand", newBrands);
    },
    [filters.brand, onFilterChange]
  );

  const handleColorChange = useCallback(
    (color) => {
      const newColors = filters.color.includes(color)
        ? filters.color.filter((c) => c !== color)
        : [...filters.color, color];
      onFilterChange("color", newColors);
    },
    [filters.color, onFilterChange]
  );

  useEffect(() => {
    onFilterChange("price", priceRange);
  }, [priceRange, onFilterChange]);

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
                {uniqueCategories.map((category) => (
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
                {uniqueBrands.map((brand) => (
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
                {uniqueColors.map((color) => (
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
        {/* Price Range */}
        <Accordion type="single" collapsible className="w-full my-4">
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-xl font-bold text-nowrap">
              Price Range
            </AccordionTrigger>
            <AccordionContent>
              <Slider
                min={0}
                max={2000}
                step={10}
                value={priceRange}
                onValueChange={(range) => setPriceRange(range)}
                className="w-full"
              />
              <div className="flex justify-between text-sm font-medium">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        {/* Reset Filters */}
        <Button onClick={onReset} className="mt-4">
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default LeftSide;

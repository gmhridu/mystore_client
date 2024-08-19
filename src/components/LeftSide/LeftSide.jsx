import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";
import { Slider } from "../ui/slider";

const LeftSide = ({ products }) => {
  const [priceRange, setPriceRange] = useState([0, 2000]);

  const uniqueCategories = [
    ...new Set(products?.map((product) => product?.category)),
  ];
  const uniqueBrands = [
    ...new Set(products?.map((product) => product?.brandName)),
  ];
  const uniqueColors = [...new Set(products?.map((product) => product?.color))];



  return (
    <div>
      <h1 className="font-black text-3xl">Products</h1>

      <div className="flex flex-col justify-between gap-6">
        {/* shop by category */}
        <Accordion type="single" collapsible className="w-full my-4">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-xl font-bold text-nowrap">
              Shop by Category
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col">
                {uniqueCategories?.map((category) => (
                  <div className="flex items-center gap-4">
                    <Checkbox key={category} id={category} />
                    <label
                      htmlFor={category}
                      className="text-sm font-medium text-nowrap peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        {/* shop by brand */}
        <Accordion type="single" collapsible className="w-full my-4">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-xl font-bold text-nowrap">
              Shop by Brand
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col">
                {uniqueBrands?.map((brand) => (
                  <div className="flex items-center gap-4">
                    <Checkbox key={brand} id={brand} />
                    <label
                      htmlFor={brand}
                      className="text-sm font-medium text-nowrap peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {brand}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        {/* shop by color */}
        <Accordion type="single" collapsible className="w-full my-4">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-xl font-bold text-nowrap">
              Shop by Color
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col">
                {uniqueColors?.map((color) => (
                  <div className="flex items-center gap-4">
                    <Checkbox key={color} id={color} />
                    <label
                      htmlFor={color}
                      className="text-sm font-medium text-nowrap peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {color}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        {/* shop by price */}
        <Accordion type="single" collapsible className="w-full my-4">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-xl font-bold text-nowrap">
              Shop by Price
            </AccordionTrigger>
            <AccordionContent>
              <div className="px-4 py-2">
                <Slider
                  value={priceRange}
                  onValueChange={(newValue) => setPriceRange(newValue)}
                  min={0}
                  max={2000}
                  step={50}
                />
                <div className="flex justify-between text-sm mt-2">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default LeftSide;

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Checkbox } from "../ui/checkbox";

const LeftSide = () => {
  return (
    <div>
      <h1 className="font-black text-3xl">Products</h1>

      <div className="flex flex-col justify-between gap-6">
      <Accordion type="single" collapsible className="w-full my-4">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-xl font-bold text-nowrap">
            Shop by Category
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Accept terms and conditions
              </label>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible className="w-full my-4">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-xl font-bold text-nowrap">
            Shop by Brand
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Accept terms and conditions
              </label>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible className="w-full my-4">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-xl font-bold text-nowrap">
            Shop by Color
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Accept terms and conditions
              </label>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible className="w-full my-4">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-xl font-bold text-nowrap">
            Shop by Price
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Accept terms and conditions
              </label>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      </div>
    </div>
  );
};

export default LeftSide;

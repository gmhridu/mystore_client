import React from "react";
import { filterOptions } from "../Common/config/config";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

const ProductFilter = ({ filter, handleFilter, onReset, isLoading }) => {
  const handleCheckboxChanged = async(keyItem, optionId) => {
    const isChecked =
      filter && filter[keyItem] && filter[keyItem].includes(optionId);

   await handleFilter(keyItem, optionId, !isChecked, true);
  };
  // ok

  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-bold">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((keyItem, index) => (
          <>
            <div key={index + 1}>
              <h3 className="text-base font-semibold">{keyItem}</h3>
              <div className="grid gap-2 mt-2">
                {filterOptions[keyItem].map((option, subIndex) => (
                  <Label
                    key={`option-${index}-${subIndex}`}
                    className="flex items-center gap-2 font-medium"
                  >
                    <Checkbox
                      checked={
                        filter &&
                        filter[keyItem] &&
                        filter[keyItem].indexOf(option.id) > -1
                      }
                      onCheckedChange={() =>
                        handleCheckboxChanged(keyItem, option?.id)
                      }
                    />

                    {option?.label}
                  </Label>
                ))}
              </div>
            </div>
            <Separator />
          </>
        ))}
        <div>
          <Button onClick={onReset} className="w-full">
            Reset Filter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

const AdminOrderUpdate = ({
  onSubmit,
  orderStatusOptions,
  buttonText,
  defaultValues = {},
}) => {
  const methods = useForm({
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((data) => onSubmit(data, methods.reset))}
      >
        <FormField
          control={methods.control}
          name="orderStatus"
          rules={{ required: "Order status is required" }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <FormItem className="mb-4">
              <FormLabel>Order Status</FormLabel>
              <FormControl>
                <Select onValueChange={onChange} value={value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="cursor-pointer">
                    {orderStatusOptions.map((option) => (
                      <SelectItem
                        className="cursor-pointer"
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              {error && <FormMessage>{error.message}</FormMessage>}
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {buttonText}
        </Button>
      </form>
    </FormProvider>
  );
};

export default AdminOrderUpdate;

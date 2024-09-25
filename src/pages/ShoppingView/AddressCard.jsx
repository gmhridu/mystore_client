import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { Edit2 } from "lucide-react";
import { Trash } from "lucide-react";
import { Ellipsis } from "lucide-react";
import React from "react";

const AddressCard = ({
  addressInfo,
  onEdit,
  onDelete,
  setCurrentSelectedAddress,
  selectedId,
}) => {
  const isSelected = selectedId?._id === addressInfo?._id;
  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`pt-4 cursor-auto ${isSelected ? "border-black border-2" : ""}`}
    >
      <CardContent className={`grid gap-4 relative cursor-pointer`}>
        <Label>Address: {addressInfo?.address}</Label>
        <Label>City: {addressInfo?.city}</Label>
        <Label>Zip: {addressInfo?.zip}</Label>
        <Label>Phone: {addressInfo?.phone}</Label>
        <Label>Notes: {addressInfo?.notes}</Label>
        <div className="absolute right-1 -top-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="rounded-full w-6 h-6"
                size="icon"
                variant="outline"
              >
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Button
                    onClick={() => onEdit(addressInfo)}
                    className="w-full bg-muted border text-muted-foreground space-x-1"
                    variant="primary"
                  >
                    <Edit2 size={15} />
                    <span>Edit</span>
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button
                    onClick={() => onDelete(addressInfo?._id)}
                    className="w-full text-white bg-red-600 space-x-1"
                    variant="danger"
                  >
                    <Trash size={15} />
                    <span>Delete</span>
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddressCard;

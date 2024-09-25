import CommonForm from "@/components/Common/CommonForm/CommonForm";
import { addressFormControls } from "@/components/Common/config/config";
import {
  addNewAddress,
  deleteAddress,
  editAddress,
  fetchAddressList,
} from "@/store/Slice/Shop/AddressSlice";
import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import AddressCard from "./AddressCard";

const ShopAddress = ({
  showForm = true,
  setCurrentSelectedAddress,
  selectedId,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList: addresses } = useSelector((state) => state.shopAddress);

  const formInstance = useForm();
  const [editMode, setEditMode] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);

  const onSubmit = async (data, reset) => {
    if (!addresses || addresses?.length >= 4) {
      toast.error("Maximum number of addresses reached!");
      return;
    }

    const formData = {
      userId: user?.id,
      address: data?.address,
      city: data?.city,
      zip: data?.zip,
      phone: data?.phone,
      notes: data?.notes,
    };

    try {
      let result;
      if (editMode && currentAddress) {
        result = await dispatch(
          editAddress({
            userId: user?.id,
            addressId: currentAddress?._id,
            formData,
          })
        ).unwrap();
      } else {
        result = await dispatch(addNewAddress(formData)).unwrap();
      }

      if (result?.success) {
        dispatch(fetchAddressList(user?.id));
        toast.success(
          editMode
            ? "Address updated successfully!"
            : "Address added successfully!"
        );
        reset();
        setEditMode(false);
        setCurrentAddress(null);
      } else {
        toast.error(
          editMode ? "Failed to update address" : "Failed to add address"
        );
        reset();
      }
    } catch (error) {
      toast.error("Something went wrong, please try again later");
      console.log("error", error);
    }
  };

  const handleEditAddress = (address) => {
    setCurrentAddress(address);
    setEditMode(true);
    formInstance.reset({
      address: address?.address,
      city: address?.city,
      zip: address?.zip,
      phone: address?.phone,
      notes: address?.notes,
    });
  };

  const handleDeleteAddress = async (getCurrentAddress) => {
    await dispatch(
      deleteAddress({ userId: user?.id, addressId: getCurrentAddress })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAddressList(user?.id));
        toast.success("Address deleted successfully!!");
      }
    });
  };

  useEffect(() => {
    dispatch(fetchAddressList(user?.id));
  }, [dispatch]);

  return (
    <div>
      <div className="p-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {addresses && addresses.length > 0
          ? addresses?.map((address) => (
              <AddressCard
                key={address?._id}
                addressInfo={address}
                setCurrentSelectedAddress={setCurrentSelectedAddress}
                selectedId={selectedId}
                onDelete={handleDeleteAddress}
                onEdit={handleEditAddress}
              />
            ))
          : null}
      </div>
      {showForm && (
        <CommonForm
          fields={addressFormControls(formInstance.control)}
          onSubmit={onSubmit}
          title={editMode ? "Edit Address" : "Add New Address"}
          description={"Please fill out your address details"}
          defaultValues={editMode ? currentAddress : ""}
          buttonText={editMode ? "Update Address" : "Submit"}
        />
      )}
    </div>
  );
};

export default ShopAddress;

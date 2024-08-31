import axios from "axios";
import React, { useState } from "react";
import { Input } from "../ui/input";

const ImageUpload = ({ onImageUpload }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "search_filter");
      formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

      try {
        const { data } = await axios.post(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
          formData
        );
        console.log(data);
        onImageUpload(data?.secure_url);
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div className="cursor-pointer">
      <Input type="file" onChange={handleFileChange} className="cursor-pointer"/>
      {uploading && <p>Uploading...</p>}
    </div>
  );
};

export default ImageUpload;

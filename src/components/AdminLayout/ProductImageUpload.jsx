import React, { useRef, useState, useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { UploadCloudIcon } from "lucide-react";
import { FileIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { Progress } from "../ui/progress";
import useAxiosCommon from "../hooks/useAxiosCommon/useAxiosCommon";

const ProductImageUpload = ({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  imageLoadingState,
  setImageLoadingState,
  editMode,
}) => {
  const inputRef = useRef(null);
  const axiosCommon = useAxiosCommon();
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleImageFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) setImageFile(file);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = null;
      setImageFile(null);
      setUploadedImageUrl(null);
    }
  };

  const uploadImageToImageKit = async () => {
    setImageLoadingState(true);
    const form = new FormData();
    form.append("my_file", imageFile);

    try {
      const { data } = await axiosCommon.post(`/products/upload-image`, form, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      });

      if (data?.success) {
        setUploadedImageUrl(data?.result?.url);
      }
    } catch (error) {
      console.error("Image upload failed", error);
    } finally {
      setImageLoadingState(false);
    }
  };

  useEffect(() => {
    if (imageFile !== null) uploadImageToImageKit();
  }, [imageFile]);

  return (
    <div className="w-full max-w-md mx-auto my-2">
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`${editMode ? 'opacity-60' : ''} border-2 border-dashed rounded-md p-4`}
      >
        <Input
          id="image-upload"
          className="hidden"
          type="file"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={editMode}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`${editMode ? 'cursor-not-allowed' : ''} flex flex-col items-center justify-center h-32 cursor-pointer`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload image</span>
          </Label>
        ) : (
          <div className="flex flex-col items-center">
            {imageLoadingState && (
              <div className="w-full mt-4">
                <Progress value={uploadProgress} />
                <p className="text-sm mt-2">{uploadProgress}%</p>
              </div>
            )}
            {!imageLoadingState && (
              <div className="flex items-center justify-between w-full m-auto">
                <div className="flex items-center">
                  <FileIcon className="w-8 text-primary mr-2 h-8" />
                </div>
                <p className="text-sm font-medium">{imageFile?.name}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={handleRemoveImage}
                >
                  <Trash2 />
                  <span className="sr-only">Remove File</span>
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImageUpload;

import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import React from "react";

const Image = ({ src, alt, width, height, ...rest }) => {
  const cloudinary = new Cloudinary({
    cloud: {
      cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
    },
  });

  const image = cloudinary.image(src);

  image.resize(fill().width(width).height(height));
  return <AdvancedImage cldImg={image} alt={alt} {...rest} />;
};

export default Image;

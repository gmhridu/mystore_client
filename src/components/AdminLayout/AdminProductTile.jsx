import React from 'react';
import ProductCard from '../ProductCard/ProductCard';

const AdminProductTile = ({ product, handleEditProduct, onDelete }) => {
  return (
    <ProductCard
      product={product}
      handleEditProduct={handleEditProduct}
      onDelete={onDelete}
    />
  );
};

export default AdminProductTile;
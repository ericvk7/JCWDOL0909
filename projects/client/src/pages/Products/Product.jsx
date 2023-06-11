import React from "react";
import ProductPage from "./ProductCard";

const Products = () => {
  return (
    <div className="grid grid-cols-6 gap-4 bg-sky-800">
      <div className="col-start-2 col-span-4">
        <ProductPage />
      </div>
    </div>
  );
};

export default Products;

import React from "react";
import ProductGeneralInfo from "../seller/products/form-steps/ProductGeneralInfo";
import ProductPricing from "../seller/products/form-steps/ProductPricing";
import ProductInventory from "../seller/products/form-steps/ProductInventory";
import ProductImages from "../seller/products/form-steps/ProductImages";

const ProductFormTabContent = ({
  currentTab,
  form,
  handleChange,
  categories,
  getSubcategories,
  setForm,
  handlePriceChange,
  addPriceSize,
  removePriceSize,
  handleImageUpload,
  handleExtraImageUpload,
  removeExtraImage,
}) => {
  switch (currentTab) {
    case 0:
      return (
        <ProductGeneralInfo
          form={form}
          handleChange={handleChange}
          categories={categories}
          getSubcategories={getSubcategories}
          setForm={setForm}
        />
      );
    case 1:
      return (
        <ProductPricing
          form={form}
          handlePriceChange={handlePriceChange}
          addPriceSize={addPriceSize}
          removePriceSize={removePriceSize}
        />
      );
    case 2:
      return (
        <ProductInventory
          form={form}
          setForm={setForm}
          handleChange={handleChange}
        />
      );
    case 3:
      return (
        <ProductImages
          form={form}
          setForm={setForm}
          handleImageUpload={handleImageUpload}
          handleExtraImageUpload={handleExtraImageUpload}
          removeExtraImage={removeExtraImage}
        />
      );
    default:
      return null;
  }
};

export default ProductFormTabContent;

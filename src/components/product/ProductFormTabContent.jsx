import React from "react";
import { SketchPicker } from "react-color";
import COLOR_NAMES from "@/constants/color";

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
  handleAttributeChange,
  addAttribute,
  removeAttribute,
  handleImageUpload,
  handleExtraImageUpload,
  removeExtraImage,
}) => {
  const handleColorChange = (color) => {
    const colorHex = color.hex.toLowerCase();

    setForm((prevForm) => {
      const colors = prevForm.colors || [];
      const updatedColors = colors.includes(colorHex)
        ? colors
        : [...colors, colorHex];
      return { ...prevForm, colors: updatedColors };
    });
  };

  const handleRemoveColor = (colorHex) => {
    setForm((prevForm) => {
      const updatedColors = prevForm.colors.filter((c) => c !== colorHex);
      return { ...prevForm, colors: updatedColors };
    });
  };

  const renderTabContent = () => {
    switch (currentTab) {
      case 0:
        return (
          <div className="space-y-4">
            <div>
              <label className="block font-medium mb-1 text-gray-700">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                minLength={3}
                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-rose-300 focus:border-rose-200"
                placeholder="Enter the product name (min 3 characters)"
              />
              <p className="text-xs text-gray-500 mt-1">
                This will be displayed as the main product title
              </p>
            </div>

            <div>
              <label className="block font-medium mb-1 text-gray-700">
                Short Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description.short"
                value={form.description.short}
                onChange={handleChange}
                maxLength={255}
                rows={2}
                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-rose-300 focus:border-rose-200"
                placeholder="Brief product summary for search results and cards"
              />
              <p className="text-xs text-gray-500 mt-1">
                Appears in product listings and search results (max 255 chars)
              </p>
            </div>

            <div>
              <label className="block font-medium mb-1 text-gray-700">
                Long Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description.long"
                value={form.description.long}
                onChange={handleChange}
                rows={3}
                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-rose-300 focus:border-rose-200"
                placeholder="Detailed product description with features and benefits"
              />
              <p className="text-xs text-gray-500 mt-1">
                Detailed description shown on product page
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1 text-gray-700">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={(e) => {
                    handleChange(e);
                    setForm((f) => ({ ...f, subCategory: "" }));
                  }}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-1 focus:ring-rose-300 focus:border-rose-200"
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Main product category for organization
                </p>
              </div>

              {form.category && (
                <div>
                  <label className="block font-medium mb-1 text-gray-700">
                    Subcategory
                  </label>
                  <select
                    name="subCategory"
                    value={form.subCategory}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-1 focus:ring-rose-300 focus:border-rose-200"
                  >
                    <option value="">Select subcategory</option>
                    {getSubcategories().map((subcat) => (
                      <option key={subcat.id} value={subcat.id}>
                        {subcat.name}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Specific product subcategory
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="block font-medium mb-1 text-gray-700">
                Brand
              </label>
              <input
                type="text"
                name="brand"
                value={form.brand}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-rose-300 focus:border-rose-200"
                placeholder="Product brand or manufacturer"
              />
              <p className="text-xs text-gray-500 mt-1">
                Brand name for filtering and customer trust
              </p>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label className="block font-medium mb-2 text-gray-700">
                Price By Size <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-gray-500 mb-3">
                Set pricing for different product sizes or variants
              </p>
              {form.priceBySize.map((p, i) => (
                <div
                  key={i}
                  className="border border-gray-200 rounded-lg p-4 mb-3 bg-gray-50"
                >
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        Size/Variant <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Small, Medium, 500ml"
                        value={p.size}
                        onChange={(e) =>
                          handlePriceChange(i, "size", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-rose-300 focus:border-rose-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        Currency
                      </label>
                      <select
                        value={p.currency}
                        onChange={(e) =>
                          handlePriceChange(i, "currency", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-1 focus:ring-rose-300 focus:border-rose-200"
                      >
                        <option value="INR">INR</option>
                        <option value="USD">USD</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        Original Price <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        min={0}
                        step="0.01"
                        placeholder="0.00"
                        value={p.originalPrice}
                        onChange={(e) =>
                          handlePriceChange(i, "originalPrice", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-rose-300 focus:border-rose-200"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        MRP or list price
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        Purchase Price <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        min={0}
                        step="0.01"
                        placeholder="0.00"
                        value={p.purchasePrice}
                        onChange={(e) =>
                          handlePriceChange(i, "purchasePrice", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-rose-300 focus:border-rose-200"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Your cost price
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        Selling Price <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        min={0}
                        step="0.01"
                        placeholder="0.00"
                        value={p.sellingPrice}
                        onChange={(e) =>
                          handlePriceChange(i, "sellingPrice", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-rose-300 focus:border-rose-200"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Customer pays this
                      </p>
                    </div>
                  </div>
                  {form.priceBySize.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePriceSize(i)}
                      className="mt-3 text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Remove this size
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addPriceSize}
                className="text-rose-600 hover:text-rose-800 font-medium text-sm"
              >
                + Add another size/variant
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1 text-gray-700">
                  Stock Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min={0}
                  name="stock.quantity"
                  value={form.stock.quantity}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-rose-300 focus:border-rose-200"
                  placeholder="0"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Total available inventory
                </p>
              </div>
              <div>
                <label className="block font-medium mb-1 text-gray-700">
                  Low Stock Alert
                </label>
                <input
                  type="number"
                  min={0}
                  name="stock.lowStockThreshold"
                  value={form.stock.lowStockThreshold}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-rose-300 focus:border-rose-200"
                  placeholder="5"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Alert when stock falls below this
                </p>
              </div>
            </div>

            {/* <div>
              <label className="block font-medium mb-2 text-gray-700">
                Available Colors
              </label>
              <p className="text-xs text-gray-500 mb-3">
                Click on colors to select/deselect them
              </p>
              <div className="grid grid-cols-12 gap-1">
                {availableColors.map((color) => (
                  <div key={color.value} className="flex flex-col items-center">
                    <button
                      type="button"
                      onClick={() => handleColorToggle(color.value)}
                      className={`w-6 h-6 rounded-full border-2 transition-all ${
                        form.colors?.includes(color.value)
                          ? "border-rose-500 ring-2 ring-rose-200"
                          : "border-gray-300"
                      } ${
                        color.value === "white" ? "ring-1 ring-gray-200" : ""
                      }`}
                      style={{
                        backgroundColor: color.hex,
                        boxShadow:
                          color.value === "white"
                            ? "inset 0 0 0 1px #e5e7eb"
                            : undefined,
                      }}
                      title={color.name}
                    />
                    <span className="text-xs mt-1 text-gray-600">
                      {color.name}
                    </span>
                  </div>
                ))}
              </div>
              {form.colors?.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm text-gray-700">
                    Selected:{" "}
                    {form.colors
                      .map(
                        (color) =>
                          availableColors.find((c) => c.value === color)?.name
                      )
                      .join(", ")}
                  </p>
                </div>
              )}
            </div> */}

            <div>
              <label className="block font-medium mb-2 text-gray-700">
                Available Colors
              </label>
              <p className="text-xs text-gray-500 mb-3">
                Pick colors to add them to your product
              </p>

              <SketchPicker
                color="#fff"
                onChangeComplete={handleColorChange}
                disableAlpha={true}
                presetColors={Object.keys(COLOR_NAMES)}
              />

              {form.colors?.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2 text-gray-700">
                    Selected Colors:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {form.colors.map((colorHex, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded-full border border-gray-300"
                          style={{ backgroundColor: colorHex }}
                          title={colorHex}
                        />
                        <span className="text-sm text-gray-700">
                          {COLOR_NAMES[colorHex] || colorHex}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveColor(colorHex)}
                          className="text-xs text-red-500"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <label className="block font-medium mb-1 text-gray-700">
                Weight
              </label>
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <input
                    type="number"
                    min={0}
                    step="0.01"
                    name="weight.value"
                    value={form.weight.value}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-rose-300 focus:border-rose-200"
                    placeholder="0.00"
                  />
                </div>
                <select
                  name="weight.unit"
                  value={form.weight.unit}
                  onChange={handleChange}
                  className="border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-1 focus:ring-rose-300 focus:border-rose-200"
                >
                  <option value="g">g</option>
                  <option value="kg">kg</option>
                  <option value="oz">oz</option>
                  <option value="lb">lb</option>
                </select>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Product weight for shipping calculations
              </p>
            </div>

            <div>
              <label className="block font-medium mb-1 text-gray-700">
                Dimensions
              </label>
              <div className="grid grid-cols-4 gap-2">
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  name="dimensions.width"
                  value={form.dimensions.width}
                  onChange={handleChange}
                  placeholder="Width"
                  className="border border-gray-300 rounded px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-rose-300 focus:border-rose-200"
                />
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  name="dimensions.height"
                  value={form.dimensions.height}
                  onChange={handleChange}
                  placeholder="Height"
                  className="border border-gray-300 rounded px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-rose-300 focus:border-rose-200"
                />
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  name="dimensions.depth"
                  value={form.dimensions.depth}
                  onChange={handleChange}
                  placeholder="Depth"
                  className="border border-gray-300 rounded px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-rose-300 focus:border-rose-200"
                />
                <select
                  name="dimensions.unit"
                  value={form.dimensions.unit}
                  onChange={handleChange}
                  className="border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-1 focus:ring-rose-300 focus:border-rose-200"
                >
                  <option value="cm">cm</option>
                  <option value="in">in</option>
                </select>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Product dimensions for packaging and shipping
              </p>
            </div>

            <div>
              <label className="block font-medium mb-1 text-gray-700">
                Tags
              </label>
              <input
                type="text"
                name="tags"
                value={form.tags.join(", ")}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-rose-300 focus:border-rose-200"
                placeholder="organic, handmade, eco-friendly, premium"
              />
              <p className="text-xs text-gray-500 mt-1">
                Keywords for search and filtering (comma-separated)
              </p>
            </div>

            <div>
              <label className="block font-medium mb-2 text-gray-700">
                Custom Attributes
              </label>
              <p className="text-xs text-gray-500 mb-3">
                Add specific product attributes like material, origin, etc.
              </p>
              {form.attributes.map((attr, i) => (
                <div key={i} className="flex gap-2 items-center mb-2">
                  <input
                    type="text"
                    placeholder="Attribute name (e.g., Material)"
                    value={attr.key}
                    onChange={(e) =>
                      handleAttributeChange(i, "key", e.target.value)
                    }
                    className="flex-1 border border-gray-300 rounded px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-rose-300 focus:border-rose-200"
                  />
                  <input
                    type="text"
                    placeholder="Value (e.g., Cotton)"
                    value={attr.value}
                    onChange={(e) =>
                      handleAttributeChange(i, "value", e.target.value)
                    }
                    className="flex-1 border border-gray-300 rounded px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-rose-300 focus:border-rose-200"
                  />
                  <button
                    type="button"
                    onClick={() => removeAttribute(i)}
                    className="text-red-600 hover:text-red-800 font-bold px-2"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addAttribute}
                className="text-rose-600 hover:text-rose-800 font-medium text-sm"
              >
                + Add attribute
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            {/* Main Product Image */}
            <div>
              <label className="block font-medium mb-2 text-gray-700">
                Main Product Image <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-rose-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, "main")}
                  className="hidden"
                  id="main-image-upload"
                />
                <label
                  htmlFor="main-image-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  {form.images?.main?.preview ? (
                    <div className="relative">
                      <img
                        src={form.images.main.preview}
                        alt="Main product"
                        className="w-32 h-32 object-cover rounded-lg shadow-md"
                      />
                      <div className="mt-2 text-sm text-rose-600 hover:text-rose-800">
                        Click to change image
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
                        <svg
                          className="w-8 h-8 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                      </div>
                      <div className="text-rose-600 hover:text-rose-800 font-medium">
                        Upload Main Image
                      </div>
                    </>
                  )}
                </label>
              </div>

              {/* Color Selector for Main Image */}
              <div className="mt-4">
                <label className="block font-medium mb-1 text-gray-700">
                  Link Color to Main Image
                </label>
                <div className="flex gap-3">
                  {form.colors.map((colorHex, index) => (
                    <div
                      key={index}
                      className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
                        form.images?.main?.colorHex === colorHex
                          ? "border-rose-500 scale-110"
                          : "border-gray-300"
                      } transition-transform`}
                      style={{ backgroundColor: colorHex }}
                      onClick={() => {
                        setForm((prev) => ({
                          ...prev,
                          images: {
                            ...prev.images,
                            main: {
                              ...prev.images?.main,
                              colorHex: colorHex,
                            },
                          },
                        }));
                      }}
                    />
                  ))}
                </div>
                {console.log("formmmmmm", form)}
              </div>
            </div>

            {/* Extra Images */}
            <div>
              <label className="block font-medium mb-2 text-gray-700">
                Additional Images (Max 4)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[0, 1, 2, 3].map((index) => (
                  <div key={index} className="relative">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-rose-400 transition-colors aspect-square flex items-center justify-center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleExtraImageUpload(e, index)}
                        className="hidden"
                        id={`extra-image-upload-${index}`}
                      />
                      <label
                        htmlFor={`extra-image-upload-${index}`}
                        className="cursor-pointer flex flex-col items-center w-full h-full justify-center"
                      >
                        {form.images?.extras?.[index]?.preview ? (
                          <div className="relative w-full h-full">
                            <img
                              src={form.images.extras[index].preview}
                              alt={`Extra ${index + 1}`}
                              className="w-full h-full object-cover rounded"
                            />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                removeExtraImage(index);
                              }}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                            >
                              ×
                            </button>
                          </div>
                        ) : (
                          <>
                            <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center mb-1">
                              <svg
                                className="w-4 h-4 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                />
                              </svg>
                            </div>
                            <div className="text-xs text-rose-600 hover:text-rose-800 font-medium text-center">
                              Upload Image {index + 1}
                            </div>
                          </>
                        )}
                      </label>
                    </div>

                    {/* Color Selector for Extra Image */}
                    <div className="mt-2 flex justify-center gap-2">
                      {form.colors.map((colorHex, i) => (
                        <div
                          key={i}
                          className={`w-6 h-6 rounded-full cursor-pointer border-2 ${
                            form.images?.extras?.[index]?.colorHex === colorHex
                              ? "border-rose-500 scale-110"
                              : "border-gray-300"
                          } transition-transform`}
                          style={{ backgroundColor: colorHex }}
                          onClick={() => {
                            setForm((prev) => {
                              const updatedExtras = [
                                ...(prev.images?.extras || []),
                              ];
                              updatedExtras[index] = {
                                ...updatedExtras[index],
                                colorHex: colorHex,
                              };
                              return {
                                ...prev,
                                images: {
                                  ...prev.images,
                                  extras: updatedExtras,
                                },
                              };
                            });
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return renderTabContent();
};

export default ProductFormTabContent;

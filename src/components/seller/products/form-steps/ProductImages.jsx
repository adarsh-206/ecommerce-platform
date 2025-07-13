import React from "react";

const ProductImages = ({
  form,
  setForm,
  handleImageUpload,
  handleExtraImageUpload,
  removeExtraImage,
}) => {
  const getColorName = (colorHex) => {
    const color = form.colors?.find(
      (c) => c.hexCode?.toLowerCase() === colorHex?.toLowerCase()
    );
    return color?.name || colorHex;
  };

  const handleFeatureSelect = (feature) => {
    setForm((prevForm) => ({
      ...prevForm,
      featured: prevForm.featured === feature ? "" : feature,
    }));
  };

  return (
    <div className="space-y-6">
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
            {form.images?.main?.preview || form.images?.main?.url ? (
              <div className="relative">
                <img
                  src={form.images.main.preview || form.images.main.url}
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

        {form.colors?.length > 0 && (
          <div className="mt-4">
            <label className="block font-medium mb-1 text-gray-700">
              Link Color to Main Image
            </label>
            <div className="flex gap-3">
              {form.colors.map(({ hexCode }, index) => (
                <div
                  key={index}
                  className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
                    form.images?.main?.colorHex === hexCode
                      ? "border-rose-500 scale-110"
                      : "border-gray-300"
                  } transition-transform`}
                  style={{ backgroundColor: hexCode }}
                  onClick={() => {
                    setForm((prev) => ({
                      ...prev,
                      images: {
                        ...prev.images,
                        main: {
                          ...prev.images.main,
                          colorHex: hexCode,
                        },
                      },
                    }));
                  }}
                  title={getColorName(hexCode)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div>
        <label className="block font-medium mb-2 text-gray-700">
          Additional Images
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[0, 1, 2, 3].map((index) => {
            const image = form.images?.extras?.[index];
            return (
              <div key={index} className="relative">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-rose-400 transition-colors aspect-square flex items-center justify-center">
                  <input
                    type="file"
                    form="noform"
                    accept="image/*"
                    onChange={(e) => handleExtraImageUpload(e, index)}
                    className="hidden"
                    id={`extra-image-upload-${index}`}
                  />
                  <label
                    htmlFor={`extra-image-upload-${index}`}
                    className="cursor-pointer flex flex-col items-center w-full h-full justify-center"
                  >
                    {image?.preview || image?.url ? (
                      <div className="relative w-full h-full">
                        <img
                          src={image.preview || image.url}
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

                {form.colors?.length > 0 && (
                  <div className="mt-2 flex justify-center gap-2">
                    {form.colors.map(({ hexCode }, i) => (
                      <div
                        key={i}
                        className={`w-6 h-6 rounded-full cursor-pointer border-2 ${
                          image?.colorHex === hexCode
                            ? "border-rose-500 scale-110"
                            : "border-gray-300"
                        } transition-transform`}
                        style={{ backgroundColor: hexCode }}
                        onClick={() => {
                          setForm((prev) => {
                            const updatedExtras = [
                              ...(prev.images?.extras || []),
                            ];
                            updatedExtras[index] = {
                              ...updatedExtras[index],
                              colorHex: hexCode,
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
                        title={getColorName(hexCode)}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-base font-semibold text-gray-800 mb-2">
          Highlight Feature
        </h3>
        <div className="flex flex-wrap gap-4">
          {["New Arrival", "Best Seller"].map((feature) => (
            <div
              key={feature}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition cursor-pointer shadow-sm ${
                form.featured === feature
                  ? "bg-rose-50 border-rose-300 shadow-md"
                  : "bg-gray-50 border-gray-200 hover:shadow-md"
              }`}
              onClick={() => handleFeatureSelect(feature)}
            >
              <input
                type="checkbox"
                readOnly
                checked={form.featured === feature}
                className="form-checkbox h-5 w-5 text-rose-600 pointer-events-none"
              />
              <span className="text-sm font-medium text-gray-700">
                {feature === "New Arrival"
                  ? "🌟 New Arrival"
                  : "🏆 Best Seller"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductImages;

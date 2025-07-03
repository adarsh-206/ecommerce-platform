"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Sparkles, ShoppingCart, X } from "lucide-react";
import { SubmitStep } from "./SubmitStep";
import { useRouter } from "next/navigation";
import apiService from "../utils/apiService";

const TabButton = ({ SvgIcon, label, isActive, onClick, disabled }) => (
  <motion.button
    onClick={onClick}
    disabled={disabled}
    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
      isActive
        ? "bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-md"
        : disabled
        ? "text-gray-400 cursor-not-allowed"
        : "text-gray-600 hover:bg-white/60"
    }`}
    whileHover={{ scale: isActive || disabled ? 1 : 1.05 }}
    whileTap={{ scale: disabled ? 1 : 0.95 }}
  >
    <SvgIcon className="w-4 h-4" />
    <span className="hidden sm:block">{label}</span>
  </motion.button>
);

const ColorPicker = ({ colors, selectedColor, onColorChange }) => (
  <div className="flex flex-col gap-4">
    <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider text-center">
      Apparel Color
    </h3>
    <div className="flex flex-wrap justify-center gap-4 pt-2">
      {colors.map((color, index) => (
        <motion.div
          key={color.hexCode}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: index * 0.05,
          }}
        >
          <button
            onClick={() => onColorChange(color.hexCode)}
            className={`w-6 h-6 rounded-full border-2 transition-all duration-300 transform shadow-md hover:scale-110 ${
              selectedColor === color.value
                ? "border-amber-500 scale-110 ring-2 ring-offset-2 ring-offset-white/80 ring-amber-500"
                : "border-gray-200/50"
            }`}
            style={{ backgroundColor: color.hexCode }}
            title={color.name}
          />
        </motion.div>
      ))}
    </div>
  </div>
);

const CustomSlider = ({ label, value, min, max, step, onChange }) => (
  <div className="w-full">
    <div className="flex justify-between items-center mb-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <span className="px-2 py-1 text-xs font-mono bg-gray-200 text-gray-700 rounded-md">
        {value}
      </span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={onChange}
      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gradient"
      style={{
        "--accent-color-from": "#f59e0b",
        "--accent-color-to": "#e11d48",
      }}
    />
    <style>{`
      .accent-gradient {
        accent-color: var(--accent-color-from);
      }
    `}</style>
  </div>
);

const FileUpload = ({ onFileSelect, selectedFile, clearDesign, fileError }) => {
  const fileInputRef = useRef(null);

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {!selectedFile && (
        <motion.button
          onClick={() => fileInputRef.current?.click()}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 10px 20px -5px rgba(245, 158, 11, 0.4)",
          }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300"
        >
          Upload Design
        </motion.button>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/svg+xml"
        onChange={onFileSelect}
        className="hidden"
      />

      {fileError && (
        <p className="text-sm text-red-600 w-full text-center -mt-2">
          {fileError}
        </p>
      )}

      <AnimatePresence>
        {selectedFile && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="w-full overflow-hidden"
          >
            <div className="flex items-center justify-between gap-3 bg-gray-900/5 p-2.5 rounded-lg w-full mt-2">
              <p className="text-gray-700 font-medium text-sm truncate flex-grow pl-1">
                {selectedFile.name}
              </p>
              <button
                onClick={clearDesign}
                className="text-red-500 hover:text-red-700 transition-colors p-1 rounded-full hover:bg-red-100 flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const FormField = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  options = [],
}) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {type === "select" ? (
      <select
        value={value}
        onChange={onChange}
        required={required}
        className="w-full text-gray-500 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-200 bg-white/80 backdrop-blur-sm"
      >
        <option value="">Select</option>
        {/* Corrected this map function */}
        {options.map((option) => (
          <option key={option.name} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
    ) : type === "textarea" ? (
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={4}
        className="w-full text-gray-500 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-200 resize-none bg-white/80 backdrop-blur-sm"
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full text-gray-500 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-200 bg-white/80 backdrop-blur-sm"
      />
    )}
  </div>
);

export const Customizer = ({
  activeTab,
  setActiveTab,
  colors,
  apparelColor,
  setApparelColor,
  onFileSelect,
  selectedFile,
  clearDesign,
  decalScale,
  setDecalScale,
  decalPosition,
  setDecalPosition,
  fileError,
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const handleSubmit = async (formData) => {
    try {
      setIsSubmitted(true);

      const payload = new FormData();

      payload.append("productType", formData.productType);
      payload.append("quantity", formData.quantity);
      payload.append("notes", formData.notes || "");

      formData.sizes.forEach((size) => {
        payload.append("sizes", size);
      });

      if (selectedFile) {
        payload.append("image", selectedFile);
      }

      const response = await apiService.post("/quote/", payload, true, true);

      if (response?.data?.message === "Quote submitted") {
        setTimeout(() => {
          setIsSubmitted(false);
          setActiveTab("color");
          clearDesign();
          localStorage.removeItem("pendingDesign");
        }, 5000);
      } else {
        setIsSubmitted(false);
      }
    } catch (error) {
      setIsSubmitted(false);
    }
  };

  const handleLoginRedirect = useCallback(() => {
    const designData = {
      apparelColor,
      decalScale,
      decalPosition,
      selectedFileName: selectedFile?.name || null,
    };

    const redirectPath = encodeURIComponent(window.location.pathname);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        localStorage.setItem(
          "pendingDesign",
          JSON.stringify({
            ...designData,
            selectedFileData: reader.result,
          })
        );
        router.push(`/buyer/login?redirect=${redirectPath}`);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      localStorage.setItem("pendingDesign", JSON.stringify(designData));
      router.push(`/buyer/login?redirect=${redirectPath}`);
    }
  }, [apparelColor, decalScale, decalPosition, selectedFile, router]);

  function dataURLtoFile(dataUrl, filename) {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  useEffect(() => {
    const saved = localStorage.getItem("pendingDesign");
    if (saved) {
      const parsed = JSON.parse(saved);
      setApparelColor(parsed.apparelColor || "#ffffff");
      setDecalScale(parsed.decalScale || 0.2);
      setDecalPosition(parsed.decalPosition || [0, 0, 0]);

      if (parsed.selectedFileData && parsed.selectedFileName) {
        const file = dataURLtoFile(
          parsed.selectedFileData,
          parsed.selectedFileName
        );
        onFileSelect({ target: { files: [file] } });
      }

      setActiveTab("submit");

      localStorage.removeItem("pendingDesign");
    }
  }, [onFileSelect]);

  const hasDesign = selectedFile !== null;

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
      className="w-full max-w-sm bg-white/50 backdrop-blur-xl rounded-2xl shadow-xl p-4 flex flex-col"
    >
      <div className="flex bg-gray-900/10 p-1.5 rounded-xl justify-center gap-1 mb-4">
        <TabButton
          SvgIcon={Palette}
          label="Color"
          isActive={activeTab === "color"}
          onClick={() => setActiveTab("color")}
        />
        <TabButton
          SvgIcon={Sparkles}
          label="Design"
          isActive={activeTab === "design"}
          onClick={() => setActiveTab("design")}
        />
        <TabButton
          SvgIcon={ShoppingCart}
          label="Submit"
          isActive={activeTab === "submit"}
          onClick={() => setActiveTab("submit")}
          disabled={!hasDesign}
        />
      </div>

      {!hasDesign && activeTab === "submit" && (
        <div className="px-2 py-8 text-center space-y-4">
          <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6 text-amber-600" />
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-800">Design Required</h3>
            <p className="text-sm text-gray-600">
              Please upload a design first before submitting your design.
            </p>
          </div>
          <motion.button
            onClick={() => setActiveTab("design")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-amber-500 to-rose-500 text-white px-6 py-2 rounded-lg font-medium shadow-md"
          >
            Upload Design
          </motion.button>
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="px-2 py-4"
        >
          {activeTab === "color" && (
            <ColorPicker
              colors={colors}
              selectedColor={apparelColor}
              onColorChange={setApparelColor}
            />
          )}

          {activeTab === "design" && (
            <div className="flex flex-col items-center gap-8">
              <FileUpload
                onFileSelect={onFileSelect}
                selectedFile={selectedFile}
                clearDesign={clearDesign}
                fileError={fileError}
              />
              <div className="w-full space-y-6 pt-6 border-t border-gray-900/10">
                <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider text-center">
                  Adjust Design
                </h3>
                <CustomSlider
                  label="Size"
                  min={0.05}
                  max={0.4}
                  step={0.001}
                  value={decalScale}
                  onChange={(e) => setDecalScale(parseFloat(e.target.value))}
                />
                <CustomSlider
                  label="Vertical"
                  min={-0.023}
                  max={0.19}
                  step={0.001}
                  value={decalPosition[1]}
                  onChange={(e) =>
                    setDecalPosition([
                      decalPosition[0],
                      parseFloat(e.target.value),
                      decalPosition[2],
                    ])
                  }
                />
                <CustomSlider
                  label="Horizontal"
                  min={-0.06}
                  max={0.1}
                  step={0.001}
                  value={decalPosition[0]}
                  onChange={(e) =>
                    setDecalPosition([
                      parseFloat(e.target.value),
                      decalPosition[1],
                      decalPosition[2],
                    ])
                  }
                />
              </div>
            </div>
          )}

          {activeTab === "submit" && hasDesign && (
            <>
              {localStorage.getItem("token") ? (
                <SubmitStep onSubmit={handleSubmit} isSubmitted={isSubmitted} />
              ) : (
                <div className="px-2 py-8 text-center space-y-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                    <ShoppingCart className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-800">
                      Login Required
                    </h3>
                    <p className="text-sm text-gray-600">
                      Login to submit your design — we’ll send a personalized
                      quote with colors, sizes, and order options.
                    </p>
                  </div>
                  <motion.button
                    onClick={handleLoginRedirect}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-amber-500 to-rose-500 text-white px-6 py-2 rounded-lg font-medium shadow-md"
                  >
                    Login
                  </motion.button>
                </div>
              )}
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default Customizer;

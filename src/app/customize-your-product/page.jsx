"use client";

import React, { useState, useEffect } from "react";
import * as THREE from "three";
import { TShirtCanvas } from "./TShirtCanvas";
import { Customizer } from "./Customizer";
import { Instructions } from "./Layout";
import MainLayout from "@/components/layouts/MainLayout";
import apiService from "../utils/apiService";

export default function YourProduct() {
  const [apparelColor, setApparelColor] = useState("#ffffff");
  const [activeTab, setActiveTab] = useState("color");

  const [selectedFile, setSelectedFile] = useState(null);
  const [decalTexture, setDecalTexture] = useState(null);

  const [decalScale, setDecalScale] = useState(0.18);
  const [decalPosition, setDecalPosition] = useState([0, 0.1, 0.15]);

  const [colors, setColors] = useState([]);
  const [fileError, setFileError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setFileError("");

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    const minWidth = 300;
    const minHeight = 300;

    if (!allowedTypes.includes(file.type)) {
      setFileError("Only JPG, PNG, or WEBP images are allowed.");
      return;
    }

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      if (img.width < minWidth || img.height < minHeight) {
        setFileError(
          `Image is too small. Minimum recommended resolution is ${minWidth}×${minHeight}px for high-quality print.`
        );
        URL.revokeObjectURL(objectUrl);
        return;
      }

      setSelectedFile(file);
      setFileError("");
      URL.revokeObjectURL(objectUrl);
    };

    img.onerror = () => {
      setFileError("Invalid image file.");
      URL.revokeObjectURL(objectUrl);
    };

    img.src = objectUrl;
  };

  const clearDesign = () => {
    setSelectedFile(null);
  };

  useEffect(() => {
    if (selectedFile) {
      const texture = new THREE.TextureLoader().load(
        URL.createObjectURL(selectedFile)
      );
      texture.flipY = true;
      texture.colorSpace = THREE.SRGBColorSpace;
      setDecalTexture(texture);
    } else {
      setDecalTexture(null);
    }
  }, [selectedFile]);

  useEffect(() => {
    fetchColors();
  }, []);

  const fetchColors = async () => {
    try {
      const response = await apiService.get("/colors/", {}, true);
      if (Array.isArray(response.data)) {
        setColors(response.data);
      } else {
        console.warn("Unexpected color data format", response.data);
      }
    } catch (err) {
      console.error("Failed to fetch colors", err);
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen w-full bg-orange-100 font-sans text-white pt-6 md:pt-20">
        <main className="max-w-9xl mx-auto grid xl:grid-cols-5 lg:grid-cols-3 gap-8 p-4 md:p-8 min-h-screen">
          <TShirtCanvas
            apparelColor={apparelColor}
            decalTexture={decalTexture}
            decalPosition={decalPosition}
            decalScale={decalScale}
          />

          <div className="xl:col-span-2 lg:col-span-1 flex flex-col gap-8">
            <Customizer
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              colors={colors}
              apparelColor={apparelColor}
              setApparelColor={setApparelColor}
              onFileSelect={handleFileChange}
              selectedFile={selectedFile}
              clearDesign={clearDesign}
              decalScale={decalScale}
              setDecalScale={setDecalScale}
              decalPosition={decalPosition}
              setDecalPosition={setDecalPosition}
              fileError={fileError}
            />
          </div>
          <Instructions className="col-span-full" />
        </main>
      </div>
    </MainLayout>
  );
}

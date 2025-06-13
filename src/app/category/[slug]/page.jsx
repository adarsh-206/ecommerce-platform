"use client";
import React from "react";
import categories from "@/constants/categories";
import CategoryProducts from "@/components/category/CategoryProducts";

export default function CategoryPage({ params }) {
  const { slug } = React.use(params);
  const category = categories.find((cat) => cat.slug.split("/").pop() === slug);

  if (!category) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-2xl text-red-500">Category Not Found</h1>
      </div>
    );
  }

  return <CategoryProducts category={category} />;
}

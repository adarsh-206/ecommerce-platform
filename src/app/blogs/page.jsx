"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import apiService from "../utils/apiService";
import MainLayout from "@/components/layouts/MainLayout";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const res = await apiService.get("/blogs/", {}, true);
      if (res?.data) setBlogs(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const SkeletonCard = () => (
    <div className="bg-white border border-amber-100 rounded-2xl shadow-sm p-6 animate-pulse flex flex-col">
      <div className="h-48 w-full bg-amber-100 rounded-xl mb-4" />
      <div className="w-20 h-4 bg-amber-100 rounded mb-2" />
      <div className="h-6 bg-amber-200 rounded w-3/4 mb-1" />
      <div className="h-4 bg-amber-100 rounded w-1/2 mb-3" />
      <div className="h-4 bg-amber-100 rounded w-full mb-1" />
      <div className="h-4 bg-amber-100 rounded w-5/6 mb-1" />
      <div className="h-4 bg-amber-100 rounded w-2/3" />
      <div className="mt-4 flex justify-between text-xs text-amber-500">
        <div className="h-3 w-16 bg-amber-100 rounded" />
        <div className="h-3 w-20 bg-amber-100 rounded" />
      </div>
    </div>
  );

  return (
    <MainLayout>
      <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 px-4 py-10 sm:px-6 lg:px-12">
        <h1 className="text-3xl font-bold text-amber-800 mb-8 text-center">
          Chaka-Chak Blogs
        </h1>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            Array.from({ length: 6 }).map((_, idx) => (
              <SkeletonCard key={idx} />
            ))
          ) : blogs.length === 0 ? (
            <p className="text-center text-amber-700 col-span-full">
              No blogs found.
            </p>
          ) : (
            blogs.map((blog) => {
              const date = new Date(
                blog.publishedAt || blog.createdAt
              ).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              });

              return (
                <Link
                  key={blog._id}
                  href={`/blogs/${blog.slug}`}
                  className="bg-white border border-amber-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col"
                >
                  {blog.coverImage && (
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="h-48 w-full object-cover rounded-xl mb-4"
                    />
                  )}
                  <span className="text-xs text-white bg-amber-500 inline-block px-2 py-1 rounded mb-2 w-fit">
                    {blog.category}
                  </span>
                  <h2 className="text-xl font-semibold text-amber-900 mb-1">
                    {blog.title}
                  </h2>
                  <p className="text-sm text-amber-600 mb-2">{date}</p>
                  <p className="text-amber-700 text-sm line-clamp-3 flex-grow">
                    {blog.excerpt ||
                      blog.content?.replace(/<[^>]+>/g, "").substring(0, 150) +
                        "..."}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-xs text-amber-700">
                    <span>
                      {blog.author?.fullName && `By ${blog.author.fullName}`}
                    </span>
                    <span className="text-amber-600 font-medium hover:underline">
                      Read More →
                    </span>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </main>
    </MainLayout>
  );
}

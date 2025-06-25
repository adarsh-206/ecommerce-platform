"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import apiService from "@/app/utils/apiService";
import MainLayout from "@/components/layouts/MainLayout";
import Link from "next/link";
import "./style.css";

export default function BlogDetailPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBlog = async () => {
    try {
      const res = await apiService.get(`/blogs/${id}`, {}, true);
      if (res?.data) setBlog(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchBlog();
  }, [id]);

  useEffect(() => {
    const links = document.querySelectorAll(".blog-content a");
    links.forEach((link) => {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    });
  }, []);

  const Skeleton = () => (
    <div className="max-w-5xl mx-auto bg-white shadow rounded-2xl p-8 animate-pulse">
      <div className="w-24 h-5 bg-amber-100 rounded mb-4" />
      <div className="h-8 w-3/4 bg-amber-200 rounded mb-3" />
      <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mb-6">
        <div className="h-4 w-32 bg-amber-100 rounded" />
        <div className="h-4 w-24 bg-amber-100 rounded" />
      </div>
      <div className="h-64 w-full bg-amber-100 rounded-xl mb-6" />
      <div className="space-y-2">
        <div className="h-4 bg-amber-100 rounded w-full" />
        <div className="h-4 bg-amber-100 rounded w-5/6" />
        <div className="h-4 bg-amber-100 rounded w-2/3" />
        <div className="h-4 bg-amber-100 rounded w-3/4" />
      </div>
      <div className="mt-8 flex gap-2">
        <div className="h-6 w-16 bg-amber-100 rounded-full" />
        <div className="h-6 w-20 bg-amber-100 rounded-full" />
      </div>
    </div>
  );

  if (loading) {
    return (
      <MainLayout>
        <article className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 px-4 py-10 sm:px-6 lg:px-24">
          <div className="max-w-5xl mx-auto mb-4 text-sm text-amber-600 space-x-1">
            <Link href="/" className="hover:underline text-amber-700">
              Home
            </Link>
            <span>/</span>
            <Link href="/blogs" className="hover:underline text-amber-700">
              Blogs
            </Link>
          </div>
          <Skeleton />
        </article>
      </MainLayout>
    );
  }

  if (!blog) {
    return (
      <MainLayout>
        <div className="text-center py-20 text-amber-700">Blog not found.</div>
      </MainLayout>
    );
  }

  const { title, coverImage, author, publishedAt, content, category, tags } =
    blog;

  const formattedDate = new Date(
    publishedAt || blog.createdAt
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <MainLayout>
      <article className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 px-4 py-10 sm:px-6 lg:px-24">
        <div className="max-w-5xl mx-auto mb-4 text-sm text-amber-600 space-x-1">
          <Link href="/" className="hover:underline text-amber-700">
            Home
          </Link>
          <span>/</span>
          <Link href="/blogs" className="hover:underline text-amber-700">
            Blogs
          </Link>
          <span>/</span>
          <span className="text-amber-900 font-medium">{title}</span>
        </div>

        <div className="max-w-5xl mx-auto bg-white shadow rounded-2xl p-8">
          <span className="inline-block bg-amber-500 text-white text-xs px-2 py-1 rounded mb-4 uppercase tracking-wide">
            {category}
          </span>

          <h1 className="text-3xl font-bold text-amber-900 mb-4">{title}</h1>

          <div className="text-sm text-amber-600 mb-6 flex flex-col sm:flex-row sm:justify-between gap-2">
            <span>By {author?.fullName || "Anonymous"}</span>
            <span>{formattedDate}</span>
          </div>

          {coverImage && (
            <img
              src={coverImage}
              alt={title}
              className="rounded-xl w-full object-cover mb-6 max-h-[400px]"
            />
          )}

          <div
            className="prose prose-sm sm:prose lg:prose-lg max-w-none text-amber-800 blog-content"
            dangerouslySetInnerHTML={{ __html: content || "" }}
          />

          {tags?.length > 0 && tags.some(Boolean) && (
            <div className="mt-8">
              <h4 className="text-sm font-semibold text-amber-700 mb-2">
                Tags:
              </h4>
              <div className="flex flex-wrap gap-2">
                {tags.filter(Boolean).map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </MainLayout>
  );
}

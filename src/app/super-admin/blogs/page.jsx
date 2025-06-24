"use client";
import { useEffect, useState } from "react";
import apiService from "@/app/utils/apiService";
import AdminLayout from "@/components/layouts/AdminLayout";
import Link from "next/link";

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

  return (
    <AdminLayout>
      <div className="px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-amber-800">Blogs</h1>
            <p className="text-gray-600 text-sm">
              Manage and publish insightful blogs for your customers.
            </p>
          </div>
          <Link
            href="/super-admin/blogs/create"
            className="inline-block bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white font-semibold px-5 py-2.5 rounded-lg shadow hover:brightness-110 transition"
          >
            Create Blog
          </Link>
        </div>

        <div className="overflow-x-auto bg-white rounded-2xl shadow border border-amber-100">
          {loading ? (
            <div className="p-6 space-y-4 animate-pulse">
              {[...Array(4)].map((_, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center px-6 py-4 border-b border-amber-50"
                >
                  <div className="h-4 w-1/3 bg-amber-100 rounded" />
                  <div className="h-4 w-1/4 bg-amber-100 rounded" />
                  <div className="h-4 w-1/6 bg-amber-100 rounded" />
                  <div className="h-4 w-1/6 bg-amber-100 rounded" />
                  <div className="h-4 w-10 bg-amber-100 rounded" />
                </div>
              ))}
            </div>
          ) : blogs.length === 0 ? (
            <div className="p-6 text-center text-gray-500">No blogs found.</div>
          ) : (
            <table className="min-w-full divide-y divide-amber-100">
              <thead className="bg-amber-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-amber-700 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-amber-700 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-amber-700 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-amber-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-50">
                {blogs.map((blog) => (
                  <tr key={blog._id}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                      {blog.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {blog?.author?.fullName || "Admin"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          blog.isPublished === true
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {blog.isPublished === true ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-sm">
                      <Link
                        href={`/super-admin/blogs/edit/${blog.slug}`}
                        className="text-amber-600 font-semibold hover:underline"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Upload,
  Eye,
  Save,
  Globe,
  Tag,
  Hash,
  Image,
  Type,
  AlignLeft,
  ArrowLeft,
  Trash2,
} from "lucide-react";
import AdminLayout from "@/components/layouts/AdminLayout";
import apiService from "@/app/utils/apiService";

export default function EditBlogPage() {
  const params = useParams();
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    tags: "",
    category: "",
    isPublished: false,
    metaTitle: "",
    metaDescription: "",
    coverImage: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const quillRef = useRef(null);
  const fileInputRef = useRef(null);
  const quillInstance = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.7/quill.min.js";
    script.onload = () => {
      fetchBlogData();
    };
    document.head.appendChild(script);

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.7/quill.snow.css";
    document.head.appendChild(link);

    return () => {
      if (document.head.contains(script)) document.head.removeChild(script);
      if (document.head.contains(link)) document.head.removeChild(link);
    };
  }, []);

  const fetchBlogData = async () => {
    try {
      setFetchLoading(true);
      const response = await apiService.get(`/blogs/${params?.id}`, {}, true);
      const blogData = response.data;

      setForm({
        title: blogData.title || "",
        slug: blogData.slug || "",
        content: blogData.content || "",
        excerpt: blogData.excerpt || "",
        tags: Array.isArray(blogData.tags) ? blogData.tags.join(", ") : "",
        category: blogData.category || "",
        isPublished: blogData.isPublished || false,
        metaTitle: blogData.metaTitle || "",
        metaDescription: blogData.metaDescription || "",
        coverImage: blogData.coverImage || "",
      });

      if (blogData.coverImage) {
        setImagePreview(blogData.coverImage);
      }

      setTimeout(() => {
        initializeQuill(blogData.content);
      }, 100);
    } catch (err) {
      setError("Failed to fetch blog data");
    } finally {
      setFetchLoading(false);
    }
  };

  const initializeQuill = (content = "") => {
    if (window.Quill && quillRef.current && !quillInstance.current) {
      quillInstance.current = new window.Quill(quillRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ align: [] }],
            ["link", "image", "video"],
            ["blockquote", "code-block"],
            ["clean"],
          ],
        },
        placeholder: "Write your blog content here...",
      });

      if (content) {
        quillInstance.current.root.innerHTML = content;
      }

      quillInstance.current.on("text-change", () => {
        setForm((prev) => ({
          ...prev,
          content: quillInstance.current.root.innerHTML,
        }));
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        setImagePreview(imageUrl);
        setForm((prev) => ({ ...prev, coverImage: imageUrl }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        ...form,
        tags: form.tags.split(",").map((tag) => tag.trim().toLowerCase()),
        publishedAt: form.isPublished ? new Date().toISOString() : null,
      };

      await apiService.put(`/blogs/${params.id}`, payload, true);
      router.push("/super-admin/blogs");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to update blog. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete this blog? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      setDeleteLoading(true);
      await apiService.delete(`/blogs/${params.id}`, true);
      router.push("/super-admin/blogs");
    } catch (err) {
      setError("Failed to delete blog. Try again.");
    } finally {
      setDeleteLoading(false);
    }
  };

  const togglePreview = () => {
    setPreview(!preview);
  };

  const goBack = () => {
    router.push("/super-admin/blogs");
  };

  if (fetchLoading) {
    return (
      <AdminLayout>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading blog data...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="container mx-auto px-6 py-8 max-w-6xl">
          <div className="mb-8">
            <button
              onClick={goBack}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blogs
            </button>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              Edit Blog Post
            </h1>
            <p className="text-slate-600">
              Update your blog content and settings
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Type className="w-5 h-5 text-indigo-600" />
                    <h2 className="font-semibold text-slate-900">
                      Basic Information
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Title *
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                        className="w-full text-gray-600 text-gray-600 border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        placeholder="Enter blog title"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Slug *
                      </label>
                      <input
                        type="text"
                        name="slug"
                        value={form.slug}
                        onChange={handleChange}
                        required
                        className="w-full text-gray-600 text-gray-600 border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        placeholder="url-friendly-slug"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Excerpt
                    </label>
                    <textarea
                      name="excerpt"
                      rows={3}
                      value={form.excerpt}
                      onChange={handleChange}
                      className="w-full text-gray-600 border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                      placeholder="Brief description of your blog post"
                    />
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Image className="w-5 h-5 text-indigo-600" />
                    <h2 className="font-semibold text-slate-900">
                      Cover Image
                    </h2>
                  </div>

                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-indigo-400 transition-colors">
                    {imagePreview ? (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Cover preview"
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="text-indigo-600 hover:text-indigo-700 font-medium"
                        >
                          Change Image
                        </button>
                      </div>
                    ) : (
                      <div>
                        <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="text-indigo-600 hover:text-indigo-700 font-medium"
                        >
                          Upload Cover Image
                        </button>
                        <p className="text-slate-500 text-sm mt-2">
                          PNG, JPG up to 10MB
                        </p>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <AlignLeft className="w-5 h-5 text-indigo-600" />
                    <h2 className="font-semibold text-slate-900">Content</h2>
                  </div>

                  <div className="text-gray-600 border border-slate-300 rounded-lg overflow-hidden">
                    <div ref={quillRef} className="min-h-[400px]" />
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Tag className="w-5 h-5 text-indigo-600" />
                    <h2 className="font-semibold text-slate-900">
                      Categories & Tags
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Category
                      </label>
                      <input
                        type="text"
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="w-full text-gray-600 text-gray-600 border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        placeholder="Technology, Design, Business..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Tags
                      </label>
                      <input
                        type="text"
                        name="tags"
                        value={form.tags}
                        onChange={handleChange}
                        className="w-full text-gray-600 text-gray-600 border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        placeholder="react, javascript, tutorial"
                      />
                      <p className="text-xs text-slate-500 mt-1">
                        Separate tags with commas
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Globe className="w-5 h-5 text-indigo-600" />
                    <h2 className="font-semibold text-slate-900">
                      SEO Settings
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Meta Title
                      </label>
                      <input
                        type="text"
                        name="metaTitle"
                        value={form.metaTitle}
                        onChange={handleChange}
                        maxLength={60}
                        className="w-full text-gray-600 border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        placeholder="SEO optimized title"
                      />
                      <p className="text-xs text-slate-500 mt-1">
                        {form.metaTitle.length}/60 characters
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Meta Description
                      </label>
                      <textarea
                        name="metaDescription"
                        rows={3}
                        value={form.metaDescription}
                        onChange={handleChange}
                        maxLength={160}
                        className="w-full text-gray-600 border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                        placeholder="Brief description for search engines"
                      />
                      <p className="text-xs text-slate-500 mt-1">
                        {form.metaDescription.length}/160 characters
                      </p>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <h3 className="font-semibold text-slate-900 mb-4">
                    Publish Settings
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">
                        Status
                      </span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="isPublished"
                          checked={form.isPublished}
                          onChange={handleChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        <span className="ml-3 text-sm font-medium text-slate-700">
                          {form.isPublished ? "Published" : "Draft"}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <h3 className="font-semibold text-slate-900 mb-4">Actions</h3>

                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                    >
                      <Save className="w-4 h-4" />
                      {loading ? "Updating..." : "Update Blog"}
                    </button>

                    <button
                      type="button"
                      onClick={handleDelete}
                      disabled={deleteLoading}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                    >
                      <Trash2 className="w-4 h-4" />
                      {deleteLoading ? "Deleting..." : "Delete Blog"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

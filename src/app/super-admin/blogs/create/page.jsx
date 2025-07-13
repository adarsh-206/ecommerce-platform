"use client";

import { useState, useRef } from "react";
import { Upload, Save, Tag, Image, Type } from "lucide-react";
import AdminLayout from "@/components/layouts/AdminLayout";
import ContentEditor from "./ContentEditor";
import apiService from "@/app/utils/apiService";
import { useUser } from "@/context/UserContext";

export default function CreateBlogPage() {
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
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const fileInputRef = useRef(null);
  const { userDetails } = useUser();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedValue = type === "checkbox" ? checked : value;

    setForm((prev) => {
      const newForm = {
        ...prev,
        [name]: updatedValue,
      };

      if (name === "title") {
        newForm.slug = value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
        newForm.metaTitle = value.slice(0, 60);
      }

      if (name === "excerpt") {
        newForm.metaDescription = value.slice(0, 160);
      }

      return newForm;
    });
  };

  const handleContentChange = (content) => {
    setForm((prev) => ({ ...prev, content }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        setImagePreview(imageUrl);
      };
      reader.readAsDataURL(file);
      setForm((prev) => ({ ...prev, coverImage: file }));
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
        author: userDetails?._id,
        publishedAt: form.isPublished ? new Date().toISOString() : null,
      };

      const response = await apiService.post("/blogs/", payload, true, true);

      if (response.status === 201 || response.status === 200) {
        alert("Blog created successfully!");
        window.location.href = "/super-admin/blogs";
      } else {
        throw new Error("Unexpected response");
      }
    } catch (err) {
      setError("Failed to create blog. Try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="min-h-screen">
        <div className="container mx-auto px-6 py-8 max-w-6xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              Create New Blog Post
            </h1>
            <p className="text-slate-600">
              Craft engaging content with our powerful editor
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Type className="w-5 h-5 text-orange-600" />
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
                        className="w-full text-gray-600 border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        placeholder="Enter blog title"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Excerpt (Short Description)
                    </label>
                    <textarea
                      name="excerpt"
                      rows={3}
                      value={form.excerpt}
                      onChange={handleChange}
                      className="w-full text-gray-600 border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                      placeholder="Brief description of your blog post"
                    />
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Image className="w-5 h-5 text-orange-600" />
                    <h2 className="font-semibold text-slate-900">
                      Cover Image
                    </h2>
                  </div>

                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-orange-400 transition-colors">
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
                          className="text-orange-600 hover:text-orange-700 font-medium"
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
                          className="text-orange-600 hover:text-orange-700 font-medium"
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
                    <Tag className="w-5 h-5 text-orange-600" />
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
                        className="w-full text-gray-600 border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
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
                        className="w-full text-gray-600 border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        placeholder="react, javascript, tutorial"
                      />
                      <p className="text-xs text-slate-500 mt-1">
                        Separate tags with commas
                      </p>
                    </div>
                  </div>
                </div>

                <ContentEditor
                  value={form.content}
                  onChange={handleContentChange}
                />

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
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
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
                      type="submit"
                      onClick={handleSubmit}
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                    >
                      <Save className="w-4 h-4" />
                      {loading ? "Creating..." : "Create Blog"}
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

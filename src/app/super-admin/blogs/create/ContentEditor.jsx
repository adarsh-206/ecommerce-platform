"use client";

import dynamic from "next/dynamic";
import { AlignLeft } from "lucide-react";

const QuillEditor = dynamic(() => import("./QuillEditor"), {
  ssr: false,
  loading: () => (
    <div className="min-h-[400px] flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto mb-2"></div>
        <p className="text-slate-600">Loading editor...</p>
      </div>
    </div>
  ),
});

export default function ContentEditor({ content, onChange }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <AlignLeft className="w-5 h-5 text-orange-600" />
        <h2 className="font-semibold text-slate-900">Content</h2>
      </div>

      <div className="border border-slate-300 rounded-lg overflow-hidden">
        <QuillEditor content={content} onContentChange={onChange} />
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";

export default function QuillEditor({ content, onContentChange }) {
  const quillRef = useRef(null);
  const editorRef = useRef(null);
  const [isQuillLoaded, setIsQuillLoaded] = useState(false);

  useEffect(() => {
    const loadQuill = async () => {
      if (typeof window === "undefined") return;

      if (!window.Quill) {
        const quillCSS = document.createElement("link");
        quillCSS.rel = "stylesheet";
        quillCSS.href =
          "https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.7/quill.snow.min.css";
        document.head.appendChild(quillCSS);

        const quillScript = document.createElement("script");
        quillScript.src =
          "https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.7/quill.min.js";
        quillScript.onload = () => setIsQuillLoaded(true);
        document.head.appendChild(quillScript);
      } else {
        setIsQuillLoaded(true);
      }
    };

    loadQuill();
  }, []);

  useEffect(() => {
    if (!isQuillLoaded || !quillRef.current || editorRef.current) return;

    const quill = new window.Quill(quillRef.current, {
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

    editorRef.current = quill;

    if (content) {
      quill.root.innerHTML = content;
    }

    quill.on("text-change", () => {
      if (onContentChange) {
        onContentChange(quill.root.innerHTML);
      }
    });

    return () => {
      if (editorRef.current) {
        editorRef.current = null;
      }
    };
  }, [isQuillLoaded]);

  useEffect(() => {
    if (editorRef.current && content !== editorRef.current.root.innerHTML) {
      editorRef.current.root.innerHTML = content || "";
    }
  }, [content]);

  if (!isQuillLoaded) {
    return (
      <div className="min-h-[400px] flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto mb-2"></div>
          <p className="text-slate-600">Loading editor...</p>
        </div>
      </div>
    );
  }

  return <div ref={quillRef} className="min-h-[400px] text-gray-600" />;
}

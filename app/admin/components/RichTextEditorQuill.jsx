"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => (
    <div className="min-h-[400px] bg-gray-50 animate-pulse rounded-lg border border-slate-300"></div>
  ),
});

const RichTextEditor = ({
  content = "",
  onChange,
  placeholder = "พิมพ์เนื้อหาข่าวที่นี่...",
  className = "",
}) => {
  // Quill modules configuration for Word-like experience
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ align: [] }],
        ["link", "image"],
        ["blockquote", "code-block"],
        [{ script: "sub" }, { script: "super" }],
        ["clean"],
      ],
      clipboard: {
        matchVisual: false,
      },
    }),
    []
  );

  // Quill formats configuration
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "align",
    "color",
    "background",
    "script",
    "code-block",
  ];

  const handleChange = (content, delta, source, editor) => {
    if (onChange) {
      const html = editor.getHTML();
      onChange(html);
    }
  };

  return (
    <div className={`rich-text-editor ${className}`}>
      <div className="border border-slate-300 rounded-lg focus-within:ring-2 focus-within:ring-sky-500 focus-within:border-sky-500 bg-white">
        <ReactQuill
          theme="snow"
          value={content}
          onChange={handleChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
          style={{
            height: "400px",
            fontFamily:
              '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}
        />
      </div>
      <div className="mt-14 text-xs text-slate-500 space-y-1">
        <p className="text-emerald-600">
          ✓ ใช้เครื่องมือแก้ไขข้อความแบบ Word - ไม่ต้องรู้ HTML
        </p>
        <p className="text-blue-600">
          ℹ️ จัดรูปแบบข้อความได้หลากหลาย: หัวข้อ ตัวหนา ตัวเอียง ลิสต์ และอื่นๆ
        </p>
        <p className="text-purple-600">
          🎨 เปลี่ยนสีข้อความ จัดตำแหน่ง และเพิ่มรูปภาพได้
        </p>
        <p className="text-orange-600">
          📋 คัดลอกและวางข้อความจาก Word ได้โดยตรง
        </p>
      </div>
    </div>
  );
};

export default RichTextEditor;

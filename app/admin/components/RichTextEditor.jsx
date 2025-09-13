"use client";

import React, { useRef } from "react";
import TipTapEditor from "reactjs-tiptap-editor";

const RichTextEditor = ({
  content = "",
  onChange,
  placeholder = "พิมพ์เนื้อหาข่าวที่นี่...",
  className = "",
}) => {
  const handleChange = (content) => {
    if (onChange) {
      // Return HTML content for storage
      onChange(content);
    }
  };

  return (
    <div className={`rich-text-editor ${className}`}>
      <div className="border border-slate-300 rounded-lg focus-within:ring-2 focus-within:ring-sky-500 focus-within:border-sky-500 bg-white min-h-[400px]">
        <TipTapEditor
          content={content}
          placeholder={placeholder}
          onChangeContent={handleChange}
          extensions={[
            "Bold",
            "Italic",
            "Underline",
            "Strike",
            "TextAlign",
            "TextColor",
            "Heading",
            "Paragraph",
            "OrderedList",
            "BulletList",
            "Indent",
            "Link",
            "Table",
            "Blockquote",
            "HorizontalRule",
            "History",
          ]}
          toolbar={[
            "bold",
            "italic",
            "underline",
            "strike",
            "|",
            "heading1",
            "heading2",
            "heading3",
            "|",
            "bulletList",
            "orderedList",
            "|",
            "textAlign",
            "|",
            "indent",
            "outdent",
            "|",
            "textColor",
            "|",
            "link",
            "|",
            "blockquote",
            "|",
            "table",
            "|",
            "horizontalRule",
            "|",
            "undo",
            "redo",
          ]}
        />
      </div>
      <div className="mt-2 text-xs text-slate-500 space-y-1">
        <p className="text-emerald-600">
          ✓ ใช้เครื่องมือแก้ไขข้อความแบบ Word - ไม่ต้องรู้ HTML
        </p>
        <p className="text-blue-600">
          ℹ️ จัดรูปแบบข้อความได้หลากหลาย: ตัวหนา ตัวเอียง ลิสต์ ตาราง และอื่นๆ
        </p>
        <p className="text-purple-600">
          🎨 เปลี่ยนสีข้อความ จัดตำแหน่ง และเพิ่มรูปภาพได้
        </p>
      </div>
    </div>
  );
};

export default RichTextEditor;

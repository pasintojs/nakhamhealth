"use client";

import React, { useState, useRef } from "react";

const SimpleRichTextEditor = ({
  content = "",
  onChange,
  placeholder = "พิมพ์เนื้อหาข่าวที่นี่...",
  className = "",
}) => {
  const [editorContent, setEditorContent] = useState(content);
  const editorRef = useRef(null);

  // Handle normal typing - just like a regular textarea
  const handleInputChange = (e) => {
    const newContent = e.target.value;
    setEditorContent(newContent);

    // Convert line breaks to HTML for storage
    const htmlContent = newContent.replace(/\n/g, "<br>");
    onChange?.(htmlContent);
  };

  // Handle keyboard shortcuts for formatting
  const handleKeyDown = (e) => {
    // Ctrl+B for bold
    if (e.ctrlKey && e.key === "b") {
      e.preventDefault();
      insertFormatting("**", "**");
    }
    // Ctrl+I for italic
    else if (e.ctrlKey && e.key === "i") {
      e.preventDefault();
      insertFormatting("*", "*");
    }
    // Allow normal Tab behavior for indentation
    else if (e.key === "Tab") {
      e.preventDefault();
      const textarea = e.target;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue =
        editorContent.substring(0, start) +
        "    " +
        editorContent.substring(end);
      setEditorContent(newValue);
      onChange?.(newValue.replace(/\n/g, "<br>"));

      // Set cursor position after the inserted spaces
      setTimeout(() => {
        textarea.setSelectionRange(start + 4, start + 4);
      }, 0);
    }
  };

  // Insert formatting around selected text
  const insertFormatting = (before, after) => {
    const textarea = editorRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = editorContent.substring(start, end);
    const newText = before + selectedText + after;

    const newContent =
      editorContent.substring(0, start) +
      newText +
      editorContent.substring(end);
    setEditorContent(newContent);
    onChange?.(newContent.replace(/\n/g, "<br>"));

    // Set cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selectedText.length
      );
    }, 0);
  };

  // Initialize content from HTML
  React.useEffect(() => {
    if (content && content !== editorContent) {
      // Convert HTML back to plain text with line breaks
      const textContent = content
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/<p>(.*?)<\/p>/gi, "$1\n")
        .replace(/<[^>]*>/g, "")
        .trim();
      setEditorContent(textContent);
    }
  }, [content]);

  return (
    <div className={`rich-text-editor ${className}`}>
      {/* Simple Toolbar */}
      <div className="border border-slate-300 border-b-0 rounded-t-lg bg-slate-50 p-2">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => insertFormatting("**", "**")}
            className="px-3 py-1.5 text-sm font-bold bg-white border border-slate-300 rounded hover:bg-slate-100 transition-colors"
            title="ตัวหนา (Ctrl+B)"
          >
            B
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("*", "*")}
            className="px-3 py-1.5 text-sm italic bg-white border border-slate-300 rounded hover:bg-slate-100 transition-colors"
            title="ตัวเอียง (Ctrl+I)"
          >
            I
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("## ", "")}
            className="px-3 py-1.5 text-sm font-semibold bg-white border border-slate-300 rounded hover:bg-slate-100 transition-colors"
            title="หัวข้อ"
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("- ", "")}
            className="px-3 py-1.5 text-sm bg-white border border-slate-300 rounded hover:bg-slate-100 transition-colors"
            title="รายการ"
          >
            •
          </button>
        </div>
      </div>

      {/* Normal Textarea - Works like any regular text editor */}
      <textarea
        ref={editorRef}
        value={editorContent}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full min-h-[300px] p-4 border border-slate-300 rounded-b-lg resize-vertical focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 font-sans text-base leading-relaxed"
        style={{
          fontFamily: "system-ui, -apple-system, sans-serif",
          lineHeight: "1.6",
        }}
      />

      {/* Helper Text */}
      <div className="mt-2 text-xs text-slate-500">
        <p>
          💡 เคล็ดลับ: ใช้ Ctrl+B สำหรับตัวหนา, Ctrl+I สำหรับตัวเอียง, Tab
          สำหรับย่อหน้า
        </p>
      </div>
    </div>
  );
};

export default SimpleRichTextEditor;

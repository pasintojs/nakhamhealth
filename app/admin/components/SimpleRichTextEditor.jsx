"use client";

import React, { useState, useRef, useCallback } from "react";

const RichTextEditor = ({
  content = "",
  onChange,
  placeholder = "พิมพ์เนื้อหาข่าวที่นี่...",
  className = "",
}) => {
  const [editorContent, setEditorContent] = useState(content);
  const [selectedText, setSelectedText] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const editorRef = useRef(null);

  // Handle content changes
  const handleContentChange = useCallback(
    (newContent) => {
      setEditorContent(newContent);
      if (onChange) {
        // Convert simple formatting to HTML
        const htmlContent = convertToHTML(newContent);
        onChange(htmlContent);
      }
    },
    [onChange]
  );

  // Convert simple formatting markers to HTML
  const convertToHTML = (text) => {
    if (!text) return "";

    let html = text
      // First preserve leading spaces at the very beginning of content
      .replace(/^( +)/, (match) => "&nbsp;".repeat(match.length))
      // Then preserve leading spaces at the beginning of each line
      .replace(
        /\n( +)/g,
        (match, spaces) => "\n" + "&nbsp;".repeat(spaces.length)
      )
      // Preserve multiple spaces within text
      .replace(/  +/g, (match) => "&nbsp;".repeat(match.length))
      // Convert line breaks to HTML
      .replace(/\n/g, "<br>")
      // Convert bold markers **text** to <strong>
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      // Convert italic markers *text* to <em>
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      // Convert headers # to <h1>, ## to <h2>, ### to <h3>
      .replace(/^### (.*$)/gm, "<h3>$1</h3>")
      .replace(/^## (.*$)/gm, "<h2>$1</h2>")
      .replace(/^# (.*$)/gm, "<h1>$1</h1>")
      // Convert bullet points - to <li>
      .replace(/^- (.*$)/gm, "<li>$1</li>")
      // Wrap consecutive <li> tags in <ul>
      .replace(/(<li>.*<\/li>)/gs, "<ul>$1</ul>")
      // Convert numbered lists 1. to <ol><li>
      .replace(/^\d+\. (.*$)/gm, "<li>$1</li>")
      .replace(/(<li>.*<\/li>)/gs, (match) => {
        if (!match.includes("<ul>")) {
          return "<ol>" + match + "</ol>";
        }
        return match;
      });

    // Wrap content in paragraphs - Don't trim to preserve spaces
    const paragraphs = html.split("<br><br>").filter((p) => p !== "");
    if (paragraphs.length > 1) {
      html = paragraphs.map((p) => `<p>${p}</p>`).join("");
    } else {
      html = `<p>${html}</p>`;
    }

    return html;
  };

  // Convert HTML back to simple text for editing
  const convertFromHTML = (html) => {
    if (!html) return "";

    return (
      html
        .replace(/<h1>(.*?)<\/h1>/g, "# $1")
        .replace(/<h2>(.*?)<\/h2>/g, "## $1")
        .replace(/<h3>(.*?)<\/h3>/g, "### $1")
        .replace(/<strong>(.*?)<\/strong>/g, "**$1**")
        .replace(/<em>(.*?)<\/em>/g, "*$1*")
        .replace(/<ul><li>(.*?)<\/li><\/ul>/g, "- $1")
        .replace(/<ol><li>(.*?)<\/li><\/ol>/g, "1. $1")
        .replace(/<li>(.*?)<\/li>/g, "- $1")
        .replace(/<br>/g, "\n")
        .replace(/<p>(.*?)<\/p>/g, "$1\n\n")
        // Convert &nbsp; back to regular spaces
        .replace(/&nbsp;/g, " ")
        .replace(/<[^>]*>/g, "") // Remove any remaining HTML tags
        .trim()
    );
  };

  // Insert formatting
  const insertFormatting = (before, after = "") => {
    const textarea = editorRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    const newText =
      textarea.value.substring(0, start) +
      before +
      selectedText +
      after +
      textarea.value.substring(end);

    setEditorContent(newText);
    handleContentChange(newText);

    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  // Insert indentation (4 spaces) at the beginning of current line or selected lines
  const insertIndentation = () => {
    const textarea = editorRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;

    // Find the start of the current line
    const lineStart = text.lastIndexOf("\n", start - 1) + 1;
    const lineEnd = text.indexOf("\n", end);
    const actualLineEnd = lineEnd === -1 ? text.length : lineEnd;

    // Get the selected lines
    const selectedLines = text.substring(lineStart, actualLineEnd);
    const lines = selectedLines.split("\n");

    // Add 4 spaces to the beginning of each line
    const indentedLines = lines.map((line) => "    " + line).join("\n");

    // Replace the content
    const newText =
      text.substring(0, lineStart) +
      indentedLines +
      text.substring(actualLineEnd);

    // Calculate new cursor positions
    const spacesAdded = 4 * lines.length;
    const newStart = start + 4; // Always move cursor 4 spaces right from original position
    const newEnd = end + spacesAdded;

    // Update content directly
    setEditorContent(newText);

    // Use requestAnimationFrame to ensure DOM update completes before setting cursor
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(newStart, newEnd);

      // Call handleContentChange after cursor is set
      handleContentChange(newText);
    });
  };

  // Simple indentation - just insert 4 spaces at cursor position
  const insertSimpleIndent = () => {
    const textarea = editorRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentValue = textarea.value;

    // Ensure textarea is focused
    textarea.focus();

    // Insert 4 spaces at the current cursor position
    const newValue =
      currentValue.substring(0, start) + "    " + currentValue.substring(end);

    // Update the textarea value directly
    textarea.value = newValue;

    // Set cursor position after the inserted spaces
    const newCursorPosition = start + 4;
    textarea.setSelectionRange(newCursorPosition, newCursorPosition);

    // Update state and trigger onChange
    setEditorContent(newValue);
    handleContentChange(newValue);

    // Force focus back to textarea to ensure cursor is visible
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursorPosition, newCursorPosition);
    }, 0);
  }; // Initialize content from HTML if needed
  React.useEffect(() => {
    if (content && content !== editorContent) {
      const textContent = convertFromHTML(content);
      setEditorContent(textContent);
    }
  }, [content]);

  return (
    <div className={`rich-text-editor ${className}`}>
      {/* Toolbar */}
      <div className="border border-slate-300 border-b-0 rounded-t-lg bg-slate-50 p-2">
        <div className="flex flex-wrap gap-2">
          {/* Headers */}
          <button
            type="button"
            onClick={() => insertFormatting("# ")}
            className="px-3 py-1 text-sm bg-white border border-slate-300 rounded hover:bg-slate-100 transition-colors"
            title="หัวข้อหลัก (H1)"
          >
            H1
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("## ")}
            className="px-3 py-1 text-sm bg-white border border-slate-300 rounded hover:bg-slate-100 transition-colors"
            title="หัวข้อรอง (H2)"
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("### ")}
            className="px-3 py-1 text-sm bg-white border border-slate-300 rounded hover:bg-slate-100 transition-colors"
            title="หัวข้อย่อย (H3)"
          >
            H3
          </button>

          <div className="border-l border-slate-300 mx-1"></div>

          {/* Text formatting */}
          <button
            type="button"
            onClick={() => insertFormatting("**", "**")}
            className="px-3 py-1 text-sm font-bold bg-white border border-slate-300 rounded hover:bg-slate-100 transition-colors"
            title="ตัวหนา"
          >
            B
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("*", "*")}
            className="px-3 py-1 text-sm italic bg-white border border-slate-300 rounded hover:bg-slate-100 transition-colors"
            title="ตัวเอียง"
          >
            I
          </button>

          <div className="border-l border-slate-300 mx-1"></div>

          {/* Indentation */}
          <button
            type="button"
            onClick={() => insertSimpleIndent()}
            className="px-3 py-1 text-sm bg-white border border-slate-300 rounded hover:bg-slate-100 transition-colors"
            title="เยื้องย่อหน้า (เพิ่มช่องว่าง 4 ตัว)"
          >
            ⇥ เยื้อง
          </button>
          <button
            type="button"
            onClick={() => {
              const textarea = editorRef.current;
              if (!textarea) return;

              // Move cursor to the very beginning
              textarea.setSelectionRange(0, 0);
              textarea.focus();

              // Insert spaces at the beginning
              insertSimpleIndent();
            }}
            className="px-2 py-1 text-xs bg-blue-50 border border-blue-300 rounded hover:bg-blue-100 transition-colors text-blue-700"
            title="เยื้องจากจุดเริ่มต้นของข้อความ"
          >
            ⇥ เริ่มต้น
          </button>

          <div className="border-l border-slate-300 mx-1"></div>

          {/* Lists */}
          <button
            type="button"
            onClick={() => insertFormatting("- ")}
            className="px-3 py-1 text-sm bg-white border border-slate-300 rounded hover:bg-slate-100 transition-colors"
            title="รายการจุด"
          >
            • List
          </button>
          <button
            type="button"
            onClick={() => insertFormatting("1. ")}
            className="px-3 py-1 text-sm bg-white border border-slate-300 rounded hover:bg-slate-100 transition-colors"
            title="รายการเลข"
          >
            1. List
          </button>

          <div className="border-l border-slate-300 mx-1"></div>

          {/* Preview toggle */}
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className={`px-3 py-1 text-sm border border-slate-300 rounded transition-colors ${
              showPreview
                ? "bg-sky-100 text-sky-700 border-sky-300"
                : "bg-white hover:bg-slate-100"
            }`}
            title="แสดงตัวอย่าง"
          >
            👁️ Preview
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="border border-slate-300 rounded-b-lg bg-white">
        <textarea
          ref={editorRef}
          value={editorContent}
          onChange={(e) => handleContentChange(e.target.value)}
          onKeyDown={(e) => {
            // Handle Tab key for indentation
            if (e.key === "Tab") {
              e.preventDefault();
              e.stopPropagation();
              insertSimpleIndent();
              return false;
            }
          }}
          onKeyUp={(e) => {
            // Sync state on any key changes
            if (e.target.value !== editorContent) {
              setEditorContent(e.target.value);
              handleContentChange(e.target.value);
            }
          }}
          placeholder={placeholder}
          className="w-full min-h-[400px] p-4 border-0 rounded-b-lg focus:outline-none resize-none"
          style={{
            fontFamily:
              '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: "14px",
            lineHeight: "1.6",
            whiteSpace: "pre-wrap", // Preserve spaces and line breaks
            wordWrap: "break-word",
          }}
        />
      </div>

      {/* Preview */}
      {showPreview && (
        <div className="mt-4">
          <div className="border border-slate-300 rounded-lg bg-white">
            <div className="bg-slate-50 px-4 py-2 border-b border-slate-300 rounded-t-lg">
              <h4 className="text-sm font-medium text-slate-700">
                ตัวอย่างการแสดงผล
              </h4>
            </div>
            <div
              className="p-4 prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: convertToHTML(editorContent) }}
            />
          </div>
        </div>
      )}

      {/* Help text */}
      <div className="mt-3 text-xs text-slate-500 space-y-1">
        <p className="text-emerald-600">
          ✓ ใช้เครื่องมือแก้ไขข้อความแบบ Word - ไม่ต้องรู้ HTML
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
          <div>
            <p>
              <kbd className="px-1 py-0.5 bg-slate-100 rounded text-xs">
                **ข้อความ**
              </kbd>{" "}
              = <strong>ตัวหนา</strong>
            </p>
            <p>
              <kbd className="px-1 py-0.5 bg-slate-100 rounded text-xs">
                *ข้อความ*
              </kbd>{" "}
              = <em>ตัวเอียง</em>
            </p>
            <p>
              <kbd className="px-1 py-0.5 bg-slate-100 rounded text-xs">
                # หัวข้อ
              </kbd>{" "}
              = หัวข้อหลัก
            </p>
          </div>
          <div>
            <p>
              <kbd className="px-1 py-0.5 bg-slate-100 rounded text-xs">
                - รายการ
              </kbd>{" "}
              = • รายการจุด
            </p>
            <p>
              <kbd className="px-1 py-0.5 bg-slate-100 rounded text-xs">
                1. รายการ
              </kbd>{" "}
              = รายการเลข
            </p>
            <p>
              <kbd className="px-1 py-0.5 bg-slate-100 rounded text-xs">
                Tab
              </kbd>{" "}
              = เยื้องที่ตำแหน่งเคอร์เซอร์
            </p>
            <p className="text-blue-600">
              💡 ใช้ปุ่ม "⇥ เริ่มต้น" เพื่อเยื้องจากจุดเริ่มต้น
            </p>
            <p className="text-blue-600">
              💡 เลือกข้อความแล้วคลิกปุ่มเพื่อจัดรูปแบบ
            </p>
            <p className="text-green-600">
              ✨ การเยื้องจะแสดงเป็นช่องว่างในผลลัพธ์
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RichTextEditor;

"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import Image from "next/image";

export default function KnowledgeList({ onEdit }) {
  const [knowledge, setKnowledge] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchKnowledge();
  }, []);

  const fetchKnowledge = async () => {
    try {
      const { data, error } = await supabase
        .from("knowledge")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setKnowledge(data || []);
    } catch (error) {
      console.error("Error fetching knowledge:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("คุณแน่ใจหรือไม่ที่จะลบความรู้นี้?")) return;

    try {
      const { error } = await supabase.from("knowledge").delete().eq("id", id);

      if (error) throw error;

      // Refresh knowledge list
      fetchKnowledge();
    } catch (error) {
      console.error("Error deleting knowledge:", error);
      alert("เกิดข้อผิดพลาดในการลบความรู้");
    }
  };

  const handleTogglePublish = async (id, currentStatus) => {
    try {
      const { error } = await supabase
        .from("knowledge")
        .update({ is_published: !currentStatus })
        .eq("id", id);

      if (error) throw error;

      // Refresh knowledge list
      fetchKnowledge();
    } catch (error) {
      console.error("Error updating knowledge:", error);
      alert("เกิดข้อผิดพลาดในการอัปเดตสถานะ");
    }
  };

  const filteredKnowledge = knowledge.filter((item) => {
    if (filter === "all") return true;
    if (filter === "published") return item.is_published;
    if (filter === "draft") return !item.is_published;
    return item.category === filter;
  });

  const categories = [
    "โภชนาการ",
    "การออกกำลังกาย",
    "สุขภาพจิต",
    "การป้องกันโรค",
    "ความรู้ทั่วไป",
  ];

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600 mx-auto mb-4"></div>
          <p className="text-slate-600">กำลังโหลดความรู้...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Filters */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === "all"
                ? "bg-sky-500 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            ทั้งหมด ({knowledge.length})
          </button>
          <button
            onClick={() => setFilter("published")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === "published"
                ? "bg-green-500 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            เผยแพร่แล้ว ({knowledge.filter((n) => n.is_published).length})
          </button>
          <button
            onClick={() => setFilter("draft")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === "draft"
                ? "bg-orange-500 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            แบบร่าง ({knowledge.filter((n) => !n.is_published).length})
          </button>

          <div className="border-l border-slate-300 mx-2"></div>

          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === category
                  ? "bg-sky-500 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {category} (
              {knowledge.filter((n) => n.category === category).length})
            </button>
          ))}
        </div>
      </div>

      {/* Knowledge List */}
      {filteredKnowledge.length === 0 ? (
        <div className="text-center py-12">
          <svg
            className="w-16 h-16 text-slate-300 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          <p className="text-slate-500">ไม่พบความรู้</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredKnowledge.map((item) => (
            <div
              key={item.id}
              className="bg-slate-50 rounded-lg border border-slate-200 p-4"
            >
              <div className="flex items-start gap-4">
                {/* Image */}
                <div className="relative w-20 h-20 flex-shrink-0">
                  <Image
                    src={
                      item.images && item.images.length > 0
                        ? item.images[0]
                        : item.image_url || "/images/about-1.svg"
                    }
                    alt={item.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                  {/* Multiple images indicator */}
                  {item.images && item.images.length > 1 && (
                    <div className="absolute bottom-1 right-1 bg-black bg-opacity-60 text-white text-xs px-1.5 py-0.5 rounded">
                      +{item.images.length - 1}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-800 mb-1 line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-600 mb-2 line-clamp-2">
                        {item.description}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span
                          className={`px-2 py-1 rounded-full font-medium ${
                            item.is_published
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {item.is_published ? "เผยแพร่แล้ว" : "แบบร่าง"}
                        </span>
                        <span>{item.category}</span>
                        <span>โดย {item.author}</span>
                        <span>
                          {new Date(item.created_at).toLocaleDateString(
                            "th-TH"
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => onEdit(item)}
                        className="p-2 text-slate-600 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                        title="แก้ไข"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>

                      <button
                        onClick={() =>
                          handleTogglePublish(item.id, item.is_published)
                        }
                        className={`p-2 rounded-lg transition-colors ${
                          item.is_published
                            ? "text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                            : "text-green-600 hover:text-green-700 hover:bg-green-50"
                        }`}
                        title={
                          item.is_published ? "ยกเลิกการเผยแพร่" : "เผยแพร่"
                        }
                      >
                        {item.is_published ? (
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        )}
                      </button>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        title="ลบ"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

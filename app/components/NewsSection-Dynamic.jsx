"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "../../lib/supabase";
import AutoSlideImage from "./AutoSlideImage";

export default function NewsSection() {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false })
        .limit(6);

      if (error) throw error;
      setNewsItems(data || []);
    } catch (error) {
      console.error("Error fetching news:", error);
      // Fallback to static data if Supabase fails
      setNewsItems([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 sm:py-20 bg-gradient-to-b from-cyan-50 to-emerald-50 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600 mx-auto mb-4"></div>
            <p className="text-slate-600">กำลังโหลดข่าวสาร...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-cyan-50 to-emerald-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.05),transparent_50%)]" />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Enhanced section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-white/95 backdrop-blur-lg rounded-full px-6 py-3 shadow-xl border-2 border-cyan-100 mb-6">
            <div className="w-3 h-3 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-lg font-bold text-slate-800">
              ข่าวสารและกิจกรรม
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-sky-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            ข่าวและกิจกรรมล่าสุด
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            ติดตามข่าวสารและกิจกรรมต่างๆ ของโรงพยาบาลส่งเสริมสุขภาพตำบลนาคำ
          </p>
        </div>

        {/* News grid */}
        {newsItems.length === 0 ? (
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
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
            <p className="text-slate-500">ไม่มีข่าวสารในขณะนี้</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
            {newsItems.map((item) => (
              <Link
                key={item.id}
                href={`/news/${item.id}`}
                className="block group h-full min-h-[28rem]"
              >
                <article className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-cyan-200/50 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer h-full flex flex-col">
                  {/* Image container */}
                  <div className="relative h-48 overflow-hidden flex-shrink-0">
                    <AutoSlideImage
                      images={
                        item.images && item.images.length > 0
                          ? item.images
                          : [item.image_url || "/images/about-1.svg"]
                      }
                      alt={item.title}
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      autoSlideInterval={4000}
                      showIndicator={true}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/95 backdrop-blur-sm text-sky-700 px-3 py-1 rounded-full text-sm font-semibold border border-cyan-200/50">
                        {item.category}
                      </span>
                    </div>

                    {/* Date badge */}
                    <div className="absolute bottom-4 right-4">
                      <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 border border-cyan-200/50">
                        <div className="flex items-center gap-2 text-sm">
                          <svg
                            className="w-4 h-4 text-sky-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="text-slate-700 font-medium">
                            {new Date(item.published_date).toLocaleDateString(
                              "th-TH",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-sky-700 transition-colors duration-300 line-clamp-2 min-h-[3.5rem]">
                      {item.title}
                    </h3>

                    <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow min-h-[4.5rem]">
                      {item.description}
                    </p>

                    {/* Action buttons - This will be pushed to bottom */}
                    <div className="flex items-center justify-between mt-auto">
                      <span className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                        <span>อ่านเพิ่มเติม</span>
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
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>

                      {/* Share button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          // Share functionality here
                        }}
                        className="p-2 rounded-full hover:bg-sky-50 text-slate-400 hover:text-sky-600 transition-colors duration-300"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}

        {/* View all button */}
        <div className="text-center mt-12">
          <Link
            href="/news"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 hover:from-sky-600 hover:via-cyan-600 hover:to-emerald-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            ดูข่าวทั้งหมด
          </Link>
        </div>
      </div>
    </section>
  );
}

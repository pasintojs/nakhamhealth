"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { supabase } from "../../../lib/supabase";

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchEventDetail();
    }
  }, [params.id]);

  const fetchEventDetail = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", params.id)
        .eq("is_active", true)
        .single();

      if (error) {
        console.error("Error fetching event:", error);
        setNotFound(true);
        return;
      }

      if (!data) {
        setNotFound(true);
        return;
      }

      setEvent(data);
    } catch (error) {
      console.error("Error:", error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return "";
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString("th-TH", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const getDaysUntilEvent = (dateString) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    const diffTime = eventDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "วันนี้";
    if (diffDays === 1) return "พรุ่งนี้";
    if (diffDays === -1) return "เมื่อวาน";
    if (diffDays < 0) return `ผ่านมาแล้ว ${Math.abs(diffDays)} วัน`;
    return `อีก ${diffDays} วัน`;
  };

  const getEventStatus = (dateString) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    eventDate.setHours(0, 0, 0, 0);

    if (eventDate < today) return "completed";
    if (eventDate.getTime() === today.getTime()) return "today";
    return "upcoming";
  };

  if (loading) {
    return (
      <div className="min-h-screen text-slate-900 bg-[radial-gradient(1200px_600px_at_80%_-10%,#e0f2fe_10%,transparent_60%),linear-gradient(to_bottom,#ffffff,rgba(224,242,254,0.3))]">
        <NavBar />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-slate-600">กำลังโหลดรายละเอียดกิจกรรม...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen text-slate-900 bg-[radial-gradient(1200px_600px_at_80%_-10%,#e0f2fe_10%,transparent_60%),linear-gradient(to_bottom,#ffffff,rgba(224,242,254,0.3))]">
        <NavBar />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="text-6xl text-slate-400 mb-4">🚫</div>
            <h1 className="text-2xl font-bold text-slate-800 mb-4">
              ไม่พบกิจกรรม
            </h1>
            <p className="text-slate-600 mb-8">
              กิจกรรมที่คุณกำลังมองหาไม่มีอยู่หรือได้ถูกลบไปแล้ว
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => router.back()}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                ← กลับ
              </button>
              <button
                onClick={() => router.push("/event")}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                ดูกิจกรรมทั้งหมด
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const eventStatus = getEventStatus(event.event_date);

  return (
    <div className="min-h-screen text-slate-900 bg-[radial-gradient(1200px_600px_at_80%_-10%,#e0f2fe_10%,transparent_60%),linear-gradient(to_bottom,#ffffff,rgba(224,242,254,0.3))]">
      <NavBar />

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center text-slate-600 hover:text-slate-800 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            กลับ
          </button>
        </div>

        {/* Event Header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="p-8">
            {/* Event Status and Category */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {event.category && (
                <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                  {event.category}
                </span>
              )}
              {event.is_featured && (
                <span className="bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full">
                  กิจกรรมเด่น
                </span>
              )}
              <span
                className={`text-sm px-3 py-1 rounded-full ${
                  eventStatus === "today"
                    ? "bg-green-100 text-green-800"
                    : eventStatus === "upcoming"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {getDaysUntilEvent(event.event_date)}
              </span>
            </div>

            {/* Event Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
              {event.title}
            </h1>

            {/* Event Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Date */}
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <svg
                    className="w-6 h-6 text-blue-600"
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
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-1">วันที่</h3>
                  <p className="text-slate-600">
                    {formatDate(event.event_date)}
                  </p>
                </div>
              </div>

              {/* Time */}
              {event.event_time && (
                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-lg mr-4">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-1">เวลา</h3>
                    <p className="text-slate-600">
                      {formatTime(event.event_time)}
                      {event.end_time && ` - ${formatTime(event.end_time)}`}
                    </p>
                  </div>
                </div>
              )}

              {/* Location */}
              {event.location && (
                <div className="flex items-start">
                  <div className="bg-red-100 p-3 rounded-lg mr-4">
                    <svg
                      className="w-6 h-6 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-1">
                      สถานที่
                    </h3>
                    <p className="text-slate-600">{event.location}</p>
                  </div>
                </div>
              )}

              {/* Created */}
              <div className="flex items-start">
                <div className="bg-purple-100 p-3 rounded-lg mr-4">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-1">
                    เผยแพร่เมื่อ
                  </h3>
                  <p className="text-slate-600">
                    {new Date(event.created_at).toLocaleDateString("th-TH", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Event Description */}
        {event.description && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              รายละเอียดกิจกรรม
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-700 text-lg leading-relaxed whitespace-pre-wrap">
                {event.description}
              </p>
            </div>
          </div>
        )}

        {/* Additional Information */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            ข้อมูลเพิ่มเติม
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-slate-800 mb-2">รหัสกิจกรรม</h3>
              <p className="text-slate-600 font-mono text-sm bg-gray-100 px-3 py-2 rounded">
                {event.id}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-800 mb-2">
                สถานะการเผยแพร่
              </h3>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm ${
                  event.is_active
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {event.is_active ? "เผยแพร่แล้ว" : "ไม่เผยแพร่"}
              </span>
            </div>
          </div>

          {event.updated_at !== event.created_at && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-slate-500">
                อัปเดตล่าสุด:{" "}
                {new Date(event.updated_at).toLocaleDateString("th-TH", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => router.push("/event")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            ดูกิจกรรมอื่นๆ
          </button>

          <button
            onClick={() => window.print()}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            พิมพ์รายละเอียด
          </button>

          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: event.title,
                  text:
                    event.description ||
                    "กิจกรรมจากโรงพยาบาลส่งเสริมสุขภาพตำบลนาคำ",
                  url: window.location.href,
                });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert("คัดลอกลิงก์แล้ว!");
              }
            }}
            className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            แชร์กิจกรรม
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

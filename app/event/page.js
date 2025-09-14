"use client";

import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

export default function CalendarPage() {
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(() => new Date(2025, 8, 14)); // September 2025 (month is 0-indexed)
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, [currentDate]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const startOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      const endOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      );

      console.log("Current Date:", currentDate);
      console.log(
        "Fetching events from:",
        startOfMonth.toISOString().split("T")[0]
      );
      console.log(
        "Fetching events to:",
        endOfMonth.toISOString().split("T")[0]
      );

      const { data, error } = await supabase
        .from("events")
        .select("*")
        .gte("event_date", startOfMonth.toISOString().split("T")[0])
        .lte("event_date", endOfMonth.toISOString().split("T")[0])
        .eq("is_active", true)
        .order("event_date", { ascending: true });

      if (error) {
        console.error("Error fetching events:", error);
        return;
      }

      console.log("Events fetched:", data);
      setEvents(data || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const getEventsForDate = (day) => {
    if (!day) return [];
    const dateString = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    )
      .toISOString()
      .split("T")[0];
    return events.filter((event) => event.event_date === dateString);
  };

  const navigateMonth = (direction) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
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

  const monthNames = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];

  const dayNames = [
    "อาทิตย์",
    "จันทร์",
    "อังคาร",
    "พุธ",
    "พฤหัสบดี",
    "ศุกร์",
    "เสาร์",
  ];

  return (
    <div className="min-h-screen text-slate-900 bg-[radial-gradient(1200px_600px_at_80%_-10%,#e0f2fe_10%,transparent_60%),linear-gradient(to_bottom,#ffffff,rgba(224,242,254,0.3))]">
      <NavBar />

      <div className="max-w-6xl mx-auto px-6 py-16 relative">
        {/* Enhanced section header */}
        <div className="text-center mb-12">
          {/* <div className="inline-flex items-center gap-3 bg-white/95 backdrop-blur-lg rounded-full px-6 py-3 shadow-xl border-2 border-cyan-100 mb-6">
            <div className="w-3 h-3 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-lg font-bold text-slate-800">
              ตารางการดำเนินงานและกิจกรรม
            </span>
          </div> */}

          <h1 className="animate-pulse text-4xl pt-1 sm:text-5xl font-bold bg-gradient-to-r from-sky-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            ตารางการดำเนินงาน
          </h1>

          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            ตารางการดำเนินงานของโรงพยาบาลส่งเสริมสุขภาพตำบลนาคำ
          </p>
        </div>

        {/* Service Schedule Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-cyan-200/50 p-8 mb-8 relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-cyan-50/30 to-sky-50/50 opacity-50" />

          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full animate-pulse"></div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent">
                ตารางการให้บริการประจำ
              </h3>
            </div>

            {/* Service Hours */}
            {/* <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-emerald-200/50 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🌅</span>
                  <h4 className="font-bold text-slate-800">
                    เวลาให้บริการเช้า
                  </h4>
                </div>
                <p className="text-lg font-semibold text-emerald-700">
                  08.30-12.00 น.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-sky-200/50 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🌇</span>
                  <h4 className="font-bold text-slate-800">
                    เวลาให้บริการบ่าย
                  </h4>
                </div>
                <p className="text-lg font-semibold text-sky-700">
                  13.00-16.30 น.
                </p>
              </div>
            </div> */}

            {/* Weekly Schedule */}
            <div className="grid lg:grid-cols-7 gap-4 mb-8">
              {/* Monday */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-cyan-200/50 p-4 hover:shadow-lg transition-all duration-300">
                <h4 className="font-bold text-center text-slate-800 mb-4 bg-gradient-to-r from-sky-600 to-cyan-600 bg-clip-text text-transparent">
                  จันทร์
                </h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-emerald-600 mb-1">
                      เช้า
                    </p>
                    <div className="space-y-1">
                      <div className="text-xs bg-emerald-100/80 text-emerald-700 px-2 py-1 rounded">
                        ตรวจรักษาโรคทั่วไป
                      </div>
                      <div className="text-xs bg-emerald-100/80 text-emerald-700 px-2 py-1 rounded">
                        คลินิกโรคเรื้อรัง
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-sky-600 mb-1">
                      บ่าย
                    </p>
                    <div className="text-xs bg-sky-100/80 text-sky-700 px-2 py-1 rounded">
                      เยี่ยมบ้าน
                    </div>
                  </div>
                </div>
              </div>

              {/* Tuesday */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-cyan-200/50 p-4 hover:shadow-lg transition-all duration-300">
                <h4 className="font-bold text-center text-slate-800 mb-4 bg-gradient-to-r from-sky-600 to-cyan-600 bg-clip-text text-transparent">
                  อังคาร
                </h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-emerald-600 mb-1">
                      เช้า
                    </p>
                    <div className="space-y-1">
                      <div className="text-xs bg-emerald-100/80 text-emerald-700 px-2 py-1 rounded">
                        ตรวจรักษาโรคทั่วไป
                      </div>
                      <div className="text-xs bg-emerald-100/80 text-emerald-700 px-2 py-1 rounded">
                        คลินิกสุขภาพเด็กดี
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-sky-600 mb-1">
                      บ่าย
                    </p>
                    <div className="space-y-1">
                      <div className="text-xs bg-sky-100/80 text-sky-700 px-2 py-1 rounded">
                        เยี่ยมบ้าน
                      </div>
                      <div className="text-xs bg-sky-100/80 text-sky-700 px-2 py-1 rounded">
                        จ่ายยาโรคเรื้อรัง
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Wednesday */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-cyan-200/50 p-4 hover:shadow-lg transition-all duration-300">
                <h4 className="font-bold text-center text-slate-800 mb-4 bg-gradient-to-r from-sky-600 to-cyan-600 bg-clip-text text-transparent">
                  พุธ
                </h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-emerald-600 mb-1">
                      เช้า
                    </p>
                    <div className="space-y-1">
                      <div className="text-xs bg-emerald-100/80 text-emerald-700 px-2 py-1 rounded">
                        ตรวจรักษาโรคทั่วไป
                      </div>
                      <div className="text-xs bg-emerald-100/80 text-emerald-700 px-2 py-1 rounded">
                        คลินิกวางแผนครอบครัว
                      </div>
                      <div className="text-xs bg-emerald-100/80 text-emerald-700 px-2 py-1 rounded">
                        ตรวจคัดกรอง/มะเร็งปากมดลูก
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-sky-600 mb-1">
                      บ่าย
                    </p>
                    <div className="space-y-1">
                      <div className="text-xs bg-sky-100/80 text-sky-700 px-2 py-1 rounded">
                        เยี่ยมบ้าน
                      </div>
                      <div className="text-xs bg-sky-100/80 text-sky-700 px-2 py-1 rounded">
                        จ่ายยาโรคเรื้อรัง
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Thursday */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-cyan-200/50 p-4 hover:shadow-lg transition-all duration-300">
                <h4 className="font-bold text-center text-slate-800 mb-4 bg-gradient-to-r from-sky-600 to-cyan-600 bg-clip-text text-transparent">
                  พฤหัสบดี
                </h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-emerald-600 mb-1">
                      เช้า
                    </p>
                    <div className="space-y-1">
                      <div className="text-xs bg-emerald-100/80 text-emerald-700 px-2 py-1 rounded">
                        ตรวจรักษาโรคทั่วไป
                      </div>
                      <div className="text-xs bg-emerald-100/80 text-emerald-700 px-2 py-1 rounded">
                        คลินิกฝากครรภ์
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-sky-600 mb-1">
                      บ่าย
                    </p>
                    <div className="space-y-1">
                      <div className="text-xs bg-sky-100/80 text-sky-700 px-2 py-1 rounded">
                        เยี่ยมบ้าน
                      </div>
                      <div className="text-xs bg-sky-100/80 text-sky-700 px-2 py-1 rounded">
                        จ่ายยาโรคเรื้อรัง
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Friday */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-cyan-200/50 p-4 hover:shadow-lg transition-all duration-300">
                <h4 className="font-bold text-center text-slate-800 mb-4 bg-gradient-to-r from-sky-600 to-cyan-600 bg-clip-text text-transparent">
                  ศุกร์
                </h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-emerald-600 mb-1">
                      เช้า
                    </p>
                    <div className="space-y-1">
                      <div className="text-xs bg-emerald-100/80 text-emerald-700 px-2 py-1 rounded">
                        ตรวจรักษาโรคทั่วไป
                      </div>
                      <div className="text-xs bg-emerald-100/80 text-emerald-700 px-2 py-1 rounded">
                        ทันตกรรมโรงเรียน
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-sky-600 mb-1">
                      บ่าย
                    </p>
                    <div className="text-xs bg-sky-100/80 text-sky-700 px-2 py-1 rounded">
                      สหวิชาชีพ ติดตามเยี่ยมบ้าน
                    </div>
                  </div>
                </div>
              </div>

              {/* Saturday */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-cyan-200/50 p-4 hover:shadow-lg transition-all duration-300">
                <h4 className="font-bold text-center text-slate-800 mb-4 bg-gradient-to-r from-sky-600 to-cyan-600 bg-clip-text text-transparent">
                  เสาร์
                </h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-emerald-600 mb-1">
                      เช้า
                    </p>
                    <div className="text-xs bg-emerald-100/80 text-emerald-700 px-2 py-1 rounded">
                      ตรวจรักษาโรคทั่วไป
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-sky-600 mb-1">
                      บ่าย
                    </p>
                    <div className="text-xs bg-sky-100/80 text-sky-700 px-2 py-1 rounded">
                      ตรวจรักษาโรคทั่วไป
                    </div>
                  </div>
                </div>
              </div>

              {/* Sunday */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-cyan-200/50 p-4 hover:shadow-lg transition-all duration-300">
                <h4 className="font-bold text-center text-slate-800 mb-4 bg-gradient-to-r from-sky-600 to-cyan-600 bg-clip-text text-transparent">
                  อาทิตย์
                </h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-emerald-600 mb-1">
                      เช้า
                    </p>
                    <div className="text-xs bg-emerald-100/80 text-emerald-700 px-2 py-1 rounded">
                      ตรวจรักษาโรคทั่วไป
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-sky-600 mb-1">
                      บ่าย
                    </p>
                    <div className="text-xs bg-sky-100/80 text-sky-700 px-2 py-1 rounded">
                      ตรวจรักษาโรคทั่วไป
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Special Clinics */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-yellow-50/80 via-orange-50/80 to-red-50/80 backdrop-blur-sm rounded-xl border border-orange-200/50 p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">🦷</span>
                  <h4 className="font-bold text-orange-800">คลินิกทันตกรรม</h4>
                </div>
                <p className="text-sm text-orange-700 font-medium">
                  วันจันทร์-วันศุกร์
                </p>
                <p className="text-sm text-orange-600">(เวลา 08.30-16.30 น.)</p>
              </div>

              <div className="bg-gradient-to-br from-green-50/80 via-emerald-50/80 to-teal-50/80 backdrop-blur-sm rounded-xl border border-emerald-200/50 p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">🌿</span>
                  <h4 className="font-bold text-emerald-800">
                    คลินิกแพทย์แผนไทย
                  </h4>
                </div>
                <p className="text-sm text-emerald-700 font-medium">
                  วันจันทร์-วันศุกร์
                </p>
                <p className="text-sm text-emerald-600">
                  (เวลา 08.30-16.30 น.)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar Header */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-cyan-200/50 p-8 mb-8 relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-sky-50/50 via-cyan-50/30 to-emerald-50/50 opacity-50" />

          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-full animate-pulse"></div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-sky-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                ปฏิทินกิจกรรม
              </h3>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
              <button
                onClick={() => navigateMonth(-1)}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white px-6 py-3 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                เดือนก่อน
              </button>

              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-sky-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent text-center">
                {monthNames[currentDate.getMonth()]}{" "}
                {currentDate.getFullYear() + 543}
              </h2>

              <button
                onClick={() => navigateMonth(1)}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white px-6 py-3 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                เดือนถัดไป
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
              </button>
            </div>

            {/* Day Names */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {dayNames.map((day) => (
                <div
                  key={day}
                  className="text-center font-bold text-slate-700 py-3 bg-gradient-to-r from-sky-100/60 to-emerald-100/60 rounded-lg border border-cyan-200/30"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-cyan-200/50">
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-sky-500 border-t-transparent"></div>
                  <p className="text-slate-600 font-medium">
                    กำลังโหลดข้อมูล...
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-7 gap-2">
                {getDaysInMonth(currentDate).map((day, index) => {
                  const dayEvents = getEventsForDate(day);
                  return (
                    <div
                      key={index}
                      className={`min-h-[120px] border rounded-xl p-3 transition-all duration-300 ${
                        day
                          ? "bg-white/80 backdrop-blur-sm hover:bg-gradient-to-br hover:from-sky-50/80 hover:to-emerald-50/80 cursor-pointer hover:shadow-lg hover:scale-105 border-cyan-200/50"
                          : "bg-transparent border-transparent"
                      } ${
                        dayEvents.length > 0
                          ? "border-sky-300 bg-gradient-to-br from-sky-50/90 to-cyan-50/90 shadow-md"
                          : ""
                      }`}
                      onClick={() => day && setSelectedDate(day)}
                    >
                      {day && (
                        <>
                          <div className="font-bold text-slate-800 mb-2 text-center">
                            {day}
                          </div>
                          {dayEvents.slice(0, 2).map((event, eventIndex) => (
                            <Link
                              key={eventIndex}
                              href={`/event/${event.id}`}
                              className="block text-xs bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white rounded-lg px-2 py-1 mb-1 truncate shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                              title={event.title}
                              onClick={(e) => e.stopPropagation()}
                            >
                              {event.title}
                            </Link>
                          ))}
                          {dayEvents.length > 2 && (
                            <div className="text-xs text-sky-600 font-bold text-center bg-sky-100/80 rounded-md py-1">
                              +{dayEvents.length - 2} เพิ่มเติม
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Selected Date Events */}
        {selectedDate && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-cyan-200/50 p-8 mb-8 relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-cyan-50/30 to-sky-50/50 opacity-50" />

            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full animate-pulse"></div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent">
                  กิจกรรมวันที่ {selectedDate}{" "}
                  {monthNames[currentDate.getMonth()]}{" "}
                  {currentDate.getFullYear() + 543}
                </h3>
              </div>

              {getEventsForDate(selectedDate).length > 0 ? (
                <div className="space-y-4">
                  {getEventsForDate(selectedDate).map((event, index) => (
                    <Link
                      key={index}
                      href={`/event/${event.id}`}
                      className="group block bg-white/80 backdrop-blur-sm rounded-xl border border-cyan-200/50 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                    >
                      {/* Background gradient on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-sky-50/50 via-cyan-50/30 to-emerald-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="relative">
                        <div className="flex items-start gap-4">
                          <div className="w-1 h-12 bg-gradient-to-b from-sky-500 to-emerald-500 rounded-full flex-shrink-0"></div>
                          <div className="flex-1">
                            <h4 className="font-bold text-slate-800 group-hover:text-sky-700 transition-colors duration-300 text-lg">
                              {event.title}
                            </h4>
                            {event.description && (
                              <p className="text-slate-600 mt-2 line-clamp-2">
                                {event.description}
                              </p>
                            )}
                            <div className="flex flex-wrap gap-4 mt-3 text-sm">
                              {event.event_time && (
                                <span className="inline-flex items-center gap-1 bg-sky-100/80 text-sky-700 px-3 py-1 rounded-full font-medium">
                                  ⏰ {formatTime(event.event_time)}
                                </span>
                              )}
                              {event.end_time && (
                                <span className="inline-flex items-center gap-1 bg-cyan-100/80 text-cyan-700 px-3 py-1 rounded-full font-medium">
                                  ถึง {formatTime(event.end_time)}
                                </span>
                              )}
                              {event.location && (
                                <span className="inline-flex items-center gap-1 bg-emerald-100/80 text-emerald-700 px-3 py-1 rounded-full font-medium">
                                  📍 {event.location}
                                </span>
                              )}
                              {event.category && (
                                <span className="bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 px-3 py-1 rounded-full text-xs font-semibold">
                                  {event.category}
                                </span>
                              )}
                            </div>
                            <div className="mt-4">
                              <span className="inline-flex items-center gap-2 text-sky-600 font-semibold group-hover:text-sky-700 transition-colors duration-300">
                                ดูรายละเอียด
                                <svg
                                  className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
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
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-slate-200/50">
                    <span className="text-2xl">📅</span>
                    <p className="text-slate-600 font-medium">
                      ไม่มีกิจกรรมในวันนี้
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Upcoming Events List */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-cyan-200/50 p-8 relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-sky-50/50 via-cyan-50/30 to-emerald-50/50 opacity-50" />

          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-full animate-pulse"></div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-sky-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                กิจกรรมที่จะมาถึง
              </h3>
            </div>

            {events
              .filter((event) => {
                const eventDate = new Date(event.event_date);
                const today = new Date();
                console.log(
                  "Event date:",
                  eventDate,
                  "Today:",
                  today,
                  "Future?",
                  eventDate >= today
                );
                return eventDate >= today;
              })
              .slice(0, 5).length > 0 ? (
              <div className="space-y-4">
                {events
                  .filter((event) => {
                    const eventDate = new Date(event.event_date);
                    const today = new Date();
                    return eventDate >= today;
                  })
                  .slice(0, 5)
                  .map((event, index) => (
                    <Link
                      key={index}
                      href={`/event/${event.id}`}
                      className="group flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-cyan-200/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                    >
                      {/* Background gradient on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-sky-50/50 via-cyan-50/30 to-emerald-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="flex-1 relative">
                        <h4 className="font-bold text-slate-800 group-hover:text-sky-700 transition-colors duration-300">
                          {event.title}
                        </h4>
                        <p className="text-sm text-slate-600 mt-1">
                          {new Date(event.event_date).toLocaleDateString(
                            "th-TH",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                          {event.event_time &&
                            ` เวลา ${formatTime(event.event_time)}`}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 relative">
                        {event.is_featured && (
                          <span className="bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 text-xs px-3 py-1 rounded-full font-semibold border border-yellow-200">
                            เด่น
                          </span>
                        )}
                        <svg
                          className="w-5 h-5 text-sky-600 group-hover:text-sky-700 group-hover:translate-x-1 transition-all duration-300"
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
                      </div>
                    </Link>
                  ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-slate-200/50">
                  <span className="text-2xl">🗓️</span>
                  <p className="text-slate-600 font-medium">
                    ไม่มีกิจกรรมที่จะมาถึง
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import { supabase } from "../../../lib/supabase";

export default function AdminEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    event_date: "",
    event_time: "",
    end_time: "",
    location: "",
    category: "",
    is_featured: false,
    is_active: true,
  });
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("event_date", { ascending: true });

      if (error) {
        console.error("Error fetching events:", error);
        alert("เกิดข้อผิดพลาดในการโหลดข้อมูล");
        return;
      }

      setEvents(data || []);
    } catch (error) {
      console.error("Error:", error);
      alert("เกิดข้อผิดพลาดในการโหลดข้อมูล");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.event_date) {
      alert("กรุณากรอกชื่อกิจกรรมและวันที่");
      return;
    }

    setSubmitting(true);

    try {
      let result;

      if (editingId) {
        // Update existing event
        result = await supabase
          .from("events")
          .update(formData)
          .eq("id", editingId);
      } else {
        // Insert new event
        result = await supabase.from("events").insert([formData]);
      }

      if (result.error) {
        console.error("Error saving event:", result.error);
        alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
        return;
      }

      // Reset form and refresh events
      setFormData({
        title: "",
        description: "",
        event_date: "",
        event_time: "",
        end_time: "",
        location: "",
        category: "",
        is_featured: false,
        is_active: true,
      });
      setEditingId(null);
      fetchEvents();
      alert(
        editingId ? "แก้ไขกิจกรรมเรียบร้อยแล้ว" : "เพิ่มกิจกรรมเรียบร้อยแล้ว"
      );
    } catch (error) {
      console.error("Error:", error);
      alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (event) => {
    setFormData({
      title: event.title || "",
      description: event.description || "",
      event_date: event.event_date || "",
      event_time: event.event_time || "",
      end_time: event.end_time || "",
      location: event.location || "",
      category: event.category || "",
      is_featured: event.is_featured || false,
      is_active: event.is_active !== false,
    });
    setEditingId(event.id);
  };

  const handleDelete = async (id) => {
    if (!confirm("คุณแน่ใจหรือไม่ที่จะลบกิจกรรมนี้?")) {
      return;
    }

    try {
      const { error } = await supabase.from("events").delete().eq("id", id);

      if (error) {
        console.error("Error deleting event:", error);
        alert("เกิดข้อผิดพลาดในการลบข้อมูล");
        return;
      }

      fetchEvents();
      alert("ลบกิจกรรมเรียบร้อยแล้ว");
    } catch (error) {
      console.error("Error:", error);
      alert("เกิดข้อผิดพลาดในการลบข้อมูล");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      event_date: "",
      event_time: "",
      end_time: "",
      location: "",
      category: "",
      is_featured: false,
      is_active: true,
    });
    setEditingId(null);
  };

  const formatDateTime = (date, time) => {
    const eventDate = new Date(date);
    const dateStr = eventDate.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    if (time) {
      const timeStr = new Date(`2000-01-01T${time}`).toLocaleTimeString(
        "th-TH",
        {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }
      );
      return `${dateStr} เวลา ${timeStr}`;
    }

    return dateStr;
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">
          จัดการกิจกรรม
        </h1>

        {/* Event Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-6">
            {editingId ? "แก้ไขกิจกรรม" : "เพิ่มกิจกรรมใหม่"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  ชื่อกิจกรรม *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  หมวดหมู่
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">เลือกหมวดหมู่</option>
                  <option value="ประชาสัมพันธ์">ประชาสัมพันธ์</option>
                  <option value="อบรม">อบรม</option>
                  <option value="ตรวจสุขภาพ">ตรวจสุขภาพ</option>
                  <option value="ประชุม">ประชุม</option>
                  <option value="กิจกรรมพิเศษ">กิจกรรมพิเศษ</option>
                  <option value="อื่นๆ">อื่นๆ</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                รายละเอียด
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  วันที่ *
                </label>
                <input
                  type="date"
                  name="event_date"
                  value={formData.event_date}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  เวลาเริ่ม
                </label>
                <input
                  type="time"
                  name="event_time"
                  value={formData.event_time}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  เวลาสิ้นสุด
                </label>
                <input
                  type="time"
                  name="end_time"
                  value={formData.end_time}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                สถานที่
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="is_featured"
                  checked={formData.is_featured}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <span className="text-sm text-slate-700">กิจกรรมเด่น</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="is_active"
                  checked={formData.is_active}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <span className="text-sm text-slate-700">เผยแพร่</span>
              </label>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {submitting
                  ? "กำลังบันทึก..."
                  : editingId
                  ? "แก้ไข"
                  : "เพิ่มกิจกรรม"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  ยกเลิก
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Events List */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-6">
            รายการกิจกรรม
          </h2>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-2 text-slate-600">กำลังโหลด...</p>
            </div>
          ) : events.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4">กิจกรรม</th>
                    <th className="text-left py-3 px-4">วันที่/เวลา</th>
                    <th className="text-left py-3 px-4">สถานที่</th>
                    <th className="text-left py-3 px-4">หมวดหมู่</th>
                    <th className="text-left py-3 px-4">สถานะ</th>
                    <th className="text-left py-3 px-4">จัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => (
                    <tr
                      key={event.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium text-slate-800">
                            {event.title}
                          </div>
                          {event.description && (
                            <div className="text-sm text-slate-600 truncate max-w-xs">
                              {event.description}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {formatDateTime(event.event_date, event.event_time)}
                        {event.end_time && (
                          <div className="text-slate-500">
                            ถึง{" "}
                            {new Date(
                              `2000-01-01T${event.end_time}`
                            ).toLocaleTimeString("th-TH", {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                            })}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {event.location || "-"}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {event.category && (
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                            {event.category}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <div className="flex gap-1">
                          {event.is_featured && (
                            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                              เด่น
                            </span>
                          )}
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              event.is_active
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {event.is_active ? "เผยแพร่" : "ซ่อน"}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(event)}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            แก้ไข
                          </button>
                          <button
                            onClick={() => handleDelete(event.id)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            ลบ
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-slate-500 py-8">ยังไม่มีกิจกรรม</p>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

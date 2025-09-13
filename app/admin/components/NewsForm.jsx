"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Switch } from "../../../components/ui/switch";
import { Badge } from "../../../components/ui/badge";
import ImageUpload from "./ImageUpload";
import SimpleRichTextEditor from "./CleanRichTextEditor";

export default function NewsForm({ news, onSuccess, onCancel, onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    full_content: "",
    category: "",
    tags: [],
    author: "",
    images: [],
    is_published: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [tagInput, setTagInput] = useState("");

  // Categories for the select dropdown
  const categories = [
    "การอบรม",
    "ส่งเสริมสุขภาพ",
    "บริการชุมชน",
    "ป้องกันโรค",
    "การประเมิน",
  ];

  useEffect(() => {
    if (news) {
      setFormData({
        title: news.title || "",
        description: news.description || "",
        full_content: news.full_content || "",
        category: news.category || "",
        tags: news.tags || [],
        author: news.author || "",
        images: news.images || [],
        is_published: news.is_published || false,
      });
    }
  }, [news]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "กรุณาระบุหัวข้อข่าว";
    }

    if (!formData.description.trim()) {
      newErrors.description = "กรุณาระบุคำอธิบายสั้น ๆ";
    }

    if (!formData.full_content.trim()) {
      newErrors.full_content = "กรุณาระบุเนื้อหาข่าว";
    }

    if (!formData.category) {
      newErrors.category = "กรุณาเลือกหมวดหมู่";
    }

    if (!formData.author.trim()) {
      newErrors.author = "กรุณาระบุชื่อผู้เขียน";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const newsData = {
        title: formData.title,
        description: formData.description,
        full_content: formData.full_content, // Store as plain text
        category: formData.category,
        tags: formData.tags,
        author: formData.author,
        images: formData.images,
        is_published: formData.is_published,
        published_date: new Date().toISOString().split("T")[0],
        read_time: `${Math.max(
          1,
          Math.ceil(formData.full_content.length / 200)
        )} นาที`,
      };

      let result;
      if (news?.id) {
        // Update existing news
        result = await supabase
          .from("news")
          .update(newsData)
          .eq("id", news.id)
          .select();
      } else {
        // Create new news
        result = await supabase.from("news").insert([newsData]).select();
      }

      if (result.error) throw result.error;

      // Reset form
      setFormData({
        title: "",
        description: "",
        full_content: "",
        category: "",
        tags: [],
        author: "",
        images: [],
        is_published: false,
      });

      onSuccess?.();
    } catch (error) {
      console.error("Error saving news:", error);
      alert("เกิดข้อผิดพลาดในการบันทึกข่าว");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      handleInputChange("tags", [...formData.tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    handleInputChange(
      "tags",
      formData.tags.filter((tag) => tag !== tagToRemove)
    );
  };

  const handleImagesChange = (newImages) => {
    handleInputChange("images", newImages);
  };

  const handleCancel = () => {
    onCancel?.();
    onClose?.();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>{news ? "แก้ไขข่าว" : "สร้างข่าวใหม่"}</CardTitle>
          <CardDescription>
            {news
              ? "แก้ไขรายละเอียดข่าว"
              : "กรอกรายละเอียดข่าวที่ต้องการเผยแพร่"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label
                htmlFor="title"
                className="text-sm font-medium text-slate-700"
              >
                หัวข้อข่าว *
              </Label>
              <Input
                id="title"
                type="text"
                placeholder="ระบุหัวข้อข่าว"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && (
                <p className="text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label
                htmlFor="description"
                className="text-sm font-medium text-slate-700"
              >
                คำอธิบายสั้น ๆ *
              </Label>
              <Textarea
                id="description"
                placeholder="ระบุคำอธิบายสั้น ๆ เกี่ยวกับข่าว"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                className={errors.description ? "border-red-500" : ""}
                rows={3}
              />
              {errors.description && (
                <p className="text-sm text-red-600">{errors.description}</p>
              )}
            </div>

            {/* Category and Author */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="category"
                  className="text-sm font-medium text-slate-700"
                >
                  หมวดหมู่ *
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    handleInputChange("category", value)
                  }
                >
                  <SelectTrigger
                    className={`bg-white ${
                      errors.category ? "border-red-500" : ""
                    }`}
                  >
                    <SelectValue
                      placeholder="เลือกหมวดหมู่"
                      className="text-slate-900"
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-slate-200 shadow-lg">
                    {categories.map((category) => (
                      <SelectItem
                        key={category}
                        value={category}
                        className="bg-white hover:bg-slate-100 text-slate-900 cursor-pointer"
                      >
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-sm text-red-600">{errors.category}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="author"
                  className="text-sm font-medium text-slate-700"
                >
                  ผู้เขียน *
                </Label>
                <Input
                  id="author"
                  type="text"
                  placeholder="ระบุชื่อผู้เขียน"
                  value={formData.author}
                  onChange={(e) => handleInputChange("author", e.target.value)}
                  className={errors.author ? "border-red-500" : ""}
                />
                {errors.author && (
                  <p className="text-sm text-red-600">{errors.author}</p>
                )}
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">แท็ก</Label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="เพิ่มแท็ก"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddTag}
                  disabled={!tagInput.trim()}
                >
                  เพิ่ม
                </Button>
              </div>
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      {tag} ×
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Images */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">
                รูปภาพ
              </Label>
              <ImageUpload
                images={formData.images}
                onImagesChange={handleImagesChange}
              />
            </div>

            {/* Content */}
            <div className="space-y-2">
              <Label
                htmlFor="content"
                className="text-sm font-medium text-slate-700"
              >
                เนื้อหาข่าว *
              </Label>
              <div
                className={
                  errors.full_content ? "border border-red-500 rounded-lg" : ""
                }
              >
                <textarea
                  value={formData.full_content}
                  onChange={(e) =>
                    handleInputChange("full_content", e.target.value)
                  }
                  placeholder="เขียนเนื้อหาข่าวที่นี่..."
                  className="w-full min-h-[400px] p-4 border border-slate-300 rounded-lg resize-vertical focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 font-sans text-base leading-relaxed"
                  style={{
                    fontFamily:
                      "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
                    lineHeight: "1.6",
                  }}
                />
              </div>
              {errors.full_content && (
                <p className="text-sm text-red-600">{errors.full_content}</p>
              )}
            </div>

            {/* Publish Status */}
            <div className="p-4 border rounded-lg bg-slate-50">
              <Label className="text-sm font-medium text-slate-700">
                สถานะการเผยแพร่
              </Label>
              <p className="text-sm text-slate-500 mt-1 mb-4">
                เลือกสถานะการเผยแพร่ข่าวของคุณ
              </p>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => handleInputChange("is_published", true)}
                  className={`flex-1 px-4 py-3 rounded-lg border transition-all duration-200 ${
                    formData.is_published
                      ? "bg-green-600 hover:bg-green-700 text-white border-green-600"
                      : "bg-white hover:bg-green-50 text-slate-700 border-slate-300 hover:border-green-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">✓</span>
                    <div className="text-left">
                      <div className="font-medium">เผยแพร่ทันที</div>
                      <div className="text-xs opacity-80">
                        ข่าวจะปรากฏในเว็บไซต์ทันที
                      </div>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleInputChange("is_published", false)}
                  className={`flex-1 px-4 py-3 rounded-lg border transition-all duration-200 ${
                    !formData.is_published
                      ? "bg-orange-600 hover:bg-orange-700 text-white border-orange-600"
                      : "bg-white hover:bg-orange-50 text-slate-700 border-slate-300 hover:border-orange-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">○</span>
                    <div className="text-left">
                      <div className="font-medium">บันทึกเป็นแบบร่าง</div>
                      <div className="text-xs opacity-80">เผยแพร่ในภายหลัง</div>
                    </div>
                  </div>
                </button>
              </div>

              <div className="mt-3 text-center">
                <span
                  className={`text-sm font-medium px-3 py-1 rounded-full ${
                    formData.is_published
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {formData.is_published
                    ? "สถานะ: เผยแพร่ทันที"
                    : "สถานะ: แบบร่าง"}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-sky-600 hover:bg-sky-700"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    กำลังบันทึก...
                  </div>
                ) : news ? (
                  "อัปเดตข่าว"
                ) : (
                  "สร้างข่าว"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={loading}
              >
                ยกเลิก
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

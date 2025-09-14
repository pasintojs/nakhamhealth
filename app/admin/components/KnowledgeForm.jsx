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

export default function KnowledgeForm({
  knowledge,
  onSuccess,
  onCancel,
  onClose,
}) {
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
    "โภชนาการ",
    "การออกกำลังกาย",
    "สุขภาพจิต",
    "การป้องกันโรค",
    "ความรู้ทั่วไป",
  ];

  useEffect(() => {
    if (knowledge) {
      setFormData({
        title: knowledge.title || "",
        description: knowledge.description || "",
        full_content: knowledge.full_content || "",
        category: knowledge.category || "",
        tags: knowledge.tags || [],
        author: knowledge.author || "",
        images: knowledge.images || [],
        is_published: knowledge.is_published || false,
      });
    }
  }, [knowledge]);

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
      newErrors.title = "กรุณาระบุหัวข้อความรู้";
    }

    if (!formData.description.trim()) {
      newErrors.description = "กรุณาระบุคำอธิบายสั้น ๆ";
    }

    if (!formData.full_content.trim()) {
      newErrors.full_content = "กรุณาระบุเนื้อหาความรู้";
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
      const knowledgeData = {
        ...formData,
        title: formData.title.trim(),
        description: formData.description.trim(),
        full_content: formData.full_content.trim(),
        author: formData.author.trim(),
        updated_at: new Date().toISOString(),
      };

      if (knowledge) {
        // Update existing knowledge
        const { error } = await supabase
          .from("knowledge")
          .update(knowledgeData)
          .eq("id", knowledge.id);

        if (error) throw error;
      } else {
        // Create new knowledge
        knowledgeData.created_at = new Date().toISOString();
        const { error } = await supabase
          .from("knowledge")
          .insert([knowledgeData]);

        if (error) throw error;
      }

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

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error saving knowledge:", error);
      setErrors({
        submit: `เกิดข้อผิดพลาด: ${error.message}`,
      });
    } finally {
      setLoading(false);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      handleInputChange("tags", [...formData.tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    handleInputChange(
      "tags",
      formData.tags.filter((tag) => tag !== tagToRemove)
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-slate-800">
          {knowledge ? "แก้ไขความรู้" : "เพิ่มความรู้ใหม่"}
        </CardTitle>
        <CardDescription>
          {knowledge
            ? "แก้ไขข้อมูลความรู้เพื่อสุขภาพ"
            : "เพิ่มความรู้เพื่อสุขภาพใหม่ในระบบ"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error Display */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600 text-sm">{errors.submit}</p>
            </div>
          )}

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              หัวข้อความรู้ <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="ระบุหัวข้อความรู้..."
              className={errors.title ? "border-red-300" : ""}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm font-medium">
              หมวดหมู่ <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.category}
              onValueChange={(value) => handleInputChange("category", value)}
            >
              <SelectTrigger
                className={errors.category ? "border-red-300" : ""}
              >
                <SelectValue placeholder="เลือกหมวดหมู่" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              คำอธิบายสั้น ๆ <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="ระบุคำอธิบายสั้น ๆ สำหรับความรู้นี้..."
              rows={3}
              className={errors.description ? "border-red-300" : ""}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>

          {/* Author */}
          <div className="space-y-2">
            <Label htmlFor="author" className="text-sm font-medium">
              ผู้เขียน <span className="text-red-500">*</span>
            </Label>
            <Input
              id="author"
              type="text"
              value={formData.author}
              onChange={(e) => handleInputChange("author", e.target.value)}
              placeholder="ระบุชื่อผู้เขียน..."
              className={errors.author ? "border-red-300" : ""}
            />
            {errors.author && (
              <p className="text-red-500 text-sm">{errors.author}</p>
            )}
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags" className="text-sm font-medium">
              แท็ก
            </Label>
            <div className="flex gap-2">
              <Input
                id="tags"
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="เพิ่มแท็ก..."
                className="flex-1"
              />
              <Button
                type="button"
                onClick={addTag}
                variant="outline"
                size="sm"
              >
                เพิ่ม
              </Button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 text-slate-500 hover:text-red-500"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Images */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">รูปภาพ</Label>
            <ImageUpload
              images={formData.images}
              onImagesChange={(images) => handleInputChange("images", images)}
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content" className="text-sm font-medium">
              เนื้อหาความรู้ <span className="text-red-500">*</span>
            </Label>
            <SimpleRichTextEditor
              value={formData.full_content}
              onChange={(value) => handleInputChange("full_content", value)}
              placeholder="เขียนเนื้อหาความรู้..."
              className={errors.full_content ? "border-red-300" : ""}
            />
            {errors.full_content && (
              <p className="text-red-500 text-sm">{errors.full_content}</p>
            )}
          </div>

          {/* Publish Toggle */}
          <div className="flex items-center space-x-2">
            <Switch
              id="publish"
              checked={formData.is_published}
              onCheckedChange={(checked) =>
                handleInputChange("is_published", checked)
              }
            />
            <Label htmlFor="publish" className="text-sm font-medium">
              เผยแพร่ความรู้
            </Label>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-6">
            <Button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8"
            >
              {loading ? "กำลังบันทึก..." : knowledge ? "อัปเดต" : "บันทึก"}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={onCancel || onClose}
              disabled={loading}
            >
              ยกเลิก
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

"use client";

import { useState, useRef } from "react";
import { supabase } from "../../../lib/supabase";
import Image from "next/image";

export default function ImageUpload({ images = [], onImagesChange }) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const uploadImage = async (file) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${fileExt}`;
    const filePath = `news/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("news-images")
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from("news-images")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleFileSelect = async (files) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const uploadPromises = Array.from(files).map(uploadImage);
      const newImageUrls = await Promise.all(uploadPromises);

      const updatedImages = [...images, ...newImageUrls];
      onImagesChange(updatedImages);
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("เกิดข้อผิดพลาดในการอัพโหลดรูปภาพ: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleFileInputChange = (e) => {
    handleFileSelect(e.target.files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const removeImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    onImagesChange(updatedImages);
  };

  const moveImage = (fromIndex, toIndex) => {
    const updatedImages = [...images];
    const [movedImage] = updatedImages.splice(fromIndex, 1);
    updatedImages.splice(toIndex, 0, movedImage);
    onImagesChange(updatedImages);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-slate-700">
          รูปภาพประกอบข่าว
        </label>
        <span className="text-xs text-slate-500">รูปแรกจะเป็นรูปหน้าปก</span>
      </div>

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragOver
            ? "border-sky-400 bg-sky-50"
            : "border-slate-300 hover:border-slate-400"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
        />

        {uploading ? (
          <div className="flex flex-col items-center space-y-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600"></div>
            <p className="text-sm text-slate-600">กำลังอัพโหลด...</p>
          </div>
        ) : (
          <div className="space-y-2">
            <svg
              className="mx-auto h-12 w-12 text-slate-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="text-sm text-slate-600">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="font-medium text-sky-600 hover:text-sky-500"
              >
                คลิกเพื่อเลือกไฟล์
              </button>
              <span> หรือลากไฟล์มาวางที่นี่</span>
            </div>
            <p className="text-xs text-slate-500">
              รองรับ PNG, JPG, WEBP ขนาดไม่เกิน 10MB ต่อไฟล์
            </p>
          </div>
        )}
      </div>

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-slate-700">
            รูปภาพที่อัพโหลด ({images.length} รูป)
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((imageUrl, index) => (
              <div
                key={index}
                className="relative group bg-slate-50 rounded-lg overflow-hidden border border-slate-200"
              >
                {/* Cover Badge */}
                {index === 0 && (
                  <div className="absolute top-2 left-2 z-10 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    หน้าปก
                  </div>
                )}

                {/* Image */}
                <div className="aspect-video relative">
                  <Image
                    src={imageUrl}
                    alt={`รูปภาพ ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>

                {/* Controls */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex space-x-2">
                    {/* Move Left */}
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => moveImage(index, index - 1)}
                        className="p-1.5 bg-white rounded-full text-slate-600 hover:text-slate-800 shadow-lg"
                        title="เลื่อนซ้าย"
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
                      </button>
                    )}

                    {/* Move Right */}
                    {index < images.length - 1 && (
                      <button
                        type="button"
                        onClick={() => moveImage(index, index + 1)}
                        className="p-1.5 bg-white rounded-full text-slate-600 hover:text-slate-800 shadow-lg"
                        title="เลื่อนขวา"
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
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    )}

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="p-1.5 bg-red-500 rounded-full text-white hover:bg-red-600 shadow-lg"
                      title="ลบรูป"
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Position indicator */}
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

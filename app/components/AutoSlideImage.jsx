"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function AutoSlideImage({
  images = [],
  alt = "ข่าวสาร",
  className = "",
  autoSlideInterval = 3000,
  showIndicator = true,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-slide effect
  useEffect(() => {
    if (images.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [autoSlideInterval, images.length, isPaused]);

  // If no images or single image, show single image
  if (!images || images.length === 0) {
    return (
      <div
        className={`bg-slate-200 flex items-center justify-center ${className}`}
      >
        <svg
          className="w-8 h-8 text-slate-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    );
  }

  if (images.length === 1) {
    return <Image src={images[0]} alt={alt} fill className={className} />;
  }

  // Multiple images with auto-slide
  return (
    <div
      className="relative w-full h-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Image
        src={images[currentIndex]}
        alt={`${alt} - รูปที่ ${currentIndex + 1}`}
        fill
        className={className}
      />

      {/* Multiple images indicator */}
      {showIndicator && images.length > 1 && (
        <div className="absolute top-4 right-4 bg-black bg-opacity-60 text-white text-sm px-2 py-1 rounded-full flex items-center gap-1">
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
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>{images.length}</span>
          {!isPaused && (
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse ml-1"></div>
          )}
        </div>
      )}

      {/* Progress dots */}
      {images.length > 1 && images.length <= 5 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-white scale-125"
                  : "bg-white bg-opacity-50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

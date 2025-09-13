"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function NewsImageSlideshow({
  images = [],
  alt = "ข่าวสาร",
  autoSlide = true,
  autoSlideInterval = 4000,
}) {
  // Filter out empty or invalid images
  const validImages = images.filter(
    (img) => img && typeof img === "string" && img.trim() !== ""
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-slide effect
  useEffect(() => {
    if (!autoSlide || validImages.length <= 1 || isPaused || isFullscreen)
      return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % validImages.length);
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [
    autoSlide,
    autoSlideInterval,
    validImages.length,
    isPaused,
    isFullscreen,
  ]);

  if (!validImages || validImages.length === 0) {
    return null;
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % validImages.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + validImages.length) % validImages.length
    );
  };

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Single image display
  if (validImages.length === 1) {
    return (
      <div className="relative w-full bg-slate-100 rounded-lg overflow-hidden">
        <div className="relative w-full" style={{ aspectRatio: "auto" }}>
          <Image
            src={validImages[0]}
            alt={alt}
            width={800}
            height={600}
            className="w-full h-auto cursor-pointer hover:scale-105 transition-transform duration-300 rounded-lg"
            onClick={toggleFullscreen}
            style={{
              maxHeight: "600px",
              objectFit: "contain",
              width: "100%",
              height: "auto",
            }}
          />
        </div>

        {/* Fullscreen Modal */}
        {isFullscreen && (
          <div
            className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center p-4"
            onClick={toggleFullscreen}
          >
            <div className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center">
              <Image
                src={validImages[0]}
                alt={alt}
                width={1200}
                height={900}
                className="max-w-full max-h-full object-contain"
                style={{
                  width: "auto",
                  height: "auto",
                  maxWidth: "90vw",
                  maxHeight: "90vh",
                }}
              />
              <button
                onClick={toggleFullscreen}
                className="absolute top-4 right-4 text-white bg-black bg-opacity-70 rounded-full p-3 hover:bg-opacity-90 transition-colors"
              >
                <svg
                  className="w-6 h-6"
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
        )}
      </div>
    );
  }

  // Multiple images slideshow
  return (
    <>
      <div
        className="relative w-full bg-slate-100 rounded-lg overflow-hidden group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Main Image with preserved aspect ratio */}
        <div className="relative w-full" style={{ aspectRatio: "auto" }}>
          <Image
            src={validImages[currentIndex]}
            alt={`${alt} - รูปที่ ${currentIndex + 1}`}
            width={800}
            height={600}
            className="w-full h-auto cursor-pointer rounded-lg"
            onClick={toggleFullscreen}
            style={{
              maxHeight: "600px",
              objectFit: "contain",
              width: "100%",
              height: "auto",
            }}
          />
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-opacity-70 z-10"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-opacity-70 z-10"
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Image Counter with Auto-slide indicator */}
        <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white text-sm px-3 py-1 rounded-full flex items-center gap-2 z-10">
          <span>
            {currentIndex + 1} / {validImages.length}
          </span>
          {autoSlide && validImages.length > 1 && !isPaused && (
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          )}
          {autoSlide && validImages.length > 1 && isPaused && (
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
          )}
        </div>

        {/* Fullscreen Button */}
        <button
          onClick={toggleFullscreen}
          className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-opacity-70"
          title="ขยายภาพ"
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
              d="M4 8V4h4M20 8V4h-4m4 12v4h-4M4 16v4h4"
            />
          </svg>
        </button>
      </div>

      {/* Thumbnail Navigation */}
      {validImages.length > 1 && (
        <div className="flex space-x-2 mt-4 overflow-x-auto pb-2">
          {validImages.map((image, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                index === currentIndex
                  ? "border-sky-500 ring-2 ring-sky-200"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <Image
                src={image}
                alt={`ภาพย่อ ${index + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center p-4"
          onClick={toggleFullscreen}
        >
          <div
            className="relative max-w-6xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Main Fullscreen Image with preserved aspect ratio */}
            <Image
              src={validImages[currentIndex]}
              alt={`${alt} - รูปที่ ${currentIndex + 1}`}
              width={1200}
              height={800}
              className="max-w-full max-h-full"
              style={{
                objectFit: "contain",
                width: "auto",
                height: "auto",
                maxWidth: "90vw",
                maxHeight: "90vh",
              }}
            />

            {/* Fullscreen Navigation */}
            {validImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-70 text-white p-3 rounded-full hover:bg-opacity-90 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
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

                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-70 text-white p-3 rounded-full hover:bg-opacity-90 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
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
              </>
            )}

            {/* Close Button */}
            <button
              onClick={toggleFullscreen}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-70 rounded-full p-3 hover:bg-opacity-90 transition-colors"
            >
              <svg
                className="w-6 h-6"
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

            {/* Image Info */}
            <div className="absolute bottom-4 left-4 text-white bg-black bg-opacity-70 px-4 py-2 rounded-lg">
              รูปที่ {currentIndex + 1} จาก {validImages.length}
            </div>

            {/* Thumbnail Strip in Fullscreen */}
            {validImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 max-w-md overflow-x-auto">
                {validImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`relative flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      index === currentIndex
                        ? "border-white"
                        : "border-white border-opacity-50 hover:border-opacity-75"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`ภาพย่อ ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

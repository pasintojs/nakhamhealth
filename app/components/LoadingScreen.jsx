"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function LoadingScreen({ onLoadingComplete }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate minimum loading time and wait for page resources
    const minLoadTime = 1500; // Minimum 1.5 seconds
    const startTime = Date.now();

    const handleLoad = () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadTime - elapsedTime);

      setTimeout(() => {
        setIsLoading(false);
        if (onLoadingComplete) {
          onLoadingComplete();
        }
      }, remainingTime);
    };

    // Check if document is already loaded
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      // Wait for window load event
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, [onLoadingComplete]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Background overlay with subtle pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.1),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.1),transparent_50%)]"></div>

      {/* Loading content */}
      <div className="relative flex flex-col items-center space-y-8">
        {/* Logo with pulse animation */}
        <div className="relative">
          <div className="absolute inset-0 animate-ping bg-blue-200 rounded-full opacity-30"></div>
          <div className="relative w-32 h-32 md:w-40 md:h-40 animate-pulse">
            <Image
              src="/images/logo-v3.png"
              alt="โรงพยาบาลส่งเสริมสุขภาพตำบลนาคำ"
              fill
              className="object-contain filter drop-shadow-lg"
              priority
            />
          </div>
        </div>

        {/* Hospital name */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 animate-fade-in">
            โรงพยาบาลส่งเสริมสุขภาพตำบลนาคำ
          </h1>
          <p className="text-lg text-gray-600 animate-fade-in-delay">
            อ.อุบลรัตน์ จ.ขอนแก่น
          </p>
        </div>

        {/* Loading animation */}
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>

        {/* Loading text */}
        <p className="text-gray-500 text-sm animate-pulse">กำลังโหลด...</p>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-fade-in-delay {
          animation: fade-in 1s ease-out 0.3s both;
        }
      `}</style>
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";

export default function LoadingScreen({ onLoadingComplete }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate minimum loading time and wait for page resources
    const minLoadTime = 1500; // Back to 1.5 seconds for good user experience
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
        {/* Animated medical cross icon */}
        <div className="relative mb-4">
          <div className="w-20 h-20 relative animate-pulse-slow">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500 rounded-full opacity-20 animate-ping"></div>
            <div className="relative w-full h-full bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center shadow-xl">
              {/* Triangle */}
              <div className="relative">
                <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[20px] border-l-transparent border-r-transparent border-b-white"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Hospital name with typing animation */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent animate-gradient">
            <span className="animate-type-writer">
              โรงพยาบาลส่งเสริมสุขภาพตำบลนาคำ
            </span>
          </h1>
          <p className="text-xl text-gray-600 animate-fade-in-up">
            <span className="animate-type-writer-delay">
              อ.อุบลรัตน์ จ.ขอนแก่น
            </span>
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-green-500 mx-auto rounded-full animate-expand"></div>
        </div>

        {/* Enhanced loading animation */}
        <div className="flex items-center space-x-3">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-bounce-slow"></div>
            <div
              className="w-3 h-3 bg-gradient-to-r from-purple-500 to-green-500 rounded-full animate-bounce-slow"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-3 h-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full animate-bounce-slow"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        </div>

        {/* Loading text with pulse */}
        <p className="text-gray-600 text-lg font-medium animate-pulse-text">
          <span className="animate-dots">กำลังโหลด</span>
        </p>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes type-writer {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        @keyframes gradient {
          0%,
          100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }

        @keyframes expand {
          0% {
            width: 0;
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            width: 6rem;
            opacity: 1;
          }
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }

        @keyframes pulse-text {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
        }

        @keyframes dots {
          0%,
          20% {
            content: "กำลังโหลด";
          }
          40% {
            content: "กำลังโหลด.";
          }
          60% {
            content: "กำลังโหลด..";
          }
          80%,
          100% {
            content: "กำลังโหลด...";
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out 0.5s both;
        }

        .animate-type-writer {
          overflow: hidden;
          white-space: nowrap;
          animation: type-writer 2s steps(40) 0.5s both;
        }

        .animate-type-writer-delay {
          overflow: hidden;
          white-space: nowrap;
          animation: type-writer 1.5s steps(30) 2s both;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease-in-out infinite;
        }

        .animate-expand {
          animation: expand 1s ease-out 3s both;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }

        .animate-pulse-text {
          animation: pulse-text 2s ease-in-out infinite;
        }

        .animate-dots::after {
          content: "";
          animation: dots 2s infinite;
        }
      `}</style>
    </div>
  );
}

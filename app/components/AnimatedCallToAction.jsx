"use client";

import { useState, useEffect } from "react";

export default function AnimatedCallToAction() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentText, setCurrentText] = useState(0);

  const animatedTexts = [
    "สุขภาพดีเริ่มต้นที่นี่",
    "ดูแลครอบครัวด้วยใจ",
    "บริการมืออาชีพทุกวัน",
    "เพื่อชุมชนที่แข็งแรง",
  ];

  // Intersection observer for visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById("animated-cta");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  // Text rotation animation
  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % animatedTexts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isVisible, animatedTexts.length]);

  return (
    <section
      id="animated-cta"
      className="py-20 sm:py-24 bg-gradient-to-b from-cyan-50/30 to-emerald-50/50 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Floating circles */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-sky-200/30 to-cyan-200/30 rounded-full animate-float-slow" />
        <div className="absolute bottom-32 right-20 w-24 h-24 bg-gradient-to-br from-emerald-200/30 to-teal-200/30 rounded-full animate-float-delayed" />
        <div className="absolute top-40 right-32 w-20 h-20 bg-gradient-to-br from-cyan-200/30 to-sky-200/30 rounded-full animate-float-reverse" />

        {/* Gradient waves */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.1),transparent_40%)] animate-pulse-slow" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(16,185,129,0.1),transparent_40%)] animate-pulse-slower" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Main content */}
        <div
          className={`text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {/* Animated tagline */}
          <div className="mb-8 h-20 flex items-center justify-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-sky-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent transition-all duration-1000">
              {animatedTexts[currentText]}
            </h2>
          </div>

          {/* Subtitle */}
          <p
            className={`text-slate-600 text-lg sm:text-xl max-w-3xl mx-auto mb-12 leading-relaxed transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            โรงพยาบาลส่งเสริมสุขภาพตำบลนาคำ
            พร้อมเป็นพันธมิตรทางสุขภาพของคุณและครอบครัว
            <br />
            ด้วยบริการที่ครอบคลุมและทีมแพทย์ผู้เชี่ยวชาญ
          </p>

          {/* Animated cards grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: "🏥",
                title: "บริการครอบคลุม",
                description: "ตรวจสุขภาพ รักษาโรค ฉุกเฉิน",
                delay: "delay-300",
              },
              {
                icon: "👨‍⚕️",
                title: "ทีมผู้เชี่ยวชาญ",
                description: "ทีมงานบุคลากรทางการแพทย์มืออาชีพ",
                delay: "delay-500",
              },
              {
                icon: "❤️",
                title: "ใส่ใจทุกการบริการ",
                description: "ดูแลด้วยความเอาใจใส่และอบอุ่น",
                delay: "delay-700",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-cyan-200/50 hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${
                  isVisible
                    ? `opacity-100 translate-y-0 ${item.delay}`
                    : "opacity-0 translate-y-8"
                }`}
              >
                <div className="text-4xl mb-4 animate-bounce-slow">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Call to action buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-1000 delay-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <a
              href="/contact"
              className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 hover:from-sky-600 hover:via-cyan-600 hover:to-emerald-600 text-white px-8 py-4 text-lg font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 animate-pulse-button"
            >
              <svg
                className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              เริ่มต้นดูแลสุขภาพวันนี้
            </a>

            <a
              href="/about"
              className="group inline-flex items-center gap-3 rounded-2xl border-3 border-slate-300 bg-white/90 backdrop-blur-sm hover:bg-slate-50 text-slate-700 hover:text-slate-900 px-8 py-4 text-lg font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <svg
                className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300"
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
              เรียนรู้เพิ่มเติมเกี่ยวกับเรา
            </a>
          </div>

          {/* Bottom decoration */}
          <div
            className={`mt-16 transition-all duration-1000 delay-1200 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div className="flex justify-center items-center gap-4">
              <div className="h-0.5 w-20 bg-gradient-to-r from-transparent via-sky-400 to-transparent animate-shimmer" />
              <div className="w-3 h-3 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-full animate-pulse" />
              <div className="h-0.5 w-20 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-shimmer-reverse" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(180deg);
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(-180deg);
          }
        }

        @keyframes float-reverse {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-25px) rotate(360deg);
          }
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.7;
          }
        }

        @keyframes pulse-slower {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.6;
          }
        }

        @keyframes pulse-button {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
          }
          50% {
            box-shadow: 0 0 0 20px rgba(59, 130, 246, 0);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes shimmer-reverse {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
          animation-delay: -3s;
        }

        .animate-float-reverse {
          animation: float-reverse 12s ease-in-out infinite;
          animation-delay: -6s;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-pulse-slower {
          animation: pulse-slower 6s ease-in-out infinite;
          animation-delay: -2s;
        }

        .animate-pulse-button {
          animation: pulse-button 3s infinite;
        }

        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }

        .animate-shimmer-reverse {
          animation: shimmer-reverse 3s ease-in-out infinite;
          animation-delay: -1.5s;
        }
      `}</style>
    </section>
  );
}

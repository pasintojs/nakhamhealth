"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const slides = [
  {
    src: "/images/hero-health.svg",
    alt: "คลินิกสุขภาพนาคำ",
    caption: "ให้บริการด้านสุขภาพครอบครัว",
  },
  {
    src: "/images/about-1.svg",
    alt: "ห้องตรวจ",
    caption: "ห้องตรวจที่ทันสมัย",
  },
  {
    src: "/images/about-2.svg",
    alt: "ห้องแล็บ",
    caption: "ห้องปฏิบัติการตรวจวินิจฉัย",
  },
  {
    src: "/images/about-3.svg",
    alt: "กายภาพบำบัด",
    caption: "บริการกายภาพบำบัด",
  },
];

export default function ImageSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="relative group">
      {/* Enhanced section header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 bg-white/95 backdrop-blur-lg rounded-full px-6 py-3 shadow-xl border-2 border-cyan-100 mb-4">
          <div className="w-3 h-3 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-lg font-bold text-slate-800">
            บรรยากาศบริการ
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-sky-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent">
          ภาพบรรยากาศการให้บริการ
        </h2>
      </div>

      {/* Main slideshow container with enhanced styling */}
      <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-white/90 to-cyan-50/30 backdrop-blur-sm border border-cyan-200/50">
        {/* Decorative gradient rings around slideshow */}
        <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-sky-200 via-cyan-200 to-emerald-200 opacity-20 animate-pulse -z-10"></div>

        <div className="relative h-80 sm:h-96 lg:h-[500px]">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentSlide
                  ? "opacity-100 translate-x-0 scale-100"
                  : index < currentSlide
                  ? "opacity-0 -translate-x-full scale-95"
                  : "opacity-0 translate-x-full scale-95"
              }`}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover rounded-3xl"
                priority={index === 0}
              />

              {/* Enhanced gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-3xl" />
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-emerald-500/10 rounded-3xl" />

              {/* Enhanced caption with better styling */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-cyan-100/50 transform hover:scale-105 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-semibold text-sky-600 uppercase tracking-wide">
                      ภาพบรรยากาศ
                    </span>
                  </div>
                  <p className="text-slate-800 font-bold text-lg leading-relaxed">
                    {slide.caption}
                  </p>
                  <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>รพ.สต.นาคำ อ.อุบลรัตน์ จ.ขอนแก่น</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white backdrop-blur-lg rounded-full p-3 shadow-xl border border-cyan-100/50 opacity-0 group-hover:opacity-100 transition-all duration-500 hover:scale-110 hover:shadow-2xl"
        >
          <svg
            className="w-6 h-6 text-slate-700"
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
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white backdrop-blur-lg rounded-full p-3 shadow-xl border border-cyan-100/50 opacity-0 group-hover:opacity-100 transition-all duration-500 hover:scale-110 hover:shadow-2xl"
        >
          <svg
            className="w-6 h-6 text-slate-700"
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

        {/* Enhanced auto-play indicator */}
        <div className="absolute top-4 right-4">
          <div className="bg-white/95 backdrop-blur-lg rounded-full p-2 shadow-lg border border-cyan-100/50">
            <div
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                isAutoPlaying
                  ? "bg-gradient-to-r from-emerald-400 to-sky-400 animate-pulse"
                  : "bg-slate-300"
              }`}
            />
          </div>
        </div>
      </div>

      {/* Enhanced dots indicator */}
      <div className="flex justify-center mt-8 space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 rounded-full transition-all duration-500 hover:scale-110 ${
              index === currentSlide
                ? "bg-gradient-to-r from-sky-500 to-emerald-500 w-12 shadow-lg"
                : "bg-slate-300 hover:bg-slate-400 w-3"
            }`}
          />
        ))}
      </div>

      {/* Enhanced hospital info card */}
      <div className="mt-8 mx-auto max-w-md">
        <div className="bg-white/95 backdrop-blur-lg border border-cyan-200/50 rounded-2xl shadow-2xl p-6 hover:shadow-3xl transition-all duration-500 hover:-translate-y-1">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-sky-100 to-emerald-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-sky-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full animate-pulse"></div>
            </div>
            <div className="flex-1">
              <div className="font-bold text-slate-800 text-lg">รพ.สต.นาคำ</div>
              <div className="text-slate-600 font-medium">
                ดูแลสุขภาพชุมชน 13 หมู่บ้าน
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm text-slate-500 font-medium">
                  เปิดให้บริการทุกวัน
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

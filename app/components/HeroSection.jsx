"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// Hero slides with high-quality images
const heroSlides = [
  {
    src: "/images/place0.jpg",
    alt: "โรงพยาบาลส่งเสริมสุขภาพตำบลนาคำ",
    title: "โรงพยาบาลส่งเสริมสุขภาพตำบลนาคำ",
    subtitle: "ให้บริการด้านสุขภาพครอบครัวและชุมชน",
    description: "รพ.สต.นาคำ อ.อุบลรัตน์ จ.ขอนแก่น",
  },
  {
    src: "/images/place7.jpg",
    alt: "บริการสุขภาพชุมชน",
    title: "บริการสุขภาพชุมชน",
    subtitle: "ดูแลสุขภาพประชาชนในพื้นที่ตำบลนาคำ",
    description: "ทีมบุคลากรทางการแพทย์และสาธารณสุขที่มีประสบการณ์",
  },
  {
    src: "/images/place6.jpg",
    alt: "ทันตกรรมใกล้บ้านใกล้ใจ",
    title: "ทันตกรรมใกล้บ้านใกล้ใจ",
    subtitle: "ห้องตรวจและอุปกรณ์การแพทย์มาตรฐาน",
    description: "ให้บริการตรวจรักษาโดยเจ้าหน้าที่ทันตสาธารณสุข",
  },
  {
    src: "/images/place8.jpg",
    alt: "ทีมแพทย์และพยาบาล",
    title: "ทีมบุคลากรมืออาชีพ",
    subtitle: "แพทย์ พยาบาล และเจ้าหน้าที่ผู้เชี่ยวชาญ",
    description: "พร้อมให้บริการดูแลสุขภาพด้วยความเอาใจใส่",
  },
  // {
  //   src: "/images/place5.jpg",
  //   alt: "ทีมแพทย์และพยาบาล",
  //   title: "สร้างสรรค์สังคมสุขภาพดี",
  //   subtitle: "แพทย์ พยาบาล และเจ้าหน้าที่ผู้เชี่ยวชาญ",
  //   description: "พร้อมให้บริการดูแลสุขภาพด้วยความเอาใจใส่",
  // },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 15 seconds
    setTimeout(() => setIsAutoPlaying(true), 15000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 15000);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 15000);
  };

  return (
    <section className="relative w-full hero-height min-hero-height max-hero-height overflow-hidden">
      {/* Full-width Hero Slideshow */}
      <div className="relative w-full h-full min-h-full">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-cover object-center"
              priority={index === 0}
            />
          </div>
        ))}

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-4 shadow-2xl border border-white/20 opacity-70 hover:opacity-100 transition-all duration-300 hover:scale-110 z-20"
        >
          <svg
            className="w-6 h-6 text-white"
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
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-4 shadow-2xl border border-white/20 opacity-70 hover:opacity-100 transition-all duration-300 hover:scale-110 z-20"
        >
          <svg
            className="w-6 h-6 text-white"
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

        {/* Slide dots indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 rounded-full transition-all duration-500 hover:scale-110 ${
                index === currentSlide
                  ? "bg-white w-12 shadow-lg"
                  : "bg-white/50 hover:bg-white/70 w-3"
              }`}
            />
          ))}
        </div>

        {/* Auto-play indicator */}
        <div className="absolute top-6 right-6 z-20">
          <div className="bg-white/10 backdrop-blur-md rounded-full p-3 shadow-xl border border-white/20">
            <div
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                isAutoPlaying ? "bg-emerald-400 animate-pulse" : "bg-white/50"
              }`}
            />
          </div>
        </div>
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-start items-center z-10 pt-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          {/* Content that changes with slides */}
          <div className="space-y-8">
            {/* Official certification badge with enhanced contrast */}
            {/* <div className="inline-flex items-center gap-4 bg-white/98 backdrop-blur-xl rounded-full px-8 py-4 shadow-2xl border-2 border-white/60 hover:shadow-3xl transition-all duration-300 ring-4 ring-black/20">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-4 h-4 bg-emerald-500 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 w-4 h-4 bg-emerald-400 rounded-full animate-ping"></div>
                </div>
                <span className="text-lg font-bold text-slate-900">
                  โรงพยาบาลส่งเสริมสุขภาพตำบลนาคำ
                </span>
              </div>
              <div className="h-6 w-0.5 bg-gradient-to-b from-sky-400 to-emerald-400"></div>
              <span className="text-lg text-slate-700 font-semibold">
                อ.อุบลรัตน์ จ.ขอนแก่น
              </span>
            </div> */}

            {/* Dynamic title based on current slide with enhanced visibility */}
            <div className="transition-all duration-1000 ease-in-out">
              <h1
                className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-4"
                style={{
                  textShadow:
                    "4px 4px 8px rgba(0, 0, 0, 1), 2px 2px 4px rgba(0, 0, 0, 0.9), 0 0 30px rgba(0, 0, 0, 0.8), 0 0 60px rgba(0, 0, 0, 0.6), 1px 1px 0px rgba(0, 0, 0, 1), -1px -1px 0px rgba(0, 0, 0, 1), 1px -1px 0px rgba(0, 0, 0, 1), -1px 1px 0px rgba(0, 0, 0, 1)",
                }}
              >
                {heroSlides[currentSlide].title}
              </h1>

              {/* <p
                className="max-w-4xl mx-auto text-xl sm:text-2xl text-white leading-relaxed font-semibold mb-2"
                style={{
                  textShadow:
                    "3px 3px 6px rgba(0, 0, 0, 1), 2px 2px 4px rgba(0, 0, 0, 0.9), 0 0 25px rgba(0, 0, 0, 0.7), 0 0 40px rgba(0, 0, 0, 0.5), 1px 1px 0px rgba(0, 0, 0, 0.9), -1px -1px 0px rgba(0, 0, 0, 0.9), 1px -1px 0px rgba(0, 0, 0, 0.9), -1px 1px 0px rgba(0, 0, 0, 0.9)",
                }}
              >
                {heroSlides[currentSlide].subtitle}
              </p> */}

              {/* <p
                className="text-lg sm:text-xl text-white font-medium"
                style={{
                  textShadow:
                    "3px 3px 6px rgba(0, 0, 0, 1), 2px 2px 4px rgba(0, 0, 0, 0.9), 0 0 20px rgba(0, 0, 0, 0.7), 0 0 35px rgba(0, 0, 0, 0.5), 1px 1px 0px rgba(0, 0, 0, 0.8), -1px -1px 0px rgba(0, 0, 0, 0.8), 1px -1px 0px rgba(0, 0, 0, 0.8), -1px 1px 0px rgba(0, 0, 0, 0.8)",
                }}
              >
                {heroSlides[currentSlide].description}
              </p> */}
            </div>

            {/* Action buttons with enhanced visibility */}
            {/* <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="/contact"
                className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 hover:from-sky-600 hover:via-cyan-600 hover:to-emerald-600 text-white px-8 py-4 text-lg font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 ring-4 ring-white/30"
                style={{
                  textShadow:
                    "3px 3px 6px rgba(0, 0, 0, 1), 2px 2px 4px rgba(0, 0, 0, 0.9), 0 0 20px rgba(0, 0, 0, 0.8), 1px 1px 0px rgba(0, 0, 0, 0.8), -1px -1px 0px rgba(0, 0, 0, 0.8), 1px -1px 0px rgba(0, 0, 0, 0.8), -1px 1px 0px rgba(0, 0, 0, 0.8)",
                }}
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
                ติดต่อสอบถาม
              </a>

              <a
                href="#services"
                className="group inline-flex items-center gap-3 rounded-2xl border-3 border-white/70 bg-white/20 backdrop-blur-md text-white hover:bg-white/30 hover:border-white/90 px-8 py-4 text-lg font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                style={{
                  textShadow:
                    "2px 2px 4px rgba(0, 0, 0, 0.8), 1px 1px 0px rgba(0, 0, 0, 0.6)",
                }}
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                ดูบริการของเรา
              </a>
            </div> */}

            {/* Service hours and location with enhanced visibility */}
            {/* <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-white">
              <div
                className="flex items-center gap-3 bg-white/25 backdrop-blur-md rounded-full px-6 py-3 shadow-xl border-2 border-white/50"
                style={{
                  textShadow:
                    "3px 3px 6px rgba(0, 0, 0, 1), 2px 2px 4px rgba(0, 0, 0, 0.9), 0 0 20px rgba(0, 0, 0, 0.8), 1px 1px 0px rgba(0, 0, 0, 0.8), -1px -1px 0px rgba(0, 0, 0, 0.8), 1px -1px 0px rgba(0, 0, 0, 0.8), -1px 1px 0px rgba(0, 0, 0, 0.8)",
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-bold">เปิดให้บริการทุกวัน</span>
                </div>
              </div>
              <div
                className="flex items-center gap-2 bg-white/25 backdrop-blur-md rounded-full px-6 py-3 shadow-xl border-2 border-white/50"
                style={{
                  textShadow:
                    "2px 2px 4px rgba(0, 0, 0, 0.8), 1px 1px 0px rgba(0, 0, 0, 0.7)",
                }}
              >
                <svg
                  className="w-5 h-5 text-sky-300"
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
                <span className="font-bold">อ.อุบลรัตน์ จ.ขอนแก่น</span>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Scroll indicator with enhanced visibility */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
        <div
          className="flex flex-col items-center gap-2 text-white hover:text-white transition-colors duration-300"
          style={{
            textShadow:
              "3px 3px 6px rgba(0, 0, 0, 1), 2px 2px 4px rgba(0, 0, 0, 0.9), 0 0 20px rgba(0, 0, 0, 0.8), 1px 1px 0px rgba(0, 0, 0, 0.8), -1px -1px 0px rgba(0, 0, 0, 0.8), 1px -1px 0px rgba(0, 0, 0, 0.8), -1px 1px 0px rgba(0, 0, 0, 0.8)",
          }}
        >
          <span className="text-sm font-bold">เลื่อนลงเพื่อดูเพิ่มเติม</span>
          <div className="animate-bounce">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{
                filter: "drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.8))",
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

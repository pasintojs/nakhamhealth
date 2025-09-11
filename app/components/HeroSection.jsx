import Image from "next/image";
import ImageSlideshow from "./ImageSlideshow";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center">
      {/* Enhanced background with multiple gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-cyan-50 to-emerald-50" />
        <div className="absolute inset-0 bg-gradient-to-tr from-white/50 via-transparent to-sky-100/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.1),transparent_50%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Main content - centered layout */}
        <div className="text-center space-y-12">
          {/* Spectacular Logo Section */}
          <div className="relative inline-block">
            {/* Smaller outer glow ring */}
            <div className="absolute inset-0 -m-6 rounded-full bg-gradient-to-r from-sky-200 via-cyan-200 to-emerald-200 opacity-20 animate-spin-slow"></div>

            {/* Smaller middle glow ring */}
            <div className="absolute inset-0 -m-3 rounded-full bg-gradient-to-r from-emerald-300 via-cyan-300 to-sky-300 opacity-30 animate-pulse"></div>

            {/* Logo container with premium styling */}
            <div className="relative group">
              <Image
                src="/images/logo.png"
                alt="โรงพยาบาลส่งเสริมสุขภาพตำบลนาคำ"
                width={280}
                height={280}
                className="rounded-full hover:scale-105 transition-all duration-500 filter drop-shadow-2xl shadow-2xl"
                priority
              />

              {/* Smaller floating decorative elements */}
              <div className="absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-br from-sky-400 to-cyan-500 rounded-full animate-bounce opacity-80 shadow-lg"></div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-cyan-400 to-emerald-500 rounded-full animate-bounce delay-150 opacity-80 shadow-lg"></div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-emerald-400 to-sky-500 rounded-full animate-bounce delay-300 opacity-80 shadow-lg"></div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-gradient-to-br from-sky-500 to-emerald-400 rounded-full animate-bounce delay-500 opacity-80 shadow-lg"></div>

              {/* Smaller sparkle effects */}
              <div className="absolute top-6 right-12 w-2 h-2 bg-yellow-400 rounded-full animate-ping opacity-60"></div>
              <div className="absolute top-12 left-6 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-ping delay-100 opacity-60"></div>
              <div className="absolute bottom-6 right-6 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping delay-200 opacity-60"></div>
              <div className="absolute bottom-12 left-12 w-2 h-2 bg-yellow-300 rounded-full animate-ping delay-300 opacity-60"></div>
            </div>
          </div>

          {/* Enhanced title section */}
          <div className="space-y-6">
            {/* Official certification badge */}
            <div className="inline-flex items-center gap-4 bg-white/95 backdrop-blur-lg rounded-full px-8 py-4 shadow-xl border-2 border-cyan-100 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-4 h-4 bg-emerald-500 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 w-4 h-4 bg-emerald-400 rounded-full animate-ping"></div>
                </div>
                <span className="text-lg font-bold text-slate-800">
                  ได้รับการรับรอง
                </span>
              </div>
              <div className="h-6 w-0.5 bg-gradient-to-b from-sky-400 to-emerald-400"></div>
              <span className="text-lg text-slate-600 font-medium">
                มาตรฐานสาธารณสุข
              </span>
            </div>

            {/* Main title */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight">
              <span className="block bg-gradient-to-r from-sky-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                โรงพยาบาลส่งเสริมสุขภาพ
              </span>
              <span className="block bg-gradient-to-r from-emerald-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent mt-2">
                ตำบลนาคำ
              </span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-4xl mx-auto text-xl sm:text-2xl text-slate-700 leading-relaxed font-medium">
              รพ.สต.นาคำ อ.อุบลรัตน์ จ.ขอนแก่น
              <br />
              <span className="text-lg sm:text-xl text-slate-600">
                ให้บริการด้านสุขภาพแก่ชุมชน ดูแลสุขภาพประชาชนในพื้นที่ตำบลนาคำ
                <br />
                โดยทีมบุคลากรทางการแพทย์และสาธารณสุขที่มีประสบการณ์
              </span>
            </p>
          </div>

          {/* Enhanced action buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 hover:from-sky-600 hover:via-cyan-600 hover:to-emerald-600 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
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
              className="group inline-flex items-center gap-3 rounded-2xl border-2 border-cyan-300 bg-white/80 backdrop-blur-sm text-sky-700 hover:bg-sky-50 hover:border-sky-400 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
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
          </div>

          {/* Service hours and location */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-slate-600">
            <div className="flex items-center gap-3 bg-white/70 backdrop-blur-sm rounded-full px-6 py-3 shadow-md">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-medium">
                  เปิดให้บริการ จันทร์-อาทิตย์
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-6 py-3 shadow-md">
              <svg
                className="w-5 h-5 text-sky-600"
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
              <span className="font-medium">อ.อุบลรัตน์ จ.ขอนแก่น</span>
            </div>
          </div>
        </div>

        {/* Slideshow section - moved to bottom */}
        <div className="mt-20 max-w-4xl mx-auto">
          <ImageSlideshow />
        </div>
      </div>
    </section>
  );
}

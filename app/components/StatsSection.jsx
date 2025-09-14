"use client";

import { useState, useEffect } from "react";

// Statistics data for the hospital
const statsData = [
  {
    icon: "👥",
    number: 12500,
    suffix: "+",
    title: "ผู้ป่วยที่ได้รับการดูแล",
    subtitle: "ตั้งแต่เปิดให้บริการ",
    color: "from-sky-500 to-cyan-500",
    bgColor: "from-sky-50 to-cyan-50",
    borderColor: "border-sky-200",
  },
  {
    icon: "⭐",
    number: 4.8,
    suffix: "/5",
    title: "คะแนนความพึงพอใจ",
    subtitle: "จากการประเมินผู้ป่วย",
    color: "from-emerald-500 to-teal-500",
    bgColor: "from-emerald-50 to-teal-50",
    borderColor: "border-emerald-200",
  },
  {
    icon: "🏆",
    number: 15,
    suffix: " ปี",
    title: "ประสบการณ์ให้บริการ",
    subtitle: "ดูแลสุขภาพชุมชน",
    color: "from-amber-500 to-orange-500",
    bgColor: "from-amber-50 to-orange-50",
    borderColor: "border-amber-200",
  },
  {
    icon: "⚡",
    number: 24,
    suffix: " ชม.",
    title: "บริการฉุกเฉิน",
    subtitle: "พร้อมให้บริการทุกวัน",
    color: "from-red-500 to-pink-500",
    bgColor: "from-red-50 to-pink-50",
    borderColor: "border-red-200",
  },
];

// Counter animation hook
function useCounter(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime;
    const isDecimal = target % 1 !== 0;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      if (isDecimal) {
        setCount(target * percentage);
      } else {
        setCount(Math.floor(target * percentage));
      }

      if (percentage < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [target, duration, hasStarted]);

  return [count, () => setHasStarted(true)];
}

// Individual stat card component
function StatCard({ stat, index }) {
  const [count, startCounter] = useCounter(stat.number);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => startCounter(), index * 200);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById(`stat-${index}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [startCounter, index]);

  return (
    <div
      id={`stat-${index}`}
      className={`group relative bg-gradient-to-br ${
        stat.bgColor
      } backdrop-blur-sm rounded-2xl p-8 shadow-xl border ${
        stat.borderColor
      }/50 hover:shadow-2xl transition-all duration-500 hover:scale-105 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{
        transitionDelay: `${index * 100}ms`,
      }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-white/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Icon */}
      <div
        className={`relative w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}
      >
        {stat.icon}
        <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Number */}
      <div className="relative mb-4">
        <span
          className={`text-4xl lg:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
        >
          {stat.number % 1 !== 0 ? count.toFixed(1) : Math.floor(count)}
        </span>
        <span
          className={`text-2xl lg:text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
        >
          {stat.suffix}
        </span>
      </div>

      {/* Title and subtitle */}
      <div className="relative">
        <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-slate-900 transition-colors duration-300">
          {stat.title}
        </h3>
        <p className="text-slate-600 group-hover:text-slate-700 transition-colors duration-300">
          {stat.subtitle}
        </p>
      </div>

      {/* Hover effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10" />
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-cyan-50/50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.05),transparent_50%)]" />

      {/* Floating decorative shapes */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-sky-200 to-cyan-200 rounded-full opacity-20 animate-float" />
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full opacity-20 animate-float-delayed" />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-white/95 backdrop-blur-lg rounded-full px-8 py-4 shadow-xl border-2 border-cyan-100 mb-8">
            <div className="w-4 h-4 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-xl font-bold text-slate-800">
              ความสำเร็จและความภาคภูมิใจ
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-sky-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent mb-6">
            ตัวเลขที่สะท้อนคุณภาพ
          </h2>

          <p className="text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed">
            โรงพยาบาลส่งเสริมสุขภาพตำบลนาคำ
            มุ่งมั่นในการให้บริการสุขภาพที่มีคุณภาพ
            <br />
            ด้วยประสบการณ์และความเชี่ยวชาญในการดูแลสุขภาพชุมชน
          </p>
        </div>

        {/* Statistics grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
          animation-delay: -2s;
        }
      `}</style>
    </section>
  );
}

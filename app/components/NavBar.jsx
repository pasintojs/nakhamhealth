"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { href: "/", label: "หน้าหลัก", type: "link" },
    { href: "/news", label: "ข่าวสาร", type: "link" },
    { href: "/event", label: "ตารางการดำเนินงานและกิจกรรม", type: "link" },
    { href: "/staff", label: "บุคลากร", type: "link" },
    { href: "/about", label: "เกี่ยวกับเรา", type: "link" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-gradient-to-br from-sky-50/95 via-cyan-50/95 to-emerald-50/95 backdrop-blur-xl border-b border-gradient-vibrant shadow-lg relative">
      {/* Enhanced gradient accent bars */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-sky-300/60 to-transparent" />

      {/* Background accent patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(16,185,129,0.08),transparent_50%)]" />

      <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between relative">
        {/* Enhanced Logo with glow effect */}
        <Link href="/" className="flex items-center gap-4 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-sky-400/30 to-emerald-400/30 rounded-full blur-lg animate-pulse"></div>
            <Image
              src="/images/logo-v3.png"
              alt="โรงพยาบาลส่งเสริมสุขภาพตำบลนาคำ"
              width={60}
              height={60}
              className="relative drop-shadow-xl hover:scale-110 transition-all duration-300 rounded-full border-2 border-white/50 bg-white/90 backdrop-blur-sm"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold bg-gradient-to-r from-sky-700 via-cyan-700 to-emerald-700 bg-clip-text text-transparent text-base leading-tight group-hover:from-sky-600 group-hover:via-cyan-600 group-hover:to-emerald-600 transition-all duration-300">
              โรงพยาบาลส่งเสริมสุขภาพตำบลนาคำ
            </span>
            <span className="text-sm bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent leading-tight">
              อ.อุบลรัตน์ จ.ขอนแก่น
            </span>
          </div>
        </Link>

        {/* Enhanced Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {navItems.map((item) =>
            item.type === "link" ? (
              <Link
                key={item.href}
                href={item.href}
                className="relative font-medium text-slate-700 hover:text-sky-600 transition-all duration-300 py-2 px-4 rounded-xl hover:bg-white/30 hover:backdrop-blur-sm hover:shadow-lg group"
              >
                <span className="relative z-10">{item.label}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-sky-100/0 via-cyan-100/0 to-emerald-100/0 group-hover:from-sky-100/40 group-hover:via-cyan-100/40 group-hover:to-emerald-100/40 rounded-xl transition-all duration-300"></div>
              </Link>
            ) : (
              <a
                key={item.href}
                href={item.href}
                className="relative font-medium text-slate-700 hover:text-sky-600 transition-all duration-300 py-2 px-4 rounded-xl hover:bg-white/30 hover:backdrop-blur-sm hover:shadow-lg group"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="relative z-10">{item.label}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-sky-100/0 via-cyan-100/0 to-emerald-100/0 group-hover:from-sky-100/40 group-hover:via-cyan-100/40 group-hover:to-emerald-100/40 rounded-xl transition-all duration-300"></div>
              </a>
            )
          )}
        </nav>

        {/* Enhanced Desktop CTA Button */}
        <a
          href="/contact"
          className="hidden md:inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 hover:from-sky-600 hover:via-cyan-600 hover:to-emerald-600 text-white px-6 py-3 text-sm font-bold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 border border-white/20 backdrop-blur-sm relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          <svg
            className="w-4 h-4 relative z-10"
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
          <span className="relative z-10">ติดต่อเรา</span>
        </a>

        {/* Enhanced Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden relative h-10 w-10 flex flex-col items-center justify-center gap-1 rounded-xl bg-gradient-to-br from-sky-100/50 to-emerald-100/50 backdrop-blur-sm border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          aria-label="Toggle menu"
        >
          <span
            className={`h-0.5 w-6 bg-gradient-to-r from-sky-600 to-emerald-600 transition-all duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-gradient-to-r from-cyan-600 to-sky-600 transition-all duration-300 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-gradient-to-r from-emerald-600 to-cyan-600 transition-all duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          />
        </button>
      </div>

      {/* Enhanced Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-gradient-to-br from-sky-50/98 via-cyan-50/98 to-emerald-50/98 backdrop-blur-xl border-t border-gradient-vibrant shadow-2xl relative">
          {/* Mobile menu background patterns */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.1),transparent_50%)]" />

          <nav className="max-w-6xl mx-auto px-6 py-6 flex flex-col gap-2 relative">
            {navItems.map((item, index) =>
              item.type === "link" ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative text-slate-800 hover:text-sky-600 py-3 px-4 rounded-xl hover:bg-gradient-to-r hover:from-sky-100/40 hover:via-cyan-100/40 hover:to-emerald-100/40 transition-all duration-300 font-medium shadow-sm hover:shadow-lg border border-transparent hover:border-white/30 backdrop-blur-sm"
                  onClick={() => setIsMenuOpen(false)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-sky-400 to-emerald-400 opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {item.label}
                  </div>
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  className="group relative text-slate-800 hover:text-sky-600 py-3 px-4 rounded-xl hover:bg-gradient-to-r hover:from-sky-100/40 hover:via-cyan-100/40 hover:to-emerald-100/40 transition-all duration-300 font-medium shadow-sm hover:shadow-lg border border-transparent hover:border-white/30 backdrop-blur-sm"
                  onClick={() => setIsMenuOpen(false)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-sky-400 to-emerald-400 opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {item.label}
                  </div>
                </a>
              )
            )}
            <div className="pt-4 border-t border-gradient-to-r from-transparent via-sky-200/60 to-transparent mt-4">
              <a
                href="/contact"
                className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 hover:from-sky-600 hover:via-cyan-600 hover:to-emerald-600 text-white px-6 py-4 font-bold w-full transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 border border-white/20 backdrop-blur-sm relative overflow-hidden"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <svg
                  className="w-5 h-5 relative z-10"
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
                <span className="relative z-10">ติดต่อเรา</span>
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

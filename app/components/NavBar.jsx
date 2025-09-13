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
    { href: "#services", label: "บริการของเรา", type: "scroll" },
    { href: "#about", label: "เกี่ยวกับเรา", type: "scroll" },
    { href: "/news", label: "ข่าวสาร", type: "link" },
    { href: "/staff", label: "บุคลากร", type: "link" },
    { href: "#contact", label: "ติดต่อเรา", type: "scroll" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur border-b border-slate-200/70 relative">
      {/* Gradient accent bar */}
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400" />
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative">
            <Image
              src="/images/logo.png"
              alt="โรงพยาบาลส่งเสริมสุขภาพตำบลนาคำ"
              width={55}
              height={55}
              className="drop-shadow-sm hover:scale-105 transition-transform duration-200 rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-800 text-sm leading-tight">
              โรงพยาบาลส่งเสริมสุขภาพตำบลนาคำ
            </span>
            <span className="text-xs text-slate-600 leading-tight">
              อ.อุบลรัตน์ จ.ขอนแก่น
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navItems.map((item) =>
            item.type === "link" ? (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-sky-700 text-slate-700 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-sky-700 text-slate-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            )
          )}
        </nav>

        {/* Desktop CTA Button */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center rounded-md bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 hover:from-sky-600 hover:via-cyan-600 hover:to-emerald-600 text-white px-4 py-2 text-sm font-medium transition-colors shadow"
        >
          นัดหมาย
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden relative h-8 w-8 flex flex-col items-center justify-center gap-1"
          aria-label="Toggle menu"
        >
          <span
            className={`h-0.5 w-6 bg-slate-900 transition-all duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-slate-900 transition-all duration-300 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-slate-900 transition-all duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white/95 backdrop-blur border-t border-slate-200">
          <nav className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-3">
            {navItems.map((item) =>
              item.type === "link" ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-slate-900 hover:text-sky-700 py-2 px-3 rounded-md hover:bg-slate-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-slate-900 hover:text-sky-700 py-2 px-3 rounded-md hover:bg-slate-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              )
            )}
            <div className="pt-2 border-t border-slate-200 mt-2">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 hover:from-sky-600 hover:via-cyan-600 hover:to-emerald-600 text-white px-4 py-3 font-medium w-full transition-colors shadow"
                onClick={() => setIsMenuOpen(false)}
              >
                นัดหมาย
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

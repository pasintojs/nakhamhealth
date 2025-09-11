import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-cyan-200 bg-white/70">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Main footer content */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-6">
          {/* Logo and hospital info */}
          <div className="flex items-center gap-4">
            <Image
              src="/images/logo.png"
              alt="โรงพยาบาลส่งเสริมสุขภาพตำบลนาคำ"
              width={65}
              height={65}
              className="drop-shadow-sm rounded-full"
            />
            <div className="text-sm">
              <div className="font-semibold text-slate-800">รพ.สต.นาคำ</div>
              <div className="text-slate-600">อ.อุบลรัตน์ จ.ขอนแก่น</div>
              <div className="text-xs text-slate-500 mt-1">
                ดูแลสุขภาพชุมชนด้วยใจ
              </div>
            </div>
          </div>

          {/* Navigation links */}
          <div className="flex items-center gap-6 text-sm">
            <a
              href="#services"
              className="hover:text-sky-700 transition-colors"
            >
              บริการของเรา
            </a>
            <a href="#about" className="hover:text-sky-700 transition-colors">
              เกี่ยวกับเรา
            </a>
            <a href="#contact" className="hover:text-sky-700 transition-colors">
              ติดต่อ
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-4 border-t border-slate-200 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} โรงพยาบาลส่งเสริมสุขภาพตำบลนาคำ
          อ.อุบลรัตน์ จ.ขอนแก่น - สงวนลิขสิทธิ์
        </div>
      </div>
    </footer>
  );
}

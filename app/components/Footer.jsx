import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative border-t border-gradient-vibrant bg-gradient-to-br from-sky-50/95 via-cyan-50/95 to-emerald-50/95 backdrop-blur-xl overflow-hidden">
      {/* Enhanced gradient accent bars */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400" />

      {/* Background accent patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.1),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.1),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.05),transparent_70%)]" />

      <div className="max-w-6xl mx-auto px-6 py-12 relative">
        {/* Main footer content */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-8">
          {/* Enhanced Logo and hospital info */}
          <div className="flex flex-col sm:flex-row items-center gap-6 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-400/30 via-cyan-400/30 to-emerald-400/30 rounded-full blur-xl animate-pulse"></div>
              <div
                className="absolute inset-0 bg-gradient-to-br from-sky-200/40 to-emerald-200/40 rounded-full blur-lg animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
              <Image
                src="/images/logo-v3.png"
                alt="โรงพยาบาลส่งเสริมสุขภาพตำบลนาคำ"
                width={80}
                height={80}
                className="relative drop-shadow-2xl rounded-full border-3 border-white/60 bg-white/90 backdrop-blur-sm group-hover:scale-110 transition-all duration-500 shadow-xl"
              />
            </div>
            <div className="text-center sm:text-left">
              <div className="font-bold text-xl bg-gradient-to-r from-sky-700 via-cyan-700 to-emerald-700 bg-clip-text text-transparent group-hover:from-sky-600 group-hover:via-cyan-600 group-hover:to-emerald-600 transition-all duration-300">
                โรงพยาบาลส่งเสริมสุขภาพตำบลนาคำ
              </div>
              <div className="text-lg bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent font-medium">
                อ.อุบลรัตน์ จ.ขอนแก่น
              </div>
              <div className="text-sm text-slate-600 mt-2 bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent font-medium">
                ดูแลสุขภาพชุมชนด้วยใจ 💙
              </div>

              {/* Contact info with icons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-4 text-sm">
                <div className="flex items-center gap-2 bg-white/40 backdrop-blur-sm rounded-full px-4 py-2 shadow-md border border-white/30">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-slate-700 font-medium">
                    เปิดให้บริการทุกวัน
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white/40 backdrop-blur-sm rounded-full px-4 py-2 shadow-md border border-white/30">
                  <svg
                    className="w-4 h-4 text-sky-600"
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
                  <span className="text-slate-700 font-medium">ตำบลนาคำ</span>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Navigation links */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            {[
              { href: "/news", label: "ข่าวสาร", icon: "📰" },
              { href: "/event", label: "ตารางกิจกรรม", icon: "📅" },
              { href: "/staff", label: "บุคลากร", icon: "👥" },
              { href: "/about", label: "เกี่ยวกับเรา", icon: "🏥" },
              { href: "/contact", label: "ติดต่อ", icon: "📞" },
            ].map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                className="group flex items-center gap-2 font-medium text-slate-700 hover:text-transparent hover:bg-gradient-to-r hover:from-sky-600 hover:via-cyan-600 hover:to-emerald-600 hover:bg-clip-text transition-all duration-300 py-3 px-4 rounded-xl hover:bg-gradient-to-r hover:from-sky-100/40 hover:via-cyan-100/40 hover:to-emerald-100/40 hover:shadow-lg border border-transparent hover:border-white/30 backdrop-blur-sm transform hover:scale-105"
              >
                <span className="text-lg group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Enhanced Services showcase */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-8">
          <div className="bg-gradient-to-br from-sky-100/60 via-white/40 to-cyan-100/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30 hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-cyan-500 rounded-xl flex items-center justify-center text-white text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                🏥
              </div>
              <h3 className="font-bold text-slate-800 group-hover:bg-gradient-to-r group-hover:from-sky-600 group-hover:to-cyan-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                บริการรักษา
              </h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              ตรวจรักษาโรคทั่วไป ฉุกเฉิน และดูแลสุขภาพครอบครัว
            </p>
          </div>

          <div className="bg-gradient-to-br from-cyan-100/60 via-white/40 to-emerald-100/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30 hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-xl flex items-center justify-center text-white text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                🦷
              </div>
              <h3 className="font-bold text-slate-800 group-hover:bg-gradient-to-r group-hover:from-cyan-600 group-hover:to-emerald-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                ทันตกรรม
              </h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              รักษาและดูแลสุขภาพช่องปากและฟัน
            </p>
          </div>

          <div className="bg-gradient-to-br from-emerald-100/60 via-white/40 to-sky-100/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30 hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-sky-500 rounded-xl flex items-center justify-center text-white text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                💊
              </div>
              <h3 className="font-bold text-slate-800 group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-sky-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                ส่งเสริมสุขภาพ
              </h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              ป้องกันโรค ฟื้นฟูสภาพ และแนะนำการดูแลสุขภาพ
            </p>
          </div>
        </div> */}

        {/* Enhanced Copyright with gradient design */}
        <div className="pt-6 border-t border-gradient-to-r from-transparent via-sky-200/60 to-transparent text-center relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent"></div>
          <p className="text-sm bg-gradient-to-r from-slate-600 via-slate-700 to-slate-600 bg-clip-text text-transparent font-medium">
            © {new Date().getFullYear()} โรงพยาบาลส่งเสริมสุขภาพตำบลนาคำ
            อ.อุบลรัตน์ จ.ขอนแก่น
          </p>
          <p className="text-xs text-slate-500 mt-2">
            สงวนลิขสิทธิ์ | ดูแลสุขภาพชุมชนด้วยความเอาใจใส่และมืออาชีพ
          </p>

          {/* Decorative elements */}
          <div className="flex justify-center gap-4 mt-4">
            <div className="w-2 h-2 bg-gradient-to-r from-sky-400 to-cyan-500 rounded-full animate-pulse"></div>
            <div
              className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-emerald-500 rounded-full animate-pulse"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-sky-500 rounded-full animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>
        </div>
      </div>
    </footer>
  );
}

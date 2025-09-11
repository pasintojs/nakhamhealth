import Image from "next/image";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-16 sm:py-20 bg-gradient-to-b from-cyan-50 to-emerald-50 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(16,185,129,0.05),transparent_50%)]" />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Enhanced section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-white/95 backdrop-blur-lg rounded-full px-6 py-3 shadow-xl border-2 border-cyan-100 mb-6">
            <div className="w-3 h-3 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-lg font-bold text-slate-800">
              เกี่ยวกับเรา
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-sky-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            วิสัยทัศน์และพันธกิจ
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            โรงพยาบาลส่งเสริมสุขภาพตำบลนาคำ มุ่งมั่นให้บริการสุขภาพที่มีคุณภาพ
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {/* Vision */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-cyan-200/50 hover:shadow-2xl transition-all duration-500">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
                  🎯
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-cyan-600 bg-clip-text text-transparent">
                    วิสัยทัศน์
                  </h3>
                  <div className="w-12 h-1 bg-gradient-to-r from-sky-500 to-cyan-500 rounded-full mt-2"></div>
                </div>
              </div>
              <p className="text-slate-700 text-lg leading-relaxed">
                มุ่งพัฒนาสถานบริการที่ได้มาตรฐาน บริการประทับใจ
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-cyan-200/50 hover:shadow-2xl transition-all duration-500">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
                  🚀
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    พันธกิจ
                  </h3>
                  <div className="w-12 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mt-2"></div>
                </div>
              </div>
              <ul className="space-y-4">
                {[
                  "ให้บริการตามมาตรฐานวิชาชีพ ครอบคลุมด้านการส่งเสริมสุขภาพ ป้องกันโรค รักษาพยาบาล ฟื้นฟูสภาพและการแพทย์ทางเลือก",
                  "ส่งเสริมการมีส่วนร่วมของประชาชนในการดูแลสุขภาพ",
                  "พัฒนาศักยภาพและสนับสนุนเครือข่ายบริการสุขภาพ",
                  "พัฒนาระบบบริหารจัดการอย่างมีประสิทธิภาพ",
                ].map((mission, idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-slate-700 leading-relaxed">
                      {mission}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button */}
            {/* <div className="text-center">
              <a
                href="#contact"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 hover:from-sky-600 hover:via-cyan-600 hover:to-emerald-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <svg
                  className="w-5 h-5"
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
                สอบถามเพิ่มเติม
              </a>
            </div> */}
          </div>

          {/* Enhanced image grid */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="group relative overflow-hidden rounded-2xl shadow-xl border border-cyan-200/50 bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src="/images/about-1.svg"
                    alt="ห้องตรวจ"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h4 className="text-white font-semibold text-lg">
                      ห้องตรวจ
                    </h4>
                    <p className="text-white/90 text-sm">
                      สิ่งอำนวยความสะดวกครบครัน
                    </p>
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl shadow-xl border border-cyan-200/50 bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src="/images/about-2.svg"
                    alt="ห้องแล็บ"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h4 className="text-white font-semibold text-lg">
                      ห้องแล็บ
                    </h4>
                    <p className="text-white/90 text-sm">เทคโนโลยีทันสมัย</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl shadow-xl border border-cyan-200/50 bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 mt-12">
              <div className="aspect-[4/5] relative overflow-hidden">
                <Image
                  src="/images/about-3.svg"
                  alt="กายภาพบำบัด"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h4 className="text-white font-semibold text-lg">
                    กายภาพบำบัด
                  </h4>
                  <p className="text-white/90 text-sm">
                    การฟื้นฟูสุขภาพครบวงจร
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats section */}
        {/* <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { number: "15+", label: "ปีของการให้บริการ", icon: "📅" },
            { number: "1000+", label: "ผู้ป่วยต่อเดือน", icon: "👥" },
            { number: "24/7", label: "บริการฉุกเฉิน", icon: "🚨" },
            { number: "100%", label: "ความพึงพอใจ", icon: "⭐" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-cyan-200/50 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              <div className="text-3xl mb-3">{stat.icon}</div>
              <div className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-slate-600 text-sm font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
}

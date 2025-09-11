export default function ContactSection() {
  return (
    <section
      id="contact"
      className="py-16 sm:py-20 bg-gradient-to-b from-white to-cyan-50 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.05),transparent_50%)]" />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Enhanced section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-white/95 backdrop-blur-lg rounded-full px-6 py-3 shadow-xl border-2 border-cyan-100 mb-6">
            <div className="w-3 h-3 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-lg font-bold text-slate-800">
              ช่องทางสื่อสาร
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-sky-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            ติดต่อเรา
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            โรงพยาบาลส่งเสริมสุขภาพตำบลนาคำ อ.อุบลรัตน์ จ.ขอนแก่น
            พร้อมให้บริการและตอบคำถามของท่าน
          </p>
        </div>

        {/* Contact Information - Centered Layout */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Hospital Info Card */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-cyan-200/50 hover:shadow-2xl transition-all duration-500">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
                  🏥
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">
                    ข้อมูลโรงพยาบาล
                  </h3>
                  {/* <p className="text-slate-600">ติดต่อเราได้ตลอด 24 ชั่วโมง</p> */}
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-700">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                    📍
                  </div>
                  <span>ตำบลนาคำ อ.อุบลรัตน์ จ.ขอนแก่น</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                    ⏰
                  </div>
                  <span>เปิดบริการ: จันทร์-อาทิตย์</span>
                </div>
                {/* <div className="flex items-center gap-3 text-slate-700">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                    🚨
                  </div>
                  <span>ฉุกเฉิน: 24 ชั่วโมง ทุกวัน</span>
                </div> */}
              </div>
            </div>

            {/* Quick Services */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-cyan-200/50 hover:shadow-2xl transition-all duration-500">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
                  ⚡
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">
                    บริการด่วน
                  </h3>
                  <p className="text-slate-600">บริการที่ได้รับความนิยม</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {["นัดหมายตรวจ", "สอบถามผลแล็บ", "ปรึกษาโรค", "ฉุกเฉิน"].map(
                  (service, idx) => (
                    <button
                      key={idx}
                      className="bg-gradient-to-r from-emerald-50 to-cyan-50 hover:from-emerald-100 hover:to-cyan-100 text-emerald-700 px-4 py-3 rounded-xl text-sm font-semibold border border-emerald-200 hover:border-emerald-300 transition-all duration-300 hover:scale-105"
                    >
                      {service}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Contact Methods */}
          <div className="grid sm:grid-cols-2 gap-6">
            <a
              href="tel:+6686-451-3276"
              className="group flex items-center gap-4 bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-cyan-200/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                📞
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-800 mb-1 text-lg">
                  โทรศัพท์
                </h4>
                <p className="text-slate-600 text-lg">086-451-3276</p>
                {/* <p className="text-slate-500 text-sm">คลิกเพื่อโทรหา</p> */}
              </div>
              <svg
                className="w-6 h-6 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all duration-300"
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
            </a>

            <a
              href="mailto:so04343@hotmail.com"
              className="group flex items-center gap-4 bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-cyan-200/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                📧
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-800 mb-1 text-lg">อีเมล</h4>
                <p className="text-slate-600 text-lg">so04343@hotmail.com</p>
                {/* <p className="text-slate-500 text-sm">คลิกเพื่อส่งอีเมล</p> */}
              </div>
              <svg
                className="w-6 h-6 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-1 transition-all duration-300"
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
            </a>
          </div>
        </div>

        {/* Map placeholder */}
        <div className="mt-12">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-cyan-200/50">
            <h3 className="text-xl font-bold text-slate-800 mb-6 text-center">
              แผนที่และการเดินทาง
            </h3>
            <div className="bg-gradient-to-br from-sky-100 via-cyan-100 to-emerald-100 rounded-xl h-64 flex items-center justify-center border border-cyan-200">
              <div className="text-center">
                <div className="text-4xl mb-4">🗺️</div>
                <p className="text-slate-600 font-medium">
                  แผนที่ตำแหน่งโรงพยาบาล
                </p>
                <p className="text-slate-500 text-sm mt-2">
                  ตำบลนาคำ อ.อุบลรัตน์ จ.ขอนแก่น
                </p>
                <button className="mt-4 bg-gradient-to-r from-sky-500 to-emerald-500 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                  ดูแผนที่
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

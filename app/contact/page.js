import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen text-slate-900 bg-[radial-gradient(1200px_600px_at_80%_-10%,#e0f2fe_10%,transparent_60%),linear-gradient(to_bottom,#ffffff,rgba(224,242,254,0.3))]">
      <NavBar />

      {/* Contact Hero Section */}
      <div className="text-center py-16">
        <h1 className="animate-pulse text-4xl pt-1 sm:text-5xl font-bold bg-gradient-to-r from-sky-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent mb-4">
          ติดต่อเรา
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          โรงพยาบาลส่งเสริมสุขภาพตำบลนาคำ อ.อุบลรัตน์ จ.ขอนแก่น
          <br />
          พร้อมให้บริการและตอบคำถามของท่าน
        </p>
      </div>

      {/* Main Contact Content */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-transparent to-cyan-50/50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.05),transparent_50%)]" />

        <div className="max-w-6xl mx-auto px-6 relative">
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
                    <p className="text-slate-600">ข้อมูลทั่วไปและเวลาบริการ</p>
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
                  <div className="flex items-center gap-3 text-slate-700">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                      🚨
                    </div>
                    <span>ฉุกเฉิน: 24 ชั่วโมง ทุกวัน</span>
                  </div>
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
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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
                  <p className="text-slate-500 text-sm">คลิกเพื่อโทรหา</p>
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
                  <h4 className="font-bold text-slate-800 mb-1 text-lg">
                    อีเมล
                  </h4>
                  <p className="text-slate-600 text-lg">so04343@hotmail.com</p>
                  <p className="text-slate-500 text-sm">คลิกเพื่อส่งอีเมล</p>
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

              <a
                href="https://www.facebook.com/NakhamHealthcenter/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-cyan-200/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  📘
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-800 mb-1 text-lg">
                    Facebook
                  </h4>
                  <p className="text-slate-600 text-lg">NakhamHealthcenter</p>
                  <p className="text-slate-500 text-sm">
                    ติดตามข่าวสารและกิจกรรม
                  </p>
                </div>
                <svg
                  className="w-6 h-6 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>

            {/* Additional Contact Information */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {/* Office Hours */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-cyan-200/50">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white text-xl mx-auto mb-4">
                    🕐
                  </div>
                  <h4 className="font-bold text-slate-800 mb-2">เวลาทำการ</h4>
                  <p className="text-slate-600 text-sm mb-1">จันทร์ - ศุกร์</p>
                  <p className="text-slate-800 font-semibold">
                    08:30 - 16:30 น.
                  </p>
                  <p className="text-slate-600 text-sm mt-2">เสาร์ - อาทิตย์</p>
                  <p className="text-slate-800 font-semibold">
                    08:30 - 12:00 น.
                  </p>
                </div>
              </div>

              {/* Emergency */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-red-200/50">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-xl mx-auto mb-4">
                    🚨
                  </div>
                  <h4 className="font-bold text-slate-800 mb-2">ฉุกเฉิน</h4>
                  <p className="text-slate-600 text-sm mb-1">
                    บริการตลอด 24 ชั่วโมง
                  </p>
                  <p className="text-red-600 font-semibold text-lg">1669</p>
                  <p className="text-slate-600 text-sm mt-1">
                    หรือ 086-451-3276
                  </p>
                </div>
              </div>

              {/* Parking */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-cyan-200/50">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white text-xl mx-auto mb-4">
                    🅿️
                  </div>
                  <h4 className="font-bold text-slate-800 mb-2">ที่จอดรถ</h4>
                  <p className="text-slate-600 text-sm mb-1">บริการฟรี</p>
                  <p className="text-slate-800 font-semibold">
                    ใกล้อาคารผู้ป่วยนอก
                  </p>
                  <p className="text-slate-600 text-sm mt-1">เปิด 24 ชั่วโมง</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-cyan-200/50">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">
                แผนที่และการเดินทาง
              </h3>

              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-sky-200/50 overflow-hidden hover:shadow-2xl transition-all duration-500">
                <div className="aspect-video relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243.47289755859447!2d102.68197800000001!3d16.861279!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDUxJzM4LjkiTiAxMDLCsDQwJzU0LjEiRQ!5e0!3m2!1sth!2sus!4v1726302030000!5m2!1sth!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 w-full h-full"
                    title="โรงพยาบาลส่งเสริมสุขภาพตำบลนาคำ"
                  ></iframe>
                </div>

                {/* Map Footer with Additional Info */}
                <div className="p-6 bg-gradient-to-r from-sky-50 via-cyan-50 to-blue-50">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-sky-500 to-cyan-500 rounded-full flex items-center justify-center text-white shadow-lg">
                        📍
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800">
                          พิกัด GPS
                        </div>
                        <div className="text-slate-600 text-sm">
                          16°51'38.9"N 102°40'54.1"E
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white shadow-lg">
                        🚗
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800">
                          การเดินทาง
                        </div>
                        <div className="text-slate-600 text-sm">
                          สามารถเดินทางโดยรถยนต์ส่วนตัว
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white shadow-lg">
                        🅿️
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800">
                          ที่จอดรถ
                        </div>
                        <div className="text-slate-600 text-sm">
                          มีพื้นที่จอดรถเพียงพอ
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-sky-200">
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                      <a
                        href="https://www.google.com/maps?ll=16.861279,102.681978&z=17&t=m&hl=th&gl=US&mapclient=embed&q=16%C2%B051%2738.9%22N+102%C2%B040%2754.1%22E+16.860796,+102.681688@16.860796,102.681688"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white px-6 py-3 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        เปิดใน Google Maps
                      </a>

                      <a
                        href="https://maps.google.com/maps?daddr=16.860796,102.681688"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 rounded-xl border-2 border-cyan-300 bg-white/80 backdrop-blur-sm text-cyan-700 hover:bg-cyan-50 hover:border-cyan-400 px-6 py-3 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
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
                            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                          />
                        </svg>
                        นำทาง
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Directions */}
              <div className="mt-8 grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-sky-50 to-cyan-50 rounded-xl p-6 border border-sky-200">
                  <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                    🚗 เดินทางโดยรถยนต์
                  </h4>
                  <ul className="text-slate-600 space-y-1 text-sm">
                    <li>• จาก ขอนแก่น มุ่งหน้าสู่อุบลรัตน์</li>
                    <li>• ใช้เส้นทางหลวงแผ่นดินหมายเลข 12</li>
                    <li>• เลี้ยวเข้าตำบลนาคำ</li>
                    <li>• โรงพยาบาลอยู่ใจกลางตำบล</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200">
                  <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                    🚌 เดินทางโดยรถประจำทาง
                  </h4>
                  <ul className="text-slate-600 space-y-1 text-sm">
                    <li>• รถประจำทาง ขอนแก่น - อุบลรัตน์</li>
                    <li>• ลงที่ตลาดนาคำ</li>
                    <li>• เดินทางต่อด้วยสองแถว</li>
                    <li>• หรือเดินประมาณ 500 เมตร</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

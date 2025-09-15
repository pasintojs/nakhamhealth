"use client";

import Image from "next/image";

const staffMembers = [
  {
    name: "นางเกตุกมล ทองภาพ",
    role: "ผู้อำนวยการโรงพยาบาลส่งเสริมสุขภาพตำบลนาคำ",
    img: "/images/1kkm.jpg",
    specialties: [
      "งานบริหาร",
      "พัฒนายุทธศาสตร์สาธารณสุข",
      "งานมาตรฐานหน่วยบริการ",
      "งานพัฒนาบุคลากร/พัฒนาหน่วยบริการ",
      "กองทุนหลักประกันสุขภาพ",
      "สนับสนุนสุขภาพภาคประชาชน",
    ],
    experience: "  ",
    description: "ผู้นำองค์กรด้วยวิสัยทัศน์และประสบการณ์อันยาวนาน",
  },
  {
    name: "นางมณีวงศ์ ขามก้อน",
    role: "เจ้าพนักงานทันตสาธารณสุขชำนาญงาน",
    img: "/images/1mnv.jpg",
    specialties: [
      "งานทันตสาธารณสุข",
      "งานบริหารเวชภัณฑ์",
      "งานการแพทย์แผนไทยและแพทย์ทางเลือก",
      "งานประกันสุขภาพถ้วนหน้า/ประกันสังคม",
    ],
    experience: "  ",
    description: "ผู้เชี่ยวชาญด้านทันตกรรมและสุขภาพช่องปาก",
  },

  {
    name: "นางศิริพร พรมสุวรรณ์",
    role: "นักวิชาการสาธารณสุขปฏิบัติการ",
    img: "/images/1srp.jpg",
    specialties: [
      "ป้องกันโรค",
      "คัดกรองสุขภาพ",
      "งานคุ้มครองผู้บริโภคด้านสุขภาพ",
      "งานอนามัยโรงเรียน",
      "งานอาชีวอนามัยและอนามัยสิ่งแวดล้อม",
      "ส่งเสริมสุขภาพผู้สูงอายุ",
    ],
    experience: "  ",
    description: "ผู้เชี่ยวชาญด้านสาธารณสุขและการส่งเสริมสุขภาพชุมชน",
  },
  {
    name: "นางสาวนันทนา มงคล",
    role: "พยาบาลวิชาชีพ",
    img: "/images/1ntn.jpg",
    specialties: [
      "งานรักษาพยาบาลและส่งเสริมสุขภาพ",
      "งานป้องกันและควบคุมการติดเชื้อในสถานบริการ(IC)",
      "งานอนามัยแม่และเด็ก",
      "งานสุขภาพจิต",
      "งานอุบัติเหตุและฉุกเฉิน(EMS)",
    ],
    experience: "  ",
    description: "พยาบาลมืออาชีพที่ใส่ใจในการดูแลผู้ป่วยอย่างเป็นองค์รวม",
  },
  {
    name: "นางเพ็ญณี จิตชาตรี",
    role: "ผู้ช่วยเจ้าหน้าที่อนามัย",
    img: "/images/11pn.jpg",
    specialties: [
      "งานความสะอาดเครื่องมือและปราศจากเชื้อ",
      "งานบริการ",
      "งานควบคุมโรคติดต่อและไม่ติดต่อ",
    ],
    experience: "  ",
    description: "ผู้ช่วยงานบริการสาธารณสุข",
  },

  {
    name: "นางสาวมินตรา ชาวัตร",
    role: "เจ้าพนักงานการเงินและบัญชี",
    img: "/images/1nil.jpg",
    specialties: ["งานเอกสาร", "ประสานงาน", "บริการข้อมูล"],
    experience: "  ",
    description:
      "เจ้าพนักงานการเงินและบัญชีที่มีความรู้ความสามารถในการจัดการเอกสารและประสานงาน",
  },

  {
    name: "นางสาววรรณดา ขามก้อน",
    role: "พนักงานบริการ",
    img: "/images/11wd.jpg",
    specialties: ["งานบริการ", "การต้อนรับ", "งานทั่วไป"],
    experience: "  ",
    description: "ผู้ช่วยงานบริการทั่วไป",
  },
];

export default function StaffGrid() {
  return (
    <section className="relative overflow-hidden mb-6">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(16,185,129,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(59,130,246,0.05),transparent_50%)]" />

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-sky-200 to-emerald-200 rounded-full opacity-30 animate-pulse" />
      <div
        className="absolute bottom-40 right-20 w-32 h-32 bg-gradient-to-br from-emerald-200 to-cyan-200 rounded-full opacity-20 animate-bounce"
        style={{ animationDuration: "3s" }}
      />
      <div
        className="absolute top-1/2 left-20 w-16 h-16 bg-gradient-to-br from-cyan-200 to-sky-200 rounded-full opacity-25 animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Page Header */}
        <div className="text-center mb-16">
          {/* <div className="inline-flex items-center gap-3 bg-white/95 backdrop-blur-lg rounded-full px-6 py-3 shadow-xl border-2 border-cyan-100 mb-6">
            <div className="w-3 h-3 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-lg font-bold text-slate-800">
              บุคลากรของเรา
            </span>
          </div> */}
          <h1 className="animate-pulse text-4xl pt-0 pb-5 sm:text-5xl font-bold bg-gradient-to-r from-sky-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            บุคลากร
          </h1>
          <p className="text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed">
            ทีมผู้เชี่ยวชาญด้านสุขภาพที่มีประสบการณ์และความเชี่ยวชาญในสาขาต่างๆ
            พร้อมให้บริการด้วยความใส่ใจและมาตรฐานสูงสุด
          </p>
        </div>

        {/* Boss Section - Special Layout */}
        <div className="mb-20 relative">
          {/* Desktop-only floating animations around boss */}
          <div className="hidden lg:block">
            {/* Floating crown icons */}
            <div className="absolute -top-10 left-1/4 w-12 h-12 text-amber-400 animate-float opacity-30">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M5 16L3 4l5.5 4L12 4l3.5 4L21 4l-2 12H5z" />
              </svg>
            </div>
            <div
              className="absolute -top-6 right-1/4 w-10 h-10 text-orange-400 animate-float opacity-25"
              style={{ animationDelay: "1s" }}
            >
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>

            {/* Floating particles */}
            <div
              className="absolute top-20 left-10 w-4 h-4 bg-gradient-to-r from-amber-300 to-orange-300 rounded-full animate-pulse opacity-40"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="absolute top-32 right-16 w-6 h-6 bg-gradient-to-r from-orange-300 to-amber-300 rounded-full animate-bounce opacity-30"
              style={{ animationDelay: "2s", animationDuration: "3s" }}
            ></div>
            <div
              className="absolute bottom-20 left-16 w-5 h-5 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full animate-pulse opacity-35"
              style={{ animationDelay: "1.5s" }}
            ></div>
            <div
              className="absolute bottom-32 right-12 w-3 h-3 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full animate-bounce opacity-25"
              style={{ animationDelay: "0.8s", animationDuration: "2.5s" }}
            ></div>

            {/* Glowing rings */}
            <div
              className="absolute top-1/2 left-8 w-24 h-24 border-2 border-amber-300/20 rounded-full animate-spin opacity-20"
              style={{ animationDuration: "20s" }}
            ></div>
            <div
              className="absolute top-1/3 right-8 w-32 h-32 border-2 border-orange-300/15 rounded-full animate-spin opacity-15"
              style={{
                animationDuration: "25s",
                animationDirection: "reverse",
              }}
            ></div>
          </div>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-50 to-orange-50 backdrop-blur-lg rounded-full px-6 py-3 shadow-xl border-2 border-amber-200 mb-4 animate-fade-in">
              <div className="w-3 h-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full animate-pulse"></div>
              <span className="text-lg font-bold text-amber-800">
                ผู้บริหาร
              </span>
            </div>
          </div>

          {/* Boss Card - Same Size as Team Members */}
          <div className="flex justify-center relative">
            {/* Desktop-only animated elements around boss card */}
            <div className="hidden lg:block">
              {/* Left side animations */}
              <div
                className="absolute left-[-200px] top-1/4 w-16 h-16 bg-gradient-to-br from-amber-200/30 to-orange-200/30 rounded-full animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute left-[-150px] top-1/2 w-8 h-8 bg-gradient-to-r from-amber-300/40 to-orange-300/40 rounded-full animate-bounce"
                style={{ animationDelay: "2s", animationDuration: "3s" }}
              ></div>
              <div
                className="absolute left-[-180px] bottom-1/4 w-12 h-12 border-2 border-amber-300/25 rounded-full animate-spin"
                style={{ animationDuration: "15s" }}
              ></div>

              {/* Right side animations */}
              <div
                className="absolute right-[-200px] top-1/3 w-14 h-14 bg-gradient-to-bl from-orange-200/30 to-amber-200/30 rounded-full animate-pulse"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <div
                className="absolute right-[-160px] top-2/3 w-10 h-10 bg-gradient-to-l from-orange-300/40 to-amber-300/40 rounded-full animate-bounce"
                style={{ animationDelay: "1.5s", animationDuration: "2.8s" }}
              ></div>
              <div
                className="absolute right-[-190px] bottom-1/3 w-16 h-16 border-2 border-orange-300/20 rounded-full animate-spin"
                style={{
                  animationDuration: "18s",
                  animationDirection: "reverse",
                }}
              ></div>

              {/* Floating sparkles */}
              <div
                className="absolute left-[-120px] top-10 w-2 h-2 bg-amber-400 rounded-full animate-ping"
                style={{ animationDelay: "3s" }}
              ></div>
              <div
                className="absolute right-[-130px] top-16 w-3 h-3 bg-orange-400 rounded-full animate-ping"
                style={{ animationDelay: "4s" }}
              ></div>
              <div
                className="absolute left-[-110px] bottom-12 w-2 h-2 bg-amber-500 rounded-full animate-ping"
                style={{ animationDelay: "5s" }}
              ></div>
              <div
                className="absolute right-[-140px] bottom-8 w-3 h-3 bg-orange-500 rounded-full animate-ping"
                style={{ animationDelay: "2.5s" }}
              ></div>
            </div>

            <div className="group bg-gradient-to-br from-white via-amber-50/30 to-orange-50/30 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-3xl border-2 border-amber-200/50 overflow-hidden hover:-translate-y-6 transition-all duration-700 animate-fade-in-up hover-lift w-150 min-h-[42rem] relative">
              {/* Special Boss Crown/Badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                <div className="mt-8 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-xl flex items-center gap-2 animate-boss-badge">
                  <svg
                    className="w-4 h-4 animate-pulse"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732L14.146 12.8l-1.179 4.456a1 1 0 01-1.934 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732L9.854 7.2l1.179-4.456A1 1 0 0112 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  ผู้อำนวยการ
                </div>
              </div>

              {/* Profile image section */}
              <div className="relative p-8 pb-6 pt-14">
                <div className="relative mx-auto w-full max-w-40 rounded-2xl overflow-hidden border-4 border-amber-300 shadow-2xl group-hover:scale-110 group-hover:rotate-1 transition-all duration-700">
                  <div className="relative w-full h-[30rem]">
                    <Image
                      src={staffMembers[0].img}
                      alt={staffMembers[0].name}
                      width={160}
                      height={480}
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700 rounded-xl"
                      priority={true}
                      quality={95}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-500/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />

                  {/* Animated overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-all duration-700" />

                  {/* Special glow effect for boss */}
                  <div className="absolute inset-0 rounded-xl shadow-[0_0_30px_rgba(245,158,11,0.5)] opacity-0 group-hover:opacity-100 transition-all duration-700" />
                </div>

                {/* Floating badge */}
                <div className="absolute top-16 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-float">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-xl">
                    👑 Leader
                  </div>
                </div>
              </div>

              {/* Content section */}
              <div className="px-10 pb-10">
                {/* Name and role */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-4 group-hover:text-amber-700 transition-colors duration-300 leading-tight">
                    {staffMembers[0].name}
                  </h3>
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl px-6 py-4 border-2 border-amber-200 group-hover:border-amber-400 transition-all duration-300 shadow-elegant">
                    <p className="text-amber-700 font-bold text-base leading-relaxed">
                      {staffMembers[0].role}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-600 text-base leading-relaxed mb-6 text-center group-hover:text-slate-700 transition-colors duration-300 font-medium">
                  {staffMembers[0].description}
                </p>

                {/* Specialties */}
                <div className="mb-6">
                  <h4 className="text-base font-semibold text-slate-700 mb-4 flex items-center gap-2 justify-center">
                    <svg
                      className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    หน้าที่รับผิดชอบ
                  </h4>
                  <div className="flex flex-wrap gap-3 justify-center">
                    {staffMembers[0].specialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        className="bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 px-4 py-2 rounded-full text-sm font-semibold border border-amber-300 group-hover:scale-105 group-hover:shadow-lg transition-all duration-300 animate-scale-in"
                        style={{ animationDelay: `${idx * 0.1}s` }}
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact section */}
                <div className="pt-4 border-t border-amber-200 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white text-base animate-pulse">
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
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-slate-600 font-semibold">
                      พร้อมให้คำปรึกษา
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other Staff Members */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-white/95 backdrop-blur-lg rounded-full px-6 py-3 shadow-xl border-2 border-cyan-100 mb-4 animate-fade-in">
              <div className="w-3 h-3 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-lg font-bold text-slate-800">บุคลากร</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {staffMembers.slice(1).map((member, i) => (
              <div
                key={i}
                className="group bg-white/95 backdrop-blur-sm rounded-3xl shadow-elegant hover:shadow-elegant-hover border border-cyan-200/50 overflow-hidden hover:-translate-y-4 transition-all duration-700 animate-fade-in-up hover-lift max-w-80 min-h-[42rem]"
                style={{ animationDelay: `${(i + 1) * 0.1}s` }}
              >
                {/* Profile image section */}
                <div className="relative p-8 pb-6">
                  <div className="relative mx-auto w-full max-w-40 rounded-2xl overflow-hidden border-4 border-white shadow-2xl group-hover:scale-105 transition-all duration-700 animate-glow">
                    <div className="relative w-full h-[30rem]">
                      <Image
                        src={member.img}
                        alt={member.name}
                        width={160}
                        height={480}
                        className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700 rounded-xl"
                        priority={i < 3}
                        quality={90}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-sky-500/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />

                    {/* Animated overlay effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-sky-400/20 to-emerald-400/20 opacity-0 group-hover:opacity-100 transition-all duration-700" />
                  </div>

                  {/* Floating badge */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-float">
                    <div className="bg-gradient-to-r from-sky-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-xl">
                      ✨ Expert
                    </div>
                  </div>
                </div>

                {/* Content section */}
                <div className="px-8 pb-8">
                  {/* Name and role */}
                  <div className="text-center mb-6">
                    <h3 className="text-xl lg:text-2xl font-bold text-slate-800 mb-3 group-hover:text-sky-700 transition-colors duration-300 leading-tight gradient-text">
                      {member.name}
                    </h3>
                    <div className="bg-gradient-to-r from-sky-50 to-emerald-50 rounded-xl px-4 py-3 border-2 border-sky-100 group-hover:border-sky-300 transition-all duration-300 shadow-elegant">
                      <p className="text-sky-700 font-semibold text-sm leading-relaxed">
                        {member.role}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 text-center group-hover:text-slate-700 transition-colors duration-300">
                    {member.description}
                  </p>

                  {/* Specialties */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2 justify-center">
                      <svg
                        className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      หน้าที่รับผิดชอบ
                    </h4>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {member.specialties.map((specialty, idx) => (
                        <span
                          key={idx}
                          className="bg-gradient-to-r from-emerald-50 to-cyan-50 text-emerald-700 px-3 py-2 rounded-full text-xs font-medium border border-emerald-200 group-hover:scale-105 group-hover:shadow-md transition-all duration-300 animate-scale-in"
                          style={{ animationDelay: `${idx * 0.1}s` }}
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contact section */}
                  <div className="pt-4 border-t border-slate-100 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="flex items-center justify-center gap-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-sm animate-pulse">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-slate-600 text-sm font-medium">
                        พร้อมให้คำปรึกษา
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="mt-20 text-center">
          <div
            className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-cyan-200/50 max-w-4xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "0.8s" }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent mb-6">
              พร้อมให้บริการแก่ชุมชน
            </h2>
            <p className="text-slate-600 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              ทีมงานของเราพร้อมให้บริการด้วยความเอาใจใส่และมาตรฐานสูงสุด
              เพื่อสุขภาพที่ดีของคุณและครอบครัว
            </p>
            <div className="flex flex-wrap gap-6 justify-center">
              <div className="flex items-center gap-3 bg-gradient-to-r from-sky-50 to-emerald-50 px-6 py-3 rounded-full border-2 border-sky-200">
                <div className="w-3 h-3 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-slate-700 font-semibold">
                  มาตรฐานสูงสุด
                </span>
              </div>
              <div className="flex items-center gap-3 bg-gradient-to-r from-emerald-50 to-cyan-50 px-6 py-3 rounded-full border-2 border-emerald-200">
                <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full animate-pulse"></div>
                <span className="text-slate-700 font-semibold">
                  บริการครบวงจร
                </span>
              </div>
              <div className="flex items-center gap-3 bg-gradient-to-r from-cyan-50 to-sky-50 px-6 py-3 rounded-full border-2 border-cyan-200">
                <div className="w-3 h-3 bg-gradient-to-r from-cyan-500 to-sky-500 rounded-full animate-pulse"></div>
                <span className="text-slate-700 font-semibold">
                  ใส่ใจทุกรายละเอียด
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

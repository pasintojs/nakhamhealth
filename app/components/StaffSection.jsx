import Image from "next/image";

const staffMembers = [
  {
    name: "นางเกตุกมล ทองภาพ",
    role: "ผู้อำนวยการ รพ.สต.",
    img: "/images/kkm1.png",
    specialties: ["บริหารงาน", "นโยบายสาธารณสุข", "การพัฒนาระบบ"],
    experience: "  ",
    description: "ผู้นำองค์กรด้วยวิสัยทัศน์และประสบการณ์อันยาวนาน",
  },
  {
    name: "นางสาวนันทนา มงคล",
    role: "พยาบาลวิชาชีพปฏิบัติการ",
    img: "/images/eveeve.png",
    specialties: ["การพยาบาล", "การดูแลผู้ป่วย", "การฉีดวัคซีน"],
    experience: "  ",
    description: "พยาบาลมืออาชีพที่ใส่ใจในการดูแลผู้ป่วยอย่างเป็นองค์รวม",
  },
  {
    name: "นางสาวศิริพร พรมสุวรรณ์",
    role: "นักวิชาการสาธารณสุขปฏิบัติการ",
    img: "/images/srpsrp.png",
    specialties: ["ป้องกันโรค", "คัดกรองสุขภาพ", "การแพทย์ชุมชน"],
    experience: "  ",
    description: "ผู้เชี่ยวชาญด้านสาธารณสุขและการส่งเสริมสุขภาพชุมชน",
  },

  {
    name: "นางสาวมณีวงศ์ สอนอาจ",
    role: "เจ้าพนักงานทันตสาธารณสุข",
    img: "/images/mnvmnv.png",
    specialties: ["ทันตกรรม", "สุขภาพช่องปาก", "การป้องกันโรคฟัน"],
    experience: "  ",
    description: "ผู้เชี่ยวชาญด้านทันตกรรมและสุขภาพช่องปาก",
  },
  {
    name: "นางสาวปลานิล",
    role: "เจ้าหน้าที่ธุรการ",
    img: "/images/pla.png",
    specialties: ["งานเอกสาร", "ประสานงาน", "บริการข้อมูล"],
    experience: "  ",
    description:
      "เจ้าหน้าที่ธุรการที่มีความรู้ความสามารถในการจัดการเอกสารและประสานงาน",
  },

  {
    name: "นางเพ็ญณี จิตชาตรี",
    role: "ผู้ช่วยเจ้าหน้าที่อนามัย",
    img: "/images/pnpn.png",
    specialties: ["สุขาภิบาล", "อนามัยสิ่งแวดล้อม", "ควบคุมโรค"],
    experience: "  ",
    description: "ผู้ช่วยที่มีความรู้ความสามารถด้านอนามัยสิ่งแวดล้อม",
  },
];

export default function StaffSection() {
  return (
    <section
      id="staff"
      className="py-16 sm:py-20 bg-gradient-to-b from-emerald-50 to-white relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(16,185,129,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(59,130,246,0.05),transparent_50%)]" />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Enhanced section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-white/95 backdrop-blur-lg rounded-full px-6 py-3 shadow-xl border-2 border-cyan-100 mb-6">
            <div className="w-3 h-3 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-lg font-bold text-slate-800">ทีมงาน</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-sky-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            บุคลากรของเรา
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            ทีมผู้เชี่ยวชาญด้านสุขภาพที่มีประสบการณ์และความเชี่ยวชาญในสาขาต่างๆ
          </p>
        </div>

        {/* Staff grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {staffMembers.map((member, i) => (
            <div
              key={i}
              className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-cyan-200/50 overflow-hidden hover:shadow-2xl hover:-translate-y-3 transition-all duration-500"
            >
              {/* Profile image section */}
              <div className="relative p-8 pb-4">
                <div className="relative mx-auto w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl group-hover:scale-110 transition-transform duration-500">
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sky-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Experience badge */}
                <div className="absolute top-4 right-4">
                  <div className="bg-gradient-to-r from-sky-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                    {member.experience}
                  </div>
                </div>
              </div>

              {/* Content section */}
              <div className="px-8 pb-8">
                {/* Name and role */}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-sky-700 transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-sky-600 font-semibold text-sm bg-sky-50 rounded-lg px-3 py-2 border border-sky-200">
                    {member.role}
                  </p>
                </div>

                {/* Description */}
                <p className="text-slate-600 text-sm leading-relaxed mb-6 text-center">
                  {member.description}
                </p>

                {/* Specialties */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-emerald-500"
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
                    ความเชี่ยวชาญ
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {member.specialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        className="bg-gradient-to-r from-emerald-50 to-cyan-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium border border-emerald-200"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact button */}
                {/* <button className="w-full bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
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
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  ติดต่อสอบถาม
                </button> */}
              </div>
            </div>
          ))}
        </div>

        {/* Team stats */}
        {/* <div className="mt-16">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-cyan-200/50">
            <h3 className="text-2xl font-bold text-center text-slate-800 mb-8">
              ความเข้มแข็งของทีม
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { number: "6", label: "ผู้เชี่ยวชาญ", icon: "👨‍⚕️" },
                { number: "50+", label: "ปีรวมประสบการณ์", icon: "📈" },
                { number: "100%", label: "ได้รับใบอนุญาต", icon: "📜" },
                { number: "24/7", label: "พร้อมให้บริการ", icon: "⏰" },
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-3xl mb-3">{stat.icon}</div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-slate-600 text-sm font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}

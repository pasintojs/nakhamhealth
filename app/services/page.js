import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const services = [
  {
    title: "งานรักษาพยาบาลและส่งเสริมสุขภาพ",
    desc: "ตรวจรักษาโรคทั่วไป การดูแลสุขภาพเบื้องต้น และการส่งเสริมสุขภาพ",
    icon: "🏥",
    features: [""],
    //features: ["ตรวจรักษาโรคทั่วไป", "ตรวจสุขภาพประจำปี", "ให้คำปรึกษาสุขภาพ"],
  },
  {
    title: "งานอนามัยแม่และเด็ก",
    desc: "ดูแลสุขภาพมารดาและทารก ตรวจครรภ์ วัคซีนเด็ก",
    icon: "👶",
    features: [""],
    //features: ["ตรวจครรภ์", "วัคซีนเด็ก", "ดูแลหลังคลอด"],
  },
  {
    title: "งานทันตสาธารณสุข",
    desc: "รักษาฟัน การป้องกันโรคฟัน ให้คำแนะนำดูแลสุขภาพช่องปาก",
    icon: "🦷",
    features: [""],
    //features: ["รักษาฟัน", "ขูดหินปูน", "ถอนฟัน"],
  },
  {
    title: "งานป้องกันควบคุมโรค",
    desc: "ป้องกันโรคติดต่อและไม่ติดต่อ การตรวจคัดกรองโรค",
    icon: "🛡️",
    features: [""],
    //features: ["คัดกรองโรค", "ควบคุมโรคติดต่อ", "ฉีดวัคซีน"],
  },
  {
    title: "งานส่งเสริมสุขภาพผู้สูงอายุ",
    desc: "ดูแลสุขภาพผู้สูงอายุ การฟื้นฟูสุขภาพ",
    icon: "👴",
    features: [""],
    //features: ["ตรวจสุขภาพผู้สูงอายุ", "กายภาพบำบัด", "โภชนาการ"],
  },
  {
    title: "งานการแพทย์แผนไทยและการแพทย์ทางเลือก",
    desc: "การรักษาด้วยสมุนไพร นวดแผนไทย การแพทย์ทางเลือก",
    icon: "🌿",
    features: [""],
    //features: ["นวดแผนไทย", "สมุนไพร", "ฝังเข็ม"],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen text-slate-900 bg-[radial-gradient(1200px_600px_at_80%_-10%,#e0f2fe_10%,transparent_60%),linear-gradient(to_bottom,#ffffff,rgba(224,242,254,0.3))]">
      <NavBar />

      <section className="py-16 sm:py-20 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.05),transparent_50%)]" />

        <div className="max-w-6xl mx-auto px-6 relative">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="animate-pulse text-4xl pt-1 sm:text-5xl font-bold bg-gradient-to-r from-sky-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent mb-4">
              บริการทั้งหมดของเรา
            </h1>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              บริการด้านสุขภาพครอบครัวและชุมชนที่ครอบคลุมและมีคุณภาพ
              พร้อมให้บริการด้วยความเป็นมืออาชีพ
            </p>
          </div>

          {/* Services grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <div
                key={i}
                className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-cyan-200/50 p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden"
              >
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-sky-50/50 via-cyan-50/30 to-emerald-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div className="relative">
                  {/* Icon and number */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-4xl">{service.icon}</div>
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-sky-500 to-emerald-500 text-white grid place-items-center font-bold text-lg shadow-lg">
                      {i + 1}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-sky-700 transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {service.desc}
                  </p>

                  {/* Features list */}
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 text-sm"
                      >
                        <div className="w-2 h-2 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-full"></div>
                        <span className="text-slate-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Information Section */}
          <div className="mt-16">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-cyan-200/50">
              <h3 className="text-2xl font-bold text-slate-800 mb-4 text-center">
                ข้อมูลเพิ่มเติม
              </h3>
              <p className="text-slate-600 text-center mb-6 max-w-3xl mx-auto">
                บริการทุกประเภทของเราได้รับการออกแบบมาเพื่อตอบสนองความต้องการด้านสุขภาพของชุมชน
                โดยมีทีมแพทย์และพยาบาลผู้เชี่ยวชาญคอยให้บริการด้วยความเอาใจใส่และมีคุณภาพ
              </p>
              <div className="text-center">
                <a
                  href="/contact"
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
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  ติดต่อเราเพื่อขอข้อมูลเพิ่มเติม
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

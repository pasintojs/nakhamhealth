import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const initialSteps = [
  {
    step: 1,
    title: "ค้นแฟ้มครอบครัว รับบัตรคิว",
    description: "ยื่นหลักฐานเพื่อค้นหาข้อมูลในระบบและรับบัตรคิวรอรับบริการ",
    gradient: "from-sky-500 to-emerald-500",
  },
  {
    step: 2,
    title: "ยื่นบัตรประชาชน / สมุดสีชมพู",
    description: "แสดงบัตรประชาชน สำหรับเด็กใช้สมุดสีชมพูในการลงทะเบียน",
    gradient: "from-cyan-500 to-emerald-500",
  },
  {
    step: 3,
    title: "ซักประวัติ ตรวจร่างกาย",
    description: "บุคลากรทางการแพทย์จะซักประวัติและตรวจสุขภาพเบื้องต้น",
    gradient: "from-emerald-500 to-sky-500",
  },
];

const emergencySteps = [
  "ปฐมพยาบาลเบื้องต้น",
  "ส่งต่อ รพ.แม่ข่าย",
  "ติดตามผลการรักษา",
  "ดูแลต่อเนื่อง เยี่ยมบ้าน",
];

const nonEmergencySteps = [
  "วินิจฉัยแยกโรค",
  "รักษา จ่ายยา",
  "ให้คำแนะนำ",
  "กลับบ้าน",
];

export default function ProcedurePage() {
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
              ขั้นตอนการให้บริการ
            </h1>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              ขั้นตอนการให้บริการที่ชัดเจนและเป็นระบบเพื่อความสะดวกของผู้ป่วย
            </p>
          </div>

          {/* Procedure Steps */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Initial Steps */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold bg-gradient-to-r from-sky-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent mb-6">
                ขั้นตอนเริ่มต้น
              </h3>

              {initialSteps.map((step, index) => (
                <div
                  key={index}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-cyan-200/50 p-6 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 bg-gradient-to-br ${step.gradient} text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg flex-shrink-0`}
                    >
                      {step.step}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 mb-2">
                        {step.title}
                      </h4>
                      <p className="text-slate-600 text-sm">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Assessment and Treatment */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent mb-6">
                การประเมินและรักษา
              </h3>

              {/* Emergency Cases */}
              <div className="bg-gradient-to-br from-red-50/80 via-orange-50/80 to-yellow-50/80 backdrop-blur-sm rounded-2xl shadow-lg border border-red-200/50 p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 text-white rounded-full flex items-center justify-center font-bold shadow-lg flex-shrink-0">
                    🚨
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-red-700 mb-3">
                      อาการฉุกเฉิน
                    </h4>
                    <div className="space-y-2">
                      {emergencySteps.map((step, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 text-sm"
                        >
                          <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
                          <span className="text-red-700">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Non-Emergency Cases */}
              <div className="bg-gradient-to-br from-emerald-50/80 via-cyan-50/80 to-sky-50/80 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-200/50 p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-cyan-500 text-white rounded-full flex items-center justify-center font-bold shadow-lg flex-shrink-0">
                    ✅
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-emerald-700 mb-3">
                      อาการไม่ฉุกเฉิน
                    </h4>
                    <div className="space-y-2">
                      {nonEmergencySteps.map((step, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 text-sm"
                        >
                          <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"></div>
                          <span className="text-emerald-700">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Important Information Section */}
          <div className="mt-16">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Requirements Card */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-cyan-200/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                    📋
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">
                    เอกสารที่ต้องเตรียม
                  </h3>
                </div>
                <div className="space-y-3">
                  {[
                    "บัตรประชาชน ",

                    "เอกสารประกันสังคม (ถ้ามี)",
                    "ใบส่งตัวจากแพทย์ (กรณีส่งต่อ)",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                      <span className="text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Hours Card */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-cyan-200/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                    🕒
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">
                    เวลาให้บริการ
                  </h3>
                </div>
                <div className="space-y-3">
                  {[
                    "จันทร์ - อาทิตย์ : ทุกวัน",

                    "วันหยุดนักขัตฤกษ์: เปิดทำการ",

                    "เบอร์โทรฉุกเฉิน: 1669",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-full"></div>
                      <span className="text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-12">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-cyan-200/50">
              <h3 className="text-2xl font-bold text-slate-800 mb-4 text-center">
                ต้องการข้อมูลเพิ่มเติม?
              </h3>
              <p className="text-slate-600 text-center mb-6">
                หากมีข้อสงสัยเกี่ยวกับขั้นตอนการรับบริการ
                กรุณาติดต่อเราได้ตลอดเวลา
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
                  ติดต่อเรา
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

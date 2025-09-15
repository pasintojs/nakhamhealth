import Image from "next/image";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen text-slate-900 bg-[radial-gradient(1200px_600px_at_80%_-10%,#e0f2fe_10%,transparent_60%),linear-gradient(to_bottom,#ffffff,rgba(224,242,254,0.3))]">
      <NavBar />

      {/* Hero Section with Animated Logo */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        {/* Enhanced background with multiple gradients */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-cyan-50 to-emerald-50" />
          <div className="absolute inset-0 bg-gradient-to-tr from-white/50 via-transparent to-sky-100/30" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.1),transparent_50%)]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-20">
          {/* Main content - centered layout */}
          <div className="text-center space-y-12">
            {/* New Elegant Logo Section */}
            <div className="relative inline-block">
              {/* Premium outer aurora ring */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-blue-400/15 via-indigo-400/15 to-purple-400/15 animate-premium-aurora"></div>

              {/* Sophisticated rotating outer ring */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-gradient-to-r from-transparent via-blue-300/25 to-transparent animate-premium-rotate"></div>

              {/* Gentle breathing inner glow */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-gradient-to-r from-indigo-200/30 via-blue-200/30 to-cyan-200/30 animate-premium-breath"></div>

              {/* Elegant floating ring */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-r from-blue-100/50 to-indigo-100/50 animate-premium-float"></div>

              {/* Logo container with premium effects */}
              <div className="relative group">
                <div className="relative overflow-hidden rounded-full animate-premium-levitate">
                  <Image
                    src="/images/logo-v3.png"
                    alt="โรงพยาบาลส่งเสริมสุขภาพตำบลนาคำ"
                    width={300}
                    height={300}
                    className="rounded-full transition-all duration-1200 ease-out filter drop-shadow-xl hover:drop-shadow-2xl group-hover:scale-110 bg-white/95 backdrop-blur-sm"
                    priority
                  />

                  {/* Premium hover overlay */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-400/0 via-indigo-400/0 to-purple-400/0 group-hover:from-blue-400/8 group-hover:via-indigo-400/8 group-hover:to-purple-400/8 transition-all duration-1200"></div>
                </div>

                {/* Refined accent elements */}
                <div className="absolute -top-3 -right-3 w-5 h-5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full opacity-85 animate-premium-sparkle shadow-lg"></div>
                <div className="absolute -bottom-3 -left-3 w-4 h-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full opacity-75 animate-premium-sparkle-delayed shadow-md"></div>

                {/* Elegant light beams */}
                {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-12 bg-gradient-to-b from-blue-400/50 to-transparent animate-premium-beam"></div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 h-12 bg-gradient-to-t from-indigo-400/50 to-transparent animate-premium-beam-delayed"></div>
                  <div className="absolute top-1/2 left-0 transform -translate-y-1/2 h-0.5 w-12 bg-gradient-to-r from-purple-400/50 to-transparent animate-premium-beam-horizontal"></div>
                  <div className="absolute top-1/2 right-0 transform -translate-y-1/2 h-0.5 w-12 bg-gradient-to-l from-blue-400/50 to-transparent animate-premium-beam-horizontal-delayed"></div>
                </div> */}
              </div>
            </div>

            {/* Enhanced title section */}
            <div className="space-y-6">
              {/* Main title - simplified to match event/news pages */}
              <h1 className="animate-pulse text-4xl pt-1 sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-sky-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                โรงพยาบาลส่งเสริมสุขภาพตำบลนาคำ
              </h1>

              {/* About subtitle */}
              <p className="text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed">
                โรงพยาบาลส่งเสริมสุขภาพตำบลนาคำ อำเภออุบลรัตน์ จังหวัดขอนแก่น
                ก่อตั้งขึ้นเพื่อให้บริการสุขภาพที่มีคุณภาพแก่ชุมชน
                ภายใต้การดูแลของบุคลากรทางการแพทย์ที่มีความเชี่ยวชาญและประสบการณ์
              </p>
            </div>

            {/* Navigation buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="#about-content"
                className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 hover:from-sky-600 hover:via-cyan-600 hover:to-emerald-600 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <svg
                  className="w-6 h-6 group-hover:translate-y-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
                อ่านเพิ่มเติม
              </a>

              <a
                href="/"
                className="group inline-flex items-center gap-3 rounded-2xl border-2 border-cyan-300 bg-white/80 backdrop-blur-sm text-sky-700 hover:bg-sky-50 hover:border-sky-400 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <svg
                  className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                กลับหน้าแรก
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Content Section */}
      <section
        id="about-content"
        className="py-16 sm:py-20 bg-gradient-to-b from-cyan-50 to-emerald-50 relative overflow-hidden"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(16,185,129,0.05),transparent_50%)]" />

        <div className="max-w-6xl mx-auto px-6 relative">
          {/* Enhanced section header */}
          <div className="text-center mb-12">
            <h2 className="animate-pulse text-3xl pt-1 sm:text-4xl font-bold bg-gradient-to-r from-sky-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent mb-4">
              วิสัยทัศน์และพันธกิจ
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              โรงพยาบาลส่งเสริมสุขภาพตำบลนาคำ มุ่งมั่นให้บริการสุขภาพที่มีคุณภาพ
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
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
            </div>

            {/* Key Features */}
            <div className="space-y-8">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-purple-200/50 hover:shadow-2xl transition-all duration-500">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
                    🏥
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      บริการหลัก
                    </h3>
                    <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2"></div>
                  </div>
                </div>
                <p className="text-slate-700 text-lg leading-relaxed">
                  ให้บริการตรวจรักษา ส่งเสริมสุขภาพ ป้องกันโรค ฟื้นฟูสภาพ
                  และบริการฉุกเฉินเบื้องต้น
                  พร้อมด้วยทีมงานบุคลากรทางการแพทย์ที่มีประสบการณ์
                </p>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-orange-200/50 hover:shadow-2xl transition-all duration-500">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
                    🤝
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                      ชุมชนและเครือข่าย
                    </h3>
                    <div className="w-12 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mt-2"></div>
                  </div>
                </div>
                <p className="text-slate-700 text-lg leading-relaxed">
                  ทำงานร่วมกับชุมชนและหน่วยงานที่เกี่ยวข้อง
                  เพื่อส่งเสริมสุขภาพประชาชนและสร้างความเข้มแข็งของระบบสุขภาพในชุมชน
                </p>
              </div>
            </div>
          </div>

          {/* History Section */}
          <div className="mt-16">
            <div className="text-center mb-12">
              <h2 className="animate-pulse text-3xl pt-1 sm:text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                พัฒนาการของโรงพยาบาล
              </h2>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-blue-200/50 hover:shadow-2xl transition-all duration-500">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
                  📚
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    การก่อตั้งและพัฒนา
                  </h3>
                  <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-2"></div>
                </div>
              </div>
              <div className="space-y-6 text-slate-700 leading-relaxed">
                <div className="border-l-4 border-blue-500 pl-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      พ.ศ. 2519
                    </span>
                    <h4 className="font-semibold text-blue-700 text-lg">
                      ก่อตั้งครั้งแรก
                    </h4>
                  </div>
                  <p>
                    โรงพยาบาลส่งเสริมสุขภาพตำบลนาคำ อำเภออุบลรัตน์
                    จังหวัดขอนแก่น สร้างขึ้นครั้งแรกเป็นอาคารไม้ชั้นเดียว
                  </p>
                </div>

                <div className="border-l-4 border-indigo-500 pl-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-indigo-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      พ.ศ. 2541
                    </span>
                    <h4 className="font-semibold text-indigo-700 text-lg">
                      ปรับปรุงอาคาร
                    </h4>
                  </div>
                  <p>
                    ได้รับงบประมาณสร้างอาคารสำนักงานใหม่เป็นอาคารคอนกรีตยกพื้นสูง
                    แบบแปลนขนาดใหญ่
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      พ.ศ. 2551
                    </span>
                    <h4 className="font-semibold text-purple-700 text-lg">
                      ขยายอาคาร
                    </h4>
                  </div>
                  <p>
                    ต่อเติมอาคารชั้นล่าง เพื่อรองรับการให้บริการที่เพิ่มขึ้น
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      พ.ศ. 2553
                    </span>
                    <h4 className="font-semibold text-green-700 text-lg">
                      ยกฐานะเป็นโรงพยาบาลส่งเสริมสุขภาพตำบล
                    </h4>
                  </div>
                  <p>
                    พัฒนารูปแบบการให้บริการเป็นแบบผสมผสาน ทั้งด้านการรักษาพยาบาล
                    การส่งเสริมสุขภาพ การป้องกันโรค ตลอดจนการฟื้นฟูสภาพ
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Location and Geographic Information Section */}
          <div className="mt-16">
            <div className="text-center mb-12">
              <h2 className="animate-pulse text-3xl pt-1 sm:text-4xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                ข้อมูลทางภูมิศาสตร์
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Location Information */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-emerald-200/50 hover:shadow-2xl transition-all duration-500">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
                    📍
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      ที่ตั้ง
                    </h3>
                    <div className="w-12 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mt-2"></div>
                  </div>
                </div>
                <div className="space-y-4 text-slate-700 leading-relaxed">
                  <p className="text-lg font-semibold text-emerald-700">
                    เลขที่ 67 หมู่ที่ 12 ตำบลนาคำ อำเภออุบลรัตน์ จังหวัดขอนแก่น
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4 mt-6">
                    <div className="bg-emerald-50/80 backdrop-blur-sm rounded-xl p-4 border border-emerald-200">
                      <div className="text-emerald-700 font-semibold mb-2">
                        ระยะทางจากอำเภออุบลรัตน์
                      </div>
                      <div className="text-2xl font-bold text-emerald-800">
                        15 กิโลเมตร
                      </div>
                    </div>
                    <div className="bg-teal-50/80 backdrop-blur-sm rounded-xl p-4 border border-teal-200">
                      <div className="text-teal-700 font-semibold mb-2">
                        ระยะทางจากจังหวัดขอนแก่น
                      </div>
                      <div className="text-2xl font-bold text-teal-800">
                        67 กิโลเมตร
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Boundaries Information */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-cyan-200/50 hover:shadow-2xl transition-all duration-500">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
                    🧭
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                      อาณาเขตติดต่อ
                    </h3>
                    <div className="w-12 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mt-2"></div>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    {
                      direction: "ทิศเหนือ",
                      area: "ตำบลศรีสุขสำราญ อำเภออุบลรัตน์",
                      color: "from-red-500 to-orange-500",
                      bgColor: "bg-red-50/80",
                      borderColor: "border-red-200",
                      textColor: "text-red-700",
                    },
                    {
                      direction: "ทิศตะวันออก",
                      area: "ตำบลสะอาด อำเภอน้ำพอง และตำบลดงเมืองแอม",
                      color: "from-yellow-500 to-amber-500",
                      bgColor: "bg-yellow-50/80",
                      borderColor: "border-yellow-200",
                      textColor: "text-yellow-700",
                    },
                    {
                      direction: "ทิศใต้",
                      area: "ตำบลบ้านดง อำเภออุบลรัตน์",
                      color: "from-green-500 to-emerald-500",
                      bgColor: "bg-green-50/80",
                      borderColor: "border-green-200",
                      textColor: "text-green-700",
                    },
                    {
                      direction: "ทิศตะวันตก",
                      area: "เทือกเขาภูพานคำ รอยต่ออำเภอโนนสัง จังหวัดหนองบัวลำภู",
                      color: "from-purple-500 to-violet-500",
                      bgColor: "bg-purple-50/80",
                      borderColor: "border-purple-200",
                      textColor: "text-purple-700",
                    },
                  ].map((boundary, idx) => (
                    <div
                      key={idx}
                      className={`${boundary.bgColor} backdrop-blur-sm rounded-xl p-4 border ${boundary.borderColor} hover:shadow-lg transition-all duration-300`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className={`w-8 h-8 bg-gradient-to-r ${boundary.color} rounded-full flex items-center justify-center text-white text-sm font-bold`}
                        >
                          {boundary.direction.charAt(2)}
                        </div>
                        <div
                          className={`font-semibold ${boundary.textColor} text-lg`}
                        >
                          {boundary.direction}
                        </div>
                      </div>
                      <div className="text-slate-700 ml-11 leading-relaxed">
                        ติดต่อกับ {boundary.area}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Google Map Section */}
          <div className="mt-16">
            <div className="text-center mb-12">
              <h2 className="animate-pulse text-3xl pt-1 sm:text-4xl font-bold bg-gradient-to-r from-sky-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent mb-4">
                ตำแหน่งที่ตั้ง
              </h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                ค้นหาเส้นทางและตำแหน่งที่ตั้งของโรงพยาบาลส่งเสริมสุขภาพตำบลนาคำ
              </p>
            </div>

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
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

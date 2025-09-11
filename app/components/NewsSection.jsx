import Image from "next/image";

const newsItems = [
  {
    id: 1,
    title: "อบรมฟื้นฟู อสม. ปี 2567",
    date: "15 สิงหาคม 2567",
    description:
      "จัดอบรมเพื่อพัฒนาศักยภาพและฟื้นฟูความรู้ให้กับอาสาสมัครสาธารณสุขประจำหมู่บ้าน เพื่อเสริมสร้างระบบสุขภาพชุมชนให้แข็งแกร่ง",
    image: "/images/about-1.svg",
    category: "การอบรม",
  },
  {
    id: 2,
    title: "อบรมปรับเปลี่ยนพฤติกรรมกลุ่มเสี่ยง",
    date: "22 กรกฎาคม 2567",
    description:
      "โครงการส่งเสริมการปรับเปลี่ยนพฤติกรรมสุขภาพสำหรับกลุ่มเสี่ยงโรคเบาหวานและความดันโลหิตสูง เน้นการดูแลตนเองและการควบคุมอาหาร",
    image: "/images/about-2.svg",
    category: "ส่งเสริมสุขภาพ",
  },
  {
    id: 3,
    title: "เยี่ยมบ้านผู้ป่วยเรื้อรัง",
    date: "10 กันยายน 2567",
    description:
      "ทีมหมอครอบครัวตำบลนาคำออกเยี่ยมบ้านผู้ป่วยเรื้อรัง ติดตามการรักษา ให้คำแนะนำด้านสุขภาพ และประเมินความต้องการดูแลต่อเนื่อง",
    image: "/images/about-3.svg",
    category: "บริการชุมชน",
  },
  {
    id: 4,
    title: "คัดกรองความเสี่ยงโรคเบาหวาน",
    date: "5 กันยายน 2567",
    description:
      "ร่วมกับอาสาสมัครสาธารณสุข จัดกิจกรรมคัดกรองความเสี่ยงต่อโรคเบาหวานและความดันโลหิตสูงให้แก่ประชาชนในพื้นที่",
    image: "/images/hero-health.svg",
    category: "ป้องกันโรค",
  },
  {
    id: 5,
    title: "อบรมการช่วยฟื้นคืนชีพ",
    date: "18 สิงหาคม 2567",
    description:
      "จัดอบรมทักษะการช่วยฟื้นคืนชีพขั้นพื้นฐานให้แก่เจ้าหน้าที่และอาสาสมัครสาธารณสุข เพื่อเตรียมความพร้อมในการช่วยเหลือฉุกเฉิน",
    image: "/images/doc-1.svg",
    category: "การอบรม",
  },
  {
    id: 6,
    title: "ประเมิน DHSA ด้วยส่วนร่วมชุมชน",
    date: "30 กรกฎาคม 2567",
    description:
      "รับการประเมินมาตรฐาน DHSA โดยการมีส่วนร่วมของชุมชนและเครือข่ายสุขภาพ เพื่อยกระดับคุณภาพการให้บริการสาธารณสุข",
    image: "/images/doc-2.svg",
    category: "การประเมิน",
  },
];

export default function NewsSection() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-cyan-50 to-emerald-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.05),transparent_50%)]" />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Enhanced section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-white/95 backdrop-blur-lg rounded-full px-6 py-3 shadow-xl border-2 border-cyan-100 mb-6">
            <div className="w-3 h-3 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-lg font-bold text-slate-800">
              ข่าวสารและกิจกรรม
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-sky-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            ข่าวและกิจกรรมล่าสุด
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            ติดตามข่าวสารและกิจกรรมต่างๆ ของโรงพยาบาลส่งเสริมสุขภาพตำบลนาคำ
          </p>
        </div>

        {/* News grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <article
              key={item.id}
              className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-cyan-200/50 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              {/* Image container */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/95 backdrop-blur-sm text-sky-700 px-3 py-1 rounded-full text-sm font-semibold border border-cyan-200/50">
                    {item.category}
                  </span>
                </div>

                {/* Date badge */}
                <div className="absolute bottom-4 right-4">
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 border border-cyan-200/50">
                    <div className="flex items-center gap-2 text-sm">
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
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-slate-700 font-medium">
                        {item.date}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-sky-700 transition-colors duration-300 line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {item.description}
                </p>

                {/* Read more button */}
                <div className="flex items-center justify-between">
                  <button className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                    <span>อ่านเพิ่มเติม</span>
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
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>

                  {/* Share button */}
                  <button className="p-2 rounded-full hover:bg-sky-50 text-slate-400 hover:text-sky-600 transition-colors duration-300">
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
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View all button */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-3 bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 hover:from-sky-600 hover:via-cyan-600 hover:to-emerald-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
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
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            ดูข่าวทั้งหมด
          </button>
        </div>
      </div>
    </section>
  );
}

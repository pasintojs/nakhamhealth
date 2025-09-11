import Image from "next/image";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-16 sm:py-20 bg-gradient-to-b from-white via-sky-50 to-cyan-50"
    >
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-sky-800 mb-4">
              วิสัยทัศน์
            </h2>
            <p className="text-slate-700 text-lg leading-relaxed bg-white/80 p-4 rounded-lg border border-cyan-200 shadow-sm">
              มุ่งพัฒนาสถานบริการที่ได้มาตรฐาน บริการประทับใจ
            </p>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-emerald-800 mb-4">
              พันธกิจ
            </h2>
            <ul className="space-y-4 text-slate-700">
              <li className="flex gap-3 bg-white/80 p-4 rounded-lg border border-cyan-200 shadow-sm">
                <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-emerald-500 flex-shrink-0" />
                <span>
                  ให้บริการตามมาตรฐานวิชาชีพ ครอบคลุมด้านการส่งเสริมสุขภาพ
                  ป้องกันโรค รักษาพยาบาล ฟื้นฟูสภาพและการแพทย์ทางเลือก
                </span>
              </li>
              <li className="flex gap-3 bg-white/80 p-4 rounded-lg border border-cyan-200 shadow-sm">
                <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-emerald-500 flex-shrink-0" />
                <span>ส่งเสริมการมีส่วนร่วมของประชาชนในการดูแลสุขภาพ</span>
              </li>
              <li className="flex gap-3 bg-white/80 p-4 rounded-lg border border-cyan-200 shadow-sm">
                <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-emerald-500 flex-shrink-0" />
                <span>พัฒนาศักยภาพและสนับสนุนเครือข่ายบริการสุขภาพ</span>
              </li>
              <li className="flex gap-3 bg-white/80 p-4 rounded-lg border border-cyan-200 shadow-sm">
                <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-emerald-500 flex-shrink-0" />
                <span>พัฒนาระบบบริหารจัดการอย่างมีประสิทธิภาพ</span>
              </li>
            </ul>
          </div>
          <div className="mt-8">
            <a
              href="#contact"
              className="inline-flex items-center rounded-md bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 hover:from-sky-600 hover:via-cyan-600 hover:to-emerald-600 text-white px-6 py-3 font-medium shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <svg
                className="w-5 h-5 mr-2"
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
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Image
            src="/images/about-1.svg"
            alt="ห้องตรวจ"
            width={320}
            height={220}
            className="rounded-lg border border-cyan-200 w-full h-auto object-cover bg-white/70"
          />
          <Image
            src="/images/about-2.svg"
            alt="ห้องแล็บ"
            width={320}
            height={220}
            className="rounded-lg border border-cyan-200 w-full h-auto object-cover bg-white/70"
          />
          <Image
            src="/images/about-3.svg"
            alt="กายภาพบำบัด"
            width={320}
            height={220}
            className="rounded-lg border border-cyan-200 w-full h-auto object-cover col-span-2 bg-white/70"
          />
        </div>
      </div>
    </section>
  );
}

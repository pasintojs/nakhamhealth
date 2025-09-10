import Image from "next/image";
import NavBar from "./components/NavBar";

export default function Home() {
  return (
    <div className="min-h-screen text-slate-900 bg-[radial-gradient(1200px_600px_at_80%_-10%,#e0f2fe_10%,transparent_60%),linear-gradient(to_bottom,#ffffff,rgba(224,242,254,0.3))]">
      <NavBar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-sky-50 via-cyan-50 to-white" />
        <div className="max-w-6xl mx-auto px-6 py-16 sm:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-sky-700 via-cyan-700 to-emerald-700 bg-clip-text text-transparent">
              โรงพยาบาลส่งเสริมสุขภาพตำบลนาคำ
            </h1>
            <p className="mt-4 text-slate-700 text-base sm:text-lg">
              รพ.สต.นาคำ อ.อุบลรัตน์ จ.ขอนแก่น — ให้บริการด้านสุขภาพแก่ชุมชน 
              ดูแลสุขภาพประชาชนในพื้นที่ตำบลนาคำ โดยทีมบุคลากรทางการแพทย์และสาธารณสุขที่มีประสบการณ์
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href="#contact"
                className="inline-flex items-center rounded-md bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 hover:from-sky-600 hover:via-cyan-600 hover:to-emerald-600 text-white px-5 py-3 font-medium shadow"
              >
                ติดต่อสอบถาม
              </a>
              <a
                href="#services"
                className="inline-flex items-center rounded-md border border-cyan-200 text-sky-700 hover:bg-sky-50 px-5 py-3 font-medium"
              >
                ดูบริการของเรา
              </a>
            </div>
            <div className="mt-6 flex items-center gap-6 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                เปิดให้บริการ จันทร์-ศุกร์ 08:30-16:30
              </div>
              <div>อ.อุบลรัตน์ จ.ขอนแก่น</div>
            </div>
          </div>
          <div className="relative">
            <Image
              src="/images/hero-health.svg"
              alt="คลินิกสุขภาพนาคำ"
              width={640}
              height={420}
              className="rounded-xl border border-cyan-200 shadow-sm object-cover w-full h-auto bg-white/60"
            />
            <div className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur border border-cyan-200 rounded-lg shadow p-4 text-sm">
              <div className="font-semibold">รพ.สต.นาคำ</div>
              <div className="text-slate-600">ดูแลสุขภาพชุมชน 13 หมู่บ้าน</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-16 sm:py-20 bg-white/70">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold">บริการของเรา</h2>
          <p className="mt-2 text-slate-700">
            บริการด้านสุขภาพครอบครัวและชุมชน
          </p>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "งานรักษาพยาบาลและส่งเสริมสุขภาพ",
                desc: "ตรวจรักษาโรคทั่วไป การดูแลสุขภาพเบื้องต้น และการส่งเสริมสุขภาพ",
              },
              {
                title: "งานอนามัยแม่และเด็ก",
                desc: "ดูแลสุขภาพมารดาและทารก ตรวจครรภ์ วัคซีนเด็ก",
              },
              {
                title: "งานทันตสาธารณสุข",
                desc: "รักษาฟัน การป้องกันโรคฟัน ให้คำแนะนำดูแลสุขภาพช่องปาก",
              },
              {
                title: "งานป้องกันควบคุมโรค",
                desc: "ป้องกันโรคติดต่อและไม่ติดต่อ การตรวจคัดกรองโรค",
              },
              {
                title: "งานส่งเสริมสุขภาพผู้สูงอายุ",
                desc: "ดูแลสุขภาพผู้สูงอายุ การฟื้นฟูสุขภาพ",
              },
              {
                title: "งานการแพทย์แผนไทยและการแพทย์ทางเลือก",
                desc: "การรักษาด้วยสมุนไพร นวดแผนไทย การแพทย์ทางเลือก",
              },
            ].map((s, i) => (
              <div
                key={i}
                className="rounded-xl border border-cyan-200/70 bg-white shadow-sm p-6 hover:shadow-md hover:border-cyan-300 transition-shadow"
              >
                <div className="h-10 w-10 rounded-md bg-gradient-to-br from-sky-100 to-emerald-100 text-sky-700 grid place-items-center font-semibold">
                  {i + 1}
                </div>
                <h3 className="mt-4 font-semibold text-lg text-slate-800">
                  {s.title}
                </h3>
                <p className="mt-1 text-slate-600 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="py-16 sm:py-20 bg-gradient-to-b from-white via-sky-50 to-cyan-50"
      >
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">
              ทำไมต้องรพ.สต.นาคำ
            </h2>
            <ul className="mt-4 space-y-3 text-slate-700">
              <li className="flex gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500" />
                บุคลากรที่มีความเชี่ยวชาญ ดูแลด้วยใจ
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500" />
                ใกล้บ้าน สะดวก เข้าถึงง่าย
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500" />
                บริการครอบคลุมทุกช่วงวัย
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500" />
                มุ่งเน้นการดูแลสุขภาพชุมชนแบบมีส่วนร่วม
              </li>
            </ul>
            <div className="mt-6">
              <a
                href="#contact"
                className="inline-flex items-center rounded-md bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 hover:from-sky-600 hover:via-cyan-600 hover:to-emerald-600 text-white px-5 py-3 font-medium shadow"
              >
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

      {/* Staff */}
      <section id="staff" className="py-16 sm:py-20 bg-white/70">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold">
            บุคลากรของเรา
          </h2>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "นายฉลวย สาทมะเริง",
                role: "ผู้อำนวยการ รพ.สต.",
                img: "/images/doc-1.svg",
              },
              {
                name: "นางเกตุกมล ทองภาพ",
                role: "นักวิชาการสาธารณสุขชำนาญการ",
                img: "/images/doc-2.svg",
              },
              {
                name: "นางสาวเพ็ญแข สายทัน",
                role: "พยาบาลวิชาชีพปฏิบัติการ",
                img: "/images/doc-3.svg",
              },
              {
                name: "นางสาวมณีวงศ์ สอนอาจ",
                role: "เจ้าพนักงานทันตสาธารณสุข",
                img: "/images/doc-1.svg",
              },
              {
                name: "นางสาวศิริพร พรมสุวรรณ์",
                role: "นักวิชาการสาธารณสุขปฏิบัติการ",
                img: "/images/doc-2.svg",
              },
              {
                name: "นางเพ็ญณี จิตชาตรี",
                role: "ผู้ช่วยเจ้าหน้าที่อนามัย",
                img: "/images/doc-3.svg",
              },
            ].map((d, i) => (
              <div
                key={i}
                className="rounded-xl border border-cyan-200/70 bg-white p-6 text-center hover:shadow-md hover:border-cyan-300 transition-shadow"
              >
                <div className="mx-auto h-28 w-28 rounded-full overflow-hidden border border-slate-200">
                  <Image
                    src={d.img}
                    alt={d.name}
                    width={112}
                    height={112}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="mt-4 font-semibold text-slate-800">
                  {d.name}
                </div>
                <div className="text-slate-600 text-sm">{d.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News/Activities */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-cyan-50 to-emerald-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold">ข่าวและกิจกรรม</h2>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "อบรมฟื้นฟู อสม. ปี 2564",
              "อบรมปรับเปลี่ยนพฤติกรรมกลุ่มเสี่ยงโรคเบาหวานและความดันโลหิตสูง", 
              "เยี่ยมบ้านผู้ป่วยเรื้อรังโดยทีมหมอครอบครัวตำบลนาคำ",
              "คัดกรองความเสี่ยงต่อโรคเบาหวานและความดันโลหิตสูง ร่วมกับ อสม.",
              "อบรมฟื้นฟูการช่วยฟื้นคืนชีพแก่ จนท. และอสม.",
              "รับการประเมิน DHSA โดยการมีส่วนร่วมของชุมชนและเครือข่ายสุขภาพ",
            ].map((t, i) => (
              <figure
                key={i}
                className="rounded-xl border border-cyan-200 bg-white p-6 shadow-sm"
              >
                <blockquote className="text-slate-700 text-sm leading-relaxed">{t}</blockquote>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / CTA */}
      <section id="contact" className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">
              ติดต่อเรา
            </h2>
            <p className="mt-2 text-slate-600">
              โรงพยาบาลส่งเสริมสุขภาพตำบลนาคำ อ.อุบลรัตน์ จ.ขอนแก่น
            </p>
            <div className="mt-6 space-y-3">
              <a
                href="tel:+6686-451-3276"
                className="flex items-center gap-3 rounded-md border border-cyan-200 px-5 py-3 font-medium hover:bg-sky-50"
              >
                📞 086-451-3276
              </a>
              <a
                href="mailto:so04343@hotmail.com"
                className="flex items-center gap-3 rounded-md bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 hover:from-sky-600 hover:via-cyan-600 hover:to-emerald-600 text-white px-5 py-3 font-medium shadow"
              >
                📧 so04343@hotmail.com
              </a>
            </div>
          </div>
          <div className="rounded-xl border border-cyan-200 p-6 bg-white/80 backdrop-blur">
            <form className="grid grid-cols-1 gap-4">
              <input
                type="text"
                placeholder="ชื่อ-นามสกุล"
                className="w-full rounded-md border border-cyan-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300"
              />
              <input
                type="tel"
                placeholder="เบอร์โทร"
                className="w-full rounded-md border border-cyan-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300"
              />
              <textarea
                placeholder="รายละเอียดที่ต้องการสอบถาม"
                rows={4}
                className="w-full rounded-md border border-cyan-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300"
              />
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 hover:from-sky-600 hover:via-cyan-600 hover:to-emerald-600 text-white px-5 py-3 font-medium shadow"
              >
                ส่งข้อความ
              </button>
              <p className="text-xs text-slate-500">
                แบบฟอร์มนี้เป็นตัวอย่าง หากต้องการให้ส่งจริง
                โปรดเชื่อมต่อระบบอีเมลหรือแชท
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-cyan-200 bg-white/70">
        <div className="max-w-6xl mx-auto px-6 py-8 text-sm text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            © {new Date().getFullYear()} โรงพยาบาลส่งเสริมสุขภาพตำบลนาคำ อ.อุบลรัตน์ จ.ขอนแก่น
          </div>
          <div className="flex items-center gap-4">
            <a href="#services" className="hover:text-sky-700">
              บริการของเรา
            </a>
            <a href="#about" className="hover:text-sky-700">
              เกี่ยวกับเรา
            </a>
            <a href="#contact" className="hover:text-sky-700">
              ติดต่อ
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

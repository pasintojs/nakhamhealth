const services = [
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
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 sm:py-20 bg-white/70">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl sm:text-3xl font-bold">บริการของเรา</h2>
        <p className="mt-2 text-slate-700">บริการด้านสุขภาพครอบครัวและชุมชน</p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={i}
              className="rounded-xl border border-cyan-200/70 bg-white shadow-sm p-6 hover:shadow-md hover:border-cyan-300 transition-shadow"
            >
              <div className="h-10 w-10 rounded-md bg-gradient-to-br from-sky-100 to-emerald-100 text-sky-700 grid place-items-center font-semibold">
                {i + 1}
              </div>
              <h3 className="mt-4 font-semibold text-lg text-slate-800">
                {service.title}
              </h3>
              <p className="mt-1 text-slate-600 text-sm">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

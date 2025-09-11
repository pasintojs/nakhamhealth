import Image from "next/image";

const staffMembers = [
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
];

export default function StaffSection() {
  return (
    <section id="staff" className="py-16 sm:py-20 bg-white/70">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl sm:text-3xl font-bold">บุคลากรของเรา</h2>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {staffMembers.map((doctor, i) => (
            <div
              key={i}
              className="rounded-xl border border-cyan-200/70 bg-white p-6 text-center hover:shadow-md hover:border-cyan-300 transition-shadow"
            >
              <div className="mx-auto h-28 w-28 rounded-full overflow-hidden border border-slate-200">
                <Image
                  src={doctor.img}
                  alt={doctor.name}
                  width={112}
                  height={112}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="mt-4 font-semibold text-slate-800">
                {doctor.name}
              </div>
              <div className="text-slate-600 text-sm">{doctor.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold">ติดต่อเรา</h2>
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
  );
}

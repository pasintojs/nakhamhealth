import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import StaffGrid from "./components/StaffGrid";

export const metadata = {
  title: "บุคลากรของเรา - โรงพยาบาลส่งเสริมสุขภาพตำบลนาคำ",
  description:
    "ทีมผู้เชี่ยวชาญด้านสุขภาพของโรงพยาบาลส่งเสริมสุขภาพตำบลนาคำ ที่มีประสบการณ์และความเชี่ยวชาญในสาขาต่างๆ พร้อมให้บริการด้วยความใส่ใจและมาตรฐานสูงสุด",
  keywords: "บุคลากร, ทีมแพทย์, พยาบาล, ทันตแพทย์, โรงพยาบาลนาคำ, สุขภาพ",
};

export default function StaffPage() {
  return (
    <div className="min-h-screen text-slate-900 bg-[radial-gradient(1200px_600px_at_80%_-10%,#e0f2fe_10%,transparent_60%),linear-gradient(to_bottom,#ffffff,rgba(224,242,254,0.3))]">
      <NavBar />
      <main className="pt-20">
        <StaffGrid />
      </main>
      <Footer />
    </div>
  );
}

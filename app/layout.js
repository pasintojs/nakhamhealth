import { Geist, Geist_Mono, Noto_Sans_Thai } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const thaiSans = Noto_Sans_Thai({
  variable: "--font-thai",
  subsets: ["thai"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata = {
  title: "นาคำ คลินิกสุขภาพ | Nakham Health Care Clinic",
  description:
    "ดูแลสุขภาพแบบองค์รวม ใกล้บ้านคุณ ให้บริการตรวจรักษา วัคซีน ตรวจเลือด กายภาพบำบัด และให้คำปรึกษาโดยทีมแพทย์ผู้เชี่ยวชาญ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${thaiSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

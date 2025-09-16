import { Geist, Geist_Mono, Noto_Sans_Thai } from "next/font/google";
import Script from "next/script";
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
  title: "โรงพยาบาลส่งเสริมสุขภาพตำบลนาคำ อ.อุบลรัตน์ จ.ขอนแก่น",
  description:
    "ดูแลสุขภาพแบบองค์รวม ใกล้บ้านคุณ ให้บริการตรวจรักษา วัคซีน ตรวจเลือด กายภาพบำบัด และให้คำปรึกษาโดยทีมแพทย์ผู้เชี่ยวชาญ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <head></head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${thaiSans.variable} antialiased`}
      >
        {children}

        {/* Emergency auth clearing script for development */}
        {process.env.NODE_ENV === "development" && (
          <Script src="/clear-auth.js" strategy="afterInteractive" />
        )}
      </body>
    </html>
  );
}

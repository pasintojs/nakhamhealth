"use client";

import { useState, useEffect } from "react";

// Thai month names
const thaiMonths = [
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฎาคม",
  "สิงหาคม",
  "กันยายน",
  "ตุลาคม",
  "พฤศจิกายน",
  "ธันวาคม",
];

// Vaccine schedule data in Thai
const vaccineSchedule = {
  แรกเกิด: {
    ageInDays: 0,
    vaccines: [
      { name: "HB1", description: "วัคซีนป้องกันไวรัสตับอักเสบบี เข็มที่ 1" },
      { name: "BCG", description: "วัคซีนป้องกันวัณโรค" },
    ],
  },
  "1 เดือน": {
    ageInDays: 30,
    vaccines: [
      { name: "HB2", description: "วัคซีนป้องกันไวรัสตับอักเสบบี เข็มที่ 2" },
    ],
  },
  "2 เดือน": {
    ageInDays: 60,
    vaccines: [
      {
        name: "DTP-HB-Hib1",
        description: "คอตีบ-บาดทะยัก-ไอกรน-ตับอักเสบบี-ฮิบ",
      },
      { name: "IPV1", description: "โปลิโอชนิดฉีด เข็มที่ 1" },
      { name: "Rota1", description: "วัคซีนโรต้า เข็มที่ 1" },
    ],
  },
  "4 เดือน": {
    ageInDays: 120,
    vaccines: [
      { name: "DTP-HB-Hib2", description: "เข็มที่ 2" },
      { name: "IPV2", description: "โปลิโอชนิดฉีด เข็มที่ 2" },
      { name: "Rota2", description: "วัคซีนโรต้า เข็มที่ 2" },
    ],
  },
  "6 เดือน": {
    ageInDays: 180,
    vaccines: [
      { name: "DTP-HB-Hib3", description: "เข็มที่ 3" },
      { name: "OPV1", description: "โปลิโอชนิดกิน เข็มที่ 1" },
      {
        name: "Rota3",
        description: "วัคซีนโรต้า เข็มที่ 3 (ถ้าเป็นชนิด 3 เข็ม)",
      },
    ],
  },
  "9 เดือน": {
    ageInDays: 270,
    vaccines: [
      { name: "MMR1", description: "หัด-หัดเยอรมัน-คางทูม เข็มที่ 1" },
    ],
  },
  "1 ปี": {
    ageInDays: 365,
    vaccines: [{ name: "LAJE1", description: "ไข้สมองอักเสบเจอี เข็มที่ 1" }],
  },
  "1 ปี 6 เดือน": {
    ageInDays: 545,
    vaccines: [
      { name: "DTP4", description: "เข็มที่ 4" },
      { name: "OPV4", description: "โปลิโอชนิดกิน เข็มที่ 4" },
    ],
  },
  "2 ปี": {
    ageInDays: 730,
    vaccines: [
      { name: "MMR2", description: "หัด-หัดเยอรมัน-คางทูม เข็มที่ 2" },
      { name: "LAJE2", description: "ไข้สมองอักเสบเจอี เข็มที่ 2" },
    ],
  },
  "4 ปี": {
    ageInDays: 1460,
    vaccines: [
      { name: "DTP5", description: "เข็มที่ 5" },
      { name: "OPV5", description: "โปลิโอชนิดกิน เข็มที่ 5" },
    ],
  },
};

const notes = [
  "วัคซีน HPV ให้ในนักเรียนหญิง ป.5 จำนวน 2 เข็ม ห่างกัน 6 เดือน",
  "วัคซีน BCG ป.1 ให้เฉพาะผู้ที่ทดสอบทูเบอร์คูลินผลลบ",
  "วัคซีนโปลิโอ OPV และ IPV สลับการให้ตามตารางกำหนด",
];

export default function VaccinePlanSection() {
  const [birthDay, setBirthDay] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [babyAge, setBabyAge] = useState(null);
  const [vaccineStatus, setVaccineStatus] = useState(null);

  const calculateAge = (day, month, year) => {
    if (!day || !month || !year) return null;

    // Convert Buddhist Era year to Gregorian year
    const gregorianYear = parseInt(year) - 543;
    const dayInt = parseInt(day);
    const monthInt = parseInt(month);

    // Basic validation
    if (gregorianYear < 1900 || gregorianYear > new Date().getFullYear())
      return null;
    if (monthInt < 1 || monthInt > 12) return null;
    if (dayInt < 1 || dayInt > 31) return null;

    // Create date and validate it's a real date
    const birth = new Date(gregorianYear, monthInt - 1, dayInt);

    // Check if the date is valid (handles things like Feb 30)
    if (
      birth.getDate() !== dayInt ||
      birth.getMonth() !== monthInt - 1 ||
      birth.getFullYear() !== gregorianYear
    ) {
      return null;
    }

    const today = new Date();
    const ageInDays = Math.floor((today - birth) / (1000 * 60 * 60 * 24));

    // Check if the birth date is in the future
    if (ageInDays < 0) return null;

    const years = Math.floor(ageInDays / 365);
    const months = Math.floor((ageInDays % 365) / 30);
    const days = ageInDays % 30;

    return {
      totalDays: ageInDays,
      years,
      months,
      days,
      birthDate: birth,
      displayAge:
        years > 0
          ? `${years} ปี ${months} เดือน`
          : months > 0
          ? `${months} เดือน ${days} วัน`
          : `${days} วัน`,
    };
  };

  const formatThaiDate = (date) => {
    const day = date.getDate();
    const month = thaiMonths[date.getMonth()];
    const year = date.getFullYear() + 543; // Convert to Buddhist Era
    return `${day} ${month} ${year}`;
  };

  const calculateVaccineDate = (birthDate, ageInDays) => {
    const vaccineDate = new Date(birthDate);
    vaccineDate.setDate(vaccineDate.getDate() + ageInDays);
    return vaccineDate;
  };

  const analyzeVaccineStatus = (ageInDays, birthDate) => {
    const completed = [];
    const upcoming = [];
    const overdue = [];
    let nextVaccine = null;

    Object.entries(vaccineSchedule).forEach(([period, data]) => {
      const daysUntilVaccine = data.ageInDays - ageInDays;
      const vaccineDate = calculateVaccineDate(birthDate, data.ageInDays);
      const formattedDate = formatThaiDate(vaccineDate);

      if (daysUntilVaccine < -30) {
        // More than 30 days overdue
        completed.push({
          period,
          ...data,
          status: "completed",
          vaccineDate: formattedDate,
          exactDate: vaccineDate,
        });
      } else if (daysUntilVaccine <= -1) {
        // Past due
        overdue.push({
          period,
          ...data,
          status: "overdue",
          daysOverdue: Math.abs(daysUntilVaccine),
          vaccineDate: formattedDate,
          exactDate: vaccineDate,
        });
      } else if (daysUntilVaccine <= 30) {
        // Due soon (within 30 days)
        if (!nextVaccine) {
          nextVaccine = {
            period,
            ...data,
            status: "next",
            daysUntil: daysUntilVaccine,
            vaccineDate: formattedDate,
            exactDate: vaccineDate,
          };
        }
        upcoming.push({
          period,
          ...data,
          status: "upcoming",
          daysUntil: daysUntilVaccine,
          vaccineDate: formattedDate,
          exactDate: vaccineDate,
        });
      } else {
        // Future vaccines
        upcoming.push({
          period,
          ...data,
          status: "future",
          daysUntil: daysUntilVaccine,
          vaccineDate: formattedDate,
          exactDate: vaccineDate,
        });
      }
    });

    return { completed, upcoming, overdue, nextVaccine };
  };

  useEffect(() => {
    if (birthDay && birthMonth && birthYear) {
      const age = calculateAge(birthDay, birthMonth, birthYear);
      setBabyAge(age);

      if (age && age.totalDays >= 0) {
        const status = analyzeVaccineStatus(age.totalDays, age.birthDate);
        setVaccineStatus(status);
      }
    } else {
      setBabyAge(null);
      setVaccineStatus(null);
    }
  }, [birthDay, birthMonth, birthYear]);

  const formatDaysToReadable = (days) => {
    if (days === 0) return "วันนี้";
    if (days === 1) return "พรุ่งนี้";
    if (days < 7) return `อีก ${days} วัน`;
    if (days < 30) return `อีก ${Math.floor(days / 7)} สัปดาห์`;
    if (days < 365) return `อีก ${Math.floor(days / 30)} เดือน`;
    return `อีก ${Math.floor(days / 365)} ปี`;
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 relative">
      {/* Enhanced section header */}
      <div className="text-center mb-12">
        <h1 className="animate-pulse text-4xl pt-1 sm:text-5xl font-bold bg-gradient-to-r from-sky-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent mb-4">
          ตารางวัคซีนเด็ก
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          ตรวจสอบกำหนดการฉีดวัคซีนสำหรับลูกน้อยของคุณ
          โดยใส่วันเกิดเพื่อดูว่าควรฉีดวัคซีนอะไร เมื่อไหร่
        </p>
      </div>

      {/* Date Input */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <div className="max-w-2xl mx-auto">
          <label className="block text-lg font-medium text-slate-700 mb-4">
            วันเกิดของลูกน้อย
          </label>

          <div className="grid grid-cols-3 gap-4">
            {/* Day Dropdown */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                วันที่
              </label>
              <select
                value={birthDay}
                onChange={(e) => setBirthDay(e.target.value)}
                className="w-full px-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
              >
                <option value="">เลือกวัน</option>
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>

            {/* Month Dropdown */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                เดือน
              </label>
              <select
                value={birthMonth}
                onChange={(e) => setBirthMonth(e.target.value)}
                className="w-full px-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
              >
                <option value="">เลือกเดือน</option>
                {thaiMonths.map((month, index) => (
                  <option key={index + 1} value={index + 1}>
                    {month}
                  </option>
                ))}
              </select>
            </div>

            {/* Year Dropdown (Buddhist Era) */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                ปี พ.ศ.
              </label>
              <select
                value={birthYear}
                onChange={(e) => setBirthYear(e.target.value)}
                className="w-full px-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
              >
                <option value="">เลือกปี</option>
                {Array.from({ length: 10 }, (_, i) => {
                  const currentBuddhistYear = new Date().getFullYear() + 543;
                  const year = currentBuddhistYear - i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {babyAge && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-slate-700">
                <span className="font-medium">อายุปัจจุบัน:</span>{" "}
                <span className="font-semibold text-blue-700">
                  {babyAge.displayAge}
                </span>
              </p>
              <p className="text-sm text-slate-600 mt-1">
                วันเกิด: {birthDay}{" "}
                {birthMonth && thaiMonths[parseInt(birthMonth) - 1]} {birthYear}
              </p>
            </div>
          )}

          {birthDay && birthMonth && birthYear && !babyAge && (
            <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
              <p className="text-red-700">
                ⚠️ วันที่ไม่ถูกต้อง กรุณาตรวจสอบข้อมูลอีกครั้ง
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Vaccine Status */}
      {vaccineStatus && (
        <div className="space-y-8">
          {/* Next Vaccine */}
          {vaccineStatus.nextVaccine && (
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">
                🗓️ วัคซีนที่ควรฉีดต่อไป
              </h2>
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="text-xl font-semibold mb-2">
                  {vaccineStatus.nextVaccine.period}
                </h3>
                <div className="mb-3">
                  <p className="text-blue-100 text-lg font-medium">
                    📅 วันที่ควรฉีด: {vaccineStatus.nextVaccine.vaccineDate}
                  </p>
                  <p className="text-blue-100">
                    {vaccineStatus.nextVaccine.daysUntil === 0
                      ? "ถึงเวลาฉีดแล้ว!"
                      : vaccineStatus.nextVaccine.daysUntil > 0
                      ? `${formatDaysToReadable(
                          vaccineStatus.nextVaccine.daysUntil
                        )}`
                      : `เลยมา ${Math.abs(
                          vaccineStatus.nextVaccine.daysUntil
                        )} วันแล้ว`}
                  </p>
                </div>
                <div className="space-y-2">
                  {vaccineStatus.nextVaccine.vaccines.map((vaccine, idx) => (
                    <div key={idx} className="bg-white/20 rounded p-3">
                      <p className="font-medium">{vaccine.name}</p>
                      <p className="text-sm text-blue-100">
                        {vaccine.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Overdue Vaccines */}
          {vaccineStatus.overdue.length > 0 && (
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">⚠️ วัคซีนที่เลยกำหนด</h2>
              <div className="space-y-4">
                {vaccineStatus.overdue.map((item, idx) => (
                  <div key={idx} className="bg-white/10 rounded-lg p-4">
                    <h3 className="text-xl font-semibold mb-2">
                      {item.period}
                    </h3>
                    <div className="mb-3">
                      <p className="text-red-100 text-lg font-medium">
                        📅 วันที่ควรฉีด: {item.vaccineDate}
                      </p>
                      <p className="text-red-100">
                        เลยมา {item.daysOverdue} วันแล้ว
                      </p>
                    </div>
                    <div className="space-y-2">
                      {item.vaccines.map((vaccine, vIdx) => (
                        <div key={vIdx} className="bg-white/20 rounded p-3">
                          <p className="font-medium">{vaccine.name}</p>
                          <p className="text-sm text-red-100">
                            {vaccine.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Completed Vaccines */}
          {vaccineStatus.completed.length > 0 && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                ✅ วัคซีนที่ฉีดแล้ว
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {vaccineStatus.completed.map((item, idx) => (
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-lg p-4 bg-green-50"
                  >
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">
                      {item.period}
                    </h3>
                    <p className="text-green-700 text-sm font-medium mb-2">
                      📅 วันที่ฉีด: {item.vaccineDate}
                    </p>
                    <div className="space-y-2">
                      {item.vaccines.map((vaccine, vIdx) => (
                        <div
                          key={vIdx}
                          className="bg-white rounded p-3 border-l-4 border-green-500"
                        >
                          <p className="font-medium text-slate-800">
                            {vaccine.name}
                          </p>
                          <p className="text-sm text-slate-600">
                            {vaccine.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upcoming Vaccines */}
          {vaccineStatus.upcoming.length > 0 && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                📅 วัคซีนที่จะฉีดในอนาคต
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {vaccineStatus.upcoming
                  .filter((item) => item.status === "future")
                  .map((item, idx) => (
                    <div
                      key={idx}
                      className="border border-slate-200 rounded-lg p-4"
                    >
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">
                        {item.period}
                      </h3>
                      <div className="mb-3">
                        <p className="text-blue-600 text-sm font-medium">
                          📅 วันที่ควรฉีด: {item.vaccineDate}
                        </p>
                        <p className="text-slate-600">
                          {formatDaysToReadable(item.daysUntil)}
                        </p>
                      </div>
                      <div className="space-y-2">
                        {item.vaccines.map((vaccine, vIdx) => (
                          <div key={vIdx} className="bg-slate-50 rounded p-3">
                            <p className="font-medium text-slate-800">
                              {vaccine.name}
                            </p>
                            <p className="text-sm text-slate-600">
                              {vaccine.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Important Notes */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-yellow-800 mb-4">
              📝 หมายเหตุสำคัญ
            </h2>
            <ul className="space-y-2">
              {notes.map((note, idx) => (
                <li key={idx} className="text-yellow-700 flex items-start">
                  <span className="text-yellow-500 mr-2">•</span>
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Initial instruction */}
      {!vaccineStatus && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">👶</div>
          <p className="text-lg text-slate-600">
            กรุณาใส่วันเกิดของลูกน้อยเพื่อดูตารางวัคซีน
          </p>
        </div>
      )}
    </div>
  );
}

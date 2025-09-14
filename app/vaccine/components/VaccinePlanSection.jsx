"use client";

import { useState, useEffect } from "react";

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
  const [birthDate, setBirthDate] = useState("");
  const [babyAge, setBabyAge] = useState(null);
  const [vaccineStatus, setVaccineStatus] = useState(null);

  const calculateAge = (birthDateStr) => {
    if (!birthDateStr) return null;

    const birth = new Date(birthDateStr);
    const today = new Date();
    const ageInDays = Math.floor((today - birth) / (1000 * 60 * 60 * 24));

    const years = Math.floor(ageInDays / 365);
    const months = Math.floor((ageInDays % 365) / 30);
    const days = ageInDays % 30;

    return {
      totalDays: ageInDays,
      years,
      months,
      days,
      displayAge:
        years > 0
          ? `${years} ปี ${months} เดือน`
          : months > 0
          ? `${months} เดือน ${days} วัน`
          : `${days} วัน`,
    };
  };

  const analyzeVaccineStatus = (ageInDays) => {
    const completed = [];
    const upcoming = [];
    const overdue = [];
    let nextVaccine = null;

    Object.entries(vaccineSchedule).forEach(([period, data]) => {
      const daysUntilVaccine = data.ageInDays - ageInDays;

      if (daysUntilVaccine < -30) {
        // More than 30 days overdue
        completed.push({ period, ...data, status: "completed" });
      } else if (daysUntilVaccine <= -1) {
        // Past due
        overdue.push({
          period,
          ...data,
          status: "overdue",
          daysOverdue: Math.abs(daysUntilVaccine),
        });
      } else if (daysUntilVaccine <= 30) {
        // Due soon (within 30 days)
        if (!nextVaccine) {
          nextVaccine = {
            period,
            ...data,
            status: "next",
            daysUntil: daysUntilVaccine,
          };
        }
        upcoming.push({
          period,
          ...data,
          status: "upcoming",
          daysUntil: daysUntilVaccine,
        });
      } else {
        // Future vaccines
        upcoming.push({
          period,
          ...data,
          status: "future",
          daysUntil: daysUntilVaccine,
        });
      }
    });

    return { completed, upcoming, overdue, nextVaccine };
  };

  useEffect(() => {
    if (birthDate) {
      const age = calculateAge(birthDate);
      setBabyAge(age);

      if (age && age.totalDays >= 0) {
        const status = analyzeVaccineStatus(age.totalDays);
        setVaccineStatus(status);
      }
    }
  }, [birthDate]);

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
        <div className="max-w-md mx-auto">
          <label
            htmlFor="birthDate"
            className="block text-lg font-medium text-slate-700 mb-3"
          >
            วันเกิดของลูกน้อย
          </label>
          <input
            type="date"
            id="birthDate"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            max={new Date().toISOString().split("T")[0]}
          />
          {babyAge && (
            <p className="mt-3 text-slate-600">
              อายุปัจจุบัน:{" "}
              <span className="font-semibold text-slate-800">
                {babyAge.displayAge}
              </span>
            </p>
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
                <p className="text-blue-100 mb-3">
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
                    <p className="text-red-100 mb-3">
                      เลยมา {item.daysOverdue} วันแล้ว
                    </p>
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
                      <p className="text-slate-600 mb-3">
                        {formatDaysToReadable(item.daysUntil)}
                      </p>
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

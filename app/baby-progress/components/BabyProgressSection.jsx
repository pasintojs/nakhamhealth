"use client";
import { useState, useEffect } from "react";
import {
  thaiMonths,
  developmentalStages,
  calculateAge,
  formatThaiDate,
  getCurrentDevelopmentStage,
  analyzeDevelopmentStatus,
  getCategoryName,
  getCategoryColor,
} from "../../../lib/dspm-utils";

export default function BabyProgressSection({ dspmData }) {
  const [birthDay, setBirthDay] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [babyAge, setBabyAge] = useState(null);
  const [developmentStatus, setDevelopmentStatus] = useState(null);

  useEffect(() => {
    if (birthDay && birthMonth && birthYear) {
      const age = calculateAge(birthDay, birthMonth, birthYear);
      setBabyAge(age);

      if (age && age.totalDays >= 0) {
        const status = analyzeDevelopmentStatus(age.totalMonths, dspmData);
        setDevelopmentStatus(status);
      } else {
        setDevelopmentStatus(null);
      }
    } else {
      setBabyAge(null);
      setDevelopmentStatus(null);
    }
  }, [birthDay, birthMonth, birthYear, dspmData]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.05),transparent_50%)]" />

      <div className="relative">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="animate-pulse text-4xl pt-1 sm:text-5xl font-bold bg-gradient-to-r from-sky-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            ติดตามพัฒนาการเด็ก
          </h1>
          <p className="text-slate-600 text-lg max-w-3xl mx-auto">
            ระบบประเมินพัฒนาการเด็กตามมาตรฐาน DSPM (Denver Screening for
            Preschool Milestones)
            ช่วยติดตามการเจริญเติบโตของลูกน้อยอย่างเป็นระบบ
          </p>
        </div>

        {/* Birth Date Input Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            กรอกวันเกิดของลูกน้อย
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                วัน
              </label>
              <select
                value={birthDay}
                onChange={(e) => setBirthDay(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">เลือกวัน</option>
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                เดือน
              </label>
              <select
                value={birthMonth}
                onChange={(e) => setBirthMonth(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">เลือกเดือน</option>
                {thaiMonths.map((month, index) => (
                  <option key={index + 1} value={index + 1}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ปี (พ.ศ.)
              </label>
              <select
                value={birthYear}
                onChange={(e) => setBirthYear(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">เลือกปี</option>
                {Array.from(
                  { length: 10 },
                  (_, i) => new Date().getFullYear() + 543 - i
                ).map((year) => (
                  <option key={year} value={year - 543}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Age Display */}
        {babyAge && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-lg p-8 mb-8">
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                อายุของลูกน้อย
              </h3>
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {babyAge.ageText}
              </div>
              <div className="text-gray-600">
                (รวม {babyAge.totalDays.toLocaleString()} วัน)
              </div>
            </div>
          </div>
        )}

        {/* Development Status */}
        {developmentStatus && (
          <div className="space-y-8">
            {/* Current Stage */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  ช่วงพัฒนาการปัจจุบัน
                </h3>
                <div className="inline-block bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-full text-xl font-semibold">
                  {developmentStatus.currentStage.title}
                </div>
              </div>

              {/* Milestones */}
              <div className="grid gap-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  รายการประเมินพัฒนาการ (
                  {developmentStatus.currentMilestones.length} รายการ)
                </h4>

                {developmentStatus.currentMilestones.map((milestone) => (
                  <div
                    key={milestone.id}
                    className="bg-gray-50 rounded-lg p-6 border-l-4 border-blue-500"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-medium text-gray-600">
                            {milestone.itemNo}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                              milestone.category
                            )}`}
                          >
                            {getCategoryName(milestone.category)}
                          </span>
                        </div>
                        <h5 className="text-lg font-semibold text-gray-900 mb-2">
                          {milestone.title}
                        </h5>
                        <p className="text-gray-700 mb-4">
                          {milestone.description}
                        </p>
                      </div>
                    </div>

                    {/* How to Test */}
                    {milestone.howToTest && (
                      <div className="mb-4">
                        <h6 className="text-sm font-semibold text-gray-800 mb-2">
                          🔍 วิธีการประเมิน:
                        </h6>
                        <p className="text-sm text-gray-700 bg-blue-50 p-3 rounded">
                          {milestone.howToTest}
                        </p>
                      </div>
                    )}

                    {/* Pass Condition */}
                    {milestone.passCondition && (
                      <div className="mb-4">
                        <h6 className="text-sm font-semibold text-gray-800 mb-2">
                          ✅ เกณฑ์ผ่าน:
                        </h6>
                        <p className="text-sm text-gray-700 bg-green-50 p-3 rounded">
                          {milestone.passCondition}
                        </p>
                      </div>
                    )}

                    {/* Training Methods */}
                    {milestone.trainingMethods.length > 0 && (
                      <div className="mb-4">
                        <h6 className="text-sm font-semibold text-gray-800 mb-2">
                          🎯 วิธีฝึกทักษะ:
                        </h6>
                        <div className="bg-yellow-50 p-3 rounded">
                          {milestone.trainingMethods.map((method, index) => (
                            <div
                              key={index}
                              className="text-sm text-gray-700 mb-2 last:mb-0"
                            >
                              <span className="font-medium">{index + 1}.</span>{" "}
                              {method}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Equipment */}
                    {milestone.equipment && milestone.equipment !== "-" && (
                      <div>
                        <h6 className="text-sm font-semibold text-gray-800 mb-2">
                          🧸 อุปกรณ์/ของเล่นที่ใช้:
                        </h6>
                        <p className="text-sm text-gray-700 bg-purple-50 p-3 rounded">
                          {milestone.equipment}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Completed Milestones Summary */}
            {developmentStatus.completedMilestones.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    พัฒนาการที่ผ่านมาแล้ว
                  </h3>
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    ผ่านแล้ว {developmentStatus.completedMilestones.length}{" "}
                    รายการ
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <div
                    className="flex gap-4 pb-2"
                    style={{ width: "max-content" }}
                  >
                    {developmentStatus.completedMilestones.map((milestone) => (
                      <div
                        key={milestone.id}
                        className="flex-shrink-0 w-64 bg-green-50 rounded-lg p-4 border border-green-200"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-medium text-gray-600">
                            {milestone.itemNo}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                              milestone.category
                            )}`}
                          >
                            {getCategoryName(milestone.category)}
                          </span>
                        </div>
                        <div className="flex items-start gap-2 mb-2">
                          <span className="text-green-600 font-bold text-sm">
                            ✓
                          </span>
                          <h5
                            className="text-sm font-semibold text-gray-900 leading-tight overflow-hidden"
                            style={{
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                            }}
                          >
                            {milestone.title}
                          </h5>
                        </div>
                        <p
                          className="text-xs text-gray-600 leading-tight overflow-hidden"
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {milestone.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center mt-3">
                  <span className="text-xs text-gray-500">
                    ← เลื่อนเพื่อดูทั้งหมด →
                  </span>
                </div>
              </div>
            )}

            {/* All Relevant Milestones Summary */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-6">
                สรุปการประเมินพัฒนาการทั้งหมด
              </h4>

              <div className="text-center mb-6">
                <div className="inline-block p-6 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">
                    {developmentStatus.totalMilestones}
                  </div>
                  <div className="text-sm text-gray-600">
                    รายการแนะนำสำหรับช่วงอายุนี้
                  </div>
                </div>
              </div>

              {/* Categories Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {["GM", "FM", "RL", "EL", "PS"].map((category) => {
                  const categoryMilestones =
                    developmentStatus.allRelevantMilestones.filter(
                      (m) => m.category === category
                    );
                  return (
                    <div
                      key={category}
                      className="text-center p-4 bg-gray-50 rounded-lg"
                    >
                      <div
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${getCategoryColor(
                          category
                        )}`}
                      >
                        {getCategoryName(category)}
                      </div>
                      <div className="text-lg font-semibold text-gray-900">
                        {categoryMilestones.length}
                      </div>
                      <div className="text-sm text-gray-600">รายการ</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Information Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-lg p-8 mt-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            เกี่ยวกับการประเมินพัฒนาการ DSPM
          </h3>
          <div className="prose prose-lg text-gray-700">
            <p className="mb-4">
              <strong>DSPM (Denver Screening for Preschool Milestones)</strong>
              เป็นเครื่องมือมาตรฐานสากลสำหรับติดตามพัฒนาการเด็กในด้านต่างๆ
              ประกอบด้วย:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>การเคลื่อนไหวใหญ่ (GM)</strong> - การใช้กล้ามเนื้อใหญ่
                เช่น การนั่ง เดิน วิ่ง
              </li>
              <li>
                <strong>การเคลื่อนไหวละเอียด (FM)</strong> -
                การใช้กล้ามเนื้อเล็ก เช่น การจับของ การวาดรูป
              </li>
              <li>
                <strong>การรับรู้ภาษา (RL)</strong> - การเข้าใจภาษาและคำพูด
              </li>
              <li>
                <strong>การแสดงออกทางภาษา (EL)</strong> - การสื่อสารและการพูด
              </li>
              <li>
                <strong>การช่วยเหลือตนเองและสังคม (PS)</strong> -
                ทักษะการดูแลตนเองและการเข้าสังคม
              </li>
            </ul>
            <p className="mt-4 text-sm text-gray-600">
              หมายเหตุ: การประเมินนี้เป็นเพียงแนวทางเบื้องต้น
              หากมีข้อสงสัยเกี่ยวกับพัฒนาการของลูก
              ควรปรึกษาแพทย์เด็กหรือผู้เชี่ยวชาญด้านพัฒนาการเด็ก
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

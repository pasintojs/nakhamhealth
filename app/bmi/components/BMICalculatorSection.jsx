"use client";

import { useState, useEffect } from "react";

// BMI categories and health recommendations
const BMI_CATEGORIES = {
  underweight: {
    range: "< 18.5",
    label: "น้ำหนักน้อยกว่าเกณฑ์",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-500",
    icon: "📉",
    recommendations: [
      "เพิ่มการทานอาหารที่มีประโยชน์และมีแคลอรี่เพียงพอ",
      "รับประทานอาหารครบ 5 หมู่ โดยเน้นโปรตีนและคาร์โบไฮเดรต",
      "ออกกำลังกายแบบ Resistance Training เพื่อเพิ่มมวลกล้ามเนื้อ",
      "หลีกเลี่ยงการดื่มน้ำมากก่อนอาหาร",
      "รับประทานอาหารบ่อยๆ วันละ 5-6 มื้อ",
    ],
  },
  normal: {
    range: "18.5 - 24.9",
    label: "น้ำหนักปกติ",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-500",
    icon: "✅",
    recommendations: [
      "รักษาน้ำหนักปัจจุบันให้คงที่",
      "รับประทานอาหารครบ 5 หมู่ในสัดส่วนที่เหมาะสม",
      "ออกกำลังกายสม่ำเสมออย่างน้อยสัปดาห์ละ 150 นาที",
      "ดื่มน้ำเปล่าวันละ 8-10 แก้ว",
      "นอนหลับให้เพียงพอ วันละ 7-9 ชั่วโมง",
    ],
  },
  overweight: {
    range: "25.0 - 29.9",
    label: "น้ำหนักเกิน",
    color: "from-yellow-500 to-orange-500",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-500",
    icon: "⚠️",
    recommendations: [
      "ลดน้ำหนัก 5-10% ของน้ำหนักปัจจุบัน",
      "ลดการทานอาหารที่มีไขมันและน้ำตาลสูง",
      "เพิ่มการทานผักและผลไม้",
      "ออกกำลังกายแบบ Cardio 30-45 นาทีต่อวัน",
      "ควบคุมขนาดของหนึ่งมื้ออาหาร",
    ],
  },
  obese1: {
    range: "30.0 - 34.9",
    label: "อ้วนระดับ 1",
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-500",
    icon: "🚨",
    recommendations: [
      "ลดน้ำหนัก 10-15% ของน้ำหนักปัจจุบัน",
      "ปรึกษาหมอหรือนักโภชนาการ",
      "ลดอาหารที่ให้พลังงานสูง เช่น ขนมหวาน อาหารทอด",
      "ออกกำลังกายอย่างน้อยวันละ 45-60 นาที",
      "ตรวจสุขภาพเป็นประจำ",
    ],
  },
  obese2: {
    range: "35.0 - 39.9",
    label: "อ้วนระดับ 2",
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-500",
    icon: "🆘",
    recommendations: [
      "ควรปรึกษาแพทย์เพื่อวางแผนลดน้ำหนักอย่างจริงจัง",
      "อาจต้องใช้ยาช่วยลดน้ำหนักภายใต้การดูแลแพทย์",
      "ควบคุมอาหารอย่างเข้มงวด",
      "ออกกำลังกายภายใต้การดูแลของผู้เชี่ยวชาญ",
      "ตรวจสุขภาพสม่ำเสมอ",
    ],
  },
  obese3: {
    range: "≥ 40.0",
    label: "อ้วนระดับ 3 (อ้วนมาก)",
    color: "from-red-600 to-red-700",
    bgColor: "bg-red-50",
    borderColor: "border-red-600",
    icon: "🚑",
    recommendations: [
      "ต้องได้รับการรักษาจากแพทย์โดยเร็ว",
      "อาจต้องพิจารณาการผ่าตัดลดน้ำหนัก",
      "ต้องมีการติดตามอย่างใกล้ชิดจากทีมแพทย์",
      "ควบคุมอาหารอย่างเข้มงวดภายใต้การดูแลนักโภชนาการ",
      "ออกกำลังกายตามที่แพทย์แนะนำเท่านั้น",
    ],
  },
};

export default function BMICalculatorSection() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBMI] = useState(null);
  const [category, setCategory] = useState(null);
  const [idealWeight, setIdealWeight] = useState(null);

  const calculateBMI = () => {
    if (weight && height) {
      const weightNum = parseFloat(weight);
      const heightNum = parseFloat(height) / 100; // Convert cm to meters

      if (weightNum > 0 && heightNum > 0) {
        const bmiValue = weightNum / (heightNum * heightNum);
        setBMI(bmiValue);

        // Determine category
        let bmiCategory;
        if (bmiValue < 18.5) {
          bmiCategory = BMI_CATEGORIES.underweight;
        } else if (bmiValue < 25) {
          bmiCategory = BMI_CATEGORIES.normal;
        } else if (bmiValue < 30) {
          bmiCategory = BMI_CATEGORIES.overweight;
        } else if (bmiValue < 35) {
          bmiCategory = BMI_CATEGORIES.obese1;
        } else if (bmiValue < 40) {
          bmiCategory = BMI_CATEGORIES.obese2;
        } else {
          bmiCategory = BMI_CATEGORIES.obese3;
        }

        setCategory(bmiCategory);

        // Calculate ideal weight range (BMI 18.5-24.9)
        const idealWeightMin = 18.5 * (heightNum * heightNum);
        const idealWeightMax = 24.9 * (heightNum * heightNum);
        setIdealWeight({ min: idealWeightMin, max: idealWeightMax });
      }
    }
  };

  useEffect(() => {
    calculateBMI();
  }, [weight, height]);

  const resetCalculator = () => {
    setWeight("");
    setHeight("");
    setBMI(null);
    setCategory(null);
    setIdealWeight(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 relative">
      {/* Enhanced section header */}
      <div className="text-center mb-12">
        <h1 className="animate-pulse text-4xl pt-1 sm:text-5xl font-bold bg-gradient-to-r from-sky-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent mb-4">
          คำนวณค่า BMI
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          ตรวจสอบดัชนีมวลกาย (Body Mass Index) ของคุณ
          และรับคำแนะนำสำหรับการดูแลสุขภาพที่เหมาะสม
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <div className="max-w-md mx-auto space-y-6">
          <div>
            <label
              htmlFor="weight"
              className="block text-lg font-medium text-slate-700 mb-3"
            >
              น้ำหนัก (กิโลกรัม)
            </label>
            <input
              type="number"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="ใส่น้ำหนักของคุณ"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
              min="1"
              max="300"
              step="0.1"
            />
          </div>

          <div>
            <label
              htmlFor="height"
              className="block text-lg font-medium text-slate-700 mb-3"
            >
              ส่วนสูง (เซนติเมตร)
            </label>
            <input
              type="number"
              id="height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="ใส่ส่วนสูงของคุณ"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
              min="50"
              max="250"
              step="0.1"
            />
          </div>

          {weight && height && (
            <div className="flex space-x-4">
              <button
                onClick={calculateBMI}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                คำนวณ BMI
              </button>
              <button
                onClick={resetCalculator}
                className="px-6 py-3 border border-slate-300 text-slate-600 rounded-lg font-medium hover:bg-slate-50 transition-colors"
              >
                รีเซ็ต
              </button>
            </div>
          )}
        </div>
      </div>

      {/* BMI Result */}
      {bmi && category && (
        <div className="space-y-8">
          {/* BMI Score Display */}
          <div
            className={`bg-gradient-to-r ${category.color} text-white rounded-lg shadow-lg p-6`}
          >
            <div className="text-center">
              <div className="text-6xl mb-4">{category.icon}</div>
              <h2 className="text-3xl font-bold mb-2">
                ค่า BMI ของคุณ: {bmi.toFixed(1)}
              </h2>
              <p className="text-xl mb-2">{category.label}</p>
              <p className="text-lg opacity-90">ช่วง BMI: {category.range}</p>
            </div>
          </div>

          {/* Ideal Weight Range */}
          {idealWeight && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                🎯 น้ำหนักที่เหมาะสม
              </h3>
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-lg text-slate-700">
                  น้ำหนักที่เหมาะสมสำหรับส่วนสูง {height} ซม. คือ:{" "}
                  <span className="font-bold text-green-600">
                    {idealWeight.min.toFixed(1)} - {idealWeight.max.toFixed(1)}{" "}
                    กก.
                  </span>
                </p>
                {bmi < 18.5 && (
                  <p className="text-blue-600 mt-2">
                    คุณควรเพิ่มน้ำหนักอีก{" "}
                    {(idealWeight.min - parseFloat(weight)).toFixed(1)} กก.
                  </p>
                )}
                {bmi >= 25 && (
                  <p className="text-orange-600 mt-2">
                    คุณควรลดน้ำหนัก{" "}
                    {(parseFloat(weight) - idealWeight.max).toFixed(1)} กก.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Health Recommendations */}
          <div
            className={`${category.bgColor} border ${category.borderColor} rounded-lg shadow-lg p-6`}
          >
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              💡 คำแนะนำสำหรับสุขภาพ
            </h3>
            <ul className="space-y-3">
              {category.recommendations.map((recommendation, idx) => (
                <li key={idx} className="text-slate-700 flex items-start">
                  <span className="text-slate-500 mr-3 mt-1">•</span>
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* BMI Chart */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">
              📊 ตารางเกณฑ์ BMI
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(BMI_CATEGORIES).map(([key, cat]) => (
                <div
                  key={key}
                  className={`${cat.bgColor} border-2 ${
                    category === cat ? cat.borderColor : "border-slate-200"
                  } rounded-lg p-4 transition-all ${
                    category === cat ? "ring-2 ring-offset-2 ring-blue-500" : ""
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">{cat.icon}</div>
                    <h4 className="font-bold text-slate-800 mb-1">
                      {cat.label}
                    </h4>
                    <p className="text-sm text-slate-600">BMI: {cat.range}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-yellow-800 mb-4">
              📝 หมายเหตุสำคัญ
            </h3>
            <ul className="space-y-2">
              <li className="text-yellow-700 flex items-start">
                <span className="text-yellow-500 mr-2">•</span>
                ค่า BMI เป็นเพียงตัวชี้วัดเบื้องต้น
                ไม่สามารถบอกสัดส่วนของมวลกล้ามเนื้อและไขมันได้
              </li>
              <li className="text-yellow-700 flex items-start">
                <span className="text-yellow-500 mr-2">•</span>
                นักกีฬาอาจมี BMI สูงเนื่องจากมีมวลกล้ามเนื้อมาก
                แต่ไม่ได้หมายความว่าอ้วน
              </li>
              <li className="text-yellow-700 flex items-start">
                <span className="text-yellow-500 mr-2">•</span>
                ผู้สูงอายุ เด็ก และหญิงตั้งครรภ์
                ควรปรึกษาแพทย์เพื่อการประเมินที่เหมาะสม
              </li>
              <li className="text-yellow-700 flex items-start">
                <span className="text-yellow-500 mr-2">•</span>
                หากมีปัญหาสุขภาพหรือต้องการคำแนะนำเฉพาะบุคคล
                ควรปรึกษาแพทย์หรือนักโภชนาการ
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Initial instruction */}
      {!bmi && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">⚖️</div>
          <p className="text-lg text-slate-600">
            กรุณาใส่น้ำหนักและส่วนสูงของคุณเพื่อคำนวณค่า BMI
          </p>
        </div>
      )}
    </div>
  );
}

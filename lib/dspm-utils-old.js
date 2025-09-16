// Thai month names
export const thaiMonths = [
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

// Developmental milestone age ranges (in days) - Updated to match JSON structure
export const developmentalStages = {
  "แรกเกิด - 1 เดือน": { minDays: 0, maxDays: 30, title: "แรกเกิด - 1 เดือน" },
  "1 - 2  เดือน": { minDays: 31, maxDays: 60, title: "1 - 2 เดือน" },
  "3 - 4 เดือน": { minDays: 61, maxDays: 120, title: "3 - 4 เดือน" },
  "5 - 6 เดือน": { minDays: 121, maxDays: 180, title: "5 - 6 เดือน" },
  "7 - 9 เดือน": { minDays: 181, maxDays: 270, title: "7 - 9 เดือน" },
  "10 - 12 เดือน": { minDays: 271, maxDays: 365, title: "10 - 12 เดือน" },
  "13 - 18 เดือน": { minDays: 366, maxDays: 545, title: "13 - 18 เดือน" },
  "19 - 24 เดือน": { minDays: 546, maxDays: 730, title: "19 - 24 เดือน" },
  "2 - 3 ปี": { minDays: 731, maxDays: 1095, title: "2 - 3 ปี" },
  "3 - 4 ปี": { minDays: 1096, maxDays: 1460, title: "3 - 4 ปี" },
  "4 - 5 ปี": { minDays: 1461, maxDays: 1825, title: "4 - 5 ปี" },
  "5 - 6 ปี": { minDays: 1826, maxDays: 2190, title: "5 - 6 ปี" },
};

// Calculate age in days// Transform JSON data into structured format
function transformDSPMData(rawData) {
  const structuredData = {};

  rawData.forEach((item, index) => {
    const ageGroup = item["อายุ (เดือน)"];
    const itemNo = item["ข้อที่"];
    const assessment = item["รายการประเมิน"];

    // Extract category from assessment text (GM, FM, RL, EL, PS)
    const categoryMatch = assessment.match(/\(([A-Z]+)\)/);
    const category = categoryMatch ? categoryMatch[1] : "GM";

    // Clean the title by removing category and equipment info
    let title = assessment.replace(/\s*\([A-Z]+\).*$/, "").trim();

    const milestone = {
      id: index + 1,
      itemNo: `ข้อที่ ${itemNo}`,
      category: category,
      title: title,
      description: item["เกณฑ์ผ่าน (Pass Criteria)"] || title,
      howToTest: item["วิธีประเมิน"] || "",
      passCondition: item["เกณฑ์ผ่าน (Pass Criteria)"] || "",
      trainingMethods: parseTrainingMethods(item["วิธีฝึกทักษะ"] || ""),
      equipment: item["ของเล่น/วัสดุที่ใช้แทนได้"] || "",
    };

    if (!structuredData[ageGroup]) {
      structuredData[ageGroup] = [];
    }

    structuredData[ageGroup].push(milestone);
  });

  return structuredData;
}

// Parse training methods from text into array
function parseTrainingMethods(methodsText) {
  if (!methodsText || methodsText === "-") return [];

  // Split by numbered points (1. 2. 3. etc.) or by sentences
  const methods = methodsText
    .split(/\d+\.\s+/)
    .filter((method) => method.trim().length > 0)
    .map((method) => method.trim());

  // If no numbered points found, split by periods or other delimiters
  if (methods.length <= 1) {
    return methodsText
      .split(/[.。]\s+/)
      .filter((method) => method.trim().length > 10) // Filter out very short fragments
      .map((method) => method.trim());
  }

  return methods;
}

// Calculate age in days
export function calculateAge(day, month, year) {
  if (!day || !month || !year) return null;

  const birthDate = new Date(
    parseInt(year),
    parseInt(month) - 1,
    parseInt(day)
  );
  const today = new Date();
  const timeDiff = today.getTime() - birthDate.getTime();
  const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

  if (daysDiff < 0) {
    return null; // Future date
  }

  const years = Math.floor(daysDiff / 365);
  const months = Math.floor((daysDiff % 365) / 30);
  const days = daysDiff % 30;

  return {
    totalDays: daysDiff,
    years,
    months,
    days,
    ageText:
      years > 0
        ? `${years} ปี ${months} เดือน ${days} วัน`
        : months > 0
        ? `${months} เดือน ${days} วัน`
        : `${days} วัน`,
  };
}

// Format Thai date
export function formatThaiDate(date) {
  const day = date.getDate();
  const month = thaiMonths[date.getMonth()];
  const year = date.getFullYear() + 543; // Convert to Buddhist Era
  return `${day} ${month} ${year}`;
}

// Get current development stage based on age in days
export function getCurrentDevelopmentStage(ageInDays) {
  for (const [key, stage] of Object.entries(developmentalStages)) {
    if (ageInDays >= stage.minDays && ageInDays <= stage.maxDays) {
      return { key, ...stage };
    }
  }

  // If older than all defined stages, return the last stage
  const lastStageKey = Object.keys(developmentalStages).pop();
  return { key: lastStageKey, ...developmentalStages[lastStageKey] };
}

// Analyze development status
export function analyzeDevelopmentStatus(ageInDays, dspmData) {
  const currentStage = getCurrentDevelopmentStage(ageInDays);
  const milestones = dspmData[currentStage.key] || [];

  // Also get previous stages for comparison
  const allStages = Object.keys(developmentalStages);
  const currentStageIndex = allStages.indexOf(currentStage.key);
  const previousStages = allStages.slice(0, currentStageIndex + 1);

  const allRelevantMilestones = [];
  previousStages.forEach((stageKey) => {
    if (dspmData[stageKey]) {
      allRelevantMilestones.push(
        ...dspmData[stageKey].map((m) => ({ ...m, stage: stageKey }))
      );
    }
  });

  return {
    currentStage,
    currentMilestones: milestones,
    allRelevantMilestones,
    totalMilestones: allRelevantMilestones.length,
    completed: 0, // This would be tracked based on user input
    progress: 0, // This would be calculated based on completed assessments
  };
}

// Get category name in Thai
export function getCategoryName(category) {
  const categoryNames = {
    GM: "การเคลื่อนไหวใหญ่",
    FM: "การเคลื่อนไหวละเอียด",
    RL: "การรับรู้ภาษา",
    EL: "การแสดงออกทางภาษา",
    PS: "การช่วยเหลือตนเองและสังคม",
  };
  return categoryNames[category] || category;
}

// Get category color
export function getCategoryColor(category) {
  const categoryColors = {
    GM: "bg-blue-100 text-blue-800",
    FM: "bg-green-100 text-green-800",
    RL: "bg-purple-100 text-purple-800",
    EL: "bg-orange-100 text-orange-800",
    PS: "bg-pink-100 text-pink-800",
  };
  return categoryColors[category] || "bg-gray-100 text-gray-800";
}

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
  "7 - 8 เดือน": { minDays: 181, maxDays: 240, title: "7 - 8 เดือน" },
  "9 เดือน": { minDays: 241, maxDays: 270, title: "9 เดือน" },
  "10 - 12 เดือน": { minDays: 271, maxDays: 365, title: "10 - 12 เดือน" },
  "13 - 15 เดือน": { minDays: 366, maxDays: 455, title: "13 - 15 เดือน" },
  "16 - 17 เดือน": { minDays: 456, maxDays: 515, title: "16 - 17 เดือน" },
  "18 เดือน": { minDays: 516, maxDays: 545, title: "18 เดือน" },
  "19 - 24 เดือน": { minDays: 546, maxDays: 730, title: "19 - 24 เดือน" },
  "25 - 29 เดือน": { minDays: 731, maxDays: 885, title: "25 - 29 เดือน" },
  "30 เดือน": { minDays: 886, maxDays: 915, title: "30 เดือน" },
  "31 - 36 เดือน": { minDays: 916, maxDays: 1095, title: "31 - 36 เดือน" },
};

// Calculate age in days and months
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

  // Calculate total months (more accurate for age logic)
  const totalMonths = years * 12 + Math.floor(daysDiff / 30.44); // 30.44 is average days per month

  return {
    totalDays: daysDiff,
    totalMonths: totalMonths,
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

// Analyze development status using age logic
export function analyzeDevelopmentStatus(ageInMonths, dspmData) {
  const relevantMilestones = [];
  const completedMilestones = [];
  let currentStageTitle = "ไม่ระบุ";

  // Go through all age groups and find relevant milestones
  Object.keys(dspmData).forEach((ageGroup) => {
    const groupMilestones = dspmData[ageGroup] || [];

    groupMilestones.forEach((milestone) => {
      if (
        milestone.ageLogic &&
        evaluateAgeLogic(milestone.ageLogic, ageInMonths)
      ) {
        relevantMilestones.push({
          ...milestone,
          ageGroup: ageGroup,
        });
        // Update current stage title to the most recent applicable group
        currentStageTitle = ageGroup;
      }

      // Check if this milestone should be completed at current age
      // (milestone is for younger age ranges)
      if (
        milestone.ageLogic &&
        isCompletedMilestone(milestone.ageLogic, ageInMonths)
      ) {
        completedMilestones.push({
          ...milestone,
          ageGroup: ageGroup,
        });
      }
    });
  });

  // Sort milestones by item number for better organization
  relevantMilestones.sort((a, b) => {
    const aNum = parseInt(a.itemNo.match(/\d+/)?.[0] || 0);
    const bNum = parseInt(b.itemNo.match(/\d+/)?.[0] || 0);
    return aNum - bNum;
  });

  // Sort completed milestones
  completedMilestones.sort((a, b) => {
    const aNum = parseInt(a.itemNo.match(/\d+/)?.[0] || 0);
    const bNum = parseInt(b.itemNo.match(/\d+/)?.[0] || 0);
    return aNum - bNum;
  });

  return {
    currentStage: { title: currentStageTitle },
    currentMilestones: relevantMilestones,
    completedMilestones: completedMilestones,
    allRelevantMilestones: relevantMilestones,
    totalMilestones: relevantMilestones.length,
    completed: completedMilestones.length,
    progress: 0, // This would be calculated based on completed assessments
  };
}

// Evaluate age logic condition (client-side version)
function evaluateAgeLogic(ageLogic, ageInMonths) {
  try {
    // Replace 'months' with the actual age value
    const condition = ageLogic.replace(/months/g, ageInMonths.toString());
    // Safely evaluate the condition
    return Function('"use strict"; return (' + condition + ")")();
  } catch (error) {
    console.error("Error evaluating age logic:", ageLogic, error);
    return false;
  }
}

// Check if a milestone should be considered completed (baby has passed this age range)
function isCompletedMilestone(ageLogic, currentAgeInMonths) {
  try {
    // For milestones that have upper age limits, check if current age exceeds the maximum age
    // Examples: "(months<1)" - completed if currentAge >= 1
    //          "(months>=1&&months<=2)" - completed if currentAge > 2

    // Extract the maximum age from age logic
    const upperLimitMatch = ageLogic.match(/months<=(\d+)/);
    const lessThanMatch = ageLogic.match(/months<(\d+)/);

    if (upperLimitMatch) {
      const maxAge = parseInt(upperLimitMatch[1]);
      return currentAgeInMonths > maxAge;
    } else if (lessThanMatch) {
      const maxAge = parseInt(lessThanMatch[1]);
      return currentAgeInMonths >= maxAge;
    }

    return false;
  } catch (error) {
    console.error("Error checking completed milestone:", ageLogic, error);
    return false;
  }
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

import fs from "fs";
import path from "path";

// Load DSPM data from JSON file (server-side only)
export async function loadDSPMData() {
  try {
    const filePath = path.join(process.cwd(), "public", "dspmusethis.json");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const rawData = JSON.parse(fileContents);

    // Transform the data into our desired structure
    return transformDSPMData(rawData);
  } catch (error) {
    console.error("Error loading DSPM data:", error);
    return {};
  }
}

// Transform JSON data into structured format
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

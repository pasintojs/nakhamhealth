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

// Developmental milestone age ranges (in days)
const developmentalStages = {
  "แรกเกิด-1เดือน": { minDays: 0, maxDays: 30, title: "แรกเกิด - 1 เดือน" },
  "1-2เดือน": { minDays: 31, maxDays: 60, title: "1 - 2 เดือน" },
  "3-4เดือน": { minDays: 61, maxDays: 120, title: "3 - 4 เดือน" },
  "5-6เดือน": { minDays: 121, maxDays: 180, title: "5 - 6 เดือน" },
  "7-9เดือน": { minDays: 181, maxDays: 270, title: "7 - 9 เดือน" },
  "10-12เดือน": { minDays: 271, maxDays: 365, title: "10 - 12 เดือน" },
  "13-18เดือน": { minDays: 366, maxDays: 545, title: "13 - 18 เดือน" },
  "19-24เดือน": { minDays: 546, maxDays: 730, title: "19 - 24 เดือน" },
  "2-3ปี": { minDays: 731, maxDays: 1095, title: "2 - 3 ปี" },
  "3-4ปี": { minDays: 1096, maxDays: 1460, title: "3 - 4 ปี" },
  "4-5ปี": { minDays: 1461, maxDays: 1825, title: "4 - 5 ปี" },
  "5-6ปี": { minDays: 1826, maxDays: 2190, title: "5 - 6 ปี" },
};

// Sample developmental milestones based on DSPM data structure
const developmentalMilestones = {
  "แรกเกิด-1เดือน": [
    {
      id: 1,
      itemNo: "ข้อที่ 1",
      category: "GM", // Gross Motor
      title: "ท่านอนคว่ำยกศีรษะและหันไปข้างใดข้างหนึ่งได้",
      description: "เด็กสามารถยกศีรษะและหันไปข้างใดข้างหนึ่งได้",
      howToTest:
        "จัดให้เด็กอยู่ในท่านอนคว่ำบนเบาะนอน แขนทั้งสองข้างอยู่หน้าไหล่ สังเกตเด็กยกศีรษะ",
      passCondition: "เด็กสามารถยกศีรษะและหันไปข้างใดข้างหนึ่งได้",
      trainingMethods: [
        "จัดให้เด็กอยู่ในท่านอนคว่ำ เขย่าของเล่นที่มีเสียงตรงหน้าเด็ก ระยะห่างประมาณ 30 ซม.",
        "เมื่อเด็กมองที่ของเล่นแล้วค่อยๆ เคลื่อนของเล่นมาทางด้านซ้ายหรือขวา เพื่อให้เด็กหันศีรษะมองตาม",
        "ถ้าเด็กทำไม่ได้ช่วยประคองศีรษะเด็กให้หันตาม ทำซ้ำอีกครั้งโดยเปลี่ยนให้เคลื่อนของเล่นมาทางด้านตรงข้าม",
        "ใช้หน้าและเสียงของพ่อแม่พูดคุยกับเด็กตรงหน้า เมื่อเด็กมองตามค่อยๆ เคลื่อนหน้าไปทางด้านข้าง",
      ],
    },
    {
      id: 2,
      itemNo: "ข้อที่ 2",
      category: "FM", // Fine Motor
      title: "มองตามถึงกึ่งกลางลำตัว",
      description:
        "เด็กมองตามลูกบอลผ้าสีแดง จากด้านข้างถึงระยะกึ่งกลางลำตัวได้",
      howToTest:
        "ถือลูกบอลผ้าสีแดงห่างจากหน้าเด็กประมาณ 20 ซม. เคลื่อนลูกบอลช้าๆ ไปทางด้านข้างลำตัวเด็ก",
      passCondition:
        "เด็กมองตามลูกบอลผ้าสีแดง จากด้านข้างถึงระยะกึ่งกลางลำตัวได้",
      trainingMethods: [
        "จัดเด็กอยู่ในท่านอนหงายโดยศีรษะเด็กอยู่ในแนวกึ่งกลางลำตัว",
        "ก้มหน้าให้อยู่ใกล้ๆ เด็ก ห่างจากหน้าเด็กประมาณ 30 ซม. (1 ไม้บรรทัด)",
        "เรียกชื่อเด็กเพื่อกระตุ้นเด็กให้สนใจจ้องมอง จากนั้นเคลื่อนหน้าอย่างช้าๆ เป็นแนวโค้งไปทางด้านข้าง",
        "ฝึกเพิ่มเติมโดยใช้ของเล่นที่มีสีสันสดใสกระตุ้นให้เด็กสนใจและมองตาม",
        "ใช้อุปกรณ์ที่มีสีสดใส เส้นผ่านศูนย์กลางประมาณ 10 ซม. เช่น ผ้า/ลูกบอลผ้า พู่ไหมพรม",
      ],
    },
    {
      id: 3,
      itemNo: "ข้อที่ 3",
      category: "RL", // Receptive Language
      title: "สะดุ้งหรือเคลื่อนไหวร่างกายเมื่อได้ยินเสียงพูดระดับปกติ",
      description:
        "เด็กแสดงการรับรู้เสียงด้วยการสะดุ้ง กะพริบตา หรือเคลื่อนไหวร่างกาย",
      howToTest:
        "อยู่ห่างจากเด็กประมาณ 60 ซม. เรียกชื่อเด็กจากด้านข้างทีละข้างทั้งซ้ายและขวา โดยพูดเสียงดังปกติ",
      passCondition:
        "เด็กแสดงการรับรู้ด้วยการกะพริบตา สะดุ้ง หรือเคลื่อนไหวร่างกาย",
      trainingMethods: [
        "จัดให้เด็กอยู่ในท่านอนหงาย เรียกชื่อหรือพูดคุยกับเด็กจากด้านข้างทีละข้างทั้งข้างซ้ายและขวา",
        "พูดเสียงดังกว่าปกติในตอนแรก หากเด็กสะดุ้งหรือขยับตัวให้ยิ้มและสัมผัสตัวเด็ก",
        "ลดเสียงพูดคุยลงเรื่อยๆ จนให้อยู่ในระดับปกติ",
        "ใช้เสียงดนตรีหรือของเล่นที่มีเสียงเบาๆ เพื่อกระตุ้นการตอบสนองต่อเสียง",
      ],
    },
  ],
  "1-2เดือน": [
    {
      id: 4,
      itemNo: "ข้อที่ 4",
      category: "EL", // Expressive Language
      title: "ส่งเสียงอ้อแอ้",
      description: "เด็กทำเสียงอ้อแอ้ได้",
      howToTest:
        "สังเกตว่าเด็กส่งเสียงอ้อแอ้ในระหว่างทำการประเมิน หรือถามจากพ่อแม่ผู้ปกครอง",
      passCondition: "เด็กทำเสียงอ้อแอ้ได้",
      trainingMethods: [
        "อุ้มหรือสัมผัสตัวเด็กเบาๆ มองสบตา แล้วพูดคุยกับเด็กด้วยเสียงสูงๆ ต่ำๆ",
        "ให้เด็กสนใจและหยุดรอให้เด็กส่งเสียงอ้อแอ้ตอบ",
        "เมื่อเด็กออกเสียงได้ ให้ยื่นหน้าห่างจากเด็กเพิ่มขึ้นจนถึงประมาณ 60 ซม.",
        "ทำเสียงอู หรือ อือ หรือ อา ในลำคอให้เด็กได้ยิน หยุดฟังเพื่อรอจังหวะให้เด็กส่งเสียงตาม",
      ],
    },
    {
      id: 5,
      itemNo: "ข้อที่ 5",
      category: "PS", // Personal Social
      title: "มองจ้องหน้าได้นาน 1-2 วินาที",
      description: "เด็กสามารถมองจ้องหน้าได้อย่างน้อย 1 วินาที",
      howToTest:
        "อุ้มเด็กให้ห่างจากหน้าพ่อแม่ ผู้ปกครองหรือผู้ประเมินประมาณ 30 ซม. ยิ้มและพูดคุยกับเด็ก",
      passCondition: "เด็กสามารถมองจ้องหน้าได้อย่างน้อย 1 วินาที",
      trainingMethods: [
        "จัดให้เด็กอยู่ในท่านอนหงายหรืออุ้มเด็ก",
        "สบตาพูดคุย ส่งเสียง ยิ้ม หรือทำตำลักษณะต่างๆ เช่น ตาโต กะพริบตา เพื่อให้เด็กสนใจมอง",
        "ใช้การพูดคุยและยิ้มกับเด็กเป็นคำพูดสั้นๆ ซ้ำๆ ช้าๆ เช่น 'ว่าไงจ๊ะ.. (ชื่อลูก).. คนเก่ง'",
        "หยุดฟัง เพื่อรอจังหวะให้เด็กยิ้มหรือส่งเสียงตอบ",
      ],
    },
    {
      id: 6,
      itemNo: "ข้อที่ 6",
      category: "GM",
      title: "ท่านอนคว่ำ ยกศีรษะตั้งขึ้นได้ 45 องศา นาน 3 วินาที",
      description:
        "เด็กสามารถยกศีรษะขึ้นได้ 45 องศา นาน 3 วินาที อย่างน้อย 2 ครั้ง",
      howToTest:
        "จัดให้เด็กอยู่ในท่านอนคว่ำ ข้อศอกงอ มือทั้งสองข้างวางที่พื้น เขย่ากรุ๋งกริ๋งด้านหน้าเด็ก",
      passCondition:
        "เด็กสามารถยกศีรษะขึ้นได้ 45 องศา นาน 3 วินาที อย่างน้อย 2 ครั้ง",
      trainingMethods: [
        "จัดให้เด็กอยู่ในท่านอนคว่ำ ข้อศอกงอ",
        "ใช้หน้าและเสียงของพ่อแม่พูดคุยกับเด็กตรงหน้าเด็ก เมื่อเด็กมองตามค่อยๆ เคลื่อนหน้าขึ้นด้านบน",
        "เพื่อให้เด็กสนใจยกศีรษะ โดยมือยันพื้นไว้ แขนเหยียดตรงและหน้าอกพ้นพื้น",
        "ฝึกเพิ่มเติมโดยใช้ของเล่นที่มีสีสันสดใสกระตุ้นให้เด็กสนใจและมองตาม",
        "ใช้อุปกรณ์ที่มีสีและเสียง เช่น กรุ๋งกริ๋งทำด้วยพลาสติก/ผ้า ลูกบอลยางบีบ/สัตว์ยางบีบ",
      ],
    },
  ],
  "3-4เดือน": [
    {
      id: 7,
      itemNo: "ข้อที่ 7",
      category: "FM",
      title: "มองตามผ่านกึ่งกลางลำตัว",
      description:
        "เด็กมองตามลูกบอลผ้าสีแดง ผ่านจุดกึ่งกลางลำตัวได้ตลอด โดยไม่หันไปมองทางอื่น",
      howToTest:
        "จัดให้เด็กอยู่ในท่านอนหงาย ถือลูกบอลผ้าสีแดงห่างจากหน้าเด็ก 30 ซม. เคลื่อนลูกบอลผ่านจุดกึ่งกลางลำตัว",
      passCondition: "เด็กมองตามลูกบอลผ้าสีแดง ผ่านจุดกึ่งกลางลำตัวได้ตลอด",
      trainingMethods: [
        "จัดให้เด็กอยู่ในท่านอนหงาย ยื่นใบหน้าห่างจากหน้าเด็กประมาณ 20 ซม.",
        "กระตุ้นให้เด็กมองหน้าและเคลื่อนใบหน้าผ่านกึ่งกลางลำตัวเพื่อให้เด็กมองตาม",
        "ถ้าเด็กไม่มองให้ประคองหน้าเด็กให้หันมองตาม",
        "ใช้ของเล่นที่มีสีสดใสห่างจากหน้าเด็กประมาณ 20 ซม. กระตุ้นให้เด็กมองและเคลื่อนผ่านกึ่งกลางลำตัว",
        "เมื่อเด็กมองตามได้ดีแล้ว ควรเพิ่มระยะห่างของใบหน้าหรือของเล่นจนถึงระยะ 30 ซม.",
      ],
    },
    {
      id: 8,
      itemNo: "ข้อที่ 8",
      category: "RL",
      title: "มองหน้าผู้พูดคุยได้นาน 5 วินาที",
      description: "เด็กหันมามองหน้าผู้พูดได้อย่างน้อย 5 วินาที",
      howToTest:
        "จัดให้เด็กอยู่ในท่านอนหงายหรืออุ้มเด็กให้ใบหน้าผู้ประเมินห่างจากเด็กประมาณ 60 ซม. พูดคุยกับเด็ก",
      passCondition: "เด็กหันมามองหน้าผู้พูดได้อย่างน้อย 5 วินาที",
      trainingMethods: [
        "จัดให้เด็กอยู่ในท่านอนหงายหรืออุ้มเด็ก ให้หน้าห่างจากเด็กประมาณ 60 ซม.",
        "สบตาและพูดคุยหรือทำท่าทางให้เด็กสนใจ เช่น ทำตาโต ขยับริมฝีปาก ยิ้ม หัวเราะ",
        "หยิบของเล่นสีสดใสมาใกล้ๆ หน้า กระตุ้นให้เด็กมองของเล่นและมองหน้า เมื่อเด็กมองแล้วให้นำของเล่นออก",
        "วัตถุประสงค์: เสริมสร้างความสัมพันธ์ระหว่างเด็กกับพ่อแม่ผู้ปกครองหรือผู้ดูแลเด็ก",
      ],
    },
  ],
  "5-6เดือน": [
    {
      id: 9,
      itemNo: "ข้อที่ 9",
      category: "EL",
      title: "ทำเสียงในลำคอ เสียง อู หรือ อา หรือ อือ อย่างชัดเจน",
      description: "เด็กทำเสียงอู หรือ อือ หรือ อา อย่างชัดเจน",
      howToTest:
        "ฟังเสียงเด็กขณะประเมิน โดยอยู่ห่างจากเด็กประมาณ 60 ซม. หรือถามจากพ่อแม่ผู้ปกครอง",
      passCondition: "เด็กทำเสียงอู หรือ อือ หรือ อา อย่างชัดเจน",
      trainingMethods: [
        "จัดเด็กอยู่ในท่านอนหงาย หรืออุ้มเด็ก",
        "ยื่นหน้าเข้าไปหาเด็ก สบตาและพูดคุยให้เด็กสนใจ แล้วทำเสียงอู หรือ อือ หรือ อา ในลำคอให้เด็กได้ยิน",
        "หยุดฟังเพื่อรอจังหวะให้เด็กส่งเสียงตาม",
        "เมื่อเด็กออกเสียงได้ ให้ยื่นหน้าห่างจากเด็กเพิ่มขึ้นจนถึงประมาณ 60 ซม.",
      ],
    },
    {
      id: 10,
      itemNo: "ข้อที่ 10",
      category: "PS",
      title: "ยิ้มตอบหรือส่งเสียงตอบได้เมื่อพ่อแม่ยิ้มและพูดคุยด้วย",
      description: "เด็กสามารถยิ้มตอบหรือส่งเสียงตอบได้",
      howToTest:
        "จัดเด็กอยู่ในท่านอนหงายพร้อมก้มหน้าไปใกล้เด็ก ยิ้มและพูดคุยกับเด็ก โดยไม่แตะต้องตัวเด็ก",
      passCondition: "เด็กสามารถยิ้มตอบหรือส่งเสียงตอบได้",
      trainingMethods: [
        "อุ้มเด็กอยู่ในท่านอนหงาย มองตาเด็กและสัมผัสเบาๆ พร้อมกับพูดคุยกับเด็ก",
        "เป็นคำพูดสั้นๆ ซ้ำๆ ช้าๆ เช่น 'ว่าไงจ๊ะ.. (ชื่อลูก).. คนเก่ง' 'ยิ้มซิ' 'เด็กดี' 'แม่รักลูกนะ'",
        "หยุดฟัง เพื่อรอจังหวะให้เด็กยิ้มหรือส่งเสียงตอบ",
        "ใช้การแสดงออกทางหน้าที่หลากหลาย เช่น ยิ้ม หัวเราะ ทำหน้าตลก เพื่อกระตุ้นการตอบสนอง",
      ],
    },
  ],
};

export default function BabyProgressSection() {
  const [birthDay, setBirthDay] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [babyAge, setBabyAge] = useState(null);
  const [developmentStatus, setDevelopmentStatus] = useState(null);
  const [dspmData, setDspmData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

    // Check if the date is valid
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

  const getCurrentDevelopmentStage = (ageInDays) => {
    for (const [key, stage] of Object.entries(developmentalStages)) {
      if (ageInDays >= stage.minDays && ageInDays <= stage.maxDays) {
        return { key, ...stage };
      }
    }

    // If age is beyond our ranges, return the closest one
    if (ageInDays > 2190) {
      return { key: "5-6ปี", ...developmentalStages["5-6ปี"] };
    }

    return null;
  };

  const analyzeDevelopmentStatus = (ageInDays) => {
    const currentStage = getCurrentDevelopmentStage(ageInDays);
    if (!currentStage) return null;

    const milestones = developmentalMilestones[currentStage.key] || [];

    // Get previous stage milestones for comparison
    const stageKeys = Object.keys(developmentalStages);
    const currentIndex = stageKeys.indexOf(currentStage.key);
    const previousStages = stageKeys.slice(0, currentIndex);

    const completedMilestones = [];
    previousStages.forEach((stageKey) => {
      const stageMilestones = developmentalMilestones[stageKey] || [];
      completedMilestones.push(...stageMilestones);
    });

    return {
      currentStage,
      currentMilestones: milestones,
      completedMilestones,
      totalCompleted: completedMilestones.length,
      totalCurrent: milestones.length,
    };
  };

  // Load DSPM data on component mount
  useEffect(() => {
    const loadDspmData = async () => {
      try {
        const response = await fetch("/DSPM_detailed.json");
        if (!response.ok) {
          throw new Error("Failed to load DSPM data");
        }
        const data = await response.json();
        setDspmData(data);
      } catch (error) {
        console.error("Error loading DSPM data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDspmData();
  }, []);

  useEffect(() => {
    if (birthDay && birthMonth && birthYear) {
      const age = calculateAge(birthDay, birthMonth, birthYear);
      setBabyAge(age);

      if (age && age.totalDays >= 0) {
        const status = analyzeDevelopmentStatus(age.totalDays);
        setDevelopmentStatus(status);
      }
    } else {
      setBabyAge(null);
      setDevelopmentStatus(null);
    }
  }, [birthDay, birthMonth, birthYear]);

  const getCategoryName = (category) => {
    const categories = {
      GM: "การเคลื่อนไหวขนาดใหญ่",
      FM: "การเคลื่อนไหวขนาดเล็ก",
      EL: "การพูด",
      RL: "การฟัง",
      PS: "สังคมและอารมณ์",
    };
    return categories[category] || category;
  };

  const getCategoryColor = (category) => {
    const colors = {
      GM: "bg-blue-500",
      FM: "bg-green-500",
      EL: "bg-purple-500",
      RL: "bg-orange-500",
      PS: "bg-pink-500",
    };
    return colors[category] || "bg-gray-500";
  };

  // Show loading state while DSPM data is being loaded
  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-16 relative">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-slate-600 mt-4">กำลังโหลดข้อมูล...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 relative">
      {/* Enhanced section header */}
      <div className="text-center mb-12">
        <h1 className="animate-pulse text-4xl pt-1 sm:text-5xl font-bold bg-gradient-to-r from-sky-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent mb-4">
          ตรวจพัฒนาการเด็ก
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          ตรวจสอบพัฒนาการของลูกน้อยตามเกณฑ์มาตรฐาน DSPM (Developmental
          Surveillance and Promotion Manual)
          โดยใส่วันเกิดเพื่อดูพัฒนาการที่เหมาะสมกับช่วงอายุ
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

      {/* Development Status */}
      {developmentStatus && (
        <div className="space-y-8">
          {/* Current Stage Overview */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">🎯 ช่วงพัฒนาการปัจจุบัน</h2>
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="text-xl font-semibold mb-2">
                {developmentStatus.currentStage.title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {developmentStatus.totalCompleted}
                  </div>
                  <div className="text-sm text-green-100">
                    พัฒนาการที่ผ่านมาแล้ว
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {developmentStatus.totalCurrent}
                  </div>
                  <div className="text-sm text-green-100">
                    พัฒนาการที่ควรมีในวัยนี้
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{babyAge.displayAge}</div>
                  <div className="text-sm text-green-100">อายุปัจจุบัน</div>
                </div>
              </div>
            </div>
          </div>

          {/* Current Milestones */}
          {developmentStatus.currentMilestones.length > 0 && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">
                📋 พัฒนาการที่ควรมีในวัยนี้
              </h2>
              <div className="space-y-4">
                {developmentStatus.currentMilestones.map((milestone) => (
                  <div
                    key={milestone.id}
                    className="border border-slate-200 rounded-lg p-4"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <div className="inline-block px-3 py-1 text-sm font-bold text-indigo-700 bg-indigo-100 rounded-lg">
                          {milestone.itemNo}
                        </div>
                        <div
                          className={`inline-block px-2 py-1 text-xs font-semibold text-white rounded ${getCategoryColor(
                            milestone.category
                          )}`}
                        >
                          {getCategoryName(milestone.category)}
                        </div>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-slate-600 mb-3">
                      {milestone.description}
                    </p>
                    <div className="bg-slate-50 rounded-lg p-3 mb-3">
                      <h4 className="font-semibold text-slate-700 mb-2">
                        วิธีการทดสอบ:
                      </h4>
                      <p className="text-sm text-slate-600">
                        {milestone.howToTest}
                      </p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3 mb-3">
                      <h4 className="font-semibold text-green-700 mb-2">
                        เกณฑ์ผ่าน:
                      </h4>
                      <p className="text-sm text-green-600">
                        {milestone.passCondition}
                      </p>
                    </div>
                    {milestone.trainingMethods &&
                      milestone.trainingMethods.length > 0 && (
                        <div className="bg-blue-50 rounded-lg p-3">
                          <h4 className="font-semibold text-blue-700 mb-2">
                            🎯 วิธีการฝึกทักษะ:
                          </h4>
                          <ul className="text-sm text-blue-600 space-y-1">
                            {milestone.trainingMethods.map((method, index) => (
                              <li key={index} className="flex items-start">
                                <span className="inline-block w-4 h-4 rounded-full bg-blue-200 text-blue-700 text-xs flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                  {index + 1}
                                </span>
                                <span>{method}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Previous Milestones (Summary) */}
          {developmentStatus.completedMilestones.length > 0 && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">
                ✅ พัฒนาการที่ผ่านมาแล้ว
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {developmentStatus.completedMilestones.map((milestone) => (
                  <div
                    key={milestone.id}
                    className="border border-green-200 bg-green-50 rounded-lg p-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="inline-block px-2 py-1 text-xs font-bold text-indigo-700 bg-indigo-100 rounded">
                        {milestone.itemNo}
                      </div>
                      <div
                        className={`inline-block px-2 py-1 text-xs font-semibold text-white rounded ${getCategoryColor(
                          milestone.category
                        )}`}
                      >
                        {getCategoryName(milestone.category)}
                      </div>
                    </div>
                    <h3 className="text-sm font-semibold text-slate-800">
                      {milestone.title}
                    </h3>
                    <div className="mt-2 text-green-600 text-sm flex items-center">
                      <span className="mr-2">✓</span>
                      ควรมีแล้ว
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Important Notes */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-amber-800 mb-3">
              📝 คำแนะนำสำคัญ
            </h3>
            <ul className="text-amber-700 space-y-2 text-sm">
              <li>
                • การพัฒนาการของเด็กแต่ละคนอาจแตกต่างกัน
                ข้อมูลนี้เป็นเพียงแนวทางเบื้องต้น
              </li>
              <li>
                • หากเด็กยังไม่ผ่านเกณฑ์พัฒนาการบางข้อ
                ควรใช้วิธีการฝึกทักษะที่แนะนำและสังเกตอย่างต่อเนื่อง
              </li>
              <li>
                • 🎯 วิธีการฝึกทักษะที่ระบุไว้เป็นแนวทางที่พัฒนาจากมาตรฐาน DSPM
                สามารถปฏิบัติได้ที่บ้านโดยพ่อแม่หรือผู้ดูแลเด็ก
              </li>
              <li>
                • การฝึกซ้อมควรทำอย่างสม่ำเสมอ อดทน และให้กำลังใจเด็ก
                เพื่อพัฒนาทักษะตามวัย
              </li>
              <li>
                • หากมีข้อสงสัยหรือกังวลเกี่ยวกับพัฒนาการ
                ควรปรึกษาแพทย์หรือผู้เชี่ยวชาญ
              </li>
              <li>
                •
                การกระตุ้นพัฒนาการอย่างสม่ำเสมอจะช่วยให้เด็กเติบโตอย่างเต็มศักยภาพ
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

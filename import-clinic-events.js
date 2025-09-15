const fs = require("fs");

// Thai month names to numbers mapping
const thaiMonths = {
  มกราคม: 1,
  กุมภาพันธ์: 2,
  มีนาคม: 3,
  เมษายน: 4,
  พฤษภาคม: 5,
  มิถุนายน: 6,
  กรกฎาคม: 7,
  สิงหาคม: 8,
  กันยายน: 9,
  ตุลาคม: 10,
  พฤศจิกายน: 11,
  ธันวาคม: 12,
};

// Convert Buddhist year to Gregorian year
function buddhistToGregorian(buddhistYear) {
  return parseInt(buddhistYear.replace("ปีพ.ศ. ", "")) - 543;
}

// Parse time string to get start and end times
function parseTimeString(timeStr) {
  if (!timeStr || timeStr === "หยุด") return { start: null, end: null };

  const times = timeStr.split("-");
  if (times.length === 2) {
    return {
      start: times[0].trim(),
      end: times[1].trim(),
    };
  }
  return { start: timeStr, end: null };
}

// Read and parse the clinic data
function parseClinicData() {
  try {
    const data = JSON.parse(
      fs.readFileSync("/Users/zergy-macair/Desktop/dataclinic.json", "utf8")
    );
    const events = [];

    for (const [buddhistYear, yearData] of Object.entries(data)) {
      const gregorianYear = buddhistToGregorian(buddhistYear);

      for (const [thaiMonth, monthData] of Object.entries(yearData)) {
        const monthNumber = thaiMonths[thaiMonth];

        if (!monthNumber) {
          console.warn(`Unknown month: ${thaiMonth}`);
          continue;
        }

        for (const [clinicType, clinicData] of Object.entries(monthData)) {
          const timeInfo = parseTimeString(clinicData.เวลา);

          for (const day of clinicData.วัน) {
            // Skip holiday entries
            if (day === "หยุด") continue;

            // Convert day to number if it's not already
            const dayNumber = typeof day === "number" ? day : parseInt(day);
            if (isNaN(dayNumber)) continue;

            // Create date in YYYY-MM-DD format
            const eventDate = `${gregorianYear}-${monthNumber
              .toString()
              .padStart(2, "0")}-${dayNumber.toString().padStart(2, "0")}`;

            // Create event object
            const event = {
              title: clinicType,
              description: `คลินิกประจำ - ${clinicType}`,
              event_date: eventDate,
              event_time: timeInfo.start,
              end_time: timeInfo.end,
              location: "โรงพยาบาลส่งเสริมสุขภาพตำบลนาคำ",
              category: "คลินิกประจำ",
              is_featured: false,
              is_active: true,
            };

            events.push(event);
          }
        }
      }
    }

    return events;
  } catch (error) {
    console.error("Error parsing clinic data:", error);
    return [];
  }
}

// Generate the events and output as JSON
const events = parseClinicData();
console.log(`Generated ${events.length} events`);
console.log("Sample event:", events[0]);

// Write to file for inspection
fs.writeFileSync("clinic-events.json", JSON.stringify(events, null, 2));
console.log("Events written to clinic-events.json");

module.exports = events;

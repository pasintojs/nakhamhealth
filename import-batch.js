const fs = require("fs");

async function importEventsBatch() {
  try {
    const events = JSON.parse(fs.readFileSync("clinic-events.json", "utf8"));

    // Split into smaller batches to avoid SQL length limits
    const batchSize = 50;
    const batches = [];
    for (let i = 0; i < events.length; i += batchSize) {
      batches.push(events.slice(i, i + batchSize));
    }

    console.log(`Total events: ${events.length}`);
    console.log(`Number of batches: ${batches.length}`);

    // Generate individual INSERT statements for first batch
    let batch1SQL = "";
    for (const event of batches[0]) {
      const values = [
        `'${event.title.replace(/'/g, "''")}'`,
        `'${event.description.replace(/'/g, "''")}'`,
        `'${event.event_date}'`,
        event.event_time ? `'${event.event_time}'` : "NULL",
        event.end_time ? `'${event.end_time}'` : "NULL",
        `'${event.location.replace(/'/g, "''")}'`,
        `'${event.category.replace(/'/g, "''")}'`,
        event.is_featured,
        event.is_active,
        "NOW()",
        "NOW()",
      ].join(", ");

      batch1SQL += `INSERT INTO events (title, description, event_date, event_time, end_time, location, category, is_featured, is_active, created_at, updated_at) VALUES (${values});\n`;
    }

    fs.writeFileSync("batch1.sql", batch1SQL);
    console.log(`Batch 1: ${batches[0].length} events`);
    console.log("Batch 1 SQL written to batch1.sql");
  } catch (error) {
    console.error("Error:", error);
  }
}

importEventsBatch();

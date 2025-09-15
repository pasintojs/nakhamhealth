const fs = require("fs");

async function generateInsertSQL() {
  try {
    const events = JSON.parse(fs.readFileSync("clinic-events.json", "utf8"));

    // Generate SQL INSERT statements
    let sql = "";

    for (const event of events) {
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

      sql += `INSERT INTO events (title, description, event_date, event_time, end_time, location, category, is_featured, is_active, created_at, updated_at) VALUES (${values});\n`;
    }

    fs.writeFileSync("import-events.sql", sql);
    console.log(`Generated SQL file with ${events.length} INSERT statements`);

    return sql;
  } catch (error) {
    console.error("Error generating SQL:", error);
    return "";
  }
}

generateInsertSQL();

const fs = require("fs");

// Read the transformed clinic events
const events = JSON.parse(fs.readFileSync("./clinic-events.json", "utf8"));

console.log(`Total events to import: ${events.length}`);

// Function to generate SQL for a batch of events
function generateBatchSQL(eventsBatch, batchNumber) {
  const sqlStatements = eventsBatch.map((event) => {
    const {
      title,
      description,
      event_date,
      event_time,
      end_time,
      location,
      category,
    } = event;

    return `INSERT INTO events (title, description, event_date, event_time, end_time, location, category, is_featured, is_active, created_at, updated_at) VALUES ('${title}', '${description}', '${event_date}', '${event_time}', '${end_time}', '${location}', '${category}', false, true, NOW(), NOW());`;
  });

  const batchSQL = sqlStatements.join("\n");
  const filename = `batch-${batchNumber.toString().padStart(2, "0")}.sql`;

  fs.writeFileSync(filename, batchSQL);
  console.log(`Generated ${filename} with ${eventsBatch.length} events`);

  return filename;
}

// Split events into batches of 10 (smaller batches for reliability)
const batchSize = 10;
const batches = [];

for (let i = 0; i < events.length; i += batchSize) {
  batches.push(events.slice(i, i + batchSize));
}

console.log(
  `Split into ${batches.length} batches of ~${batchSize} events each`
);

// Generate SQL files for each batch
batches.forEach((batch, index) => {
  generateBatchSQL(batch, index + 1);
});

console.log("Batch SQL files generated successfully!");
console.log("Files created:");
for (let i = 1; i <= batches.length; i++) {
  console.log(`- batch-${i.toString().padStart(2, "0")}.sql`);
}

const fs = require("fs");
const path = require("path");

// Function to simulate Supabase MCP call (since we need to use MCP in practice)
function logBatchForMCP(batchNumber, sqlContent) {
  console.log(`\n=== BATCH ${batchNumber} ===`);
  console.log("Copy this SQL to execute via MCP:");
  console.log("---");
  console.log(sqlContent);
  console.log("---");
  console.log(`Batch ${batchNumber} ready for execution\n`);
}

// Find all batch files
const batchFiles = fs
  .readdirSync(".")
  .filter((file) => file.startsWith("batch-") && file.endsWith(".sql"))
  .sort();

console.log(`Found ${batchFiles.length} batch files to process`);

// Process each batch file
batchFiles.forEach((file, index) => {
  const batchNumber = index + 1;
  const sqlContent = fs.readFileSync(file, "utf8").trim();

  // Log each batch for manual MCP execution
  logBatchForMCP(batchNumber, sqlContent);

  // Also write to a consolidated file for reference
  if (index === 0) {
    fs.writeFileSync(
      "all-batches-consolidated.sql",
      `-- BATCH ${batchNumber}\n${sqlContent}\n\n`
    );
  } else {
    fs.appendFileSync(
      "all-batches-consolidated.sql",
      `-- BATCH ${batchNumber}\n${sqlContent}\n\n`
    );
  }
});

console.log("All batches processed!");
console.log("Execute each batch via MCP Supabase one by one.");
console.log("Consolidated file saved as: all-batches-consolidated.sql");

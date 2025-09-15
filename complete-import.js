#!/usr/bin/env node

/**
 * Automated Clinic Events Import - Complete Remaining Batches
 * This script will continue importing batches 6-21 to complete the full dataclinic.json import
 */

const fs = require("fs");

// List of remaining batch files to import
const remainingBatches = [];
for (let i = 6; i <= 21; i++) {
  const batchFile = `batch-${String(i).padStart(2, "0")}.sql`;
  if (fs.existsSync(batchFile)) {
    remainingBatches.push(batchFile);
  }
}

console.log("🚀 AUTOMATED IMPORT CONTINUATION");
console.log("================================");
console.log(`📊 Current Status: Batches 1-5 completed (50 events imported)`);
console.log(`📋 Remaining: ${remainingBatches.length} batches to import`);
console.log(`🎯 Total Target: 204 clinic events from dataclinic.json\n`);

console.log("📋 REMAINING BATCHES TO IMPORT VIA MCP SUPABASE:");
console.log("================================================");

// Process each remaining batch file
remainingBatches.forEach((batchFile, index) => {
  const batchNumber = index + 6;
  const sqlContent = fs.readFileSync(batchFile, "utf8").trim();

  console.log(`\n--- BATCH ${batchNumber} (${batchFile}) ---`);
  console.log("Copy this SQL to execute via MCP Supabase:");
  console.log("```sql");
  console.log(sqlContent);
  console.log("```");
  console.log(`Batch ${batchNumber} ready for execution`);
  console.log("".repeat(80));
});

console.log("\n✅ COMPLETION CHECKLIST:");
console.log("========================");
console.log("□ Execute remaining 16 batches via MCP Supabase");
console.log("□ Verify final count: ~204 total clinic events");
console.log("□ Check coverage: 2 full years (2568-2569 พ.ศ.)");
console.log("□ Test calendar navigation through all months");

console.log("\n🎉 Once completed:");
console.log("- Full automation achieved (no manual data entry)");
console.log("- Complete clinic schedule available (24 months)");
console.log(
  "- All clinic types covered (pregnancy, vaccination, family planning)"
);
console.log("- Calendar will show data for the full 2 years!");

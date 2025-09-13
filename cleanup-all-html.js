// Comprehensive script to fix all malformed HTML content in news database
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://haflbpiaslmgpvndmyfk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhhZmxicGlhc2xtZ3B2bmRteWZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3ODgyNjAsImV4cCI6MjA3MjM2NDI2MH0.AZPbICa6z6mKBofqb8t79fD558YY3YWp_PZeZCCbKlo";

const supabase = createClient(supabaseUrl, supabaseKey);

// Function to comprehensively fix malformed HTML content
function fixAllHTMLIssues(content) {
  if (!content) return content;

  let fixed = content;

  // Step 1: Remove orphaned closing span tags
  fixed = fixed.replace(/<\/span>\s*(?=<br>|<p>|\s|$)/g, "");

  // Step 2: Fix misplaced span closing tags that appear after <br> tags
  fixed = fixed.replace(/(<br>)<\/span>/g, "</span>$1");

  // Step 3: Fix the pattern where </span> appears in wrong places
  fixed = fixed.replace(/<br><\/span>\s+([^<]+)/g, "</span><br>$1");

  // Step 4: Clean up malformed span structures
  fixed = fixed.replace(
    /(<span[^>]*>[^<]*)<br>([^<]*)<\/span>([^<]*<br>)/g,
    "$1</span><br>$2<br>$3"
  );

  // Step 5: Remove any standalone closing span tags
  fixed = fixed.replace(/^\s*<\/span>\s*|\s*<\/span>\s*$/g, "");

  // Step 6: Ensure proper paragraph structure
  fixed = fixed.replace(/(<span[^>]*>[^<]*?)(<\/p>)/g, "$1</span>$2");

  // Step 7: Clean up multiple consecutive <br> tags within paragraphs
  fixed = fixed.replace(/(<br>\s*){3,}/g, "<br><br>");

  // Step 8: Fix broken nested structures
  fixed = fixed.replace(
    /<p>([^<]*<span[^>]*>[^<]*)<br><\/span>([^<]*)<\/p>/g,
    "<p>$1</span><br>$2</p>"
  );

  return fixed;
}

async function fixAllNewsContent() {
  console.log("🔧 Starting comprehensive HTML cleanup for all news content...");

  try {
    // Get all news items
    const { data: newsItems, error: fetchError } = await supabase
      .from("news")
      .select("id, title, full_content");

    if (fetchError) {
      console.error("❌ Error fetching news items:", fetchError.message);
      return;
    }

    console.log(`📰 Found ${newsItems.length} news items to process`);

    let fixedCount = 0;
    let processedCount = 0;

    for (const item of newsItems) {
      processedCount++;

      if (!item.full_content) {
        console.log(`⏭️  Skipping ${item.title} (no content)`);
        continue;
      }

      const originalContent = item.full_content;
      const fixedContent = fixAllHTMLIssues(originalContent);

      // Check if any changes were made
      if (fixedContent !== originalContent) {
        console.log(`🔧 Fixing: ${item.title}`);
        console.log(`   Before: ${originalContent.substring(0, 100)}...`);
        console.log(`   After:  ${fixedContent.substring(0, 100)}...`);

        // Update the content
        const { error: updateError } = await supabase
          .from("news")
          .update({ full_content: fixedContent })
          .eq("id", item.id);

        if (updateError) {
          console.error(
            `❌ Error updating ${item.title}:`,
            updateError.message
          );
        } else {
          console.log(`✅ Successfully fixed: ${item.title}`);
          fixedCount++;
        }
      } else {
        console.log(`✓ No issues found in: ${item.title}`);
      }

      // Progress indicator
      if (processedCount % 5 === 0) {
        console.log(
          `📊 Progress: ${processedCount}/${newsItems.length} processed, ${fixedCount} fixed`
        );
      }
    }

    console.log("🎉 Cleanup completed!");
    console.log(
      `📊 Summary: ${processedCount} items processed, ${fixedCount} items fixed`
    );
  } catch (error) {
    console.error("❌ Cleanup failed:", error.message);
  }
}

fixAllNewsContent().then(() => process.exit());

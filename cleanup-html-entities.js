// Utility script to clean up HTML entities in existing news content
// Run this once to clean up any existing &nbsp; entities in the database

const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://haflbpiaslmgpvndmyfk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhhZmxicGlhc2xtZ3B2bmRteWZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3ODgyNjAsImV4cCI6MjA3MjM2NDI2MH0.AZPbICa6z6mKBofqb8t79fD558YY3YWp_PZeZCCbKlo";

const supabase = createClient(supabaseUrl, supabaseKey);

// Function to clean HTML entities
function cleanHTMLEntities(content) {
  if (!content) return content;

  return content
    .replace(/&nbsp;/g, " ") // Convert &nbsp; to regular space
    .replace(/&amp;/g, "&") // Convert &amp; to &
    .replace(/&lt;/g, "<") // Convert &lt; to <
    .replace(/&gt;/g, ">") // Convert &gt; to >
    .replace(/&quot;/g, '"') // Convert &quot; to "
    .replace(/&#39;/g, "'") // Convert &#39; to '
    .replace(/&apos;/g, "'"); // Convert &apos; to '
}

async function cleanupNewsContent() {
  console.log("🧹 Starting cleanup of HTML entities in news content...");

  try {
    // Fetch all news items
    const { data: newsItems, error: fetchError } = await supabase
      .from("news")
      .select("id, title, description, full_content");

    if (fetchError) {
      console.error("❌ Error fetching news items:", fetchError.message);
      return;
    }

    console.log(`📰 Found ${newsItems.length} news items to check`);

    let updatedCount = 0;

    for (const item of newsItems) {
      let needsUpdate = false;
      const updates = {};

      // Check and clean title
      if (item.title && item.title.includes("&")) {
        const cleanTitle = cleanHTMLEntities(item.title);
        if (cleanTitle !== item.title) {
          updates.title = cleanTitle;
          needsUpdate = true;
        }
      }

      // Check and clean description
      if (item.description && item.description.includes("&")) {
        const cleanDescription = cleanHTMLEntities(item.description);
        if (cleanDescription !== item.description) {
          updates.description = cleanDescription;
          needsUpdate = true;
        }
      }

      // Check and clean full_content
      if (item.full_content && item.full_content.includes("&")) {
        const cleanContent = cleanHTMLEntities(item.full_content);
        if (cleanContent !== item.full_content) {
          updates.full_content = cleanContent;
          needsUpdate = true;
        }
      }

      // Update if needed
      if (needsUpdate) {
        const { error: updateError } = await supabase
          .from("news")
          .update(updates)
          .eq("id", item.id);

        if (updateError) {
          console.error(
            `❌ Error updating news item ${item.id}:`,
            updateError.message
          );
        } else {
          console.log(
            `✅ Updated news item: ${item.title?.substring(0, 50)}...`
          );
          updatedCount++;
        }
      }
    }

    console.log(`🎉 Cleanup completed! Updated ${updatedCount} news items.`);
  } catch (error) {
    console.error("❌ Cleanup failed:", error.message);
  }
}

cleanupNewsContent().then(() => process.exit());

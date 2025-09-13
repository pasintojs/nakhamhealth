// Fix malformed HTML content in database
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://haflbpiaslmgpvndmyfk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhhZmxicGlhc2xtZ3B2bmRteWZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3ODgyNjAsImV4cCI6MjA3MjM2NDI2MH0.AZPbICa6z6mKBofqb8t79fD558YY3YWp_PZeZCCbKlo";

const supabase = createClient(supabaseUrl, supabaseKey);

// Function to fix malformed HTML content
function fixMalformedHTML(content) {
  if (!content) return content;

  let fixed = content;

  // Remove orphaned closing span tags followed by <br> or whitespace
  fixed = fixed.replace(/<\/span>\s*(<br>|\s)/g, "$1");

  // Fix misplaced span closing tags that appear after <br> tags
  fixed = fixed.replace(/(<br>)<\/span>/g, "</span>$1");

  // Fix the specific pattern: <br></span>    text<br>
  fixed = fixed.replace(/<br><\/span>\s+([^<]+)<br>/g, "</span><br>    $1<br>");

  // Remove any standalone closing span tags at the start or end
  fixed = fixed.replace(/^<\/span>|<\/span>$/g, "");

  // Clean up any unclosed span tags at paragraph ends
  fixed = fixed.replace(/(<span[^>]*>[^<]*)<\/p>/g, "$1</span></p>");

  return fixed;
}

async function fixSpecificNews() {
  console.log(
    "🔧 Fixing malformed HTML for news ID: 96e56b04-e8b3-49f6-acbc-4ff7e8b476f1"
  );

  try {
    // Get the current content
    const { data: newsItem, error: fetchError } = await supabase
      .from("news")
      .select("full_content")
      .eq("id", "96e56b04-e8b3-49f6-acbc-4ff7e8b476f1")
      .single();

    if (fetchError) {
      console.error("❌ Error fetching:", fetchError.message);
      return;
    }

    console.log("📄 Original content:");
    console.log(newsItem.full_content);
    console.log("---");

    const fixedContent = fixMalformedHTML(newsItem.full_content);

    console.log("✅ Fixed content:");
    console.log(fixedContent);
    console.log("---");

    // Update the content
    const { error: updateError } = await supabase
      .from("news")
      .update({ full_content: fixedContent })
      .eq("id", "96e56b04-e8b3-49f6-acbc-4ff7e8b476f1");

    if (updateError) {
      console.error("❌ Error updating:", updateError.message);
    } else {
      console.log("🎉 Successfully fixed the content!");
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

fixSpecificNews().then(() => process.exit());

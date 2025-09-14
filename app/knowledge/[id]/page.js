import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import NewsImageSlideshow from "../../components/NewsImageSlideshow";

async function getKnowledgeItem(id) {
  const { data: knowledgeItem, error } = await supabase
    .from("knowledge")
    .select("*")
    .eq("id", id)
    .eq("is_published", true)
    .single();

  if (error) {
    console.error("Error fetching knowledge item:", error);
    return null;
  }

  return knowledgeItem;
}

async function getRelatedKnowledge(category, currentId) {
  const { data: relatedKnowledge, error } = await supabase
    .from("knowledge")
    .select("*")
    .eq("category", category)
    .eq("is_published", true)
    .neq("id", currentId)
    .order("published_date", { ascending: false })
    .limit(3);

  if (error) {
    console.error("Error fetching related knowledge:", error);
    return [];
  }

  return relatedKnowledge;
}

export default async function KnowledgeDetailPage({ params }) {
  const { id } = await params;
  const knowledgeItem = await getKnowledgeItem(id);

  if (!knowledgeItem) {
    notFound();
  }

  const relatedKnowledge = await getRelatedKnowledge(
    knowledgeItem.category,
    knowledgeItem.id
  );

  // Function to process plain text content (title, description) - no HTML formatting
  const processPlainTextForDisplay = (content) => {
    if (!content) return "";

    // For plain text, just escape HTML entities and add word-break opportunities
    let processedContent = content
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

    // Add word-break opportunities for strings longer than 15 characters without spaces
    return processedContent.replace(/(\S{15,})/g, (match) => {
      // Insert zero-width spaces every 15 characters to allow breaking
      return match.replace(/(.{15})/g, "$1​"); // ​ is a zero-width space (U+200B)
    });
  };

  // Function to process full content with HTML formatting for line breaks
  const processContentForDisplay = (content) => {
    if (!content) return "";

    // Check if content is plain text (no HTML tags) or HTML
    const hasHtmlTags = /<[^>]+>/.test(content);

    let processedContent;

    if (hasHtmlTags) {
      // This is HTML content from old rich text editor
      // First, decode HTML entities
      processedContent = content
        .replace(/&nbsp;/g, " ") // Convert &nbsp; to regular space
        .replace(/&amp;/g, "&") // Convert &amp; to &
        .replace(/&lt;/g, "<") // Convert &lt; to <
        .replace(/&gt;/g, ">") // Convert &gt; to >
        .replace(/&quot;/g, '"') // Convert &quot; to "
        .replace(/&#39;/g, "'") // Convert &#39; to '
        .replace(/&apos;/g, "'"); // Convert &apos; to '

      // Clean up malformed HTML structure from old content
      // Remove orphaned closing span tags
      processedContent = processedContent.replace(
        /<\/span>\s*(<br>|\s)/g,
        "$1"
      );

      // Fix misplaced span closing tags that appear after <br> tags
      processedContent = processedContent.replace(
        /(<br>)<\/span>/g,
        "</span>$1"
      );

      // Ensure span tags are properly closed within the same paragraph
      processedContent = processedContent.replace(
        /<p>([^<]*<span[^>]*>[^<]*)<br>([^<]*)<\/span>/g,
        "<p>$1</span><br>$2"
      );

      // Remove any standalone closing span tags
      processedContent = processedContent.replace(/^<\/span>|<\/span>$/g, "");

      // Clean up any unclosed span tags at paragraph ends
      processedContent = processedContent.replace(
        /(<span[^>]*>[^<]*)<\/p>/g,
        "$1</span></p>"
      );
    } else {
      // This is plain text content from new textarea editor
      // First, normalize line breaks (convert \r\n to \n)
      processedContent = content.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

      // Escape any HTML entities
      processedContent = processedContent
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

      // Split content into paragraphs based on double line breaks
      // Use a more robust regex that handles different amounts of whitespace
      const paragraphs = processedContent
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter((p) => p.length > 0);

      if (paragraphs.length > 1) {
        // Multiple paragraphs
        processedContent = paragraphs
          .map((paragraph) => {
            // Convert single line breaks within paragraphs to <br> tags
            const formattedParagraph = paragraph.replace(/\n/g, "<br>");
            return `<p>${formattedParagraph}</p>`;
          })
          .join("");
      } else if (paragraphs.length === 1) {
        // Single paragraph, just convert line breaks to <br> tags
        processedContent = `<p>${paragraphs[0].replace(/\n/g, "<br>")}</p>`;
      } else {
        // Empty content
        processedContent = "<p></p>";
      }
    }

    // Add word-break opportunities for strings longer than 15 characters without spaces
    return processedContent.replace(/(\S{15,})/g, (match) => {
      // Insert zero-width spaces every 15 characters to allow breaking
      return match.replace(/(.{15})/g, "$1​"); // ​ is a zero-width space (U+200B)
    });
  };

  const processedContent = processContentForDisplay(
    knowledgeItem.full_content || ""
  );
  const processedTitle = processPlainTextForDisplay(knowledgeItem.title || "");
  const processedDescription = processPlainTextForDisplay(
    knowledgeItem.description || ""
  );

  return (
    <div className="min-h-screen text-slate-900 bg-[radial-gradient(1200px_600px_at_80%_-10%,#e0f2fe_10%,transparent_60%),linear-gradient(to_bottom,#ffffff,rgba(224,242,254,0.3))] overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-600 mb-8 overflow-hidden">
          <Link href="/" className="hover:text-sky-600 transition-colors">
            หน้าแรก
          </Link>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
          <Link
            href="/knowledge"
            className="hover:text-sky-600 transition-colors"
          >
            ความรู้เพื่อสุขภาพ
          </Link>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
          <span className="text-slate-800 font-medium break-words">
            {processedTitle}
          </span>
        </nav>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="bg-gradient-to-r from-sky-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
              {knowledgeItem.category}
            </span>
            <div className="flex items-center gap-2 text-slate-600">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>
                {new Date(knowledgeItem.published_date).toLocaleDateString(
                  "th-TH",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>อ่าน {knowledgeItem.read_time}</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4 leading-tight break-words hyphens-auto">
            {processedTitle}
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed mb-6 break-words hyphens-auto">
            {processedDescription}
          </p>

          <div className="flex items-center justify-between border-b border-slate-200 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-slate-800">
                  {knowledgeItem.author}
                </p>
                <p className="text-sm text-slate-600">เจ้าหน้าที่สาธารณสุข</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                  />
                </svg>
                <span>แชร์</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                  />
                </svg>
                <span>บันทึก</span>
              </button>
            </div>
          </div>
        </header>

        {/* Featured Images */}
        <div className="mb-8">
          {knowledgeItem.images && knowledgeItem.images.length > 0 ? (
            <NewsImageSlideshow
              images={knowledgeItem.images}
              alt={knowledgeItem.title}
            />
          ) : knowledgeItem.image_url &&
            knowledgeItem.image_url.trim() !== "" ? (
            <div className="relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={knowledgeItem.image_url}
                alt={knowledgeItem.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          ) : null}
        </div>

        {/* Article Content */}
        <article className="mb-12">
          <div
            className="prose prose-lg max-w-none text-slate-700 leading-relaxed space-y-6 break-words hyphens-auto
                       prose-h3:text-2xl prose-h3:font-bold prose-h3:text-slate-800 prose-h3:mb-4 prose-h3:mt-8 prose-h3:break-words
                       prose-h4:text-xl prose-h4:font-semibold prose-h4:text-slate-800 prose-h4:mb-3 prose-h4:mt-6 prose-h4:break-words
                       prose-p:mb-4 prose-p:leading-relaxed prose-p:break-words prose-p:hyphens-auto
                       prose-ul:space-y-2 prose-li:text-slate-700 prose-li:break-words
                       prose-strong:text-slate-900 prose-strong:font-semibold prose-strong:break-words
                       [&>*]:max-w-full [&>*]:overflow-wrap-anywhere"
            style={{
              wordWrap: "break-word",
              overflowWrap: "anywhere",
              wordBreak: "break-word",
              hyphens: "auto",
            }}
            dangerouslySetInnerHTML={{ __html: processedContent }}
          />
        </article>

        {/* Tags */}
        {knowledgeItem.tags && knowledgeItem.tags.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-8">
            <span className="text-sm font-semibold text-slate-600 mr-2">
              แท็ก:
            </span>
            {knowledgeItem.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-sky-50 text-sky-700 rounded-full text-sm font-medium hover:bg-sky-100 cursor-pointer transition-colors break-words"
              >
                #{processPlainTextForDisplay(tag)}
              </span>
            ))}
          </div>
        )}

        {/* Related Knowledge */}
        {relatedKnowledge.length > 0 && (
          <section className="border-t border-slate-200 pt-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-8">
              ความรู้ที่เกี่ยวข้อง
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedKnowledge.map((item) => (
                <Link
                  key={item.id}
                  href={`/knowledge/${item.id}`}
                  className="group bg-white/90 backdrop-blur-sm rounded-xl shadow-md border border-cyan-200/50 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative h-32 overflow-hidden">
                    {(item.images && item.images.length > 0) ||
                    item.image_url ||
                    item.image ? (
                      <Image
                        src={
                          item.images && item.images.length > 0
                            ? item.images[0]
                            : item.image_url ||
                              item.image ||
                              "/images/about-1.svg"
                        }
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-sky-100 to-emerald-100 flex items-center justify-center">
                        <svg
                          className="w-12 h-12 text-sky-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-sky-600 font-semibold">
                      {item.category}
                    </span>
                    <h3 className="font-bold text-slate-800 mt-1 mb-2 line-clamp-2 group-hover:text-sky-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between mt-3 text-xs text-slate-500">
                      <span>{item.date}</span>
                      <span>อ่าน {item.read_time}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back to Knowledge */}
        <div className="text-center mt-12 pt-8 border-t border-slate-200">
          <Link
            href="/knowledge"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 hover:from-sky-600 hover:via-cyan-600 hover:to-emerald-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            กลับไปดูความรู้ทั้งหมด
          </Link>
        </div>
      </div>
    </div>
  );
}

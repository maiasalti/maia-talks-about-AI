import { remark } from "remark";
import remarkGfm from "remark-gfm";
import html from "remark-html";
import { getSortedPostsData, getPostContent } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

// Posts are read off the filesystem at build time, same as the blog pages.
export const dynamic = "force-static";

// How many prose paragraphs the teaser carries before the "read the rest" link.
const TEASER_PARAGRAPHS = 3;

// Upper bound on teaser length (in markdown characters), as a backstop for
// posts that open with long lists rather than prose.
const TEASER_MAX_CHARS = 2000;

function escapeXml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// Frontmatter dates are plain "YYYY-MM-DD" strings; RSS needs RFC-822.
function toRfc822(date) {
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? null : parsed.toUTCString();
}

// Pull the opening of a post out of its MDX. Everything that only makes sense
// on the site itself — JSX comments, imports, interactive components, the
// byline — is dropped, and relative URLs are made absolute so the teaser still
// resolves when it's syndicated somewhere else.
function buildTeaserMarkdown(content) {
  const blocks = content
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
    .replace(/^(?:import|export)\s.+$/gm, "")
    // Some posts put a heading and its first paragraph on consecutive lines.
    // Force a break after headings so the prose underneath is its own block
    // and counts toward the teaser budget.
    .replace(/^(#{1,6}\s.+)$/gm, "$1\n")
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  const kept = [];
  let paragraphs = 0;

  for (const block of blocks) {
    // The byline is rendered by the page template, not the prose.
    if (/^\*By\s.+\*$/i.test(block)) continue;
    // Interactive React components can't travel outside the site.
    if (/^<[A-Z]/.test(block)) continue;

    kept.push(block);

    // Headings, images and one-line italic captions ride along without
    // counting toward the paragraph budget. Several posts open with a cover
    // image and a heading before any prose, so breaking on those would leave
    // the teaser empty.
    const isStructural =
      block.startsWith("#") ||
      block.startsWith("![") ||
      /^\*[^*\n]+\*$/.test(block) ||
      // A bold-only line used as a sub-heading, e.g. "**Mixture of Experts**".
      /^(?:\*\*|__)[^\n]+(?:\*\*|__)$/.test(block) ||
      // Thematic breaks and lists (e.g. a TL;DR) are worth carrying, but they
      // aren't prose and shouldn't spend the paragraph budget.
      /^(?:-{3,}|\*{3,}|_{3,})$/.test(block) ||
      /^(?:[-*+]\s|\d+\.\s)/.test(block);
    if (!isStructural) paragraphs++;

    if (paragraphs >= TEASER_PARAGRAPHS) break;
    // Backstop for list-heavy posts, so a teaser stays a teaser.
    if (kept.join("\n\n").length > TEASER_MAX_CHARS) break;
  }

  // Don't end the teaser on a heading left dangling with nothing under it.
  while (kept.length && kept[kept.length - 1].startsWith("#")) kept.pop();

  return kept
    .join("\n\n")
    // Strip any inline JSX components left inside a kept paragraph.
    .replace(/<\/?[A-Z][A-Za-z0-9]*(?:\s[^>]*)?\/?>/g, "")
    // Relative links and images -> absolute.
    .replace(/\]\((\/[^)\s]*)\)/g, `](${siteConfig.url}$1)`);
}

async function buildTeaserHtml(post) {
  const teaser = buildTeaserMarkdown(getPostContent(post.id));
  const url = `${siteConfig.url}/blog/${post.id}`;

  const processed = await remark()
    .use(remarkGfm)
    .use(html)
    .process(teaser);

  const cta =
    `<p><em>This is a preview.</em> ` +
    `<a href="${url}">Read the full post with interactive charts &rarr;</a></p>`;

  // A CDATA section cannot contain the sequence "]]>".
  return `${processed.toString()}\n<hr />\n${cta}`.replace(/\]\]>/g, "]]&gt;");
}

export async function GET() {
  // getSortedPostsData() already returns newest first, and is the same source
  // the homepage and /blog index read from — so a new .mdx file lands here too.
  const posts = getSortedPostsData();

  const items = await Promise.all(
    posts.map(async (post) => {
      const url = `${siteConfig.url}/blog/${post.id}`;
      const pubDate = toRfc822(post.date);

      return [
        "    <item>",
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${escapeXml(url)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(url)}</guid>`,
        `      <description>${escapeXml(post.description || post.title)}</description>`,
        `      <content:encoded><![CDATA[${await buildTeaserHtml(post)}]]></content:encoded>`,
        `      <dc:creator>${escapeXml(siteConfig.author)}</dc:creator>`,
        pubDate ? `      <pubDate>${pubDate}</pubDate>` : null,
        "    </item>",
      ]
        .filter(Boolean)
        .join("\n");
    })
  );

  const feedUrl = `${siteConfig.url}/feed.xml`;

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(siteConfig.title)}</title>
    <link>${escapeXml(siteConfig.url)}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>${escapeXml(siteConfig.language)}</language>
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />
${items.join("\n")}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

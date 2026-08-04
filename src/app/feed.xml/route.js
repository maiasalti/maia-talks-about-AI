import { getSortedPostsData } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

// Posts are read off the filesystem at build time, same as the blog pages.
export const dynamic = "force-static";

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
  return Number.isNaN(parsed.getTime())
    ? null
    : parsed.toUTCString();
}

export async function GET() {
  // getSortedPostsData() already returns newest first, and is the same source
  // the homepage and /blog index read from — so a new .mdx file lands here too.
  const posts = getSortedPostsData();

  const items = posts
    .map((post) => {
      const url = `${siteConfig.url}/blog/${post.id}`;
      const pubDate = toRfc822(post.date);

      return [
        "    <item>",
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${escapeXml(url)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(url)}</guid>`,
        `      <description>${escapeXml(post.description || post.title)}</description>`,
        `      <dc:creator>${escapeXml(siteConfig.author)}</dc:creator>`,
        pubDate ? `      <pubDate>${pubDate}</pubDate>` : null,
        "    </item>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  const feedUrl = `${siteConfig.url}/feed.xml`;

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(siteConfig.title)}</title>
    <link>${escapeXml(siteConfig.url)}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>${escapeXml(siteConfig.language)}</language>
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />
${items}
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

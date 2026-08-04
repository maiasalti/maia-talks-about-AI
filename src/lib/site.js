// Single source of truth for site-level metadata (used by the root layout and
// the RSS feed at /feed.xml).

export const siteConfig = {
  title: "Maia Talks About AI",
  description: "A blog where I share data stories, analysis, and visuals",
  // Absolute base URL, no trailing slash. Every link in the RSS feed is built
  // from this, so it must stay the canonical production domain.
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://www.maiatalksabout.ai",
  language: "en-us",
  author: "Maia Salti",
};

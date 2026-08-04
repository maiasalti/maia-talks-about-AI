import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "src/posts");

// Get list of posts (for the blog index page)
export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.(md|mdx)$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data,
    };
  });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) return 1;
    else return -1;
  });
}

// Get the raw (frontmatter-stripped) body of a post, for callers that need the
// prose itself rather than just metadata — e.g. the teaser in /feed.xml.
export function getPostContent(id) {
  const mdxPath = path.join(postsDirectory, `${id}.mdx`);
  const mdPath = path.join(postsDirectory, `${id}.md`);
  const fullPath = fs.existsSync(mdxPath) ? mdxPath : mdPath;

  return matter(fs.readFileSync(fullPath, "utf8")).content;
}

// Get single post content (for individual post pages)
export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}

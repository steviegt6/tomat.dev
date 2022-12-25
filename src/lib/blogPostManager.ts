import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import { mdxToHtml } from "./mdx";

const BLOGS_DIR = join(process.cwd(), "_blogs");

export function getBlogSlugs() {
  return readdirSync(BLOGS_DIR);
}

export function getRealSlug(slug: string) {
  return slug.replace(/\.mdx$/, "");
}

export function getBlogBySlug(slug: string) {
  const realSlug = getRealSlug(slug);
  const fullPath = join(BLOGS_DIR, `${realSlug}.mdx`);
  const fileContents = readFileSync(fullPath, "utf8");

  return mdxToHtml({ source: fileContents });
}

/*export function getAllBlogs() {
  const slugs = getBlogSlugs();
  const blogs = slugs.map((slug) => await getBlogBySlug(slug));
  co.sort((post1, post2) =>
    post1.frontmatter.date > post2.frontmatter.date ? -1 : 1
  );
}*/

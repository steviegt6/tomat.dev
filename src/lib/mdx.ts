import { serialize } from "next-mdx-remote/serialize";
import readingTime from "reading-time";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeCodeTitles from "rehype-code-titles";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

export async function mdxToHtml({ source }: { source: any }) {
  const mdxSource = await serialize(source, {
    parseFrontmatter: true,
    mdxOptions: {
      // TODO: next.js 13 isn't supported yet, this is a workaround
      // https://github.com/hashicorp/next-mdx-remote/issues/307
      development: false,
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        rehypeCodeTitles,
        rehypePrism,
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ["anchor"],
            },
          },
        ],
      ],
      format: "mdx",
    },
  });

  mdxSource.frontmatter ??= {};
  mdxSource.frontmatter.wordCount = source.split(/\s+/gu).length;
  mdxSource.frontmatter.readingTime = readingTime(source).text;

  return mdxSource;
}

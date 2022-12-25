import { MDXRemote } from "next-mdx-remote";
import { BlogPost } from "../../interfaces";
import getAuthor from "../../lib/author";
import {
  getBlogBySlug,
  getBlogSlugs,
  getRealSlug,
} from "../../lib/blogPostManager";

export default function BlogPage({ blog }: { blog: BlogPost }) {
  return (
    <div>
      {/* components={...components} */}
      <MDXRemote {...blog.content} />
    </div>
  );
}

export async function getStaticPaths() {
  console.log(getBlogSlugs());
  return {
    paths: getBlogSlugs().map((slug) => "/blog/" + getRealSlug(slug)),
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const blog = await getBlogBySlug(params.slug);

  return {
    props: {
      blog: {
        slug: params.slug,
        title: blog.frontmatter?.title ?? "<no title>",
        date: blog.frontmatter?.date ?? "<no date>",
        coverImage: blog.frontmatter?.coverImage ?? "<no cover image>",
        author: getAuthor(
          blog.frontmatter?.authorShorthand,
          blog.frontmatter?.authorName,
          blog.frontmatter?.authorProfile
        ),
        excerpt: blog.frontmatter?.excerpt ?? "<no excerpt>",
        content: blog,
      },
    },
  };
}

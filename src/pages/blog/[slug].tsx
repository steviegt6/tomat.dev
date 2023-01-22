import { MDXRemote } from "next-mdx-remote";
import { BlogPost } from "../../interfaces";
import getAuthor from "../../lib/author";
import {
  getBlogBySlug,
  getBlogSlugs,
  getRealSlug,
} from "../../lib/blogPostManager";
import CommentsContainer from "../../components/CommentsContainer";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export interface BlogPageProps {
  blog: BlogPost;
  theme: string;
}

export default function BlogPage({ blog, theme }: BlogPageProps) {
  return (
    <div className={inter.className}>
      <div className="markdown-body">
        {/* components={...components} */}
        <MDXRemote {...blog.content} />
      </div>
      <CommentsContainer
        theme={theme}
        repo="steviegt6/tomat.dev"
        repoId="R_kgDOIVMDbA"
        category="Blog Discussions"
        categoryId="DIC_kwDOIVMDbM4CTTiU"
      />
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

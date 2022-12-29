import { MDXRemote } from "next-mdx-remote";
import { BlogPost } from "../../interfaces";
import getAuthor from "../../lib/author";
import {
  getBlogBySlug,
  getBlogSlugs,
  getRealSlug,
} from "../../lib/blogPostManager";
import Script from "next/script";
import { getTheme, useSelectedTheme } from "../../hooks/themeManager";
import { useEffect } from "react";
// import Giscus from "../../../giscus/components/Giscus";

export default function BlogPage({
  blog,
  theme,
}: {
  blog: BlogPost;
  theme: string;
}) {
  return (
    <div>
      {/* components={...components} */}
      <MDXRemote {...blog.content} />
      <div id="comments" className="giscus" />
      {/*<Giscus />*/}
      {theme == "" ? <></> : <GiscusScript theme={theme} />}
    </div>
  );
}

function GiscusScript({ theme }: { theme: string }) {
  useEffect(() => {
    const comments = document.getElementById("comments");
    if (comments) comments.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "steviegt6/tomat.dev");
    script.setAttribute("data-repo-id", "R_kgDOIVMDbA");
    script.setAttribute("data-category", "Blog Discussions");
    script.setAttribute("data-category-id", "DIC_kwDOIVMDbM4CTTiU");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "1");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute(
      "data-theme",
      `https://tomat.dev/themes/giscus.${getTheme(theme)}.css`
    );
    script.setAttribute("data-lang", "en");
    script.setAttribute("data-loading", "lazy");
    script.setAttribute("cross-origin", "anonymous");
    script.setAttribute("async", "true");
    document.body.appendChild(script);
  }, [theme]);

  return (
    <Script
      src="https://giscus.app/client.js"
      data-repo="steviegt6/tomat.dev"
      data-repo-id="R_kgDOIVMDbA"
      data-category="Blog Discussions"
      data-category-id="DIC_kwDOIVMDbM4CTTiU"
      data-mapping="pathname"
      data-strict="1"
      data-reactions-enabled="1"
      data-emit-metadata="0"
      data-input-position="top"
      data-theme={`https://tomat.dev/themes/giscus.${getTheme(theme)}.css`}
      data-lang="en"
      data-loading="lazy"
      crossOrigin="anonymous"
      async
    />
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

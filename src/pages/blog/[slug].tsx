import { notFound } from "next/navigation";
import Container from "@/components/Container";
import { allBlogs } from "contentlayer/generated";
import Mdx from "@/components/Mdx";
import ViewCounter from "@/components/ViewCounter";
import Script from "next/script";

export type BlogPageProps = {
    slug: string;
};

export default function BlogPage({ slug }: BlogPageProps) {
    const blog = allBlogs.find((blog) => blog.slug === "blog/" + slug);

    if (!blog) notFound();

    return (
        <Container title={blog.title} description={blog.summary}>
            <p>
                <em>
                    {new Date(blog.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                    })}
                </em>{" "}
                - <ViewCounter slug={blog.slug} track /> views
            </p>
            <h1>{blog.title}</h1>
            <hr />
            <br />
            <Mdx code={blog.body.code} />
            <br />
            <hr />
            <br />
            <div className="giscus" />
            <Script
                src="https://giscus.app/client.js"
                data-repo="steviegt6/tomat.dev"
                data-repo-id="R_kgDOIVMDbA"
                data-category="Blog Discussions"
                data-category-id="DIC_kwDOIVMDbM4CTTiU"
                data-mapping="pathname"
                data-strict="1"
                data-reactions-enabled="1"
                data-emit-metadata="1"
                data-input-position="bottom"
                data-theme="transparent_dark"
                data-lang="en"
                data-loading="lazy"
                crossOrigin="anonymous"
                async
            />
        </Container>
    );
}

export async function getStaticPaths() {
    return {
        paths: allBlogs.map((blog) => ({
            params: {
                slug: blog.slug.replace("blog/", "")
            }
        })),
        fallback: false
    };
}

export async function getStaticProps(context: { params: { slug: any } }) {
    return {
        props: {
            slug: context.params.slug
        }
    };
}

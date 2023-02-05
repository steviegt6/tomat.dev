import { notFound } from "next/navigation";
import Container from "@/components/Container";
import { allBlogs } from "contentlayer/generated";
import Mdx from "@/components/Mdx";
import ViewCounter from "@/components/ViewCounter";

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
            <h1>{slug}</h1>
            <hr />
            <br />
            <Mdx code={blog.body.code} />
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

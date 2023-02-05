import Container from "@/components/Container";
import ViewCounter from "@/components/ViewCounter";
import { allBlogs } from "contentlayer/generated";
import Link from "next/link";

export type BlogProps = {};

const title = "/blog";
const description = "read the rambligns of the mentally deranged";

export default function Blog({}: BlogProps) {
    return (
        <Container title={title} description={description}>
            <h1>Blog</h1>
            <hr />
            <br />
            <p>Temp.</p>
            <br />
            {allBlogs
                .sort((a, b) => {
                    if (new Date(a.date) > new Date(b.date)) return -1;
                    return 1;
                })
                .map((post) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`}>
                        <div className="mt-2 mb-2 p-2 rounded bg-middleground text-foreground">
                            <p>
                                <strong>{post.title}</strong>
                            </p>
                            <p>
                                <em>
                                    {new Date(post.date).toLocaleDateString("en-US", {
                                        weekday: "long",
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric"
                                    })}
                                </em>{" "}
                                - <ViewCounter slug={post.slug} /> views
                            </p>
                            <br />
                            <p>{post.summary}</p>
                        </div>
                    </Link>
                ))}
        </Container>
    );
}

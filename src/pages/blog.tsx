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
                .map((blog) => (
                    <Link key={blog.slug} href={`${blog.slug}`}>
                        <div className="mt-2 mb-2 p-2 rounded bg-middleground text-foreground">
                            <p>
                                <strong>{blog.title}</strong>
                            </p>
                            <p>
                                <em>
                                    {new Date(blog.date).toLocaleDateString("en-US", {
                                        weekday: "long",
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric"
                                    })}
                                </em>{" "}
                                - <ViewCounter slug={blog.slug} track={false} /> views
                            </p>
                            <br />
                            <p>{blog.summary}</p>
                        </div>
                    </Link>
                ))}
        </Container>
    );
}

import { useEffect } from "react";
import useSWR from "swr";

export type ViewCounterProps = {
    slug: string;
    track?: boolean;
};

type PostView = {
    slug: string;
    count: string;
};

async function fetcher<JSON>(input: RequestInfo, init?: RequestInit): Promise<JSON> {
    const res = await fetch(input, init);
    return res.json();
}

export default function ViewCounter({ slug, track }: ViewCounterProps) {
    if (slug.startsWith("blog/")) slug = slug.replace("blog/", "");
    const { data } = useSWR<PostView[]>("/api/views", fetcher);
    const viewsForSlug = data && data.find((view) => view.slug === slug);
    const views = viewsForSlug?.count || 0;

    useEffect(() => {
        const registerView = () => fetch(`/api/views/${slug}`, { method: "POST" });
        if (track) registerView();
    }, [slug, track]);

    return <>{views}</>;
}

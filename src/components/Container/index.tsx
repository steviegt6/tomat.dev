import Head from "next/head";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";

export const canonical = "https://tomat.dev";

export type ContainerProps = PropsWithChildren<{
    title: string;
    description: string;
    image?: string;
}>;

export default function Container(props: ContainerProps) {
    const { children, ...meta } = props;
    const router = useRouter();

    meta.title = `${meta.title} | tomat.dev`;

    return (
        <>
            <Head>
                <title>{meta.title}</title>
                <meta content={meta.description} name="description" />
                <link rel="canonical" href={`${canonical}${router.asPath}`} />
                <TwitterMeta {...meta} />
            </Head>
            {children}
        </>
    );
}

type MetaProps = Omit<ContainerProps, "children">;

function TwitterMeta({ description, image }: MetaProps) {
    return (
        <>
            <meta name="twitter:site" content="@tomatdev" />
            <meta name="twitter:creator" content="@tomatdev" />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:image" content={image || "/banner.png"} />
        </>
    );
}

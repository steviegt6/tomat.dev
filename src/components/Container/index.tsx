import Head from "next/head";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";

export const canonical = "https://tomat.dev";

export type ContainerProps = PropsWithChildren<{
    title: string;
    description: string;
}>;

export default function Container(props: ContainerProps) {
    const { children, ...meta } = props;
    const router = useRouter();

    return (
        <>
            <Head>
                <title>{`${meta.title} | tomat.dev`}</title>
                <meta content={meta.description} name="description" />
                <link rel="canonical" href={`${canonical}${router.asPath}`} />
            </Head>
            {children}
        </>
    );
}

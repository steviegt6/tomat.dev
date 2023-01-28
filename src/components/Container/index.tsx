import Head from "next/head";
import { PropsWithChildren } from "react";

export type ContainerProps = PropsWithChildren<{
    title: string;
    description: string;
}>;

export default function Container(props: ContainerProps) {
    const { children, ...meta } = props;

    return (
        <>
            <Head>
                {/* Using {title} directly causes hydration errors? */}
                {/* Counts as giving it more than one child element... */}
                {/* Other quirks include appending <!-- --> somehow?? */}
                <title>{`${meta.title} | tomat.dev`}</title>
                <meta content={meta.description} name="description" />
            </Head>
            {children}
        </>
    );
}

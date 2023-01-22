import Head from "next/head";
import { PropsWithChildren } from "react";

export type BasicLayoutProps = PropsWithChildren<{
    title: string;
    description: string;
}>;

export default function BasicLayout({ title, description, children }: BasicLayoutProps) {
    return (
        <>
            <Head>
                {/* Using {title} directly causes hydration errors? */}
                {/* Counts as giving it more than one child element... */}
                {/* Other quirks include appending <!-- --> somehow?? */}
                <title>{`${title} | tomat.dev`}</title>
                <meta name="description" content={description} />
            </Head>
            {children}
        </>
    );
}

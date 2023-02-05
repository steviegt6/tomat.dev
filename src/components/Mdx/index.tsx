import { useMDXComponent } from "next-contentlayer/hooks";

export type MdxProps = {
    code: string;
};

const components = {};

export default function Mdx({ code }: MdxProps) {
    const Component = useMDXComponent(code);

    return <Component components={{ ...components }} />;
}

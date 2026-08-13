import { ReactNode } from "react";

export type RenderContentsProps = {
    staticContent: ReactNode;
    interactiveContent: ReactNode;
};

export function DualRender({
    staticContent,
    interactiveContent,
}: RenderContentsProps) {
    return (
        <>
            <div data-dual-render="static" className="dual-render-static">
                {staticContent}
            </div>

            <div data-dual-render="interactive" className="dual-render-interactive">
                {interactiveContent}
            </div>
        </>
    );
}

export function DualRenderFragment({
    staticContent,
    interactiveContent
}: RenderContentsProps) {
    return (
        <>
            <span data-dual-render="static" className="dual-render-static">
                {staticContent}
            </span>

            <span data-dual-render="interactive" className="dual-render-interactive">
                {interactiveContent}
            </span>
        </>
    )
}
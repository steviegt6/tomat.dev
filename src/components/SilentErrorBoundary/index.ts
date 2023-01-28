import React, { ErrorInfo } from "react";

export type SilentErrorBoundaryProps = React.PropsWithChildren<{
    fallback: JSX.Element;
}>;
export type SilentErrorBoundaryState = { hasError: boolean };

export default class SilentErrorBoundary extends React.Component<SilentErrorBoundaryProps, SilentErrorBoundaryState> {
    constructor(props: SilentErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error) {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // eslint-disable-next-line no-console
        console.error("SilentErrorBoundary caught an error", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }

        return this.props.children;
    }
}

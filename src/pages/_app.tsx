import "../styles/globals.css";
import type { AppProps } from "next/app";
import Shell from "components/Shell";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Shell>
      <Component {...pageProps} />
    </Shell>
  );
}

import { AppProps } from "next/app";
import Head from "next/head";
import Header from "../components/Header";
import { useSelectedTheme } from "../hooks/themeManager";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useSelectedTheme();

  return (
    <>
      <Head>
        <title>tomat.dev</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Header theme={theme} setTheme={setTheme} />
        <div className="pageContent">
          <Component {...pageProps} theme={theme} setTheme={setTheme} />
        </div>
      </div>
    </>
  );
}

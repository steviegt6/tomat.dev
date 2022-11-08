import { Footer } from "components/Footer";
import Head from "next/head";
import styles from "./shell.module.css";

export interface ShellProps {
  children: React.ReactNode;
}

export default function Shell({ children }: ShellProps) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}

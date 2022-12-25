import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Index() {
  return (
    <>
      <main>
        <h1 className={inter.className}>Hello, world!</h1>
      </main>
    </>
  );
}

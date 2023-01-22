import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import BasicLayout from "@/components/BasicLayout";

const inter = Inter({ subsets: ["latin"] });

const title = "/";
const description = "Hello, world!";

export default function Home() {
    return (
        <BasicLayout title={title} description={description}>
            <main>
                <h1 className={inter.className}>Hello, world!</h1>
            </main>
        </BasicLayout>
    );
}

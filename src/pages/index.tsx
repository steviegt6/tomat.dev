import { Inter } from "@next/font/google";
import BasicLayout from "@/components/BasicLayout";
import TomatLogo from "@/components/TomatLogo";

const inter = Inter({ subsets: ["latin"] });

const title = "/";
const description = "Hello, world!";

export default function Home() {
    return (
        <BasicLayout title={title} description={description}>
            <main className="w-full h-full">
                <div className="w-full h-full flex justify-center items-center">
                    <TomatLogo width={250} height={250} interactable />
                </div>
            </main>
        </BasicLayout>
    );
}

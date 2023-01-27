import { Inter } from "@next/font/google";
import BasicLayout from "@/components/BasicLayout";
import TomatLogo from "@/components/TomatLogo";

const title = "/test";
const description = "rr";

export default function Test() {
    return (
        <BasicLayout title={title} description={description}>
            <main className="w-full h-full">
                <div className="w-full h-full flex justify-center items-center">
                    <TomatLogo width={250} height={250} interactable clickable>
                        <iframe
                            width="560"
                            height="315"
                            src="https://www.youtube.com/embed/E4WlUXrJgy4?autoplay=1&mute=1"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </TomatLogo>
                </div>
            </main>
        </BasicLayout>
    );
}

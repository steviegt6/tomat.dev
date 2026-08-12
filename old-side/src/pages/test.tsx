import Container from "@/components/Container";
import LogoContainer from "@/components/LogoContainer";

const title = "/test";
const description = "rr";

export default function Test() {
    return (
        <LogoContainer width={250} height={250} interactable clickable>
            <Container title={title} description={description}>
                <main className="w-full h-full">
                    <div className="w-full h-full flex justify-center items-center">
                        <iframe
                            width="560"
                            height="315"
                            src="https://www.youtube.com/embed/E4WlUXrJgy4?autoplay=1&mute=1"
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>
                </main>
            </Container>
        </LogoContainer>
    );
}

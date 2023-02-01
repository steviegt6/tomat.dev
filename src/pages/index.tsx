import { Inter } from "@next/font/google";
import Container from "@/components/Container";
import LogoContainer from "@/components/LogoContainer";
import Layout from "@/components/Layout";

const title = "/";
const description = "Hello, world!";

export default function Home() {
    return (
        <LogoContainer width={250} height={250} interactable clickable>
            <Container title={title} description={description}>
                <div className="h-full flex justify-center items-center">Goober</div>
            </Container>
        </LogoContainer>
    );
}

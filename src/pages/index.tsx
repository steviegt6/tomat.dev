import Container from "@/components/Container";
import LogoContainer from "@/components/LogoContainer";

const title = "/";
const description = "Hello, world!";

export default function Home() {
    return (
        <LogoContainer width={250} height={250} interactable clickable>
            <Container title={title} description={description}>
                <p>Goober</p>
            </Container>
        </LogoContainer>
    );
}

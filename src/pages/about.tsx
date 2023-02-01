import Container from "@/components/Container";
import LogoContainer from "@/components/LogoContainer";

const title = "/about";
const description = "superficial greetings to you all";

export default function About() {
    return (
        <Container title={title} description={description}>
            <h1>About</h1>
            <hr />
            <br />
            <p>brhu</p>
        </Container>
    );
}

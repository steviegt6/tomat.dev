import Container from "@/components/Container";
import LogoContainer from "@/components/LogoContainer";

const title = "/";
const description = "Hello, world!";

export default function Home() {
    return (
        <LogoContainer width={250} height={250} interactable clickable>
            <Container title={title} description={description}>
                <h1>Stevie, Tomat, and more...</h1>
                <hr />
                <br />
                <p>Hobbyist programmer and game modder. You may have seen me around, or maybe not.</p>
                <br />
                <p>Let&apos;s make this quick... relevant links:</p>
                <p>
                    - my <a href="https://github.com/steviegt6/">GitHub</a>,
                    <br />- my <a href="https://discordapp.com/users/269903979582849024">Discord</a> (Tomat#0001),
                    <br />- my <a href="https://youtube.com/c/tomatophile/">YouTube</a>,
                    <br />- my <a href="https://twitter.com/steviegt6">Twitter</a>.
                </p>
            </Container>
        </LogoContainer>
    );
}

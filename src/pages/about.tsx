import Container from "@/components/Container";

const title = "/about";
const description = "superficial salutations!";

export default function About() {
    return (
        <Container title={title} description={description}>
            <h1>About</h1>
            <hr />
            <br />
            <p>
                Hello, I&apos;m <strong>Stevie</strong>, known in some circles as <strong>Tomat</strong>{" "}
                <s>(as well as convicted tomatophile)</s>.
            </p>
            <br />
            <p>
                Among other—probably less notable—things, I am a programmer and game modder. I enjoy reverse-enginnering
                and messing with software in ways I probably shouldn&apos;t.
            </p>
            <p>My exploits are plentiful and range in quality.</p>
            <br />
            <p>
                I know—and am confident in—<strong>C#</strong>; <strong>Java</strong>;{" "}
                <strong>HTML, CSS, &amp; JS</strong>; and <strong>TypeScript</strong>, as well as many other languages
                of varying knowledge.
            </p>
            <br />
            <p>
                Whether willingly or not, I&apos;ve become familiar with the overarching <strong>.NET Ecosystem</strong>
                , <strong>MSBuild</strong>, <strong>Node.js</strong>, and more.
            </p>
        </Container>
    );
}

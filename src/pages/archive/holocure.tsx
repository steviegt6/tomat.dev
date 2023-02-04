import Container from "@/components/Container";

export type HoloCureProps = {};

const title = "/archive/holocure";
const description = "HoloCure archival project.";

export default function HoloCure({}: HoloCureProps) {
    return (
        <Container title={title} description={description}>
            <h1>HoloCure Archive</h1>
            <hr />
            <br />
            <p>
                Part of an going effort to archive all known versions of{" "}
                <a href="https://kay-yu.itch.io/holocure">HoloCure</a>.
            </p>
            <br />
            <p>
                This page acts as a frontend for the compiled data located within{" "}
                <a href="https://github.com/steviegt6/holocure-archive">steviegt6/holocure-archive</a>.
            </p>
            <p>
                Any inquiries or discussions should occur either in the aforementioned repository or the associated{" "}
                <a href="https://discord.gg/KvqKGQNbhr">Discord server</a>.
            </p>
            <br />
            <h2>Compiled Archives</h2>
            <hr />
        </Container>
    );
}

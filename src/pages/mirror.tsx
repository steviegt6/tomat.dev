import Container from "@/components/Container";
import Link from "next/link";

export type MirrorProps = {};

const title = "/mirror";
const description = "reflections on the past, present, and past again";

export default function Mirror({}: MirrorProps) {
    return (
        <Container title={title} description={description}>
            <h1>Mirrors</h1>
            <hr />
            <br />
            <p>Reflections on the past, present, and past again.</p>
            <br />
            <h2>Pages</h2>
            <hr />
            <br />
            <p>
                <Link href="/mirror/cumcord/an-exercise-in-futility">/mirror/cumcord/an-exercise-in-futility</Link>
                <br />
                &nbsp; - an exercise in futility
            </p>
        </Container>
    );
}

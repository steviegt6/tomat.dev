import Container from "@/components/Container";
import Link from "next/link";

export type ArchiveProps = {};

const title = "/archive";
const description = "archive or smth";

export default function Archive({}: ArchiveProps) {
    return (
        <Container title={title} description={description}>
            <h1>Archive</h1>
            <hr />
            <br />
            <p>
                A directory of various archival things I&apos;m keeping. Not really limited or restricted to anything,
                and archival methods may vary.
            </p>
            <br />
            <h2>Pages</h2>
            <hr />
            <br />
            <p>
                <Link href="/archive/holocure/">/archive/holocure</Link>
                <br />
                &nbsp; - provides a frontend for{" "}
                <a href="https://github.com/steviegt6/holocure-archive">steviegt6/holocure-archive</a>
            </p>
        </Container>
    );
}

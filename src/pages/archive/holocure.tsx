import Container from "@/components/Container";
import { ReactElement, useEffect, useState } from "react";

export type HoloCureProps = {};

type CompiledArchivesProps = {};

type ArchiveProps = {
    archive: CompiledVersion;
};

type LoadStatus = "loading" | "loaded" | "error";

type CompiledVersion = {
    buildId?: string | undefined;
    timestampUnix: number | undefined;
    timestampMilliseconds: number | undefined;
    itchData?: ItchData | undefined;
    tags: SourceTag[];
};

type ItchData = {
    itchDate: string;
    itchUrl: string;
};

type SourceTag = undefined | "wbm" | "archive";

const title = "/archive/holocure";
const description = "HoloCure archival project.";

const repoName = "steviegt6/holocure-archive";
const repoUrl = `https://github.com/${repoName}`;
const archivesUrl = `https://raw.githubusercontent.com/${repoName}/master/sources/compiled.json`;
const holocureLink = "https://kay-yu.itch.io/holocure";
const discordLink = "https://discord.gg/KvqKGQNbhr";

export default function HoloCure({}: HoloCureProps) {
    return (
        <Container title={title} description={description}>
            <h1>HoloCure Archive</h1>
            <hr />
            <br />
            <p>
                Part of an going effort to archive all known versions of <a href={holocureLink}>HoloCure</a>.
            </p>
            <br />
            <p>
                This page acts as a frontend for the compiled data located within <a href={repoUrl}>{repoName}</a>.
            </p>
            <p>
                Any inquiries or discussions should occur either in the aforementioned repository or the associated{" "}
                <a href={discordLink}>Discord server</a>.
            </p>
            <br />
            <h2>Compiled Archives</h2>
            <hr />
            <CompiledArchives />
        </Container>
    );
}

function CompiledArchives({}: CompiledArchivesProps) {
    const [status, setStatus] = useState<LoadStatus>("loading");
    const [archives, setArchives] = useState<ReactElement>();
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        // TODO: make this not suck?
        const json = fetch(archivesUrl)
            .then((response) => {
                if (response.body) return response.json();

                setStatus("error");
                setError(new Error("No response body."));
            })
            .catch((error) => {
                setStatus("error");
                setError(error);
            });

        if (json) {
            json.then((data) => {
                const archives = data.map((archive: CompiledVersion, i: number) => (
                    <Archive key={i} archive={archive} />
                ));

                setArchives(archives);
                setStatus("loaded");
            }).catch((error) => {
                setStatus("error");
                setError(error);
            });
        }
    }, [setStatus, setArchives, setError]);

    switch (status) {
        case "loading":
            return <p>Loading...</p>;

        case "loaded":
            return archives!;

        case "error":
            return (
                <div>
                    <p>Encountered error while displaying archives.</p>
                    <p>
                        <strong>{error?.name}:</strong> &quot;<em>{error?.message}</em>&quot;
                    </p>
                </div>
            );
    }
}

function Archive({ archive }: ArchiveProps) {
    return (
        <div className="mt-2 mb-2 p-2 rounded bg-middleground">
            <p>[{archive.tags.join(", ")}]</p>
            {archive.buildId ? (
                <p>
                    <strong>itch build id</strong>: {archive.buildId}
                </p>
            ) : (
                <></>
            )}
            {archive.timestampMilliseconds && archive.timestampUnix ? (
                <>
                    <p>
                        <strong>timestamp (unix):</strong> {archive.timestampUnix}
                    </p>
                    <p>
                        <strong>timestamp (milliseconds):</strong> {archive.timestampUnix}
                    </p>
                </>
            ) : (
                <></>
            )}
            {archive.itchData ? (
                <>
                    <p>
                        <strong>itch date:</strong> {archive.itchData.itchDate}
                    </p>
                    <p>
                        <strong>itch url:</strong> <a href={archive.itchData.itchUrl}>web.archive.org</a>
                    </p>
                </>
            ) : (
                <></>
            )}
        </div>
    );
}

import Container from "@/components/Container";
import { ReactElement, useEffect, useState } from "react";

export type HoloCureProps = {};

type SearchWrapperProps = {};

type CompiledArchivesProps = {
    filter: string;
};

type ArchiveProps = {
    archive: CompiledVersion;
    filter: string;
};

type LoadStatus = "loading" | "loaded" | "error";

type CompiledVersion = {
    archiveData?: ArchiveData | undefined;
    itchData?: ItchData | undefined;
    tags: SourceTag[];
};

type ArchiveData = {
    timestampUnix: number;
    timestampMilliseconds: number;
    archiveName: string;
};

type ItchData = {
    buildId: string;
    itchDate: string;
    itchUrl: string;
};

type SourceTag = undefined | "wbm" | "archive";

const title = "/archive/holocure";
const description = "HoloCure archival project.";

const repoName = "steviegt6/holocure-archive";
const repoUrl = `https://github.com/${repoName}`;
const archivesUrl = `https://raw.githubusercontent.com/${repoName}/master/sources/compiled.json`;
const archiveDownloadUrl = "https://github.com/steviegt6/holocure-archive/raw/master/archive/";
const holocureLink = "https://kay-yu.itch.io/holocure";
const discordLink = "https://discord.gg/KvqKGQNbhr";

export default function HoloCure({}: HoloCureProps) {
    const [filter, setFilter] = useState<string>("");

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
            <input
                type="text"
                id="archive_search"
                placeholder="Filter archives..."
                className="mt-2 mb-2 p-2 rounded bg-middleground w-full"
                onChange={(event) => {
                    setFilter(event.target.value);
                }}
            />
            <hr />
            <CompiledArchives filter={filter} />
        </Container>
    );
}

function CompiledArchives({ filter }: CompiledArchivesProps) {
    const [status, setStatus] = useState<LoadStatus>("loading");
    const [archives, setArchives] = useState<ReactElement>();
    const [filteredArchives, setFilteredArchives] = useState<boolean[]>();
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        console.log("ew");
        // TODO: make this not suck?
        const json = fetch(archivesUrl, { cache: "no-store" })
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
                const archives = data.map((archive: CompiledVersion, i: number) => {
                    return <Archive key={i} archive={archive} filter={filter} />;
                });

                setArchives(archives);
                setStatus("loaded");
            }).catch((error) => {
                setStatus("error");
                setError(error);
            });
        }
    }, [setStatus, setArchives, setError, filter]);

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

function SearchWrapper({}: SearchWrapperProps) {}

function Archive({ archive, filter }: ArchiveProps) {
    const [hidden, setHidden] = useState<boolean>(false);

    useEffect(() => {
        if (filter.length > 0) {
            const tags = archive.tags.join(" ");
            setHidden(!tags.includes(filter));
        } else {
            setHidden(false);
        }
    }, [setHidden, archive, filter]);

    return (
        <div className={`mt-2 mb-2 p-2 rounded bg-middleground ${hidden ? "hidden" : ""}`}>
            {" "}
            <p>[{archive.tags.join(", ")}]</p>
            {archive.archiveData ? (
                <>
                    <p>
                        <strong>archive:</strong> {archive.archiveData.archiveName} (
                        <a href={`${archiveDownloadUrl}${archive.archiveData.archiveName}`}>download</a>)
                    </p>
                    <p>
                        <strong>timestamp (unix):</strong> {archive.archiveData.timestampUnix}
                    </p>
                    <p>
                        <strong>timestamp (milliseconds):</strong> {archive.archiveData.timestampUnix}
                    </p>
                </>
            ) : (
                <></>
            )}
            {archive.itchData ? (
                <>
                    <p>
                        <strong>itch build id</strong>: {archive.itchData.buildId}
                    </p>
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

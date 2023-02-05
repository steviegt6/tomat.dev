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
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
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
        /* The follow is a list of all supported filters, they can be negated by
         * prepending `-`:
         *   has:<property> - only show archives with the specified property
         *     ex: has:itch_data - only show archives with itch data
         *     ex: -has:itch_data - only show archives without itch data
         *   has_tag:<tag> - only show archives with the specified tag
         *     ex: has_tag:wbm - only show archives with the wbm tag
         *     ex: -has_tag:wbm - only show archives without the wbm tag
         *   <property>:<value> - filter archives by property value
         *     ex: itch_build_id:1234 - only show archives with itch build id 1234
         *     ex: -itch_build_id:1234 - only show archives without itch build id 1234
         *   <text> - input without a colon just matches all values
         *     ex: 1234 - only show archives with 1234 in any property
         *     ex: -1234 - only show archives without 1234 in any property
         *
         * Properties:
         *   archive_data - archives with archive data
         *     timestamp_unix - archives with archive timestamp (unix)
         *     timestamp_milliseconds - archives with archive timestamp (milliseconds)
         *     archive_name - archives with archive name
         *   itch_data - archives with itch data
         *     itch_build_id - archives with itch build id
         *     itch_date - archives with itch date
         *     itch_url - archives with itch url (wayback machine link)
         *   tags - archives with tags
         *     [wbm, archive]
         */
        if (filter.length > 0) {
            const terms = filter.split(" ");
            let hidden = false;

            for (const rTerm of terms) {
                if (rTerm.length === 0) continue;

                let negate = false;
                let term = rTerm;
                if (term.startsWith("-")) {
                    negate = true;
                    term = term.slice(1);
                }
                const [filter, value] = term.split(":");

                const propertyFilters: { [key: string]: () => any } = {
                    archive_data: () => archive.archiveData,
                    timestamp_unix: () => archive.archiveData?.timestampUnix,
                    timestamp_milliseconds: () => archive.archiveData?.timestampMilliseconds,
                    archive_name: () => archive.archiveData?.archiveName,
                    itch_data: () => archive.itchData,
                    itch_build_id: () => archive.itchData?.buildId,
                    itch_date: () => archive.itchData?.itchDate,
                    itch_url: () => archive.itchData?.itchUrl,
                    tags: () => archive.tags
                };

                if (!term.includes(":")) {
                    // iterate through propertyFilters
                    let found = false;
                    for (const property in propertyFilters) {
                        if (!propertyFilters[property]) continue;
                        const propertyValue = propertyFilters[property]();
                        if (propertyValue === undefined) continue;
                        const matches = propertyValue.toString().includes(term);
                        found = found || matches;
                    }

                    hidden = hidden || (negate ? found : !found);
                    break;
                }

                switch (filter) {
                    // custom search filters
                    case "has":
                        if (!propertyFilters[value]) break;
                        const hasValue = propertyFilters[value]() !== undefined;
                        hidden = hidden || (negate ? hasValue : !hasValue);
                        break;

                    case "has_tag":
                        const hasTag = archive.tags.includes(value as SourceTag);
                        hidden = hidden || (negate ? hasTag : !hasTag);
                        break;

                    // property filters
                    default:
                        if (!propertyFilters[filter]) break;
                        const propertyValue = propertyFilters[filter]();
                        if (propertyValue === undefined) {
                            hidden = hidden || !negate;
                            break;
                        }
                        const matches = propertyValue.toString().includes(value);
                        hidden = hidden || (negate ? matches : !matches);
                        break;
                }
            }

            setHidden(hidden);
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

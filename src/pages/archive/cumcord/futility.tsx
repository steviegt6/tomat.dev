import Container from "@/components/Container";
import Image from "next/image";
import Link from "next/link";

export type FutilityProps = {};

const title = "/archive/cumcord/futility";
const description = "laughing @ retards";

export default function Futility({}: FutilityProps) {
    return (
        <Container title={title} description={description}>
            <Image
                src="/cumcord/retard.png"
                alt=""
                width={0}
                height={0}
                sizes={"100vw"}
                className="w-full h-auto rounded"
            />
            <br />
            <h4>LAUGHING @ RETARDS</h4>
            <h1>AN EXERCISE IN FUTILITY</h1>
            <hr />
            <br />
            <p>Cumcord has been discontinued after more than a year of continuous development.</p>
            <br />
            <p>
                I made Cumcord when client modding was stuck between BetterDiscord, and Powercord. More than a year
                later, we even survived through the death of Powercord.
            </p>
            <br />
            <p>
                A year ago when I created Cumcord I just wanted to make something lighter, simpler, and easier to
                develop for than other client mods, so I created a new standard for plugin development.
            </p>
            <br />
            <Image
                src="https://imgs.xkcd.com/comics/standards.png"
                alt=""
                width={0}
                height={0}
                sizes={"100vw"}
                className="w-full h-auto rounded"
            />
            <br />
            <p>
                I&apos;ve gotten tons of reports that I succeeded in my goal of making plugin development easier, so it
                may come as a surprise that Cumcord&apos;s development has ceased.
            </p>
            <br />
            <p>
                Discord recently pushed an update that swaps out <a href="https://babel.dev/">Babel</a> for{" "}
                <a href="https://swc.rs/">SWC</a> in their frontend build pipeline, which enabled mangling on certain
                webpack modules, and stripped displayNames from React components.
            </p>
            <br />
            <p>
                <strong>Every client mod</strong> used hardcoded property names to find modules, and{" "}
                <strong>every client mod</strong> used the displayName property for fetching React components.
            </p>
            <br />
            <p>...including Cumcord.</p>
            <br />
            <p>
                Upon noticing this happened, BetterDiscord and Replugged were fixed, albeit with every plugin broken.
                They both announced they&apos;d begun working on rewrites. GooseMod was discontinued.
            </p>
            <br />
            <p>
                Every person who was willing to maintain Cumcord in our community discussed the changes hours before
                they were pushed to stable.
            </p>
            <br />
            <p>
                We came to the conclusion that while we could do the same thing that BetterDiscord and Replugged did and
                rewrite the mod, it wasn&apos;t worth it.
            </p>
            <br />
            <p>
                Cumcord was built on simple DX. The change Discord introduced made one of the core, simple to understand
                principals of client modding significantly more complex, despite how small the change was. If we rewrote
                Cumcord, our code would become disorganized, modules would be found through inconsistent methods, and
                React components would be even harder to debug.
            </p>

            <p>Then I realized something that should&apos;ve been obvious. Client modding is not sustainable.</p>
            <br />
            <p>
                Discord client modding for the longest time has been incredibly tightly coupled to Discord&apos;s code
                and assumptions that Discord does not care about improving their build pipeline.
            </p>
            <br />
            <p>
                We complain about client mods breaking a lot, but we&apos;ve engineered them for convenience over
                sustainability.
            </p>
            <br />
            <p>
                Discord at any point could ditch Webpack and move to Vite. Discord at any point could deprecate React
                components we heavily use. Discord at any point could remove any of the 3 state management libraries
                included in the client.
            </p>
            <br />
            <p>
                Rewriting Cumcord and building it on the same principals we did before would be just as unsustainable as
                it was before, and it&apos;d be even harder to develop for. It would be a shell of it&apos;s former
                self.
            </p>
            <br />
            <p>If we wanted to keep writing Discord mods we&apos;d have to build something that isn&apos;t Cumcord.</p>
            <br />
            <p>...so we are.</p>
            <br />
            <Image
                src="/cumcord/shelter.png"
                alt=""
                width={0}
                height={0}
                sizes={"100vw"}
                className="w-full h-auto rounded"
            />
            <br />
            <p>
                shelter is our new experimental Discord mod that tries to think outside of the box. We&apos;re trying
                things that the majority of the client modding community have ignored in favor of convenience. shelter
                is built to be sustainable.
            </p>
            <br />
            <p>
                Discord has engineered their client on Facebook&apos;s Flux state management paradigm. This means that
                the app&apos;s global state is decoupled from their React components, and also accessible in one
                convenient place. Other mods do use Flux, but shelter is built on it. It&apos;s the core of
                Discord&apos;s desktop client, and it&apos;s the least likely to change.
            </p>
            <br />
            <p>
                Other client mods rely heavily on Discord&apos;s React components. shelter aims to avoid reliance on too
                much Discord code, so we&apos;re creating our own components that recreate Discord&apos;s.
            </p>
            <br />
            <p>Discord is built on React. shelter will be built on Solid.js.</p>
            <br />
            <p>
                All of these small details add up, and will hopefully make shelter more sustainable than the majority of
                other client mods.
            </p>
            <br />
            <p>
                You can follow shelter&apos;s development in the uwu.network Discord server, which will also be the home
                for other projects from Cumcord&apos;s development team, uwu.network.
            </p>

            <br />
            <p>
                Cumcord was an important part of the Discord modding community (we were the 4th most popular mod for the
                longest time, very cool!) and it helped me meet a lot of people I care about. Those people are still
                around, and I&apos;d like to thank them for being here. I&apos;d also like to thank anyone who supported
                Cumcord, you mean quite a bit to me.
            </p>
            <br />
            <p>All of this is to say that Cumcord is dead, and that&apos;s okay. It wasn&apos;t built to last. </p>
            <p>~creatable</p>
            <br />
            <hr />
            <br />
            <p>By far one of my favorite articles I&apos;ve read online.</p>
            <p>R.I.P. Cumcord, 2021-2022; never forget. Worse than 9/11.</p>
            <br />
            <p>See also:</p>
            <p>
                - the <a href="https://cumcord.com/an-exercise-in-futility">original page</a>,
            </p>
            <p>
                - a <Link href="/mirror/cumcord/futility">direct mirror on my site</Link>.
            </p>
        </Container>
    );
}

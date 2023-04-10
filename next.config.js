const { withContentlayer } = require("next-contentlayer");

const undertalePages = [
    "battles",
    "calls",
    "debugmode",
    "decompilation-corrected",
    "decompilation",
    "endings",
    "flags",
    "fun",
    // "index",
    "items",
    "monsters",
    "rooms",
    "save",
    "unpacking-corrected",
    "unpacking"
];

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "imgs.xkcd.com",
                port: "",
                pathname: "/comics/*"
            }
        ]
    },
    rewrites: async () => [
        {
            source: "/cumcord/an-exercise-in-futility",
            destination: "/cumcord/an-exercise-in-futility.html"
        },
        {
            source: "/lol/tt2",
            destination: "/lol/tt2/index.html"
        },
        {
            source: "/undertale",
            destination: "/undertale/index.html"
        },
        ...undertalePages.map((page) => ({
            source: `/undertale/${page}`,
            destination: `/undertale/${page}.html`
        }))
    ]
};

module.exports = withContentlayer(nextConfig);

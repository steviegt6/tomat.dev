const { withContentlayer } = require("next-contentlayer");

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
            source: "/mirror/cumcord/an-exercise-in-futility",
            destination: "/mirror/cumcord/an-exercise-in-futility.html"
        }
    ]
};

module.exports = withContentlayer(nextConfig);

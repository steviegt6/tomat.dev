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
    }
};

module.exports = nextConfig;

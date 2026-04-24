/** @type {import('next').NextConfig} */
const LONG_TERM_CACHE = "public, max-age=31536000, immutable";
const NEXT_IMAGE_CACHE = "public, max-age=86400, stale-while-revalidate=604800";
const NO_CACHE = "no-store, no-cache, must-revalidate";

const STATIC_IMAGE_ASSETS = [
    "/favicon.svg",
    "/logo.svg",
    "/logo_dark.svg",
    "/logo_light.svg",
    "/preview.png",
    "/vitoria.png",
    "/vitoria.webp",
    "/diogo.jpeg",
    "/joao.jpeg",
];

const nextConfig = {
    async headers() {
        const staticImageHeaders = STATIC_IMAGE_ASSETS.map((source) => ({
            source,
            headers: [{ key: "Cache-Control", value: LONG_TERM_CACHE }],
        }));

        return [
            ...staticImageHeaders,
            {
                source: "/projects/:path*",
                headers: [{ key: "Cache-Control", value: LONG_TERM_CACHE }],
            },
            {
                source: "/_next/image",
                headers: [{ key: "Cache-Control", value: NEXT_IMAGE_CACHE }],
            },
            {
                source: "/sw.js",
                headers: [{ key: "Cache-Control", value: NO_CACHE }],
            },
        ];
    },
};

export default nextConfig;

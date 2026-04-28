/** @type {import('next').NextConfig} */
const LONG_TERM_CACHE = "public, max-age=31536000, immutable";
const NEXT_IMAGE_CACHE = "public, max-age=86400, stale-while-revalidate=604800";
const NO_CACHE = "no-store, no-cache, must-revalidate";

const STATIC_IMAGE_ASSETS = [
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
            // Security headers for all routes
            {
                source: "/(.*)",
                headers: [
                    { key: "X-Frame-Options", value: "DENY" },
                    { key: "X-Content-Type-Options", value: "nosniff" },
                    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
                    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
                    {
                        key: "Strict-Transport-Security",
                        value: "max-age=63072000; includeSubDomains; preload",
                    },
                    {
                        key: "Content-Security-Policy",
                        value: [
                            "default-src 'self'",
                            "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
                            "style-src 'self' 'unsafe-inline'",
                            "font-src 'self'",
                            "img-src 'self' data: blob: https:",
                            "frame-src https://my.spline.design https://prod.spline.design",
                            "connect-src 'self' blob: https://my.spline.design https://prod.spline.design",
                            "worker-src 'self' blob:",
                        ].join("; "),
                    },
                ],
            },
            // Cache headers for static assets
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

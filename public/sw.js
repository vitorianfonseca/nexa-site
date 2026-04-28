const CACHE_NAME = "spline-cache-v2";
const SPLINE_ENTRY_URL = "https://my.spline.design/abstractnirvana-KYhkRlGqxUrOI1xAsyknGLDl/";
const TTL_MS = 24 * 60 * 60 * 1000; // 24 hours
const META_CACHE = "spline-meta-v2";

function isSplineRequest(url) {
    return url.hostname === "spline.design" || url.hostname.endsWith(".spline.design");
}

async function isFresh(request) {
    const meta = await caches.open(META_CACHE);
    const metaRes = await meta.match(request.url);
    if (!metaRes) return false;
    const { cachedAt } = await metaRes.json();
    return Date.now() - cachedAt < TTL_MS;
}

async function storeMeta(request) {
    const meta = await caches.open(META_CACHE);
    await meta.put(
        request.url,
        new Response(JSON.stringify({ cachedAt: Date.now() }), {
            headers: { "Content-Type": "application/json" },
        })
    );
}

self.addEventListener("install", (event) => {
    event.waitUntil(
        (async () => {
            const cache = await caches.open(CACHE_NAME);
            try {
                const response = await fetch(SPLINE_ENTRY_URL, { mode: "no-cors" });
                await cache.put(SPLINE_ENTRY_URL, response);
                await storeMeta({ url: SPLINE_ENTRY_URL });
            } catch (error) {
                console.warn("[SW] Failed to precache Spline entry URL", error);
            }
        })()
    );
    self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
    const { request } = event;
    if (request.method !== "GET") return;

    let url;
    try {
        url = new URL(request.url);
    } catch {
        return;
    }

    if (!isSplineRequest(url)) return;

    event.respondWith(
        (async () => {
            const cache = await caches.open(CACHE_NAME);
            const cachedResponse = await cache.match(request);

            if (cachedResponse && await isFresh(request)) {
                return cachedResponse;
            }

            try {
                const networkResponse = await fetch(request);
                if (networkResponse && networkResponse.type !== "error") {
                    await cache.put(request, networkResponse.clone());
                    await storeMeta(request);
                }
                return networkResponse;
            } catch {
                if (cachedResponse) return cachedResponse;

                if (request.mode === "navigate") {
                    const entryFallback = await cache.match(SPLINE_ENTRY_URL);
                    if (entryFallback) return entryFallback;
                }

                return new Response("Offline and no cached Spline resource is available.", {
                    status: 503,
                    statusText: "Service Unavailable",
                    headers: { "Content-Type": "text/plain; charset=utf-8" },
                });
            }
        })()
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        (async () => {
            const cacheNames = await caches.keys();
            await Promise.all(
                cacheNames.map((cacheName) => {
                    if (
                        cacheName !== CACHE_NAME &&
                        cacheName !== META_CACHE &&
                        (cacheName.startsWith("spline-cache-") || cacheName.startsWith("spline-meta-"))
                    ) {
                        return caches.delete(cacheName);
                    }
                    return Promise.resolve();
                })
            );
            await self.clients.claim();
        })()
    );
});

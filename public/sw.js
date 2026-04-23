const CACHE_NAME = "spline-cache-v1";
const SPLINE_ENTRY_URL = "https://my.spline.design/abstractnirvana-KYhkRlGqxUrOI1xAsyknGLDl/";

function isSplineRequest(url) {
    return url.hostname === "spline.design" || url.hostname.endsWith(".spline.design");
}

self.addEventListener("install", (event) => {
    event.waitUntil(
        (async () => {
            const cache = await caches.open(CACHE_NAME);

            // Warm up cache with the scene entry URL without blocking install on failure.
            try {
                const response = await fetch(SPLINE_ENTRY_URL, { mode: "no-cors" });
                await cache.put(SPLINE_ENTRY_URL, response);
            } catch (error) {
                console.warn("[SW] Failed to precache Spline entry URL", error);
            }
        })()
    );

    self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
    const { request } = event;

    if (request.method !== "GET") {
        return;
    }

    let url;
    try {
        url = new URL(request.url);
    } catch {
        return;
    }

    if (!isSplineRequest(url)) {
        return;
    }

    event.respondWith(
        (async () => {
            const cache = await caches.open(CACHE_NAME);
            const cachedResponse = await cache.match(request);

            // Cache first: once available, serve from cache with no extra network fetch.
            if (cachedResponse) {
                return cachedResponse;
            }

            try {
                const networkResponse = await fetch(request);

                if (networkResponse && networkResponse.type !== "error") {
                    await cache.put(request, networkResponse.clone());
                }

                return networkResponse;
            } catch {
                const cachedRequest = await cache.match(request);
                if (cachedRequest) {
                    return cachedRequest;
                }

                // Only use the scene entry as fallback for navigation requests.
                if (request.mode === "navigate") {
                    const entryFallback = await cache.match(SPLINE_ENTRY_URL);
                    if (entryFallback) {
                        return entryFallback;
                    }
                }

                return new Response("Offline and no cached Spline resource is available.", {
                    status: 503,
                    statusText: "Service Unavailable",
                    headers: {
                        "Content-Type": "text/plain; charset=utf-8",
                    },
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
                    if (cacheName !== CACHE_NAME && cacheName.startsWith("spline-cache-")) {
                        return caches.delete(cacheName);
                    }

                    return Promise.resolve(false);
                })
            );

            await self.clients.claim();
        })()
    );
});

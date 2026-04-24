"use client";

import { useEffect } from "react";

const SW_URL = "/sw.js";
const UPDATE_CHECK_INTERVAL_MS = 5 * 60 * 1000;

export default function ServiceWorkerRegistration() {
    useEffect(() => {
        if (!("serviceWorker" in navigator)) {
            return;
        }

        let updateTimer: number | null = null;
        let fallbackTimer: number | null = null;
        let idleId: number | null = null;

        const runtimeWindow = window as Window & {
            requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
            cancelIdleCallback?: (handle: number) => void;
        };

        const registerServiceWorker = async () => {
            try {
                const registration = await navigator.serviceWorker.register(SW_URL);

                updateTimer = window.setInterval(() => {
                    void registration.update();
                }, UPDATE_CHECK_INTERVAL_MS);

                registration.addEventListener("updatefound", () => {
                    const newWorker = registration.installing;
                    if (!newWorker) {
                        return;
                    }

                    newWorker.addEventListener("statechange", () => {
                        if (
                            newWorker.state === "activated" &&
                            navigator.serviceWorker.controller
                        ) {
                            console.info("[SW] New service worker version activated.");
                        }
                    });
                });
            } catch (error) {
                console.error("[SW] Failed to register service worker", error);
            }
        };

        const scheduleRegistration = () => {
            if (typeof runtimeWindow.requestIdleCallback === "function") {
                idleId = runtimeWindow.requestIdleCallback(() => {
                    void registerServiceWorker();
                }, { timeout: 2500 });
                return;
            }

            fallbackTimer = window.setTimeout(() => {
                void registerServiceWorker();
            }, 1200);
        };

        if (document.readyState === "complete") {
            scheduleRegistration();
        } else {
            window.addEventListener("load", scheduleRegistration, { once: true });
        }

        return () => {
            window.removeEventListener("load", scheduleRegistration);
            if (updateTimer !== null) {
                window.clearInterval(updateTimer);
            }
            if (fallbackTimer !== null) {
                window.clearTimeout(fallbackTimer);
            }
            if (idleId !== null && typeof runtimeWindow.cancelIdleCallback === "function") {
                runtimeWindow.cancelIdleCallback(idleId);
            }
        };
    }, []);

    return null;
}

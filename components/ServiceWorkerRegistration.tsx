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

        void registerServiceWorker();

        return () => {
            if (updateTimer !== null) {
                window.clearInterval(updateTimer);
            }
        };
    }, []);

    return null;
}

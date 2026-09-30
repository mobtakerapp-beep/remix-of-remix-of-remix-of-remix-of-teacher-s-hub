// Minimal service worker so the app is installable (PWA) in Chrome.
const CACHE = "subh-almaashi-v1";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  // Network-first pass-through; required fetch handler for installability.
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});

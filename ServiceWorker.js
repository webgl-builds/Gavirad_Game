const cacheName = "DefaultCompany-Gavirad Game-1.7";
const contentToCache = [
    "Build/Gavirad_Game.loader.js",
    "Build/Gavirad_Game.framework.js",
    "Build/Gavirad_Game.data",
    "Build/Gavirad_Game.wasm",
    "TemplateData/style.css"
];

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    await cache.addAll(contentToCache);
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys.map(key => {
        if (key !== cacheName) return caches.delete(key);
      })
    );
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", event => {
  event.respondWith((async () => {
    const cached = await caches.match(event.request);
    return cached || fetch(event.request);
  })());
});
const cacheName = "DefaultCompany-Gavirad Game-1.1";
const contentToCache = [
    "Build/Build_Gavirad.loader.js",
    "Build/Build_Gavirad.framework.js",
    "Build/Build_Gavirad.data",
    "Build/Build_Gavirad.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);      
      return response;
    })());
});

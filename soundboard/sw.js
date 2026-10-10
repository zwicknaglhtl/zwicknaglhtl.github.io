const CACHE_NAME = 'soundboard-v1';
const FILES_TO_CACHE = [
  './',
  './index.html',
  './manifest.json'
];

// 1. Beim Installieren des Service Workers Dateien in den Cache laden
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// 2. Anfragen abfangen und wenn möglich aus dem Cache servieren (Offline-Support)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
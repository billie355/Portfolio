const CACHE_NAME = 'bjrs-pwa-v1';
const urlsToCache = [
  './',
  './index.html',
  './css/style.css',
  './js/script.js',
  './assets/BJRS.png',
  './assets/pfp.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

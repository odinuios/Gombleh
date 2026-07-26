const CACHE_NAME = 'chatpro-cache-v1';
const urlsToCache = [
  './',
  './index.html' // Sesuaikan dengan nama file HTML utama Anda jika berbeda
];

// Install Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch Request (Mengambil data dari cache atau jaringan)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

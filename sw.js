const CACHE_NAME = 'mgm-absentee-informer-v34-section-filter';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './parser.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap'
];

// Install Event - Precache and skip waiting immediately
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[PWA SW] Pre-caching offline assets v34');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate Event - Purge old caches & claim clients immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[PWA SW] Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - ALWAYS NETWORK FIRST for HTML, JS, CSS so app updates automatically when online
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);

  // Bypass cache for external APIs (Google Apps Script API)
  if (url.origin !== location.origin) return;

  const isCoreAsset = url.pathname.endsWith('.html') || url.pathname.endsWith('.js') || url.pathname.endsWith('.css') || url.pathname === '/' || url.pathname.endsWith('/');

  if (isCoreAsset) {
    // Network-First with cache bypass for instant auto-update when online, falling back to cache if offline
    event.respondWith(
      fetch(event.request, { cache: 'reload' })
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          }
          return networkResponse;
        })
        .catch(() => {
          return caches.match(event.request);
        })
    );
  } else {
    // Cache-First for images/fonts
    event.respondWith(
      caches.match(event.request).then((cached) => {
        return cached || fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          }
          return networkResponse;
        });
      })
    );
  }
});

const CACHE_NAME = 'mgm-bca-absentee-informer-v89-bca';
// Do NOT precache app.js / index / css — mobile was stuck on broken cached JS after updates.
// Network-first fetch handler still caches them after a successful live load.
const ASSETS_TO_CACHE = [
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './version.json'
];

// Install Event - Precache icons only and skip waiting immediately
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[PWA SW] Install', CACHE_NAME);
      return cache.addAll(ASSETS_TO_CACHE).catch(() => undefined);
    })
  );
});

// Activate Event - Purge ALL other caches & claim clients immediately
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

// Allow page to force activate waiting worker
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Fetch Event - ALWAYS NETWORK FIRST for HTML, JS, CSS, version.json
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);

  // Bypass cache for external APIs (Google Apps Script API)
  if (url.origin !== location.origin) return;

  const path = url.pathname;
  const isCoreAsset =
    path.endsWith('.html') ||
    path.endsWith('.js') ||
    path.endsWith('.css') ||
    path.endsWith('version.json') ||
    path.endsWith('sw.js') ||
    path === '/' ||
    path.endsWith('/');

  if (isCoreAsset) {
    // Network-First — never prefer stale JS after GitHub Pages deploy
    event.respondWith(
      fetch(event.request, { cache: 'no-store' })
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          }
          return networkResponse;
        })
        .catch(() => caches.match(event.request))
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

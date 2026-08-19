const CACHE_NAME = 'mgm-bca-absentee-informer-v142-bca';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './parser.js',
  './manifest.json',
  './version.json',
  './icon-192.png',
  './icon-512.png'
];

// Install Event - Precache core app assets & skip waiting
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[PWA SW] Pre-caching assets for offline availability:', CACHE_NAME);
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.warn('[PWA SW] Pre-cache warning:', err);
      });
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

// Allow page to force activate waiting worker
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Fetch Event - Network First when online, Cache Fallback when offline
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);

  // Bypass cache for external APIs (Google Apps Script webhooks)
  if (url.origin !== location.origin && !url.hostname.includes('fonts.g')) return;

  const isNavigation = event.request.mode === 'navigate' || (event.request.headers.get('accept') && event.request.headers.get('accept').includes('text/html'));

  event.respondWith(
    fetch(event.request, { cache: 'no-store' })
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
        }
        return networkResponse;
      })
      .catch(async () => {
        // Device is OFFLINE or network failed — serve from cache
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) return cachedResponse;

        // If requesting page navigation / HTML, fallback to cached index.html
        if (isNavigation || url.pathname.endsWith('.html') || url.pathname === '/' || url.pathname.endsWith('/')) {
          const indexFallback = (await caches.match('./index.html')) ||
                                (await caches.match('/index.html')) ||
                                (await caches.match('./')) ||
                                (await caches.match('/'));
          if (indexFallback) return indexFallback;
        }

        return new Response('Offline resource unavailable', { status: 503, statusText: 'Offline' });
      })
  );
});

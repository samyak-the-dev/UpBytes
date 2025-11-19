// Name & version your cache so you can bump it when files change
const CACHE_NAME = 'pwa-cache-v1';

// core files to be available offline
const ASSETS_TO_CACHE = [
  '/',
  '/SkillxAI/public/assets/js/script.js',
  '/SkillxAI/public/assets/graphics//logo.png',
  '/SkillxAI/dist/output.css',
  '/SkillxAI/tailwind.config.js'
];

// Install: cache the core files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting(); // Activate immediately
});

// Activate: remove old caches when you deploy a new version
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch: try cache first, fall back to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request)
    )
  );
});

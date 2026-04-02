const CACHE_NAME = 'ia-castillo-v2';
const ASSETS_TO_CACHE = [
  '/',
  'https://ia-castillo.vercel.app/static/icons/icon-192.png',
  'https://ia-castillo.vercel.app/static/icons/icon-512.png',
  'https://ia-castillo.vercel.app/static/icons/screenshot-1.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching manifest assets...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

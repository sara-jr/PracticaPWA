const CACHE_NAME = 'configuracion-pwa';
const filesToCache = [
    '/',
    '/app.js',
    '/index.html',
    '/icon.png',
    '/icon-large.png',
    '/manifest.json'
];


function hackylog(msg){
    let text = document.createElement('p');
    text.innerText = msg;
    document.getElementById('hackylog').appendChild(text);
}



self.addEventListener('install', (event)=>{
    hackylog("Achivos en cache");
    event.waitUntil(
        (async () => {
            const cache = await caches.open(CACHE_NAME);
            console.log("[Service Worker] Caching all: app shell and content");
            await cache.addAll(filesToCache);
        })(),
    );
});

self.addEventListener('activate', (event)=>{
    event.waitUntil(
        caches.keys().then((keyList) => {
        return Promise.all(
            keyList.map((key) => {
                if (key === CACHE_NAME) {
                    return;
                }
                return caches.delete(key);
            }),
        );
        }),
    );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      const r = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (r) {
        return r;
      }
      const response = await fetch(e.request);
      const cache = await caches.open(CACHE_NAME);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })(),
  );
});
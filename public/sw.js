const CACHE_NAME = "meu_cache";

self.addEventListener("install", (event) => {
  console.log("Instalando o service worker");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(["/index.html"]).then(() => self.skipWaiting());
    }),
  );
});

self.addEventListener("fetch", (event) => {
  console.log(`Baixando ${event.request.url}`);
});

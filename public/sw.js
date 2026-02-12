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
  event.respondWith(redePrimeiro(event.request));
});

const cachePrimeiro = async (request) => {
  const respostaDoCache = await caches.match(request);

  if (respostaDoCache) {
    return respostaDoCache;
  }

  const respostaRede = await fetch(request);
  atualizaCache(request, respostaRede.clone());

  return respostaRede;
};

const redePrimeiro = async (request) => {
  const respostaDaRede = await fetch(request);

  if (respostaDaRede) {
    atualizaCache(request, respostaDaRede.clone());
    return respostaDaRede;
  }

  const respostaDoCache = await caches.match(request);
  return respostaDoCache;
};

const atualizaCache = async (request, response) => {
  const cache = await caches.open(CACHE_NAME);
  await cache.put(request, response);
};

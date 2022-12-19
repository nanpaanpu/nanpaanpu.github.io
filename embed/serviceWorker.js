const cacheFiles = new Set([
  '/ADEnvelopeProcessor.js',
  '/QuantizerProcessor.js',
  '/ReverbProcessor.js',
  '/RhythmProcessor.js',
  '/SampleAndHoldProcessor.js',
  '/SequenceProcessor.js',
  '/TriggeredSamplerProcessor.js',
  '/AOP4EJ5R3BZ7RvEKnJu8Ag.wav',
  '/NyFXbZ66NsZbRCQDwX1f-Q.wav',
  '/fIt-hst_gzdF2tR4BIfC8g.wav',
]);

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
console.log('ef')
  if (cacheFiles.has(url.pathname)) {
    event.respondWith(
      caches.open('audioglyphs').then(cache => {
        return cache.match(event.request).then(function (response) {
          return (
            response ||
            fetch(event.request).then(function (response) {
              cache.put(event.request, response.clone());
              return response;
            })
          );
        });
      }),
    );
  }
});

self.addEventListener('activate', (event) => {
  // @ts-ignore
  event.waitUntil(clients.claim());
});

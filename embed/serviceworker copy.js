(() => {
    "use strict";
    const e = new Set(["/ADEnvelopeProcessor.js", "/QuantizerProcessor.js", "/ReverbProcessor.js", "/RhythmProcessor.js", "/SampleAndHoldProcessor.js", "/SequenceProcessor.js", "/TriggeredSamplerProcessor.js", "/AOP4EJ5R3BZ7RvEKnJu8Ag.wav", "/NyFXbZ66NsZbRCQDwX1f-Q.wav", "/fIt-hst_gzdF2tR4BIfC8g.wav"]);
    self.addEventListener("fetch", (s => {
        const t = new URL(s.request.url);
        e.has(t.pathname) && s.respondWith(caches.open("audioglyphs").then((e => e.match(s.request).then((function(t) {
            return t || fetch(s.request).then((function(t) {
                return e.put(s.request, t.clone()), t
            }))
        })))))
    })), self.addEventListener("activate", (e => {
        e.waitUntil(clients.claim())
    }))
})();
//# sourceMappingURL=serviceWorker.js.map
(() => {
    "use strict";
    registerProcessor("TriggeredSamplerProcessor", class extends AudioWorkletProcessor {
        constructor(t) {
            super(t), this.lastClock = 0, this.position = 1 / 0, this.buffer = t.processorOptions.buffer, this.port.onmessage = ({
                data: t
            }) => {
                this.buffer = t, this.position = 1 / 0
            }
        }
        static get parameterDescriptors() {
            return [{
                name: "clock",
                defaultValue: 0,
                minValue: -1,
                maxValue: 1,
                automationRate: "k-rate"
            }, {
                name: "detune",
                defaultValue: 0,
                automationRate: "k-rate"
            }]
        }
        process(t, [
            [s]
        ], {
            clock: [e],
            detune: [o]
        }) {
            if (this.lastClock <= 0 && e > 0 && (this.position = 0, this.port.postMessage(0)), this.lastClock = e, null === this.buffer || this.position > this.buffer.length - 1) return !0;
            const i = Math.pow(2, o / 1200);
            for (let t = 0; t < 128; t++) {
                this.position += i;
                const e = Math.floor(this.position),
                    o = Math.ceil(this.position),
                    r = this.position - e,
                    a = 1 - r,
                    n = this.buffer[e];
                if (void 0 === n) break;
                let u = this.buffer[o];
                void 0 === u && (u = 0), s[t] = n * r + u * a
            }
            return !0
        }
    })
})();
//# sourceMappingURL=TriggeredSamplerProcessor.js.map
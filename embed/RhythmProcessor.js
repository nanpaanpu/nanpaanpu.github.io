(() => {
    "use strict";
    registerProcessor("RhythmProcessor", class extends AudioWorkletProcessor {
        constructor(s) {
            super(s), this.lastClock = 0, this.lastReset = 0, this.position = 0, this.holding = !0, this.sequence = s.processorOptions.sequence, this.port.onmessage = ({
                data: s
            }) => {
                this.sequence = s, this.position = 0 === s.length ? 0 : this.position % s.length
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
                name: "reset",
                defaultValue: 0,
                minValue: -1,
                maxValue: 1,
                automationRate: "k-rate"
            }]
        }
        process(s, [
            [t]
        ], {
            clock: [e],
            reset: [i]
        }) {
            if (this.sequence.length > 0) {
                this.lastReset <= 0 && i > 0 ? (this.position = 0, this.port.postMessage(0), this.holding = !0) : this.lastClock <= 0 && e > 0 && (this.position = (this.position + 1) % this.sequence.length, this.port.postMessage(this.position), this.holding = !0), this.lastReset = i, this.lastClock = e;
                const s = this.sequence[this.position];
                1 === s && this.holding ? (t.fill(0), t[0] = 1, this.holding = !1) : 2 === s ? t.fill(1) : t.fill(0)
            }
            return !0
        }
    })
})();
//# sourceMappingURL=RhythmProcessor.js.map
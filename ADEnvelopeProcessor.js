(() => {
    "use strict";
    
    registerProcessor("ADEnvelopeProcessor", class extends AudioWorkletProcessor {
        constructor(t) {
            super(t), this.lastClock = 0, this.value = 0, this.rising = !1, this.hold = t.processorOptions.hold, this.port.onmessage = ({
                data: t
            }) => {
                this.hold = t
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
                name: "attack",
                defaultValue: .001,
                minValue: .001,
                maxValue: 60,
                automationRate: "k-rate"
            }, {
                name: "decay",
                defaultValue: .5,
                minValue: .001,
                maxValue: 60,
                automationRate: "k-rate"
            }]
        }
        process(t, [
            [e]
        ], {
            clock: [a],
            attack: [s],
            decay: [i]
        }) {
            this.lastClock <= 0 && a > 0 && (this.rising = !0, this.port.postMessage(0)), this.lastClock = a;
            let l = 0;
            if (this.rising) {
                const t = 1 / s / sampleRate;
                l = Math.min(128, Math.ceil((1 - this.value) / t));
                for (let a = 0; a < l; a++) this.value = e[a] = this.value + t;
                this.value >= 1 && (this.value = e[l - 1] = 1, this.rising = !1)
            }
            if (l < 128)
                if (this.hold && a > 0) e.fill(1, l, 128);
                else {
                    const t = 1 / i / sampleRate,
                        a = Math.min(128, Math.ceil(l + this.value / t));
                    for (let s = l; s < a; s++) this.value = e[s] = this.value - t;
                    this.value <= 0 && (this.value = e[a - 1] = 0);
                    for (let t = a; t < 128; t++) e[t] = 0
                }
            return !0
        }
    })
})();
//# sourceMappingURL=ADEnvelopeProcessor.js.map
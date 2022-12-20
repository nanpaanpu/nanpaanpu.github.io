(() => {
    "use strict";
    registerProcessor("SampleAndHoldProcessor", class extends AudioWorkletProcessor {
        constructor() {
            super(...arguments), this.lastClock = 0, this.value = 0
        }
        static get parameterDescriptors() {
            return [{
                name: "clock",
                defaultValue: 0,
                minValue: -1,
                maxValue: 1,
                automationRate: "k-rate"
            }, {
                name: "signal",
                defaultValue: 0,
                automationRate: "k-rate"
            }]
        }
        process(t, [
            [e]
        ], {
            signal: [s],
            clock: [a]
        }) {
            return this.lastClock <= 0 && a > 0 && (this.value = s, this.port.postMessage(0)), this.lastClock = a, e.fill(this.value), !0
        }
    })
})();
//# sourceMappingURL=SampleAndHoldProcessor.js.map
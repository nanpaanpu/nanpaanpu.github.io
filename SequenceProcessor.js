(() => {
    "use strict";
    registerProcessor("SequenceProcessor", class extends AudioWorkletProcessor {
        constructor(s) {
            super(s), this.lastClock = 0, this.lastReset = 0, this.position = 0, this.sequence = s.processorOptions.sequence, this.port.onmessage = ({
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
            return this.sequence.length > 0 && (this.lastReset <= 0 && i > 0 ? (this.position = 0, this.port.postMessage(0)) : this.lastClock <= 0 && e > 0 && (this.position = (this.position + 1) % this.sequence.length, this.port.postMessage(this.position)), this.lastReset = i, this.lastClock = e, t.fill(this.sequence[this.position])), !0
        }
    })
})();
//# sourceMappingURL=SequenceProcessor.js.map
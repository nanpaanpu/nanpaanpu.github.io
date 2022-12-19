(() => {
    "use strict";
    registerProcessor("QuantizerProcessor", class extends AudioWorkletProcessor {
        constructor(s) {
            super(s), this.position = 0, this.range = s.processorOptions.range, this.values = s.processorOptions.values, this.port.onmessage = ({
                data: {
                    range: s,
                    values: t
                }
            }) => {
                s && (this.range = s), t && (this.values = t)
            }
        }
        static get parameterDescriptors() {
            return [{
                name: "signal",
                defaultValue: 0,
                automationRate: "k-rate"
            }]
        }
        process(s, [
            [t],
            [e]
        ], {
            signal: [r]
        }) {
            const {
                values: o,
                range: a
            } = this, i = Math.floor(r / a) * a;
            let n = r % a;
            n < 0 && (n += a);
            let l = 0,
                u = a,
                c = Math.abs(n - a);
            for (let s = 0, t = o.length; s < t; s++) {
                const t = o[s] % a,
                    e = Math.abs(n - t);
                e < c && (l = s, u = t, c = e)
            }
            return t.fill(i + u), e.fill(0), l !== this.position && (e[0] = 1, this.position = l, this.port.postMessage(l)), !0
        }
    })
})();
//# sourceMappingURL=QuantizerProcessor.js.map
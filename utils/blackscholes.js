var NormalD = {
    /**
     * from http://www.math.ucla.edu/~tom/distributions/normal.html
     * @param {Number} X
     * @returns {Number|NormalD.normalcdf.D|NormalD.normalcdf.T}
     */
    normalcdf: function (X) {
        //HASTINGS.  MAX ERROR = .000001
        var T = 1 / (1 + 0.2316419 * Math.abs(X));
        var D = 0.3989423 * Math.exp((-X * X) / 2);
        var Prob =
            D *
            T *
            (0.3193815 +
                T *
                    (-0.3565638 +
                        T * (1.781478 + T * (-1.821256 + T * 1.330274))));
        if (X > 0) {
            Prob = 1 - Prob;
        }
        return Prob;
    },
    /**
     * from http://www.math.ucla.edu/~tom/distributions/normal.html
     * @param {Number} Z x-Value
     * @param {Number} M mean (µ)
     * @param {Number} SD standard deviation
     * @returns {Number|@exp;normalcdf@pro;Prob|@exp;normalcdf@pro;D|@exp;normalcdf@pro;T|normalcdf.Prob|@exp;Math@call;exp|normalcdf.D|@exp;Math@call;abs|normalcdf.T}
     */
    compute: function (Z, M, SD) {
        var Prob;
        if (SD < 0) {
            $C.e("normal", "The standard deviation must be nonnegative.");
        } else if (SD === 0) {
            if (Z < M) {
                Prob = 0;
            } else {
                Prob = 1;
            }
        } else {
            Prob = NormalD.normalcdf((Z - M) / SD);
            Prob = Math.round(100000 * Prob) / 100000;
        }

        return Prob;
    },
    /**
     * standard normal distribution.
     * @param {Number} Z x-Value
     * @returns {Number|normalcdf.D|normalcdf.T|normalcdf.Prob}
     */
    stdcompute: function (Z) {
        return NormalD.compute(Z, 0, 1);
    },
    /**
     * standard density function
     * @param {type} x Value
     * @returns {Number}
     */
    stdpdf: function (x) {
        var m = Math.sqrt(2 * Math.PI);
        var e = Math.exp(-Math.pow(x, 2) / 2);
        return e / m;
    }
};
/**
 * Call: C = S * N(d1) - K * exp (-rt) * N(d2)
 * Put: P = K * exp (-rt) * N(-d2) - S * N(-d1)
 * @type type
 */
var BS = {
    calcD1: function (h) {
        return (
            (Math.log(h.stock / h.strike) +
                (h.interest + 0.5 * Math.pow(h.vola, 2)) * h.term) /
            (h.vola * Math.sqrt(h.term))
        );
    },
    calcD2: function (h) {
        return this.calcD1(h) - h.vola * Math.sqrt(h.term);
    },
    calcS: function (h, phi) {
        return -(h.stock * phi * h.vola) / (2 * Math.sqrt(h.term));
    },
    calcK: function (h, d2) {
        return (
            h.interest *
            h.strike *
            Math.exp(-h.interest * h.term) *
            NormalD.normalcdf(d2)
        );
    },
    calcND2: function (h, d1) {
        return NormalD.normalcdf(d1 - h.vola * Math.sqrt(h.term));
    },
    /**
     * Get the call price
     * @param {BSHolder} BSHolder BS holder variables
     * @returns {Number} Fair Price
     */
    call: function (BSHolder) {
        var d1 = this.calcD1(BSHolder);
        var d2 = this.calcD2(BSHolder);
        var res =
            Math.round(
                (BSHolder.stock * NormalD.stdcompute(d1) -
                    BSHolder.strike *
                        Math.exp(-BSHolder.interest * BSHolder.term) *
                        NormalD.stdcompute(d2)) *
                    100
            ) / 100;
        if (isNaN(res)) {
            return 0;
        }
        return res;
    },
    /**
     * Get the put price
     * @param {BSHolder} BSHolder BS holder variables
     * @returns {Number} Fair Price
     */
    put: function (BSHolder) {
        var d1 = this.calcD1(BSHolder);
        var d2 = this.calcD2(BSHolder);
        var res =
            Math.round(
                (BSHolder.strike *
                    Math.pow(Math.E, -BSHolder.interest * BSHolder.term) *
                    NormalD.stdcompute(-d2) -
                    BSHolder.stock * NormalD.stdcompute(-d1)) *
                    100
            ) / 100;
        if (isNaN(res)) {
            return 0;
        }
        return res;
    },
    /**
     * Get the call delta
     * @param {BSHolder} BSHolder BS holder variables
     * @returns {Float}  call delta
     */
    cdelta: function (BSHolder) {
        var d1 = this.calcD1(BSHolder);
        var res = Math.max(NormalD.stdcompute(d1), 0);
        if (isNaN(res)) {
            return 0;
        }
        return res;
    },
    /**
     * Get the put delta
     * @param {BSHolder} BSHolder BS holder variables
     * @returns {Float}  put delta
     */
    pdelta: function (BSHolder) {
        var d1 = this.calcD1(BSHolder);
        var res = Math.min(NormalD.stdcompute(d1) - 1, 0);
        if (isNaN(res)) {
            return 0;
        }
        return res;
    },
    /**
     * Get the gamma
     * @param {BSHolder} BSHolder BS holder variables
     * @returns {Float}  gamma
     */
    gamma: function (BSHolder) {
        var d1 = this.calcD1(BSHolder);
        var phi = NormalD.stdpdf(d1);
        var res = Math.max(
            phi / (BSHolder.stock * BSHolder.vola * Math.sqrt(BSHolder.term)),
            0
        );
        if (isNaN(res)) {
            return 0;
        }
        return res;
    },
    /**
     * Get the vega
     * @param {BSHolder} BSHolder BS holder variables
     * @returns {Float}  vega
     */
    vega: function (h) {
        var d1 = this.calcD1(BSHolder);
        var phi = NormalD.stdpdf(d1);
        var res = Math.max(
            (BSHolder.stock * phi * Math.sqrt(BSHolder.term)) / 100,
            0
        );
        if (isNaN(res)) {
            return 0;
        }
        return res;
    },
    /**
     * Get the call theta
     * @param {BSHolder} BSHolder BS holder variables
     * @returns {Float}  call theta
     */
    ctheta: function (BSHolder) {
        var d1 = this.calcD1(BSHolder);
        var d2 = this.calcD2(BSHolder);
        var phi = NormalD.stdpdf(d1);
        var s = this.calcS(BSHolder, phi);
        var k = this.calcK(BSHolder, d2);
        var res = Math.min((s - k) / 365, 0);
        if (isNaN(res)) {
            return 0;
        }
        return res;
    },
    /**
     * Get the put theta
     * @param {BSHolder} BSHolder BS holder variables
     * @returns {Float}  put theta
     */
    ptheta: function (BSHolder) {
        var d1 = this.calcD1(BSHolder);
        var d2 = this.calcD2(BSHolder);
        var phi = NormalD.stdpdf(d1);
        var s = this.calcS(BSHolder, phi);
        var k = this.calcK(BSHolder, d2);
        var res = Math.min((s + k) / 365, 0);
        if (isNaN(res)) {
            return 0;
        }
        return res;
    },
    /**
     * Get the call rho
     * @param {BSHolder} BSHolder BS holder variables
     * @returns {Float}  call rho
     */
    crho: function (BSHolder) {
        var d1 = this.calcD1(BSHolder);
        var nd2 = this.calcND2(BSHolder, d1);
        var res = Math.max(
            (BSHolder.term *
                BSHolder.strike *
                Math.exp(-BSHolder.interest * BSHolder.term) *
                nd2) /
                100,
            0
        );
        if (isNaN(res)) {
            return 0;
        }
        return res;
    },
    /**
     * Get the put rho
     * @param {BSHolder} BSHolder BS holder variables
     * @returns {Float}  put rho
     */
    prho: function (BSHolder) {
        var d1 = this.calcD1(BSHolder);
        var nnd2 = NormalD.normalcdf(
            -(d1 - BSHolder.vola * Math.sqrt(BSHolder.term))
        );
        var res = Math.min(
            (-BSHolder.term *
                BSHolder.strike *
                Math.exp(-BSHolder.interest * BSHolder.term) *
                nnd2) /
                100,
            0
        );
        if (isNaN(res)) {
            return 0;
        }
        return res;
    }
};

/**
 * Holder object for BlackScholes variables
 *
 * @param {Float} stock underlying's asset price
 * @param {Float} strike strike price
 * @param {Float} interest annualized risk-free interest rate
 * @param {Float} vola volatility
 * @param {Float} term a time in years
 * @returns {BSHolder}
 */
function BSHolder(stock, strike, interest, vola, term) {
    this.stock = Math.max(stock, 0);
    this.strike = Math.max(strike, 0);
    this.interest = Math.max(interest, 0);
    this.vola = Math.max(vola, 0);
    this.term = Math.max(term, 0);

    this.setStock = function (s) {
        if (typeof s === "undefined") {
            return this.stock;
        } else {
            this.stock = Math.max(s, 0);
            return this;
        }
    };

    this.setStrike = function (s) {
        if (typeof s === "undefined") {
            return this.strike;
        } else {
            this.strike = Math.max(s, 0);
            return this;
        }
    };
    this.setInterest = function (s) {
        if (typeof s === "undefined") {
            return this.interest;
        } else {
            this.interest = Math.max(s, 0);
            return this;
        }
    };
    this.setVola = function (s) {
        if (typeof s === "undefined") {
            return this.vola;
        } else {
            this.vola = Math.max(s, 0);
            return this;
        }
    };
    this.setTerm = function (s) {
        if (typeof s === "undefined") {
            return this.term;
        } else {
            this.term = Math.max(s, 0);
            return this;
        }
    };
    this.put = function (BSHolder) {
        var d1 = BS.calcD1(BSHolder);
        var d2 = BS.calcD2(BSHolder);
        var res =
            Math.round(
                (this.strike *
                    Math.pow(Math.E, -this.interest * this.term) *
                    NormalD.stdcompute(-d2) -
                    this.stock * NormalD.stdcompute(-d1)) *
                    100
            ) / 100;
        if (isNaN(res)) {
            return 0;
        }
        return res;
    };
    return this;
}

module.exports = {
    BSHolder,
    BS
};

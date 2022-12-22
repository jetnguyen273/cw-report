const bs = require("black-scholes");

// const fptInfo = {
//     s: 24.5,
//     k: 28.42,
//     t: 10 / 365,
//     v: 0.2,
//     r: 0.05
// };

const price = bs.blackScholes(24.5, 26.42, 40 / 365, 0.3, 0.02, "call"); // 0.23834902311961947
// const price = bs.blackScholes(30, 34, 0.25, 0.2, 0.08, "put"); // 3.5651039155492974

console.log("price = ", price.toFixed(12));

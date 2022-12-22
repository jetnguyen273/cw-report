const test = require("./../modules/MonitorSecuritiesModule/SecuritiesManagement");

const snapshotShare = {
    id: 21,
    symbol: "AAA",
    name: "CTCP Nhựa An Phát Xanh",
    name_en: "An Phat Bioplastics JSC",
    type: "Stock",
    ceiling: 12.75,
    floor: 11.15,
    prior: 11.95,
    bp3: 0,
    bv3: 0,
    bp2: 0,
    bv2: 0,
    bp1: "0",
    bv1: 0,
    mp: 0,
    mv: 0,
    changed: 0,
    changed_percent: 0,
    ap1: "0",
    av1: 0,
    ap2: 0,
    av2: 0,
    ap3: 0
};

const snapshotCw = {
    id: 4384,
    symbol: "CACB2201",
    name: "",
    name_en: "",
    type: "CoveredWarrant",
    ceiling: 0.77,
    floor: 0.01,
    prior: 0.26,
    bp3: 0.24,
    bv3: 16260,
    bp2: 0.25,
    bv2: 16880,
    bp1: "0.26",
    bv1: 14180,
    mp: 0.28,
    mv: 150,
    changed: 0.02,
    changed_percent: 7.69,
    ap1: "0.27",
    av1: 12630,
    ap2: 0.28,
    av2: 14530,
    ap3: 0.29,
    av3: 15150
};

console.log(
    "result = false ? " + test.edgePriceCanNotPlaceOrder(snapshotShare)
);

console.log("false = ? " + test.edgePriceCanNotPlaceOrder(snapshotCw));

snapshotCw.bp1 = "0";
snapshotCw.ap1 = "0.24";
console.log("true ? " + test.edgePriceCanNotPlaceOrder(snapshotCw));

snapshotCw.bp1 = "0.24";
snapshotCw.ap1 = "0";
console.log("true ? " + test.edgePriceCanNotPlaceOrder(snapshotCw));

snapshotCw.bp1 = "0";
snapshotCw.ap1 = "0";
console.log("true ? " + test.edgePriceCanNotPlaceOrder(snapshotCw));

snapshotShare.bp1 = 0;
snapshotShare.ap1 = 11.2;
console.log("true ? " + test.edgePriceCanNotPlaceOrder(snapshotShare));

snapshotShare.ap1 = 0;
snapshotShare.bp1 = 12.6;
console.log("true ? " + test.edgePriceCanNotPlaceOrder(snapshotShare));

snapshotCw.bp1 = "0";
snapshotCw.ap1 = "0";
snapshotCw.prior = "0.24";
console.log("true ? " + test.edgePriceCanNotPlaceOrder(snapshotCw));

const {
    chooseBuyOrSellOnly
} = require("./../modules/MonitorSecuritiesModule/SecuritiesManagement");

const service = require("./../utils/Service");

service.globalHSXList = [
    {
        ap1: "22.65",
        ap2: 22.7,
        ap3: 22.75,
        av1: 40,
        av2: 390,
        av3: 3560,
        average: 22.73,
        avg_price_5days: 0,
        beta: 0.99,
        bp1: "22.6",
        bp2: 22.55,
        bp3: 22.5,
        bv1: 8020,
        bv2: 570,
        bv3: 53730,
        bvps: 15416,
        ceiling: 24.35,
        lowest: 22.6,
        lowest_price_52weeks: 0,
        market: 1,
        market_cap: 61604418813952,
        maturity_date: "",
        mp: 22.6,
        mv: 12670,
        name: "Ngân hàng TMCP Á Châu",
        name_en: "Asia Commercial Joint Stock Bank",
        ob_volume: 0,
        open: 22.65,
        open_volume: 0,
        os_volume: 0,
        owner_equity: 0,
        pb: 1.48,
        pe: 6.52,
        prior: 22.8,
        floor: 21.25,
        symbol: "ACB"
    }
];

const snapshot = {
    issuer_name: "MBS",
    last_trading_date: "17/10/2022",
    liabilities: 0,
    listed_share: 5000000,
    listed_shares: 0,
    lowest: 0.09,
    lowest_price_52weeks: 0,
    market: 5,
    market_cap: 0,
    maturity_date: "19/10/2022",
    mp: 0.1,
    mv: 40,
    name: "",
    ap1: "0.1",
    ap2: 0.12,
    ap3: 0.13,
    av1: 6540,
    av2: 10,
    av3: 10,
    average: 0.09,
    avg_price_5days: 22.86,
    beta: 0,
    bp1: "0.08",
    bp2: 0.07,
    bp3: 0.04,
    bv1: 100,
    bv2: 15010,
    bv3: 20,
    bvps: 0,
    ceiling: 0.72,
    symbol: "CACB2203",
    type: "CoveredWarrant",
    underlying_price: 22.65,
    underlying_symbol: "ACB",
    floor: 0.01
};

const initAp1 = snapshot.ap1;
const initBp1 = snapshot.bp1;

const initShareAp1 = service.globalHSXList[0].ap1;
const initShareBp1 = service.globalHSXList[0].bp1;

let check = chooseBuyOrSellOnly(snapshot);
console.log("check = false ? ", check);

// cw du mua tran --> skip sell & choose buy
snapshot.bp1 = snapshot.ceiling;
check = chooseBuyOrSellOnly(snapshot);
console.log("check = buy ? ", check);

// cw du ban' san` --> skip buy & choose sell
snapshot.bp1 = initBp1;
snapshot.ap1 = snapshot.floor;
check = chooseBuyOrSellOnly(snapshot);
console.log("check = sell ? ", check);

// ckcs du mua tran --> skip sell & choose buy
snapshot.bp1 = initBp1; // reset
snapshot.ap1 = initAp1; // reset

service.globalHSXList[0].bp1 = service.globalHSXList[0].ceiling;
check = chooseBuyOrSellOnly(snapshot);
console.log("check = buy ? ", check);

// ckcs du ban' san` --> skip buy & choose sell
service.globalHSXList[0].bp1 = initShareBp1;
service.globalHSXList[0].ap1 = service.globalHSXList[0].floor;
check = chooseBuyOrSellOnly(snapshot);
console.log("check = sell ? ", check);

const { initData } = require("../init.data.20.07.2022");
const nReadlines = require("n-readlines");
const broadbandLines = new nReadlines("data.txt");
let {
    securitiesManagement
} = require("../modules/MonitorSecuritiesModule/SecuritiesManagement");
const { LogModel } = require("../database/model");

// LogModel.remove({}, ()=> {
//     console.log('removed')
// })

securitiesManagement.setCwList(initData);

let line;
let lineNumber = 1;

const testInitData = [
    {
        // atc
        id: 4500,
        symbol: "CMBB2207",
        name: "",
        name_en: "",
        type: "CoveredWarrant",
        ceiling: 0.77,
        floor: 0.43,
        prior: 0.6,
        bp3: 0.58,
        bv3: 39790,
        bp2: 0.59,
        bv2: 3640,
        bp1: "0.6",
        bv1: 2700,
        mp: 0.62,
        mv: 90,
        changed: 0.02,
        changed_percent: 3.33,
        ap1: "0.64",
        av1: 100,
        ap2: 0.65,
        av2: 570,
        ap3: 0.69,
        av3: 200,
        highest: 0.65,
        lowest: 0.59,
        open: 0.59,
        open_volume: 0,
        average: 0.59,
        total_value: 83000000,
        total_volume: 14150,
        total_room: 0,
        current_room: 0,
        free_room: 0,
        ob_volume: 0,
        os_volume: 0,
        fb_value: 0,
        fb_volume: 0,
        fs_value: 0,
        fs_volume: 0,
        pt_value: 0,
        pt_volume: 0,
        total_volume_average_10days: 0,
        total_volume_average_30days: 0,
        total_volume_average_90days: 0,
        total_volume_percent: 0,
        highest_price_52weeks: 0,
        lowest_price_52weeks: 0,
        pb: 0,
        pe: 0,
        beta: 0,
        eps: 0,
        roe: 0,
        roa: 0,
        bvps: 0,
        liabilities: 0,
        owner_equity: 0,
        short_term_liabilities: 0,
        total_assets: 0,
        short_term_assets: 0,
        listed_shares: 0,
        share_outstanding: 0,
        market_cap: 0,
        market: 5,
        underlying_symbol: "MBB",
        issuer_name: "KIS",
        covered_warrant_type: "C",
        maturity_date: "03/01/2023",
        last_trading_date: "29/12/2022",
        exercise_price: 23.46,
        exercise_ratio: "10:1",
        listed_share: 1260000,
        cw_value: 1.940001,
        avg_price_5days: 25.37,
        remaining_time_cw: 167,
        inventories: []
    },
    {
        // sell side empty line 673 674
        id: 4525,
        symbol: "CSTB2215",
        name: "",
        name_en: "",
        type: "CoveredWarrant",
        ceiling: 1.51,
        floor: 0.87,
        prior: 1.19,
        bp3: 1.15,
        bv3: 1000,
        bp2: 1.23,
        bv2: 24680,
        bp1: "1.24",
        bv1: 24680,
        mp: 1.25,
        mv: 20,
        changed: 0.06,
        changed_percent: 5.04,
        ap1: "1.25",
        av1: 11110,
        ap2: 0,
        av2: 0,
        ap3: 0,
        av3: 0,
        highest: 1.25,
        lowest: 1.23,
        open: 1.24,
        open_volume: 0,
        average: 1.2,
        total_value: 6000000,
        total_volume: 500,
        total_room: 0,
        current_room: 0,
        free_room: 0,
        ob_volume: 0,
        os_volume: 0,
        fb_value: 0,
        fb_volume: 0,
        fs_value: 0,
        fs_volume: 0,
        pt_value: 0,
        pt_volume: 0,
        total_volume_average_10days: 0,
        total_volume_average_30days: 0,
        total_volume_average_90days: 0,
        total_volume_percent: 0,
        highest_price_52weeks: 0,
        lowest_price_52weeks: 0,
        pb: 0,
        pe: 0,
        beta: 0,
        eps: 0,
        roe: 0,
        roa: 0,
        bvps: 0,
        liabilities: 0,
        owner_equity: 0,
        short_term_liabilities: 0,
        total_assets: 0,
        short_term_assets: 0,
        listed_shares: 0,
        share_outstanding: 0,
        market_cap: 0,
        market: 5,
        underlying_symbol: "STB",
        issuer_name: "KIS",
        covered_warrant_type: "C",
        maturity_date: "28/03/2023",
        last_trading_date: "24/03/2023",
        exercise_price: 22.22,
        exercise_ratio: "5:1",
        listed_share: 10000000,
        cw_value: 1.030001,
        avg_price_5days: 22.97,
        remaining_time_cw: 251,
        inventories: []
    },
    {
        // big diff in price line 699 702
        id: 4501,
        symbol: "CPNJ2202",
        name: "",
        name_en: "",
        type: "CoveredWarrant",
        ceiling: 1.08,
        floor: 0.48,
        prior: 0.78,
        bp3: 0.8,
        bv3: 10,
        bp2: 0.81,
        bv2: 50,
        bp1: "0.82",
        bv1: 20,
        mp: 0.95,
        mv: 40,
        changed: 0.17,
        changed_percent: 21.79,
        ap1: "0.94",
        av1: 10,
        ap2: 0.95,
        av2: 310,
        ap3: 0.97,
        av3: 140,
        highest: 1,
        lowest: 0.74,
        open: 0.95,
        open_volume: 0,
        average: 0.86,
        total_value: 54000000,
        total_volume: 6310,
        total_room: 0,
        current_room: 0,
        free_room: 0,
        ob_volume: 0,
        os_volume: 0,
        fb_value: 0,
        fb_volume: 0,
        fs_value: 0,
        fs_volume: 0,
        pt_value: 0,
        pt_volume: 0,
        total_volume_average_10days: 0,
        total_volume_average_30days: 0,
        total_volume_average_90days: 0,
        total_volume_percent: 0,
        highest_price_52weeks: 0,
        lowest_price_52weeks: 0,
        pb: 0,
        pe: 0,
        beta: 0,
        eps: 0,
        roe: 0,
        roa: 0,
        bvps: 0,
        liabilities: 0,
        owner_equity: 0,
        short_term_liabilities: 0,
        total_assets: 0,
        short_term_assets: 0,
        listed_shares: 0,
        share_outstanding: 0,
        market_cap: 0,
        market: 5,
        underlying_symbol: "PNJ",
        issuer_name: "KIS",
        covered_warrant_type: "C",
        maturity_date: "03/10/2022",
        last_trading_date: "29/09/2022",
        exercise_price: 99.48,
        exercise_ratio: "24.8707:1",
        listed_share: 1250000,
        cw_value: 13.92,
        avg_price_5days: 113.6,
        remaining_time_cw: 75,
        inventories: []
    }
];

const testData = {
    BigDiffInPriceTrue: `Wed Jul 20 2022 13:21:31 GMT+0700 (Indochina Time) | 1658298091.327 | {"id":4501,"symbol":"CPNJ2202","ap1":"0.95","av1":"1000", "bp1":"0.8","bv1":"100"}`,
    BigDiffInPriceFalse: `Wed Jul 20 2022 13:21:33 GMT+0700 (Indochina Time) | 1658298091.327 | {"id":4501,"symbol":"CPNJ2202","ap1":"0.83","av1":"1000", "bp1":"0.8","bv1":"100"}`,

    SellSideEmptyTrue: `Wed Jul 20 2022 13:21:21 GMT+0700 (Indochina Time) | 1658298081.411 | {"id":4525,"symbol":"CSTB2215","ap1":"","av1":""}`,
    SellSideEmptyFalse: `Wed Jul 20 2022 13:21:21 GMT+0700 (Indochina Time) | 1658298081.411 | {"id":4525,"symbol":"CSTB2215","ap1":"1.3","av1":"200"}`,
    SellSideEmptyFalse1: `Wed Jul 20 2022 13:21:21 GMT+0700 (Indochina Time) | 1658298081.411 | {"id":4525,"symbol":"CSTB2215","ap1":"","av1":"200"}`,

    BuySideEmptyTrue: `Wed Jul 20 2022 13:21:21 GMT+0700 (Indochina Time) | 1658298081.411 | {"id":4525,"symbol":"CSTB2215","bp1":"","bv1":""}`,
    BuySideEmptyFalse: `Wed Jul 20 2022 13:21:21 GMT+0700 (Indochina Time) | 1658298081.411 | {"id":4525,"symbol":"CSTB2215","bp1":"1.1","bv1":"100"}`,
    AllSideEmptyTrue: `Wed Jul 20 2022 13:21:21 GMT+0700 (Indochina Time) | 1658298081.411 | {"id":4525,"symbol":"CSTB2215","ap1":"","av1":"", "bp1":"","bv1":""}`,
    AllSideEmptyFalse: `Wed Jul 20 2022 13:21:21 GMT+0700 (Indochina Time) | 1658298081.411 | {"id":4525,"symbol":"CSTB2215","ap1":"1.1","av1":"100", "bp1":"","bv1":""}`,
    AllSideEmptyFalse1: `Wed Jul 20 2022 13:21:21 GMT+0700 (Indochina Time) | 1658298081.411 | {"id":4525,"symbol":"CSTB2215","ap1":"","av1":"100", "bp1":"","bv1":""}`,
    AllSideEmptyFalse2: `Wed Jul 20 2022 13:21:21 GMT+0700 (Indochina Time) | 1658298081.411 | {"id":4525,"symbol":"CSTB2215","ap1":"","av1":"", "bp1":"1","bv1":"200"}`,
    AllSideEmptyFalse3: `Wed Jul 20 2022 13:21:21 GMT+0700 (Indochina Time) | 1658298081.411 | {"id":4525,"symbol":"CSTB2215","ap1":"1.1","av1":"100", "bp1":"","bv1":""}`
};

securitiesManagement.setCwList(testInitData);

// Test buyside empty
console.log("Testing buySide empty.....");

console.log("Testing buySide empty = true?");
let info = testData.BuySideEmptyTrue;
let beginIndex = info.indexOf("{");
info = info.slice(beginIndex, info.length);
let parsedInfo = JSON.parse(info);
console.log(
    "before update bp1 = ",
    securitiesManagement.getOneCw(parsedInfo.symbol).bp1
);
securitiesManagement.updateCwList(parsedInfo.symbol, info);
console.log(
    "after update bp1 = ",
    securitiesManagement.getOneCw(parsedInfo.symbol).bp1
);
let symbol = parsedInfo.symbol;
console.log("buyside is empty = ", securitiesManagement.isBuySideEmpty(symbol));
console.log("----");

console.log("Testing buySide empty = false?");
info = testData.BuySideEmptyFalse;
beginIndex = info.indexOf("{");
info = info.slice(beginIndex, info.length);
parsedInfo = JSON.parse(info);
console.log(
    "before update bp1 = ",
    securitiesManagement.getOneCw(parsedInfo.symbol).bp1
);
securitiesManagement.updateCwList(parsedInfo.symbol, info);
console.log(
    "after update bp1 = ",
    securitiesManagement.getOneCw(parsedInfo.symbol).bp1
);
symbol = parsedInfo.symbol;
console.log("buyside is empty = ", securitiesManagement.isBuySideEmpty(symbol));
console.log("END Testing buySide empty!");
console.log("-------------------------------------");
// end test

// test sellside empty
console.log("Testing sellSide empty.....");

console.log("Testing sellSide empty = true?");
info = testData.SellSideEmptyTrue;
beginIndex = info.indexOf("{");
info = info.slice(beginIndex, info.length);
parsedInfo = JSON.parse(info);
console.log(
    "before update ap1 = ",
    securitiesManagement.getOneCw(parsedInfo.symbol).ap1
);
securitiesManagement.updateCwList(parsedInfo.symbol, info);
console.log(
    "after update ap1 = ",
    securitiesManagement.getOneCw(parsedInfo.symbol).ap1
);
symbol = parsedInfo.symbol;
console.log(
    "Sellside is empty = ",
    securitiesManagement.isSellSideEmpty(symbol)
);

console.log("----");

console.log("Testing sellSide empty = false?");
info = testData.SellSideEmptyFalse;
beginIndex = info.indexOf("{");
info = info.slice(beginIndex, info.length);
parsedInfo = JSON.parse(info);
console.log(
    "before update ap1 = ",
    securitiesManagement.getOneCw(parsedInfo.symbol).ap1
);
securitiesManagement.updateCwList(parsedInfo.symbol, info);
console.log(
    "after update ap1 = ",
    securitiesManagement.getOneCw(parsedInfo.symbol).ap1
);
symbol = parsedInfo.symbol;
console.log(
    "Sellside is empty = ",
    securitiesManagement.isSellSideEmpty(symbol)
);

console.log("----");

console.log("Testing sellSide empty = false?");
info = testData.SellSideEmptyFalse1;
beginIndex = info.indexOf("{");
info = info.slice(beginIndex, info.length);
parsedInfo = JSON.parse(info);
console.log(
    "before update ap1 = ",
    securitiesManagement.getOneCw(parsedInfo.symbol).ap1
);
securitiesManagement.updateCwList(parsedInfo.symbol, info);
console.log(
    "after update ap1 = ",
    securitiesManagement.getOneCw(parsedInfo.symbol).ap1
);
symbol = parsedInfo.symbol;
console.log(
    "Sellside is empty = ",
    securitiesManagement.isSellSideEmpty(symbol)
);

console.log("END Testing SellSide empty!");

console.log("-------------------------------------");
// end test

// test Allside empty
console.log("Testing AllSide empty.....");

console.log("Testing AllSide empty = true?");
info = testData.AllSideEmptyTrue;
beginIndex = info.indexOf("{");
info = info.slice(beginIndex, info.length);
parsedInfo = JSON.parse(info);
console.log(
    "before update ap1, av1, bp1, bv1 = ",
    securitiesManagement.getOneCw(parsedInfo.symbol).ap1,
    securitiesManagement.getOneCw(parsedInfo.symbol).av1,
    securitiesManagement.getOneCw(parsedInfo.symbol).bp1,
    securitiesManagement.getOneCw(parsedInfo.symbol).bv1
);
securitiesManagement.updateCwList(parsedInfo.symbol, info);
console.log(
    "after update ap1 = ",
    securitiesManagement.getOneCw(parsedInfo.symbol).ap1
);
symbol = parsedInfo.symbol;
/////////////
securitiesManagement.decideToPlaceOrder(
    symbol,
    securitiesManagement.getOneCw(parsedInfo.symbol)
);

console.log("Allside is empty = ", securitiesManagement.isAllSideEmpty(symbol));

console.log("----");

console.log("Testing AllSide empty = false?");
info = testData.AllSideEmptyFalse;
beginIndex = info.indexOf("{");
info = info.slice(beginIndex, info.length);
parsedInfo = JSON.parse(info);
console.log(
    "Before update ap1, av1, bp1, bv1 = ",
    securitiesManagement.getOneCw(parsedInfo.symbol).ap1,
    securitiesManagement.getOneCw(parsedInfo.symbol).av1,
    securitiesManagement.getOneCw(parsedInfo.symbol).bp1,
    securitiesManagement.getOneCw(parsedInfo.symbol).bv1
);
securitiesManagement.updateCwList(parsedInfo.symbol, info);
console.log(
    "After update ap1, av1, bp1, bv1 = ",
    securitiesManagement.getOneCw(parsedInfo.symbol).ap1,
    securitiesManagement.getOneCw(parsedInfo.symbol).av1,
    securitiesManagement.getOneCw(parsedInfo.symbol).bp1,
    securitiesManagement.getOneCw(parsedInfo.symbol).bv1
);
symbol = parsedInfo.symbol;
console.log("Allside is empty = ", securitiesManagement.isAllSideEmpty(symbol));
securitiesManagement.decideToPlaceOrder(
    symbol,
    securitiesManagement.getOneCw(parsedInfo.symbol)
);

console.log("----");

console.log("Testing AllSide empty = false?");
info = testData.AllSideEmptyFalse1;
beginIndex = info.indexOf("{");
info = info.slice(beginIndex, info.length);
parsedInfo = JSON.parse(info);
console.log(
    "Before update ap1, av1, bp1, bv1 = ",
    securitiesManagement.getOneCw(parsedInfo.symbol).ap1,
    securitiesManagement.getOneCw(parsedInfo.symbol).av1,
    securitiesManagement.getOneCw(parsedInfo.symbol).bp1,
    securitiesManagement.getOneCw(parsedInfo.symbol).bv1
);
securitiesManagement.updateCwList(parsedInfo.symbol, info);
console.log(
    "After update ap1, av1, bp1, bv1 = ",
    securitiesManagement.getOneCw(parsedInfo.symbol).ap1,
    securitiesManagement.getOneCw(parsedInfo.symbol).av1,
    securitiesManagement.getOneCw(parsedInfo.symbol).bp1,
    securitiesManagement.getOneCw(parsedInfo.symbol).bv1
);
symbol = parsedInfo.symbol;
console.log("Allside is empty = ", securitiesManagement.isAllSideEmpty(symbol));

console.log("----");

console.log("Testing AllSide empty = false?");
info = testData.AllSideEmptyFalse2;
beginIndex = info.indexOf("{");
info = info.slice(beginIndex, info.length);
parsedInfo = JSON.parse(info);
console.log(
    "before update ap1, av1, bp1, bv1 = ",
    securitiesManagement.getOneCw(parsedInfo.symbol).ap1,
    securitiesManagement.getOneCw(parsedInfo.symbol).av1,
    securitiesManagement.getOneCw(parsedInfo.symbol).bp1,
    securitiesManagement.getOneCw(parsedInfo.symbol).bv1
);
securitiesManagement.updateCwList(parsedInfo.symbol, info);
console.log(
    "After update ap1, av1, bp1, bv1 = ",
    securitiesManagement.getOneCw(parsedInfo.symbol).ap1,
    securitiesManagement.getOneCw(parsedInfo.symbol).av1,
    securitiesManagement.getOneCw(parsedInfo.symbol).bp1,
    securitiesManagement.getOneCw(parsedInfo.symbol).bv1
);
symbol = parsedInfo.symbol;
console.log("Allside is empty = ", securitiesManagement.isAllSideEmpty(symbol));

console.log("----");

console.log("Testing AllSide empty = false?");
info = testData.AllSideEmptyFalse3;
beginIndex = info.indexOf("{");
info = info.slice(beginIndex, info.length);
parsedInfo = JSON.parse(info);
console.log(
    "Before update ap1, av1, bp1, bv1 = ",
    securitiesManagement.getOneCw(parsedInfo.symbol).ap1,
    securitiesManagement.getOneCw(parsedInfo.symbol).av1,
    securitiesManagement.getOneCw(parsedInfo.symbol).bp1,
    securitiesManagement.getOneCw(parsedInfo.symbol).bv1
);
securitiesManagement.updateCwList(parsedInfo.symbol, info);
console.log(
    "After update ap1, av1, bp1, bv1 = ",
    securitiesManagement.getOneCw(parsedInfo.symbol).ap1,
    securitiesManagement.getOneCw(parsedInfo.symbol).av1,
    securitiesManagement.getOneCw(parsedInfo.symbol).bp1,
    securitiesManagement.getOneCw(parsedInfo.symbol).bv1
);
symbol = parsedInfo.symbol;
console.log("Allside is empty = ", securitiesManagement.isAllSideEmpty(symbol));

console.log("END Testing AllSide empty!");

console.log("-------------------------------------");
// end test

// test priceDiffBig
console.log("Testing test priceDiffBig.....");

console.log("Testing test priceDiffBig = true?");
info = testData.BigDiffInPriceTrue;
beginIndex = info.indexOf("{");
info = info.slice(beginIndex, info.length);
parsedInfo = JSON.parse(info);
console.log(
    "before update ap1, av1, bp1, bv1 = ",
    securitiesManagement.getOneCw(parsedInfo.symbol).ap1,
    securitiesManagement.getOneCw(parsedInfo.symbol).av1,
    securitiesManagement.getOneCw(parsedInfo.symbol).bp1,
    securitiesManagement.getOneCw(parsedInfo.symbol).bv1
);

securitiesManagement.updateCwList(parsedInfo.symbol, info);
console.log(
    "before update ap1, av1, bp1, bv1 = ",
    securitiesManagement.getOneCw(parsedInfo.symbol).ap1,
    securitiesManagement.getOneCw(parsedInfo.symbol).av1,
    securitiesManagement.getOneCw(parsedInfo.symbol).bp1,
    securitiesManagement.getOneCw(parsedInfo.symbol).bv1
);

symbol = parsedInfo.symbol;
console.log(
    "test priceDiffBig = ",
    securitiesManagement.isDiffPriceBig(symbol)
);

console.log("----");

console.log("Testing test priceDiffBig = false?");
info = testData.BigDiffInPriceFalse;
beginIndex = info.indexOf("{");
info = info.slice(beginIndex, info.length);
parsedInfo = JSON.parse(info);
console.log(
    "Before update ap1, av1, bp1, bv1 = ",
    securitiesManagement.getOneCw(parsedInfo.symbol).ap1,
    securitiesManagement.getOneCw(parsedInfo.symbol).av1,
    securitiesManagement.getOneCw(parsedInfo.symbol).bp1,
    securitiesManagement.getOneCw(parsedInfo.symbol).bv1
);
securitiesManagement.updateCwList(parsedInfo.symbol, info);
console.log(
    "After update ap1, av1, bp1, bv1 = ",
    securitiesManagement.getOneCw(parsedInfo.symbol).ap1,
    securitiesManagement.getOneCw(parsedInfo.symbol).av1,
    securitiesManagement.getOneCw(parsedInfo.symbol).bp1,
    securitiesManagement.getOneCw(parsedInfo.symbol).bv1
);
symbol = parsedInfo.symbol;
console.log(
    "test priceDiffBig = ",
    securitiesManagement.isDiffPriceBig(symbol)
);

console.log("END test priceDiffBig!");

console.log("-------------------------------------");
// end test

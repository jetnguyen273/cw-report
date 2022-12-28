const { parentPort, workerData } = require("worker_threads");
const mysqlConn = require("./../modules/HedgingModule/mysqlConn");
const mssqlConn = require("./../modules/HedgingModule/mssqlConn");

const iv = require("implied-volatility");
const fomular = require("./../utils/formula");

const configs = require("./../modules/SupportReportModule/config");
const supportReportService = require("./../database/SupportReportService");
const service = require("./../utils/Service");

// console.log("in woker thread ", workerData.cwList);

const globalHSXList = workerData.hsxList;
const vn30List = workerData.vn30List; // for search underlying symbol of cw

const ivVn30List = workerData.Vn30List; // config for calculate IV

async function storeIvForVn30() {
    try {
        // const xxx = await supportReportService.getSymbolIv();
        // for (const i of xxx) {
        //     const t = new Date(i.today_time);
        //     await mssqlConn.insertToMssql(i.symbol, i.iv, t);
        // }
        const d = configs.INTERVAL;
        for (const us of ivVn30List) {
            const days = parseInt(d) + 1;
            const closePrices = await mysqlConn.getClosePriceSymbol(us, days);

            if (closePrices.status && closePrices.status === "ERROR") {
                // return res.send({
                //     message: closePrices.message,
                //     status: "ERROR"
                // });
                return false;
            }

            const closePriceArr =
                closePrices[0] &&
                closePrices[0].map((item) => item.adjust_price);
            // console.log(closePrices);
            // console.log("symbol = ", us);
            // if (us == "VIB") {
            //     console.log("ddddd");
            // }
            const iv = fomular.hisIV(closePriceArr);

            // store to db
            const refDate = new Date();
            const todayTime = new Date(
                refDate.getFullYear(),
                refDate.getMonth(),
                refDate.getDate(),
                +0,
                +0,
                +0
            ).getTime();
            await mssqlConn.insertToMssql(us, iv, refDate);
            // await mssqlConn.insertToMssql(us, iv, refDate);
            await supportReportService.addSymbolIv(us, days, iv, todayTime);
        }
    } catch (e) {
        console.log(e);
    }
}

// for quick insert
const dayList = [
    "2022-12-15",
    "2022-12-16",
    "2022-12-19",
    "2022-12-20",
    "2022-12-21",
    "2022-12-22",
    "2022-12-23",
    "2022-12-26"
];
async function storeIvForVn30WithDateFrom() {
    try {
        const d = configs.INTERVAL;
        for (const us of ivVn30List) {
            const days = parseInt(d) + 1;
            for (const day of dayList) {
                const closePrices = await mysqlConn.getClosePriceSymbolFromDate(
                    us,
                    days,
                    day
                );

                if (closePrices.status && closePrices.status === "ERROR") {
                    // return res.send({
                    //     message: closePrices.message,
                    //     status: "ERROR"
                    // });
                    return false;
                }

                const closePriceArr =
                    closePrices[0] &&
                    closePrices[0].map((item) => item.adjust_price);
                // console.log(closePrices);
                // console.log("symbol = ", us);
                // if (us == "VIB") {
                //     console.log("ddddd");
                // }
                const iv = fomular.hisIV(closePriceArr);

                // store to db
                const refDate = new Date(day);
                await mssqlConn.insertToMssql(us, iv, refDate);
            }
        }
    } catch (e) {
        console.log(e);
    }
}

function getParamsForBs(snapshotOfCw) {
    const maturityDate = snapshotOfCw.maturity_date;
    if (!maturityDate) {
        return false; // not cw
    }
    let ss = maturityDate.split("/");

    const lastDay = new Date(ss[2], ss[1] - 1, ss[0]);

    const dateNow = new Date();
    dateNow.setHours(0, 0, 0, 0);

    difference = Math.abs(lastDay - dateNow) / (1000 * 3600 * 24);
    // service.globalHSXList
    const foundSymbol = vn30List.find(
        (item) => item.symbol == snapshotOfCw.underlying_symbol
    );
    const ratio = snapshotOfCw.exercise_ratio.split(":");
    let rr = 0;
    if (ratio[0]) {
        rr = parseFloat(ratio[0]);
    }

    // get r of this symbol from db
    const configR = configs.R;
    return {
        sForIv: foundSymbol.prior * 1000, // snapshotOfCw.underlying_price,
        sForPs: foundSymbol.mp != 0 ? foundSymbol.mp : foundSymbol.prior,
        k: snapshotOfCw.exercise_price * 1000,
        t: difference,
        r: configR, // r = 0.03 - 0.08 --> cần lấy từ config
        n: rr,
        expectedCost: CEILINGPRICE //snapshotOfCw.prior * 1000
    };
}

function getParamsForBsFromApiData(snapshotOfCw, cw) {
    if (!snapshotOfCw) {
        return false;
    }
    console.log("cw = ", cw, snapshotOfCw);
    // '20000/10000'  Tue Jan 03 2023 07:00:00 GMT+0700 (Indochina Time) 24000
    const { EXERCISERATIO, EXERCISEPRICE, MATURITYDATE, CEILINGPRICE, SYMBOL } =
        snapshotOfCw;
    // const maturityDate =
    //     snapshotOfCw && snapshotOfCw.maturity_date
    //         ? snapshotOfCw.maturity_date
    //         : "3/3/2023";
    // if (!maturityDate) {
    //     return false; // not cw
    // }
    // let ss = maturityDate.split("/");

    // const lastDay = new Date(ss[2], ss[1] - 1, ss[0]);
    const lastDay = new Date(MATURITYDATE);

    const dateNow = new Date();
    dateNow.setHours(0, 0, 0, 0);

    difference = Math.abs(lastDay - dateNow) / (1000 * 3600 * 24);
    // service.globalHSXList
    const uS = SYMBOL.substring(1, 4);
    const foundSymbol = vn30List.find((item) => item.symbol == uS);
    // const ratioString = snapshotOfCw.exercise_ratio
    //     ? snapshotOfCw.exercise_ratio
    //     : "5:1";
    const ratio = EXERCISERATIO.split("/");
    let rr = 0;
    if (ratio[0]) {
        rr = parseFloat(ratio[0]);
    }

    // get r of this symbol from db
    const configR = configs.R;
    return {
        sForIv: foundSymbol.prior * 1000, // snapshotOfCw.underlying_price,
        sForPs: foundSymbol.mp != 0 ? foundSymbol.mp : foundSymbol.prior,
        k: EXERCISEPRICE,
        t: difference,
        r: configR, // r = 0.03 - 0.08 --> cần lấy từ config
        n: ratio[0] / ratio[1],
        expectedCost: CEILINGPRICE //snapshotOfCw.reference
    };
}

async function storeCwIv() {
    const refDate = new Date();
    const todayTime = new Date(
        refDate.getFullYear(),
        refDate.getMonth(),
        refDate.getDate(),
        +0,
        +0,
        +0
    ).getTime();
    for (const cw of configs.CW_LIST) {
        const foundCw = globalHSXList.find((item) => item.symbol == cw);
        // const foundCw = await service.getDatafeed(cw);
        if (!foundCw) {
            return false;
        }
        const { expectedCost, s, k, t, r, sForIv, n } = getParamsForBs(foundCw);

        const iv = calculateIv(expectedCost * n, sForIv, k, t / 365, r);
        // save to db
        await supportReportService.addCwIv(
            cw,
            expectedCost,
            sForIv,
            k,
            r,
            t,
            iv,
            todayTime
        );
    }
}

async function storeCwIvFromApiData() {
    try {
        for (const time of dayList) {
            const todayTime = new Date(time);
            for (const cw of configs.CW_LIST) {
                // const foundCw = globalHSXList.find((item) => item.symbol == cw);
                // const foundCw = await service.getDatafeed(cw);
                const foundCw = await mssqlConn.getCwSercuritiesInfo(cw);
                console.log(foundCw.recordset[0]);
                if (foundCw) {
                    const { expectedCost, s, k, t, r, sForIv, n } =
                        getParamsForBsFromApiData(foundCw.recordset[0], cw);

                    const iv = calculateIv(
                        expectedCost * n,
                        sForIv,
                        k,
                        t / 365,
                        r
                    );
                    // save to db
                    await mssqlConn.insertToMssql(cw, iv, todayTime);
                }
            }
        }
    } catch (e) {
        console.log(e);
    }
}

function calculateIv(
    expectedCost,
    s,
    k,
    t,
    r,
    callPut = "call"
    // estimate = 0.1
) {
    const impliedVol = iv.getImpliedVolatility(
        expectedCost,
        s,
        k,
        t,
        r,
        callPut
    );
    if (impliedVol == null) {
        console.log("impliedVol= ", impliedVol);
    }
    return impliedVol;
}

function updateShareList(symbol, properties) {
    try {
        if (vn30List.length > 0) {
            let index = vn30List.findIndex(
                (element) => element.symbol == symbol
            );
            if (index >= 0) {
                const parsedData = JSON.parse(properties);
                for (const property in parsedData) {
                    // console.log(`${property}: ${parsedData[property]}`);
                    if (`${parsedData[property]}` != "") {
                        vn30List[index][property] = parsedData[property];
                        // delete parsedData[property];
                    }
                }
                return true;
            }
            console.log("khong tim thay ma chung khoan????uu");
            return false;
        } else {
            console.log("Danh sách chứng khoan chưa được khởi tạo xong!!");
            return false;
        }
    } catch (e) {
        console.log("error = ", e);
    }
}

function updateCwList(symbol, properties) {
    if (globalHSXList.length > 0) {
        let index = globalHSXList.findIndex(
            (element) => element.symbol == symbol
        );
        if (index >= 0) {
            const parsedData = JSON.parse(properties);
            for (const property in parsedData) {
                // console.log(`${property}: ${parsedData[property]}`);
                if (`${parsedData[property]}` != "") {
                    globalHSXList[index][property] = parsedData[property];
                    // delete parsedData[property];
                }
            }
            return true;
        }
        console.log("khong tim thay ma chung quyen????");
        return false;
    } else {
        console.log("Danh sách chứng quyền chưa được khởi tạo xong!-!");
        return false;
    }
}

// Listen for a message from worker
parentPort.on("message", async (result) => {
    // console.log(result);
    try {
        const { orderType, properties, symbol } = result;
        if (orderType === "PROCESS_CW_IV") {
            // console.log("helllo");
            // storeCwIv();
            storeCwIvFromApiData();
        } else if (orderType === "UPDATE_CW") {
            // console.log("update cw list in worker thread");
            // update cw list
            updateCwList(symbol, properties);
        } else if (orderType === "UPDATE_VN30_LIST") {
            // console.log("update VN30 list in worker thread");
            // update VN30 list
            updateShareList(symbol, properties);
        } else if (orderType === "PROCESS_VN30_IV") {
            // console.log("helllo");
            // storeIvForVn30();
            // const fromDate = new Date(2022, 11, 16, 0, 0, 0);
            storeIvForVn30WithDateFrom();
        }
    } catch (e) {
        console.log(e);
    }
});

parentPort.on("error", (error) => {
    console.log(error);
});
parentPort.on("exit", (exitCode) => {
    console.log(exitCode);
});

const axios = require("axios");
const https = require("https");
// const settingSystemService = require("./../database/SystemSettingService");
// const settingIvService = require("./../database/SymbolService");
// At request level
const agent = new https.Agent({
    rejectUnauthorized: false
});

const {
    defaultLoginInfo,
    exeOrderCode,
    responeStatus,
    url
} = require("./Constants");

let globalCwList = [];
let globalmarketInfo = [];
let globalindexInfoList = [];
let globalVN30 = [];
let globalHSXList = [];
let globalCwListForMM = [];

let globalSymbolList = [];
let globalMmPauseValue = false;

let orderIdList = [];

let ruleTimerToPlaceOrder = null;
let minCw = 0;
let minDiff = 0.05;
let maturityDateCF = 14;

const settingForIv = [];
let mmCwList = [];
let mmSubAccount = "";

async function initSystemSetting() {
    const rr = await settingSystemService.getSystemSettingByName(
        "ruleTimerToPlaceOrder"
    );
    const rr1 = await settingSystemService.getSystemSettingByName("minCw");
    const rr2 = await settingSystemService.getSystemSettingByName("minDiff");
    const rr3 = await settingSystemService.getSystemSettingByName(
        "maturityDateCF"
    );
    return {
        ruleTimerToPlaceOrder: rr.value,
        minCw: rr1.value,
        minDiff: rr2.value,
        maturityDateCF: rr3.value
    };
}

async function initSettingIv() {
    const rr = await settingIvService.getAvailableFollowSymbols();
    if (rr.length > 0) {
        rr.forEach((item) => {
            settingForIv.push({
                symbol: item.symbol,
                r: item.r_ipo,
                v: item.v_ipo,
                id: item._id
            });
        });
        return rr;
    }
    return [];
}

function getSettingForIv(symbol) {
    const found = settingForIv.find((item) => item.symbol == symbol);
    if (!found) {
        return 3.15; // default incase can not find cw in db
    }
    return found.r;
}

// function reassignSettingValue(name, value) {
//     if (name == "ruleTimerToPlaceOrder") {
//         ruleTimerToPlaceOrder = value;
//     }
// }

function setGlobalValues(cw, market, index) {
    globalCwList = cw;
    globalindexInfoList = index;
    globalmarketInfo = market;
}

function getGlobalValues() {
    return {
        globalCwList,
        globalindexInfoList,
        globalmarketInfo
    };
}

async function login(info = defaultLoginInfo) {
    try {
        const res = await axios.post(`${url}/sso/oauth/token`, info, {
            httpsAgent: agent
        });
        return res.data;
    } catch (e) {
        console.log(">>> login error: ", e);
        return false;
    }
}

async function placeOrder(orderInfo, accountId, token) {
    try {
        const result = await axios.post(
            `${url}/accounts/${accountId}/orders`,
            orderInfo,
            {
                headers: { Authorization: token, "x-via": "K", "x-lang": "vi" },
                httpsAgent: agent
            }
        );

        // order.data.d.code = exeOrderCode;

        // const result = await axios.post(
        //     `${url}/execTransaction`,
        //     order.data.d,
        //     {
        //         // headers: { 'Authorization': authInfo.access_token, 'x-lang': 'vi' },
        //         headers: { Authorization: token, "x-lang": "vi" }
        //     }
        // );

        return {
            status: responeStatus.ok,
            data: result.data,
            message: "Place order successfully"
        };
    } catch (e) {
        console.log(e);

        return {
            status: responeStatus.error,
            data: e.code,
            message: e
        };
    }
}

async function updateOrder(orderInfo, token) {
    try {
        const result = await axios.put(
            `${url}/accounts/${orderInfo.accountId}/orders/${orderInfo.orderId}`,
            orderInfo,
            {
                headers: { Authorization: token, "x-via": "K", "x-lang": "vi" },
                httpsAgent: agent
            }
        );

        return {
            status: responeStatus.ok,
            data: result.data
        };
    } catch (e) {
        return {
            status: responeStatus.error,
            data: "error when updating order!"
        };
    }
}

async function deleteOrder(accountId, orderId, token, timeType = "T") {
    try {
        const result = await axios.delete(
            `${url}/accounts/${accountId}/orders/${orderId}?timeType=${timeType}`,
            {
                headers: { Authorization: token, "x-via": "K", "x-lang": "vi" },
                httpsAgent: agent
            }
        );
        return { status: responeStatus.ok, data: result.data };
    } catch (e) {
        return {
            status: responeStatus.error,
            data: "error when deleting order!"
        };
    }
}

async function getAllWaitingOrder(token, subAccountId) {
    try {
        const result = await axios.get(
            `${url}/inq/accounts/${subAccountId}/ordersMatchWaiting`,
            {
                headers: { Authorization: token, "x-via": "K", "x-lang": "vi" },
                httpsAgent: agent
            }
        );
        return { status: responeStatus.ok, data: result.data };
    } catch (e) {
        return {
            status: responeStatus.error,
            data: "error when deleting order!"
        };
    }
}

async function getCiAccountOfSubAccount(subAccountId, token) {
    // /inq/accounts/{accountId}/ciaccount
    try {
        const result = await axios.get(
            `${url}/inq/accounts/${subAccountId}/ciaccount`,
            {
                headers: { Authorization: token, "x-via": "K", "x-lang": "vi" },
                httpsAgent: agent
            }
        );
        return { status: responeStatus.ok, data: result.data };
    } catch (e) {
        console.log("Get balance subAcc ERR : ", e);
        return {
            status: responeStatus.error,
            data: "error when getting securitiesPortfolio!"
        };
    }
}

// /inq/accounts/{accountId}/subAccountSummary
async function getSubAccountSummary(subAccountId, token) {
    // /inq/accounts/{accountId}/ciaccount
    try {
        const result = await axios.get(
            `${url}/inq/accounts/${subAccountId}/subAccountSummary`,
            {
                headers: { Authorization: token, "x-via": "K", "x-lang": "vi" },
                httpsAgent: agent
            }
        );
        return { status: responeStatus.ok, data: result.data };
    } catch (e) {
        console.log("Get balance subAcc ERR : ", e);
        return {
            status: responeStatus.error,
            data: "error when getting securitiesPortfolio!"
        };
    }
}

async function getAvailableTradeOfSubAccount(subAccountId, token) {
    // 0102151816
    try {
        const result = await axios.get(
            `${url}/inq/accounts/${subAccountId}/securitiesPortfolio`,
            {
                headers: { Authorization: token, "x-via": "K", "x-lang": "vi" },
                httpsAgent: agent
            }
        );
        return { status: responeStatus.ok, data: result.data };
    } catch (e) {
        console.log("Get balance subAcc ERR : ", e);
        return {
            status: responeStatus.error,
            data: "error when getting securitiesPortfolio!"
        };
    }
}

async function getBalanceOfSubAccount(subAccountId, token) {
    // /inq/accounts/{accountId}/securitiesPortfolio
    try {
        const result = await axios.get(
            `${url}/inq/accounts/${subAccountId}/securitiesPortfolio`,
            {
                headers: { Authorization: token, "x-via": "K", "x-lang": "vi" },
                httpsAgent: agent
            }
        );
        return { status: responeStatus.ok, data: result.data };
    } catch (e) {
        console.log("Get balance subAcc ERR : ", e);
        return {
            status: responeStatus.error,
            data: "error when getting securitiesPortfolio!"
        };
    }
}

async function getAvailableTrade(
    subAccountId,
    token,
    symbol = null,
    quotePrice = null
) {
    try {
        let queryString = "";
        if (symbol) {
            queryString += "symbol=" + symbol;
        }
        if (quotePrice) {
            queryString += "&quotePrice=" + quotePrice;
        }
        const result = await axios.get(
            `${url}/inq/accounts/${subAccountId}/availableTrade?${queryString}`,
            {
                headers: { Authorization: token, "x-via": "K", "x-lang": "vi" },
                httpsAgent: agent
            }
        );
        return { status: responeStatus.ok, data: result.data };
    } catch (e) {
        return {
            status: responeStatus.error,
            data: "error when getting securitiesPortfolio!"
        };
    }
}

async function getSecuritiesInfo(token, symbol) {
    try {
        const result = await axios.get(
            `${url}/datafeed/instrument?symbols=${symbol}&brief=false`,
            {
                headers: { Authorization: token, "x-via": "K", "x-lang": "vi" },
                httpsAgent: agent
            }
        );
        return { status: responeStatus.ok, data: result.data };
    } catch (e) {
        return {
            status: responeStatus.error,
            data: "error when getting securitiesPortfolio!"
        };
    }
}

function getInitCwList() {
    // return getGlobalValues().globalCwList;
    return globalCwList;
}

async function getDailyOrder(subAccountId, token) {
    try {
        const result = await axios.get(
            `${url}/inq/accounts/${subAccountId}/dailyOrder`,
            {
                headers: { Authorization: token, "x-via": "K", "x-lang": "vi" },
                httpsAgent: agent
            }
        );
        if (result.data.s == "error") {
            return {
                status: responeStatus.error,
                message:
                    "axios error! when get daily orders of sub acc " +
                    subAccountId
            };
        }
        return { status: responeStatus.ok, data: result.data };
    } catch (e) {
        return {
            status: responeStatus.error,
            data: "error when getting securitiesPortfolio!"
        };
    }
}

function isDiffWithDataFromApi(dataFromApi = [], currentData = []) {
    let isDiff = false;
    dataFromApi.forEach((order) => {
        const found = currentData.find((item) => item.orderId == order.orderid);
        if (found) {
            if (
                order.orstatusvalue != found.status ||
                (order.orstatusvalue == 4 &&
                    order.remainqtty != found.remainVolume)
            ) {
                isDiff = true;
                return;
            }
        } else {
            isDiff = true;
            return;
        }
    });
    return isDiff;
}

async function getDatafeed(cw) {
    try {
        const res = await axios.get(
            `${url}/datafeed/instrument?symbols=${cw}&brief=false`,
            {
                httpsAgent: agent
            }
        );
        return res.data.d.length > 0 ? res.data : false;
    } catch (e) {
        console.log(">>> login error: ", e);
        return false;
    }
}

module.exports = {
    login,
    placeOrder,
    updateOrder,
    deleteOrder,
    getAllWaitingOrder,
    getBalanceOfSubAccount,
    getAvailableTrade,
    getGlobalValues,
    setGlobalValues,
    getInitCwList,
    globalCwList,
    globalmarketInfo,
    globalindexInfoList,
    globalSymbolList,
    globalVN30,
    globalHSXList,
    getSecuritiesInfo,
    globalCwListForMM,
    globalMmPauseValue,
    getCiAccountOfSubAccount,
    getAvailableTradeOfSubAccount,
    getSubAccountSummary,
    getDailyOrder,
    isDiffWithDataFromApi,
    orderIdList,
    ruleTimerToPlaceOrder,
    initSystemSetting,
    settingForIv,
    initSettingIv,
    getSettingForIv,
    mmCwList,
    minCw,
    minDiff,
    maturityDateCF,
    mmSubAccount,
    getDatafeed
};

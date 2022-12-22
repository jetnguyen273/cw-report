const marketType = {
    ALL_MARKET: 0,
    HSX_MARKET: 1,
    HNX_MARKET: 2,
    UPCOM_MARKET: 3,
    DERIVATIVE_MARKET: 4,
    COVERED_WARRANT_MARKET: 5,

    HSX_OL_MARKET: 6,
    HNX_OL_MARKET: 7,
    UPCOM_OL_MARKET: 8,

    HSX_PUTTHROUGH_MARKET: 9,
    HNX_PUTTHROUGH_MARKET: 10,
    UPCOM_PUTTHROUGH_MARKET: 11,

    WATCHING_LIST: 12,
    SHARE_DETAIL: 13,
    INDEX_DETAIL: 14,
    DERIVATIVE_DETAIL: 15,
    COVERED_WARRANT_DETAIL: 17
};

const VN30List = [
    "ACB",
    "BID",
    "BVH",
    "CTG",
    "FPT",
    "GAS",
    "GVR",
    "HDB",
    "HPG",
    "KDH",
    "MBB",
    "MSN",
    "MWG",
    "NVL",
    "PDR",
    "PLX",
    "POW",
    "SAB",
    "SSI",
    "STB",
    "TCB",
    "TPB",
    "VCB",
    "VHM",
    "VIB",
    "VIC",
    "VJC",
    "VNM",
    "VPB",
    "VRE"
];

const MY_SQL_CONFIG = {
    host: "192.168.10.37",
    user: "phs",
    password: "123456",
    database: "hedging_uat"
};

const MONGO_CONNECTION_STRING = "mongodb://127.0.0.1/usersdbb";

// const SIGNAL_R_CONNECTION_STRING = "http://192.168.4.127/signalr";
const SIGNAL_R_CONNECTION_STRING = "http://priceboard.phs.vn/signalr";

const defaultLoginInfo = {
    grant_type: "password",
    username: "HEDG01",
    password: "123456",
    client_id: "KRYRTHUYUI",
    client_secret: "XPLk6emmVVzbEqlaumyPU4b6jjKTuT"
};
const defaultLoginInfoForMM = {
    grant_type: "password",
    username: "MMK01",
    password: "123456",
    client_id: "KRYRTHUYUI",
    client_secret: "XPLk6emmVVzbEqlaumyPU4b6jjKTuT"
};

const minimumPriceOfCwToSkipPlaceOrder = 10;
const minNumberOfCwInAccToSkipPlaceOrder = 100;

const clientInfo = {
    accountId: "022P000113",
    subAccountId: "0001000007",
    userName: "CTY CP CHUNG KHOAN PHU HUNG"
};
const socketClientInfoForMM = {
    accountId: "022P000113",
    subAccountId: "0001000006",
    userName: "CTY CP CHUNG KHOAN PHU HUNG"
};

// const url = "https://uat-stock-api.phs.vn";
const url = "https://192.168.4.150";
const query =
    "__sails_io_sdk_version=1.2.1&__sails_io_sdk_platform=browser&__sails_io_sdk_language=javascript&clientid=KRYRTHUYUI&clientsecret=XPLk6emmVVzbEqlaumyPU4b6jjKTuT";

const orderStatus = {
    SO_TU_CHOI: "OD_ORSTATUS_0",
    MO: "OD_ORSTATUS_1",
    DA_GUI: "OD_ORSTATUS_2",
    DA_HUY: "OD_ORSTATUS_3",
    DANG_SUA: "OD_ORSTATUS_A",
    DA_KHOP: "OD_ORSTATUS_4",
    HET_HIEU_LUC: "OD_ORSTATUS_5",
    DANG_HUY: "OD_ORSTATUS_C",
    TU_CHOI: "OD_ORSTATUS_6",
    HOAN_THANH: "OD_ORSTATUS_7",
    CHO_GUI: "OD_ORSTATUS_8",
    CHO_DUYET: "OD_ORSTATUS_9",
    DA_SUA: "OD_ORSTATUS_10",
    DANG_GUI: "OD_ORSTATUS_11",
    KHOP_HET: "OD_ORSTATUS_12",
    CHO_XAC_NHAN: "OD_ORSTATUS_13",
    CHO_XU_LY: "OD_ORSTATUS_P",
    HET_HAN: "OD_ORSTATUS_E",
    HUY_BO: "OD_ORSTATUS_R",
    CHO_KY_QUY_NGAN_HANG: "OD_ORSTATUS_W",

    SEND_VIA_AXIOS_OK: "SEND_VIA_AXIOS_OK",
    ORDERED: "ORDERED",
    WAITING_TO_SEND: 8,
    SENT: 2,
    MATCH: 4,
    FINISH: 7,
    REJECT: 6,
    MATCH_ALL: 12,
    CANCELLING: "C",
    UPDATING: "A",
    // UPDATED: "10",
    ADJUSTED: "10",
    CANCELLED: 3,
    TIME_OUT_CANCELLED: 5,
    AJUST_PROCESSING: "AP",
    CANCEL_PROCESSING: "CP"
};

const orderType = {
    LO: "LO",
    ATC: "ATC",
    ATO: "ATO"
};

const responeStatus = {
    ok: "OK",
    error: "ERROR"
};

const exeOrderCode = "123456";

const minDiff = 0.05;

const buy = "buy";
const sell = "sell";

const maturityDateCF = 14;

const placeOrderSide = {
    buy: "buy",
    sell: "sell",
    both: "both"
};

const minCw = 30000;
const minSellCwNumber = 300;
const minBuyCwNumber = 300;

const ruleTimerToPlaceOrder = 20 * 1000; //2' = 120s = 120,000 ms
const timeToAutoCancelOrder = 10 * 1000; // 60s =  60*1000

const baseTime = [
    {
        begin: "9:20:00",
        end: "11:29:59"
    },
    {
        begin: "13:00:00",
        end: "14:29:59"
    }
];

const orderBody = {
    instrument: "",
    qty: minCw,
    side: "buy",
    type: "LO",
    limitPrice: "",
    stopPrice: 0,
    durationType: "gtt",
    durationDateTime: 1548406235,
    stopLoss: 0,
    takeProfit: 0,
    digitalSignature: "954345868",
    timetype: "T",
    splitval: 0,
    effdate: "string",
    expdate: "string"
};

const timeToRefreshToken = 9000000;
const LDAP_URL = "ldap://192.168.10.200";
const SECRET_KEY = "1eqw211dap09";
module.exports = {
    marketType,
    defaultLoginInfo,
    url,
    exeOrderCode,
    responeStatus,
    minDiff,
    placeOrderSide,
    minCw,
    orderBody,
    clientInfo,
    minSellCwNumber,
    minBuyCwNumber,
    baseTime,
    orderStatus,
    maturityDateCF,
    timeToRefreshToken,
    ruleTimerToPlaceOrder,
    minimumPriceOfCwToSkipPlaceOrder,
    timeToAutoCancelOrder,
    query,
    CODE: "123456",
    minNumberOfCwInAccToSkipPlaceOrder,
    VN30List,
    defaultLoginInfoForMM,
    socketClientInfoForMM,
    MY_SQL_CONFIG,
    MONGO_CONNECTION_STRING,
    SIGNAL_R_CONNECTION_STRING,
    LDAP_URL,
    SECRET_KEY
};

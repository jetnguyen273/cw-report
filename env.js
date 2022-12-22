const defaultLoginInfo = {
    grant_type: "password",
    username: "022C051816",
    password: "123456",
    client_id: "KRYRTHUYUI",
    client_secret: "XPLk6emmVVzbEqlaumyPU4b6jjKTuT"
};

const url = "https://uat-stock-api.phs.vn";

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
    CHO_KY_QUY_NGAN_HANG: "OD_ORSTATUS_W"
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

module.exports = {
    defaultLoginInfo,
    url,
    orderStatus,
    orderType,
    responeStatus,
    marketType,
    minTime: 60,
    CODE: "123456"
};

// 022C000308 022C051816
// 0101100308 0102151816

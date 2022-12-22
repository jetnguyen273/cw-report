const {
    securitiesManagement
} = require("../modules/MonitorSecuritiesModule/SecuritiesManagement");

const hsxMarketInfo = {
    id: "1",
    symbol: "HSXMARKET",
    state: "Closed",
    session: "7",
    stocks_count: 402,
    bonds_count: 0,
    cfs_count: 2,
    etfs_count: 9,
    derivatives_count: 0,
    covered_warrant_count: 0,
    unknow_count: 0,
    indexes_count: 10
};

securitiesManagement.setActiveTimeHose(hsxMarketInfo);
console.log(
    "session 7 --> activeTime == false : ",
    securitiesManagement.isInActiveTime
);

hsxMarketInfo.session = "6";
console.log(
    "session 6 --> activeTime == false : ",
    securitiesManagement.isInActiveTime
);

hsxMarketInfo.session = "5";
console.log(
    "session 5 --> activeTime == false : ",
    securitiesManagement.isInActiveTime
);

hsxMarketInfo.session = "3";
console.log(
    "session 3 --> activeTime == false : ",
    securitiesManagement.isInActiveTime
);

hsxMarketInfo.session = "0";
console.log(
    "session 0 --> activeTime == false : ",
    securitiesManagement.isInActiveTime
);

hsxMarketInfo.session = "4";
console.log(
    "session 4 --> activeTime == true : ",
    securitiesManagement.isInActiveTime
);

hsxMarketInfo.session = "1";
console.log("session 1 --> activeTime == true after 20minute : ");
setTimeout(() => {
    console.log(securitiesManagement.isInActiveTime == true);
}, 2000);

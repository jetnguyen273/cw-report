const socServer = require("../modules/SocketIoModule/SocketServer");
// const signalRClient = require('./modules/MonitorSecuritiesModule/SignalRClient');
// const { startAuthProcess } = require('./utils/Service.js');
const { order } = require("../modules/OrderModule/Order");
const service = require("../utils/Service");

const {
    securitiesManagement
} = require("./modules/MonitorSecuritiesModule/SecuritiesManagement");

socServer.start();

const sl = ["ADC", "FMN"]; // 'AMC',
// const sl = [];
securitiesManagement.setShareList(sl);

// const wl = ['CACB2204', 'CACB2204'];
const wl = [];

const cwL = sl.concat(wl);
// signalRClient.start(); // if login success
/*
setTimeout(() => {
    securitiesManagement.updateCwList(
        'CVIC2202', 
        JSON.stringify({"id": 4432,"symbol": "CVIC2202","bp1": "0.73","ap1": "0.75"})
    );
    securitiesManagement.decideToPlaceOrderWithTimer(securitiesManagement.getOneCw("CVIC2202"))
}, 2000) // init data, not in 3 cases

setTimeout(() => {
    securitiesManagement.updateCwList(
        'CVIC2202', 
        JSON.stringify({"id": 4432,"symbol": "CVIC2202","bp1": "0.05","ap1": "0.06"})
    );
    securitiesManagement.decideToPlaceOrderWithTimer(securitiesManagement.getOneCw("CVIC2202"))
}, 2700) // update init data --> case 3 --> start timer for cw CVIC2202 --> not place order yet

setTimeout(() => {
    securitiesManagement.updateCwList(
        'CVIC2202', 
        JSON.stringify({"id": 4432,"symbol": "CVIC2202","bp1": "0.04","ap1": "0.06"})
    );
    securitiesManagement.decideToPlaceOrderWithTimer(securitiesManagement.getOneCw("CVIC2202"))
}, 3200) // update init data --> case 3 --> start timer for cw CVIC2202 --> will place order for this case

setTimeout(() => {
    securitiesManagement.updateCwList(
        'CVIC2202', 
        JSON.stringify({"id": 4432,"symbol": "CVIC2202","bp1": "0.03","ap1": "0.07"})
    );
    securitiesManagement.decideToPlaceOrderWithTimer(securitiesManagement.getOneCw("CVIC2202"))
}, 3500) // update init data --> case 3 --> start timer for cw CVIC2202 --> will place order for this case
*/
const testData = {
    ceiling: 1.42,
    floor: 0.52,
    prior: 0.97,
    bp3: 0.97,
    bv3: 20,
    bp2: 0.98,
    bv2: 15200,
    bp1: "0.99",
    bv1: 12000,
    mp: 0.99,
    mv: 130,
    changed: 0.02,
    changed_percent: 2.06,
    ap1: "1",
    av1: 10500,
    ap2: 1.01,
    av2: 13100,
    ap3: 1.02,
    av3: 20
};

const { io } = require("./modules/SocketIoModule/SocketServer");

setInterval(() => {
    io.emit("abc", "dcvgffdssa");
}, 1000);

// securitiesManagement.updateShareList('ADC', testData)
setInterval(() => {
    setTimeout(() => {
        securitiesManagement.updateShareList("ADC", JSON.stringify(testData));
        securitiesManagement.updateShareList("FMN", JSON.stringify(testData));
        securitiesManagement.decideToPlaceOrderWithTimer(
            securitiesManagement.getOneShare("ADC"),
            "share"
        );
    }, 2000); // init data, not in 3 cases

    setTimeout(() => {
        securitiesManagement.updateShareList(
            "ADC",
            JSON.stringify({ id: 4432, symbol: "ADC", bp1: "0.55", ap1: "1.4" })
        );
        securitiesManagement.decideToPlaceOrderWithTimer(
            securitiesManagement.getOneShare("ADC"),
            "share"
        );

        securitiesManagement.updateShareList(
            "FMN",
            JSON.stringify({ id: 4444, symbol: "FMN", bp1: "0.7", ap1: "1.3" })
        );
        securitiesManagement.decideToPlaceOrderWithTimer(
            securitiesManagement.getOneShare("FMN"),
            "share"
        );
    }, 2500); // update init data --> case 3 --> start timer for cw CVIC2202 --> not place order yet

    // setTimeout(() => {
    //     securitiesManagement.updateShareList(
    //         'ADC',
    //         JSON.stringify({ "id": 4432, "symbol": "ADC", "bp1": "0.74", "ap1": "0.75" })
    //     );
    //     securitiesManagement.decideToPlaceOrderWithTimer(securitiesManagement.getOneShare("ADC"), 'share')
    // }, 5600) // init data, not in 3 cases

    // setTimeout(() => {
    //     securitiesManagement.updateShareList(
    //         'ADC',
    //         JSON.stringify({ "id": 4432, "symbol": "ADC", "bp1": "0.56", "ap1": "1.4" })
    //     );
    //     securitiesManagement.decideToPlaceOrderWithTimer(securitiesManagement.getOneShare("ADC"), 'share')
    // }, 3000) // init data, not in 3 cases
    setTimeout(() => {
        securitiesManagement.updateShareList(
            "ADC",
            JSON.stringify({ id: 4432, symbol: "ADC", bp1: "1.4", ap1: "1.4" })
        );
        securitiesManagement.decideToPlaceOrderWithTimer(
            securitiesManagement.getOneShare("ADC"),
            "share"
        );
    }, 3000); // init data, not in 3 cases

    setTimeout(() => {
        securitiesManagement.updateShareList(
            "ADC",
            JSON.stringify({ id: 4432, symbol: "ADC", bp1: "0.56", ap1: "1.4" })
        );
        securitiesManagement.decideToPlaceOrderWithTimer(
            securitiesManagement.getOneShare("ADC"),
            "share"
        );

        securitiesManagement.updateShareList(
            "FMN",
            JSON.stringify({
                id: 1231,
                symbol: "FMN",
                bp1: "",
                ap1: "",
                av1: "",
                ap2: "",
                av2: "",
                ap3: "",
                av3: ""
            })
        );
        securitiesManagement.decideToPlaceOrderWithTimer(
            securitiesManagement.getOneShare("FMN"),
            "share"
        );
    }, 4500); // init data, not in 3 cases

    setTimeout(() => {
        securitiesManagement.updateShareList(
            "ADC",
            JSON.stringify({
                id: 4432,
                symbol: "ADC",
                bp1: "",
                ap1: "",
                av1: "",
                bv1: "",
                bp2: "",
                ap2: "",
                av2: "",
                bv2: "",
                bp3: "",
                ap3: "",
                av3: "",
                bv3: ""
            })
        );
        securitiesManagement.decideToPlaceOrderWithTimer(
            securitiesManagement.getOneShare("ADC"),
            "share"
        );

        securitiesManagement.updateShareList(
            "FMN",
            JSON.stringify({ id: 1231, symbol: "FMN", bp1: "0.5", ap1: "1.5" })
        );
        securitiesManagement.decideToPlaceOrderWithTimer(
            securitiesManagement.getOneShare("FMN"),
            "share"
        );
    }, 11000); // init data, not in 3 cases
}, 20000);

const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const logs = require("./modules/HttpServerModule/logs");

let server = app.listen(8888, function () {
    let host = server.address().address;
    let port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
});

app.use("/logs", logs);
app.get("/cw-list", (req, res) => {
    const cwList = service.globalCwList;
    res.send({ data: cwList });
});

// setTimeout(() => {
//     securitiesManagement.updateShareList(
//         'ADC',
//         JSON.stringify({ "id": 4432, "symbol": "ADC", "bp1": "0.06", "ap1": "0.06" })
//     );
//     securitiesManagement.decideToPlaceOrderWithTimer(securitiesManagement.getOneShare("ADC"), 'share')
// }, 9000) // update init data --> case 3 --> start timer for cw CVIC2202 --> not place order yet

// setTimeout(() => {
//     securitiesManagement.updateShareList(
//         'ADC',
//         JSON.stringify({
//             "id": 4432, "symbol": "ADC", "bp1": "", "ap1": "", "bp2": "", "ap2": "", "bp3": "", "ap3": "",
//             "bv1": "", "av1": "", "bv2": "", "av2": "", "bv3": "", "av3": "",
//         })
//     );
//     securitiesManagement.decideToPlaceOrderWithTimer(securitiesManagement.getOneShare("ADC"), 'share')
// }, 6100)

// setTimeout(() => {
//     securitiesManagement.updateCwList(
//         'CVIC2202',
//         JSON.stringify({"id": 4432,"symbol": "CVIC2202","bp1": "0.04","ap1": "0.07"})
//     );
//     securitiesManagement.decideToPlaceOrderWithTimer(securitiesManagement.getOneCw("CVIC2202"))
// }, 30000) // update init data --> case 3 --> start timer for cw CVIC2202 --> not place order yet

// setTimeout(() => {
//     securitiesManagement.updateCwList(
//         'CVIC2202',
//         JSON.stringify({"id": 4432,"symbol": "CVIC2202","bp1": "0.03","ap1": "0.08"})
//     );
//     securitiesManagement.decideToPlaceOrderWithTimer(securitiesManagement.getOneCw("CVIC2202"))
// }, 32000) // update init data --> case 3 --> start timer for cw CVIC2202 --> not place order yet

// setTimeout(() => {
//     securitiesManagement.updateCwList(
//         'CVIC2202',
//         JSON.stringify({"id": 4432,"symbol": "CVIC2202","bp1": "0.04","ap1": "0.06"})
//     );
//     securitiesManagement.decideToPlaceOrderWithTimer(securitiesManagement.getOneCw("CVIC2202"))
// }, 3200) // update init data --> case 3 --> start timer for cw CVIC2202 --> will place order for this case

// setTimeout(() => {
//     securitiesManagement.updateCwList(
//         'CVIC2202',
//         JSON.stringify({"id": 4432,"symbol": "CVIC2202","bp1": "0.03","ap1": "0.07"})
//     );
//     securitiesManagement.decideToPlaceOrderWithTimer(securitiesManagement.getOneCw("CVIC2202"))
// }, 3500) // update init data --> case 3 --> start timer for cw CVIC2202 --> will place order for this case

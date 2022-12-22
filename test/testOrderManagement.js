const {
    OrderManagement,
    orderListManagement
} = require("../modules/MonitorSecuritiesModule/OrdersManagement");
const { OrderLogModel } = require("../database/model"); // LogModel ~ CasesLogModel
const { orderStatus } = require("./../utils/Constanst");
const socServer = require("./../modules/SocketIoModule/SocketServer");
const signalRClient = require("./../modules/MonitorSecuritiesModule/SignalRClient");
const { order } = require("./../modules/OrderModule/Order");
const socketClient = require("../modules/SocketIoModule/SocketClient"); // socketClient

// const socServer = require('./modules/SocketIoModule/SocketServer');
// const signalRClient = require('./modules/MonitorSecuritiesModule/SignalRClient');
// const service = require('./utils/Service');
// const socketClient = require('./modules/SocketIoModule/SocketClient')

socServer.start();
signalRClient
    .start()
    .then(() => {
        socketClient
            .start()
            .then(() => console.log(" sockertt client ok"))
            .catch((e) => console.log(">>>>> EEEE ", e));
    })
    .catch((e) => console.log(e));

// socServer.start();

// socServer.start();
// signalRClient.start().then(() => {
//     socketClient.start();
// }).catch(e => console.log(e));

// signalRClient.start().then(() => {
//     socketClient.start();
// }).catch(e => console.log('err of signalR client'))
const testData = [
    {
        ACC: "0113000001",
        DT: {
            MSGTYPE: "R",
            EVENTTYPE: "OD",
            AUTOID: "07/06/20220012108069",
            ACCTNO: "8000070622000028",
            CUSTODYCD: "022C088524",
            AFACCTNO: "0113000001",
            TLNAME: "USERONLINE",
            USERNAME: "0113088524",
            APPLYTIME: "20220607-12:06:00",
            SYMBOL: "SSI",
            QUOTEQTTY: "0",
            QUOTEPRICE: "29",
            EXECTYPE: "NB",
            EXECQTTY: "0",
            ORSTATUSVALUE: "8",
            ORSTATUS: "Chờ gửi",
            REMAINQTTY: "1000",
            PRICETYPE: "LO",
            PRICE: "29"
        }
    },

    {
        ACC: "0113000001",
        DT: {
            MSGTYPE: "R",
            EVENTTYPE: "OD",
            AUTOID: "07/06/20220012108069",
            ACCTNO: "8000070622000028",
            CUSTODYCD: "022C088524",
            AFACCTNO: "0113000001",
            TLNAME: "USERONLINE",
            USERNAME: "0113088524",
            APPLYTIME: "20220607-12:06:00",
            SYMBOL: "SSI",
            QUOTEQTTY: "0",
            QUOTEPRICE: "29",
            EXECTYPE: "NB",
            EXECQTTY: "0",
            ORSTATUSVALUE: "2",
            ORSTATUS: "Đã gửi",
            REMAINQTTY: "1000",
            PRICETYPE: "LO",
            PRICE: "29"
        }
    },

    {
        ACC: "0113000001",
        DT: {
            MSGTYPE: "R",
            EVENTTYPE: "OD",
            AUTOID: "8000070622000028",
            ACCTNO: "8000070622000028",
            CUSTODYCD: "022C088524",
            AFACCTNO: "0113000001",
            TLNAME: "USERONLINE",
            USERNAME: "0113088524",
            APPLYTIME: "20220607-12:06:00",
            SYMBOL: "SSI",
            QUOTEQTTY: "0",
            QUOTEPRICE: "29",
            EXECTYPE: "NB",
            EXECQTTY: "0",
            ORSTATUSVALUE: "A",
            ORSTATUS: "Đang sửa",
            REMAINQTTY: "1000",
            PRICETYPE: "LO",
            PRICE: "29"
        }
    },

    {
        ACC: "0113000001",
        DT: {
            MSGTYPE: "R",
            EVENTTYPE: "OD",
            AUTOID: "8000070622000028",
            ACCTNO: "8000070622000028",
            CUSTODYCD: "022C088524",
            AFACCTNO: "0113000001",
            TLNAME: "USERONLINE",
            USERNAME: "0113088524",
            APPLYTIME: "20220607-12:06:00",
            SYMBOL: "SSI",
            QUOTEQTTY: "0",
            QUOTEPRICE: "29",
            EXECTYPE: "NB",
            EXECQTTY: "0",
            ORSTATUSVALUE: "10",
            ORSTATUS: "Đã sửa",
            REMAINQTTY: "0",
            PRICETYPE: "LO",
            PRICE: "29"
        }
    },
    {
        ACC: "0113000001",
        DT: {
            MSGTYPE: "R",
            EVENTTYPE: "OD",
            AUTOID: "8000070622000028",
            ACCTNO: "8000070622000028",
            CUSTODYCD: "022C088524",
            AFACCTNO: "0113000001",
            TLNAME: "USERONLINE",
            USERNAME: "0113088524",
            APPLYTIME: "20220607-12:06:00",
            SYMBOL: "SSI",
            QUOTEQTTY: "0",
            QUOTEPRICE: "29",
            EXECTYPE: "NB",
            EXECQTTY: "0",
            ORSTATUSVALUE: "10",
            ORSTATUS: "Đã sửa",
            REMAINQTTY: "0",
            PRICETYPE: "LO",
            PRICE: "29"
        }
    },
    {
        ACC: "0113000001",
        DT: {
            MSGTYPE: "R",
            EVENTTYPE: "OD",
            AUTOID: "0001070622000030",
            ACCTNO: "0001070622000030",
            CUSTODYCD: "022C088524",
            AFACCTNO: "0113000001",
            TLNAME: "USERONLINE",
            USERNAME: "null",
            APPLYTIME: "20220607-12:06:00",
            SYMBOL: "SSI",
            QUOTEQTTY: "0",
            QUOTEPRICE: "29.1",
            EXECTYPE: "NB",
            EXECQTTY: "0",
            ORSTATUSVALUE: "2",
            ORSTATUS: "Đã gửi",
            REMAINQTTY: "1000",
            PRICETYPE: "LO",
            PRICE: "29.1"
        }
    },

    {
        ACC: "0113000001",
        DT: {
            MSGTYPE: "R",
            EVENTTYPE: "OD",
            AUTOID: "8000070622000036",
            ACCTNO: "8000070622000036",
            CUSTODYCD: "022C088524",
            AFACCTNO: "0113000001",
            TLNAME: "USERONLINE",
            USERNAME: "0113088524",
            APPLYTIME: "20220607-12:06:00",
            SYMBOL: "STB",
            QUOTEQTTY: "0",
            QUOTEPRICE: "20.55",
            EXECTYPE: "NB",
            EXECQTTY: "0",
            ORSTATUSVALUE: "C",
            ORSTATUS: "Đang hủy",
            REMAINQTTY: "1000",
            PRICETYPE: "LO",
            PRICE: "20.55"
        }
    },

    {
        ACC: "0113000001",
        DT: {
            MSGTYPE: "R",
            EVENTTYPE: "OD",
            AUTOID: "8000070622000036",
            ACCTNO: "8000070622000036",
            CUSTODYCD: "022C088524",
            AFACCTNO: "0113000001",
            TLNAME: "USERONLINE",
            USERNAME: "0113088524",
            APPLYTIME: "20220607-12:06:00",
            SYMBOL: "STB",
            QUOTEQTTY: "0",
            QUOTEPRICE: "20.55",
            EXECTYPE: "NB",
            EXECQTTY: "0",
            ORSTATUSVALUE: "3",
            ORSTATUS: "Hủy do sàn trả về",
            REMAINQTTY: "0",
            PRICETYPE: "LO",
            PRICE: "20.55"
        }
    },
    {
        ACC: "0113000001",
        DT: {
            MSGTYPE: "R",
            EVENTTYPE: "OD",
            AUTOID: "8000070622000036",
            ACCTNO: "8000070622000036",
            CUSTODYCD: "022C088524",
            AFACCTNO: "0113000001",
            TLNAME: "USERONLINE",
            USERNAME: "0113088524",
            APPLYTIME: "20220607-12:06:00",
            SYMBOL: "STB",
            QUOTEQTTY: "0",
            QUOTEPRICE: "20.55",
            EXECTYPE: "NB",
            EXECQTTY: "0",
            ORSTATUSVALUE: "3",
            ORSTATUS: "Hủy do sàn trả về",
            REMAINQTTY: "0",
            PRICETYPE: "LO",
            PRICE: "20.55"
        }
    },

    {
        ACC: "0113000001",
        DT: {
            MSGTYPE: "R",
            EVENTTYPE: "OD",
            AUTOID: "8000070622000028",
            ACCTNO: "8000070622000028",
            CUSTODYCD: "022C088524",
            AFACCTNO: "0113000001",
            TLNAME: "USERONLINE",
            USERNAME: "null",
            APPLYTIME: "20220607-12:06:00",
            SYMBOL: "FPT",
            QUOTEQTTY: "0",
            QUOTEPRICE: "113",
            EXECTYPE: "NB",
            EXECQTTY: "500",
            ORSTATUSVALUE: "4",
            ORSTATUS: "Đã khớp",
            REMAINQTTY: "500",
            PRICETYPE: "LO",
            PRICE: "113"
        }
    },
    {
        ACC: "0113000001",
        DT: {
            MSGTYPE: "R",
            EVENTTYPE: "OD",
            AUTOID: "8000070622000028",
            ACCTNO: "8000070622000028",
            CUSTODYCD: "022C088524",
            AFACCTNO: "0113000001",
            TLNAME: "USERONLINE",
            USERNAME: "null",
            APPLYTIME: "20220607-12:06:00",
            SYMBOL: "SSI",
            QUOTEQTTY: "0",
            QUOTEPRICE: "113",
            EXECTYPE: "NB",
            EXECQTTY: "500",
            ORSTATUSVALUE: "4",
            ORSTATUS: "Đã khớp",
            REMAINQTTY: "500",
            PRICETYPE: "LO",
            PRICE: "29"
        }
    },

    {
        ACC: "0113000001",
        DT: {
            MSGTYPE: "R",
            EVENTTYPE: "OD",
            AUTOID: "07/06/20220012107992",
            ACCTNO: "8000070622000028",
            CUSTODYCD: "022C088524",
            AFACCTNO: "0113000001",
            TLNAME: "USERONLINE",
            USERNAME: "0113088524",
            APPLYTIME: "20220607-12:06:00",
            SYMBOL: "VNM",
            QUOTEQTTY: "0",
            QUOTEPRICE: "70.8",
            EXECTYPE: "NB",
            EXECQTTY: "1000",
            ORSTATUSVALUE: "12",
            ORSTATUS: "Khớp hết",
            REMAINQTTY: "0",
            PRICETYPE: "LO",
            PRICE: "70.8"
        }
    },
    {
        ACC: "0113000001",
        DT: {
            MSGTYPE: "R",
            EVENTTYPE: "OD",
            AUTOID: "07/06/20220012107992",
            ACCTNO: "8000070622000028",
            CUSTODYCD: "022C088524",
            AFACCTNO: "0113000001",
            TLNAME: "USERONLINE",
            USERNAME: "0113088524",
            APPLYTIME: "20220607-12:06:00",
            SYMBOL: "SSI",
            QUOTEQTTY: "0",
            QUOTEPRICE: "70.8",
            EXECTYPE: "NB",
            EXECQTTY: "1000",
            ORSTATUSVALUE: "12",
            ORSTATUS: "Khớp hết",
            REMAINQTTY: "0",
            PRICETYPE: "LO",
            PRICE: "29"
        }
    }
];

// init
let orderLog = new OrderLogModel();
// let order = new OrderManagement(orderLog, 'SSI', 'buy', 29000);
// orderListManagement.addOrderTolist(order);
let i = 0;
// ------------------------
setInterval(() => {
    // orderListManagement.addOrderTolist(order);
    orderLog = new OrderLogModel();
    let order = new OrderManagement(orderLog, "SSI", "buy", 29000);
    orderListManagement.addOrderTolist(order);

    setTimeout(() => {
        socketClient.processOrderFromSocketServer(testData[0]); // 'case 8 -- cho gui ? ',
        // console.log('status is wait to send === ', orderListManagement.orderList[i].status == orderStatus.WAITING_TO_SEND)
    }, 1000);

    // test sent
    // socketClient.handleOrderSent(testData[1]);
    setTimeout(() => {
        socketClient.processOrderFromSocketServer(testData[1]); // 'case 2 -- da gui ? ',
        // console.log('status is sent === ', orderListManagement.orderList[i].status ==  orderStatus.SENT)
    }, 300);

    // test match
    setTimeout(() => {
        socketClient.processOrderFromSocketServer(testData[10]);
        // console.log('status is match === ', orderListManagement.orderList[i].status == orderStatus.MATCH)
    }, 5000);

    // test match all
    setTimeout(() => {
        socketClient.processOrderFromSocketServer(testData[12]);
        // console.log('status is match all === ', orderListManagement.orderList[i].status == orderStatus.MATCH_ALL)
    }, 6000);

    // reset status to send_axios_ok
    setTimeout(() => {
        i++;
        testData[0].DT.ACCTNO = (
            parseInt(testData[0].DT.ACCTNO) + 1
        ).toString();
        testData[1].DT.ACCTNO = (
            parseInt(testData[1].DT.ACCTNO) + 1
        ).toString(); //testData[1].DT.ACCTNO + 1;
        testData[10].DT.ACCTNO = (
            parseInt(testData[10].DT.ACCTNO) + 1
        ).toString(); //testData[10].DT.ACCTNO + 1;
        testData[12].DT.ACCTNO = (
            parseInt(testData[12].DT.ACCTNO) + 1
        ).toString(); //testData[12].DT.ACCTNO + 1;
    }, 9000);
}, 10000);

/*
// test wait to send
socketClient.processOrderFromSocketServer(testData[0]) // 'case 8 -- cho gui ? ',
console.log('status is wait to send === ', orderListManagement.orderList[0].status == 8)


// test sent
// socketClient.handleOrderSent(testData[1]);
socketClient.processOrderFromSocketServer(testData[1]) // 'case 8 -- cho gui ? ',
console.log('status is wait to send === ', orderListManagement.orderList[0].status == 2)

// test match
socketClient.processOrderFromSocketServer(testData[10]);
console.log('status is match === ', orderListManagement.orderList[0].status == 4)

// test match all
socketClient.processOrderFromSocketServer(testData[12]);
console.log('status is match all === ', orderListManagement.orderList[0].status == 12)
*/

// -------------------------

// test processOrderFromSocketServer
// socketClient.processOrderFromSocketServer(testData[0]) // 'case 8 -- cho gui ? ',
// socketClient.processOrderFromSocketServer(testData[1]) // 'case 2 -- da gui ? ',
// socketClient.processOrderFromSocketServer(testData[10]) // 'case 4 -- cho gui ? ',
// socketClient.processOrderFromSocketServer(testData[12]) // 'case 12 -- cho gui ? ',

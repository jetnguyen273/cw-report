const { order } = require("./../modules/OrderModule/Order");
const service = require("./../utils/Service");

const io = require("socket.io-client");
console.log("start socket client");
var url = "https://uat-stock-api.phs.vn";
const query =
    "__sails_io_sdk_version=1.2.1&__sails_io_sdk_platform=browser&__sails_io_sdk_language=javascript&clientid=KRYRTHUYUI&clientsecret=XPLk6emmVVzbEqlaumyPU4b6jjKTuT";
var socket = io(url, {
    query: query,
    path: "/realtime/socket.io",
    forceNew: true,
    reconnection: false,
    secure: false,
    transports: ["websocket"],
    rejectUnauthorized: false
});
const token =
    "022C089377||KRYRTHUYUI||3vL5fZzYR8niDOp8UxlEkfUPWk30HxRyI9tA0dKcoMgnijEf83vDBQ86XbbuLYOTnONVKrnjO7AtPBn62wz4yA3Re9mP9jtfdAVskCSLAOpmVfAA6D9uJYqDRHiTQfvktz0YK6yOyy3OR1LRpmxEPu5bwvxpGkVUnVnug6hO6018mWsgADRhvnuoEHrAr3FGDOPB9umJSyyaocOyzqWYDL5xQfOFFzEDfUcCh0CyuXCkHOYoB0oONLanlD3z0jL";
const argAccount = ["account:0113189377", "trade:HAH", "instrument:HAH"];

const token1 =
    "022C051816||KRYRTHUYUI||AU7l1M1udfcpPvJcGO5GwD7Hrji2zmXpnxXfeT2k1KQsWlqLDFxTLTwOYPMcb4042qiIkK9lEIPSGsXjDSQSPg9ZV5VBsTflA54JNW8xJnNaO4u1k1LUiVbvpMRgH4nLb1aHj9YE6qAXWwceSBWivQfx68QEtU29l7jUnnnglDPiYxJDrkUSw2xqba0DyjLUSrXniBLEZw64BfsPIacacJf7aMLai5oggLguLcfZueaQaHYOECBpENuFT67Fpg7";
const argAccount1 = ["account:0102151816", "trade:VRE", "instrument:VRE"];

const token2 =
    "022C000308||KRYRTHUYUI||IH7yEkTixyIe7fdEx2N0mWSk0PhGIq2oABi75MYRr6WJj2luGhmXBZwFipMFdQA5hmvyPNFOGweziOU8W8GfeZ5Cno1AGEXXv9n5w3y6s2a2pH97cgtWYUubvrnrOOb7lsP1JfVdtd21VQkPo3YEHQIPhU67Q52Fjb2Z81ptlAXdeeOw7zL2YbBF7578y4PM7JhfXmSj7n4NjRwr0CRCqr23rqRYcE9Arh8aA6P0i0RM4zHkpGgEgFBTjQnLjc9";
const argAccount2 = [
    "account:022C000308",
    "trade:CFPT2202",
    "instrument:CFPT2202"
];

socket.on("connect", () => {
    console.log(socket.id);
    if (socket.id) {
        // socket.emit('get',{"data":{"args":argAccount,"op":"subscribe","token":token},"method":"get","url":"\/client\/send"});
        // socket.emit('get',{"data":{"args":argAccount1,"op":"subscribe","token":token1},"method":"get","url":"\/client\/send"});
    }
});

// app.get('/must-order', async function (req, res) {
//     socket.emit('get',{"data":{"args":argAccount2,"op":"subscribe","token":token2},"method":"get","url":"\/client\/send"});
//     res.send('no need to order')
// })

socket.on("connect_error", (err) => {
    console.log(err);
});

socket.on("disconnect", (reason) => {
    console.log("socket disconnected ", reason);
});

socket.on("account", (data) => {
    console.log("1. process account data", JSON.stringify(data));
});

socket.on("trade", (data) => {
    console.log("2. process trade data", JSON.stringify(data));
});

socket.on("instrument", (data) => {
    console.log("3. process instrument data", JSON.stringify(data));
});

async function testPlaceOrder() {
    try {
        const lg = await service.login();
        // console.log(lg)
        // order.tk = lg.access_token;
        // order.setToken(lg.access_token)
        // console.log(order.token)
        // test token
        const balance = await service.getBalanceOfSubAccount(
            "0104067009",
            lg.access_token
        );
        const availableTrade = await service.getAvailableTrade(
            "0102051816",
            order.token,
            "CACB2201"
        );
        order.updateOrderInfo(9500, "AAV");
        let ord = await order.placeOrder();
        console.log({ ord });
        const token2 = order.tk;
        const argAccount2 = [
            `account:0102051816`,
            `trade:AAV`,
            `instrument:AAV`
        ];
        socket.emit("get", {
            data: { args: argAccount2, op: "subscribe", token: token2 },
            method: "get",
            url: "/client/send"
        });
        return ord;
    } catch (e) {
        console.log(e);
    }
}
testPlaceOrder()
    .then(async (o) => {
        console.log("place order success!", o);
        console.log("Sửa 1 lệnh trong danh sách lệnh ");
        const res = await service.getAllWaitingOrder(order.token);
        console.log(res.data.d);

        // find wanted order
        order.orderInfo.accountId = "0102051816";
        res.data.d.forEach(async (element) => {
            if (
                element.symbol == "AAV" &&
                element.limitprice == 9300 &&
                element.orstatusfo != "OD_ORSTATUS_C"
            ) {
                order.setUpdatedInfo = order.orderInfo;
                order.orderInfo.limitPrice = 9300;
                order.orderInfo.qty = element.orderqtty;

                order.orderInfo.orderId = element.orderid;

                order.orderInfo.timeType = "T";

                // const result = await order.update();
                const result = await order.delete();

                console.log({ result });
                // break;
            }
        });

        // ---update order
        // order.orderInfo.orderId = o.orderId;
        // order.updateOrderInfo(10500, 'AVV');
        // order.update();
    })
    .catch((e) => {
        console.log("errrrr = ", e);
    });

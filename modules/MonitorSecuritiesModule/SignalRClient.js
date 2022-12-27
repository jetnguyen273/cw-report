const signalr = require("node-signalr");
const schedule = require("node-schedule");
const { Worker } = require("worker_threads");

const { marketType, VN30List } = require("../../utils/Constants");

const constants = require("../../utils/Constants");
const configVal = require("./../SupportReportModule/config");

const client = new signalr.client(constants.SIGNAL_R_CONNECTION_STRING, [
    "shareTickerHubProxy"
]);

async function start() {
    console.log("signalR starting ...");

    client.on("connected", () => {
        console.log("SignalR client connected.");

        client.connection.hub.on(
            "shareTickerHubProxy",
            "updateShare",
            (symbol, properties) => {
                try {
                    worker.postMessage({
                        orderType: "UPDATE_VN30_LIST",
                        properties,
                        symbol
                    });
                } catch (e) {
                    console.log("json invalid");
                }
            }
        );

        client.connection.hub.on(
            "shareTickerHubProxy",
            "updateCoveredWarrant",
            (symbol, properties) => {
                try {
                    worker.postMessage({
                        orderType: "UPDATE_CW",
                        properties,
                        symbol
                    });
                } catch (e) {
                    console.log("invalid json");
                }
            }
        );

        client.connection.hub
            .call(
                "shareTickerHubProxy",
                "joinMarket",
                marketType.COVERED_WARRANT_MARKET
            )
            .then((result) => {
                client.connection.hub
                    .call(
                        "shareTickerHubProxy",
                        "registerWatchedShares",
                        VN30List.toString()
                    )
                    .then((vn30Result) => {
                        const vn30List = JSON.parse(vn30Result);

                        console.log(vn30List);
                        worker = new Worker("./worker/support-report.js", {
                            workerData: {
                                cwList: configVal.CW_LIST,
                                hsxList: JSON.parse(result).covered_warrant,
                                vn30List: vn30List,
                                Vn30List: configVal.VN30_LIST
                            }
                        });

                        // Listen for a message from worker
                        worker.on("message", (result) => {
                            console.log("received mess");
                        });
                        worker.on("error", (error) => {
                            console.log(error);
                        });
                        worker.on("exit", (exitCode) => {
                            console.log(exitCode);
                        });

                        worker.postMessage({
                            orderType: "PROCESS_CW_IV"
                        });

                        // worker.postMessage({
                        //     orderType: "PROCESS_VN30_IV"
                        // });

                        // const job = schedule.scheduleJob(
                        //     {
                        //         hour: 7,
                        //         minute: [30],
                        //         dayOfWeek: [1, 2, 3, 4, 5]
                        //     },
                        //     function () {
                        //         worker.postMessage({
                        //             orderType: "PROCESS_CW_IV"
                        //         });

                        //         worker.postMessage({
                        //             orderType: "PROCESS_VN30_IV"
                        //         });
                        //         console.log("Time for tea!");
                        //     }
                        // );
                    })
                    .catch((e) => console.log(e));
            })
            .catch((error) => {
                console.log("error1:", error);
            });
    });

    client.on("reconnecting", (count) => {
        console.log(`SignalR client reconnecting(${count}).`);
    });

    client.on("disconnected", (code) => {
        console.log(`SignalR client disconnected(${code}).`);
    });

    client.on("error", (code, ex) => {
        console.log(`SignalR client connect error: ${code} ${ex}.`);
    });

    client.start();
}

module.exports = {
    client,
    start
};

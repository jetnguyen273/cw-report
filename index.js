const signalRClient = require("./modules/MonitorSecuritiesModule/SignalRClient");

signalRClient
    .start()
    .then(async () => {
        console.log("signalR connected");
    })
    .catch((e) => console.log(e));

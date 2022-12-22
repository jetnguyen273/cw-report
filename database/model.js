const mongoose = require("mongoose");
const { CWIvSchema } = require("./schema");

const { MONGO_CONNECTION_STRING } = require("../utils/Constants");

mongoose
    .connect(MONGO_CONNECTION_STRING)
    .then((res) => console.log("mongodb connect ok"))
    .catch((error) => {
        console.log(error);
        const description = {
            text: "SignalR error",
            data: {
                error
            }
        };
        const errorTime = new Date();
        errorLogService.addEventLog(
            errorTime,
            errorTime.getTime(),
            JSON.stringify(description),
            "mongodb connect error event"
        );
    });

const CwIv = mongoose.model("CwIv", CWIvSchema);

module.exports = {
    CwIv
};

const mongoose = require("mongoose");
const { CWIvSchema, VN30IVSchema } = require("./schema");

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
const VN30IV = mongoose.model("VN30IV", VN30IVSchema);

module.exports = {
    CwIv,
    VN30IV
};

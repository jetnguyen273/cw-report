const fs = require("fs");

const fileName = "common_logs.txt";

fs.open(fileName, "a", function (err, fd) {
    if (err) {
        console.log("OPEN FILE FAIL, PLEASE CHECK !!!!");
        return console.error(err);
    }
    console.log("File duoc mo thanh cong!");
});

function writeLogToFile(content) {
    const errorTime = new Date();
    const errorInfo = `[${errorTime.getHours()}:${errorTime.getMinutes()}:${errorTime.getSeconds()}.${errorTime.getMilliseconds()}] ${content} \n`;
    fs.appendFile(fileName, errorInfo, function (err) {
        if (err) {
            console.log("Write to file FAIL");
            return console.error(err);
        }
    });
}

module.exports = { writeLogToFile };

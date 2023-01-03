var ss = require("simple-statistics");
const fs = require("fs");
let logToDate = new Date().toDateString();
const math = require("mathjs");

// fs.open(`${logToDate}.txt`, "a", function (err, fd) {
//     if (err) {
//         return console.error(err);
//     }
//     console.log("File duoc mo thanh cong!");
// });
// let logFileDataClosePrice = "";
// let logFileDataRoR = "";

function hisIV(closePriceArr) {
    let RoR = 0;
    let dataStatistic = [];
    //Calc RoR
    closePriceArr.forEach((item, index, arr) => {
        if (index != 0) {
            RoR = ((item - arr[index - 1]) / arr[index - 1]).toFixed(4);
            dataStatistic.push(parseFloat(RoR));
        }
        // else {
        //   RoR = 0;
        //   dataStatistic.push(parseFloat(RoR))
        // }
    });

    // logFileDataRoR = `${dataStatistic}`;
    // fs.appendFile(`iv_${logToDate}.txt`, logFileDataRoR, function (err) {
    //     if (err) {
    //         return console.error(err);
    //     }
    // });

    let std = math.std(dataStatistic);
    let impliedVolatility = parseFloat(std * Math.sqrt(250));
    return impliedVolatility;
}
// let historicalIV = hisIV(closePriceArr);
// console.log("historicalIV = ", historicalIV);

//Define to calculate historicalIV
module.exports = {
    hisIV
};

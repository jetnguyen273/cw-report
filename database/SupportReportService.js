const { CwIv, VN30IV } = require("./model");

async function addCwIv(
    symbol,
    closing_price,
    stock_price,
    exercise_price,
    risk_free_rate,
    time_of_maturity,
    iv,
    today_time
) {
    // check that is today processed?
    const found = await CwIv.findOne({ today_time, symbol });
    if (found) {
        return false;
    }
    const oo = new CwIv({
        symbol,
        closing_price,
        stock_price,
        exercise_price,
        risk_free_rate,
        time_of_maturity,
        iv,
        today_time
    });
    const res = await oo.save(function (err) {
        if (err) {
            console.log("~~~ Add order to DB FAIL : ", err);
            return false;
        }
        // saved!
    });
    return oo;
}

async function addSymbolIv(symbol, interval, iv, today_time) {
    // check that is today processed?
    const found = await VN30IV.findOne({ today_time, interval, symbol });
    if (found) {
        return false;
    }
    const oo = new VN30IV({
        symbol,
        interval,
        iv,
        today_time
    });
    const res = await oo.save(function (err) {
        if (err) {
            console.log("~~~ Add order to DB FAIL : ", err);
            return false;
        }
        // saved!
    });
    return oo;
}

async function getSymbolIv() {
    try {
        const found = await VN30IV.find();
        return found;
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    addCwIv,
    addSymbolIv,
    getSymbolIv
};

const { CwIv } = require("./model");

async function addSymbolIv(
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

module.exports = {
    addSymbolIv
};

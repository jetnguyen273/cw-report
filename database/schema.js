const mongoose = require("mongoose");

//symbol, closingPrice, stockPrice, exercisePrice, riskFreeRate, timeOfMaturity, k, iv, today_time
const CWIvSchema = new mongoose.Schema({
    symbol: {
        type: String
    },
    closing_price: Number,
    stock_price: Number,
    exercise_price: Number,
    risk_free_rate: Number,
    time_of_maturity: Number,
    closing_price: Number,
    iv: Number,
    today_time: Number
});

const VN30IVSchema = new mongoose.Schema({
    symbol: {
        type: String
        // unique: true
    },
    interval: Number,
    iv: Number,
    today_time: Number
});

module.exports = {
    CWIvSchema,
    VN30IVSchema
};

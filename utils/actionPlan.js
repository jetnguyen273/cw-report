let data = calcActionPlan(24100, 7);
console.log("data=", data);

//adjustClosingPrice : unit (VND)
//stockPriceMovementMax : set default value for 7
function calcActionPlan(adjustClosingPrice, stockPriceMovementMax = 7) {
    let stockPriceMovementParam = -stockPriceMovementMax + 0.5;
    let actionPlans = [];

    while (stockPriceMovementParam < stockPriceMovementMax) {
        let sPrice = (
            (adjustClosingPrice * (100 + stockPriceMovementParam)) /
            100
        ).toFixed(2);

        if (stockPriceMovementParam <= 6.5 || stockPriceMovementParam >= -6.5) {
            actionPlans.push({
                stockPriceMovement: stockPriceMovementParam,
                stockPrice: sPrice
            });
        }
        if (stockPriceMovementParam == 6.5) {
            let stockPriceDev = 0;
            let stockClosePrice = adjustClosingPrice;

            while (stockPriceDev < 7) {
                if (stockClosePrice > 50000) stockClosePrice += 100;
                else stockClosePrice += 50;

                stockPriceDev =
                    ((stockClosePrice - adjustClosingPrice) /
                        adjustClosingPrice) *
                    100;
                if (
                    parseFloat(stockPriceDev.toFixed(1)) > 6.5 &&
                    parseFloat(stockPriceDev.toFixed(1)) < 7
                ) {
                    actionPlans.push({
                        stockPriceMovement: parseFloat(
                            stockPriceDev.toFixed(2)
                        ),
                        stockPrice: stockClosePrice
                    });
                }
            }
        } else if (stockPriceMovementParam == -6.5) {
            let stockPriceDev = 0;
            let stockClosePrice = adjustClosingPrice;

            while (stockPriceDev > -7) {
                if (stockClosePrice > 50000) stockClosePrice -= 100;
                else stockClosePrice -= 50;

                stockPriceDev =
                    ((stockClosePrice - adjustClosingPrice) /
                        adjustClosingPrice) *
                    100;
                if (
                    parseFloat(stockPriceDev.toFixed(1)) < -6.5 &&
                    parseFloat(stockPriceDev.toFixed(1)) > -7
                ) {
                    actionPlans.push({
                        stockPriceMovement: parseFloat(
                            stockPriceDev.toFixed(1)
                        ),
                        stockPrice: stockClosePrice
                    });
                }
            }
        }
        stockPriceMovementParam = stockPriceMovementParam + 0.5;
    }
    actionPlans.sort((a,b)  => b.stockPriceMovement - a.stockPriceMovement);
    return actionPlans;
}

module.exports = {
    calcActionPlan
};

let mysql = require("mysql2");

const { MY_SQL_CONFIG } = require("./../../utils/Constants");

let connection = mysql.createConnection(MY_SQL_CONFIG);

connection.connect(function (err) {
    if (err) {
        return console.error("error: " + err.message);
    }

    let sql = `CALL sp_cw_draft_list('','')`;

    connection.query(sql, true, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
    });
    console.log("Connected to the MySQL server.");
});

async function addPreIpoCw(
    warrantCode,
    underlyingSymbol,
    outstandingShares,
    totalShares,
    warrantPrice,
    conversionRatio,
    exercisePrice,
    maturityDate,
    status,
    respone
) {
    try {
        let checkExistSql = `CALL sp_cw_draft_is_exists_draft_id("${warrantCode}")`;
        connection.query(checkExistSql, (error, results, fields) => {
            if (error) {
                return console.error(error.message);
            }
            console.log(results[0][0].isExists);
            if (results[0][0].isExists == 0) {
                // IN par_cw_draft_id VARCHAR(10),
                // IN par_symbol VARCHAR(3),
                // IN par_conversion_ratio VARCHAR(10),
                // IN par_warrant_price DECIMAL(10,3),
                // IN par_warrant_price_min DECIMAL(10,3),
                // IN par_warrant_price_max DECIMAL(10,3),
                // IN par_exercise_price DECIMAL(10,3),
                // IN par_total_shares BIGINT,
                // IN par_outstanding_shares BIGINT,
                // IN par_maturity_date DATE,
                // IN par_created_by VARCHAR(100)
                let sql = `CALL sp_cw_draft_create(
                    "${warrantCode}",
                    "${underlyingSymbol}",
                    "${conversionRatio}:1",
                    ${warrantPrice},
                    0,
                    0,
                    ${exercisePrice},
                    ${totalShares}, ${outstandingShares}, "${maturityDate}", "admin@phs.vn")`;
                // console.log("sql = ", sql);

                connection.query(sql, (error, r, fields) => {
                    if (error) {
                        return console.error(error.message);
                    }
                    console.log(r);
                });
                respone.send({ status: "OK", message: "Create OK" });
            } else {
                respone.send({ status: "ERROR", message: "Duplicate CW Code" });
            }
        });
    } catch (e) {
        console.log("create mySQL error!!", e);
        // return false;
        respone.send({ status: "ERROR", message: "Create Fail", errMess: e });
    }
}

async function getPreIpoCwList() {
    try {
        let sql = `CALL sp_cw_draft_list('', '')`;
        // console.log("sql = ", sql);

        // return connection.query(sql, true, (error, results, fields) => {
        //     if (error) {
        //         return console.error(error.message);
        //     }
        //     console.log(results);
        // });

        const res = await connection.query(sql);
        return res;
    } catch (e) {
        console.log("create mySQL error!!", e);
        return false;
    }
}

async function removePreIpoCwInList(rec_id, respone) {
    try {
        // IN par_rec_id int,
        // IN par_status VARCHAR(2),
        // IN par_cw_id VARCHAR(8), # case status = AP
        // IN par_updated_by VARCHAR(100)
        if (!rec_id) {
            return respone.send("wrong id");
        }
        let sql = `CALL sp_cw_draft_updstatus(${rec_id}, "DL", NULL, "admin@phs.vn")`;
        // console.log("sql = ", sql);

        const res = await connection.query(sql);
        respone.send({ status: "OK", message: "Remove successfully" });
    } catch (e) {
        console.log("remove mySQL error!!", e);
        respone.send({
            status: "ERROR",
            message: "Remove Fail, Please Try Again",
            errMess: e
        });
    }
}

async function updatePreIpoCwInList(
    rec_id,
    conversionRatio,
    exercisePrice,
    maturityDate,
    outstandingShares,
    totalShares,
    warrant_price,
    cw_draft_id,
    respone
) {
    try {
        // IN par_rec_id int,
        // IN par_cw_draft_id VARCHAR(10),
        // IN par_conversion_ratio VARCHAR(10),
        // IN par_warrant_price DECIMAL(10,3),
        // IN par_warrant_price_min DECIMAL(10,3),
        // IN par_warrant_price_max DECIMAL(10,3),
        // IN par_exercise_price DECIMAL(10,3),
        // IN par_total_shares BIGINT,
        // IN par_outstanding_shares BIGINT,
        // IN par_maturity_date DATE,
        // IN par_updated_by VARCHAR(100)
        if (!rec_id) {
            // return respone.send("wrong id");
            return respone.send({ status: "ERROR", message: "wrong id" });
        }
        let sql = `CALL sp_cw_draft_update(
            ${rec_id}, 
            "${cw_draft_id}", 
            "${conversionRatio}:1", 
            ${warrant_price},
            0,
            0,
            ${exercisePrice},
            ${totalShares}, 
            ${outstandingShares}, 
            "${maturityDate}", 
            "hh")`;
        console.log("sql = ", sql);

        connection.query(sql, (err, data, f) => {
            if (err) {
                console.log(err);
                return respone.send("update fail");
            }
            respone.send({ status: "OK", message: "update ok" });
        });
    } catch (e) {
        // console.log("remove mySQL error!!", e);
        respone.send({ status: "ERROR", message: "update fail", errMess: e });
    }
}

function getActionplan(cw) {
    return new Promise((resolve, reject) => {
        let cwInfoSql = `CALL sp_cw_actionplan("${cw}")`;
        connection.query(cwInfoSql, true, (error, cwInfoSqlResults, fields) => {
            if (error) {
                reject({
                    status: "ERROR",
                    message: error.message
                        ? error.message
                        : "Get Action plan fail, maybe because of this cw not in mysqlDB"
                });
                return;
            }
            console.log(cwInfoSqlResults);
            if (!cwInfoSqlResults[0][0]) {
                resolve({
                    message:
                        "Can not find this symbol in DB --> getActionplan fail",
                    status: "ERROR"
                });
                return;
            }
            resolve(cwInfoSqlResults);
        });
    });
}

function getClosePriceSymbol(us, days) {
    return new Promise((resolve, reject) => {
        const closePriceSql = `CALL sp_close_price_symbol("${us}", "${days}")`;
        connection.query(
            closePriceSql,
            true,
            async (error, closePrices, fields) => {
                if (error) {
                    console.error(error.message);

                    reject({
                        status: "ERROR",
                        message: error.message
                            ? error.message
                            : "Get Close price symbol fail"
                    });
                    return;
                }
                resolve(closePrices);
            }
        );
    });
}

module.exports = {
    connection,
    addPreIpoCw,
    getPreIpoCwList,
    removePreIpoCwInList,
    updatePreIpoCwInList,
    getActionplan,
    getClosePriceSymbol
};

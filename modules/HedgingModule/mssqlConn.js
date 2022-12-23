const sql = require("mssql");

const config = {
    user: "caongoc",
    password: "Ngoc!@#123",
    server: "192.168.10.108",
    database: "DWH_FLEX",
    stream: false,
    port: 1433,
    options: {
        encrypt: true,
        trustedConnection: true,
        enableArithAbort: true,
        trustServerCertificate: true
    }
};

sql.connect(config, async (err) => {
    // ... error checks
    console.log("mssql connect OK ");
});

async function insertToMssql(symbol, iv, time) {
    try {
        sql.connect(config, async (err) => {
            // ... error checks
            console.log("mssql connect OK ");
            return new sql.Request()
                .input("ToDate", sql.DateTime, time)
                .input("Symbol", sql.NVarChar(20), symbol)
                .input("IV", sql.Float, iv)
                .execute("spInsertCW_Daily_IV");
        });
    } catch (err) {
        console.log(err);
    }
}

sql.on("error", (err) => {
    // ... error handler
    console.log("err = ", err);
});

module.exports = { insertToMssql };

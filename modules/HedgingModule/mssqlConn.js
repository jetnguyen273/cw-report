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

let pool = null;
async function connect() {
    try {
        if (pool) {
            return pool;
        }
        pool = await sql.connect(config);
        // let result1 = await pool
        //     .request()
        //     .input("input_parameter", sql.Int, value)
        //     .query("select * from mytable where id = @input_parameter");
        return pool;
        // console.dir(result1)

        // // Stored procedure

        // let result2 = await pool.request()
        //     .input('input_parameter', sql.Int, value)
        //     .output('output_parameter', sql.VarChar(50))
        //     .execute('procedure_name')

        // console.dir(result2)
    } catch (err) {
        // ... error checks
        console.log("Connect to mssql error ", err);
    }
}

async function insertToMssql(symbol, iv, time) {
    try {
        pool = await connect();
        return await pool
            .request()
            .input("ToDate", sql.DateTime, time)
            .input("Symbol", sql.NVarChar(20), symbol)
            .input("IV", sql.Float, iv)
            .execute("spInsertCW_Daily_IV");
    } catch (err) {
        console.log(err);
    }
}

async function getCwSercuritiesInfo(symbol) {
    try {
        pool = await connect();
        return await pool
            .request()
            .input("SYMBOL", sql.VarChar(50), symbol)
            .execute("spGetCWSecuritiesInfo");
    } catch (err) {
        console.log(err);
    }
}

sql.on("error", (err) => {
    // ... error handler
    console.log(err);
});

module.exports = {
    connect,
    insertToMssql,
    getCwSercuritiesInfo
};

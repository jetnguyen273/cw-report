const oracledb = require("oracledb");
const fs = require("fs");

let libPath;
libPath = "D:\\software\\instantclient_11_1";
// if (process.platform === "win32") {
//     // Windows
//     libPath = "D://softwareinstantclient_11_1";
// } else if (process.platform === "darwin") {
//     // macOS
//     libPath = process.env.HOME + "/Downloads/instantclient_19_8";
// }
// if (libPath && fs.existsSync(libPath)) {
//     oracledb.initOracleClient({ libDir: libPath });
// }

oracledb.initOracleClient({ libDir: libPath });

let connection;

async function connectDb() {
    try {
        connection = await oracledb.getConnection({
            user: "HOSTUAT",
            password: "HOSTUAT",
            connectionString: "192.168.4.113/FLEXDB"
        });
        return connection;
    } catch (e) {
        console.log(e);
        return null;
    }
}

connectDb();

async function getOrderStatusFromOracleDb(time, subAccount) {
    // let connection;
    if (!connection) {
        console.log("connection error!");
        return false;
    }

    try {
        // connection = await oracledb.getConnection({
        //     user: "HOSTUAT",
        //     password: "HOSTUAT",
        //     connectionString: "192.168.4.113/FLEXDB"
        // });
        const sqlString = `SELECT AF.ACCTNO
        , OD.ORDERID
        , TO_DATE(CONCAT(CONCAT(TO_CHAR(OD.TXDATE, 'YYYY-MM-DD'), ' '), OD.TXTIME), 'YYYY-MM-DD HH24:MI:SS') AS ODTIME
        , S.SYMBOL
        , CASE WHEN OD.EXECTYPE = 'NS' THEN 'SELL' WHEN OD.EXECTYPE = 'NB' THEN 'BUY' ELSE OD.EXECTYPE END EXEC_TYPE
        , OD.PRICETYPE AS PRICE_TYPE
        , OD.ORSTATUS AS ORDER_STATUS
        , OD.QUOTEPRICE AS ORDER_PRICE
        , OD.ORDERQTTY AS ORDER_VOLUME
        , OD.ADJUSTQTTY AS ADJUST_VOLUME
        , OD.EXECQTTY AS MATCHED_VOLUME
        , OD.EXECAMT  AS MATCHED_VALUE
        , OD.REMAINQTTY REMAIN_VOLUME 
   FROM AFMAST AF
        LEFT JOIN ODMAST OD ON AF.ACCTNO = OD.AFACCTNO
        LEFT JOIN SBSECURITIES S ON OD.CODEID = S.CODEID
        LEFT JOIN TLPROFILES TL ON OD.TLID = TL.TLID
   WHERE OD.TXDATE >= CDATE('${time}')
     AND AF.ACCTNO = '${subAccount}'
     AND (OD.EXECTYPE = 'NS' OR OD.EXECTYPE = 'NB')
     AND (OD.ORDERQTTY - OD.ADJUSTQTTY) > 0

   ORDER BY ODTIME ASC`;

        // result = await connection.execute(`select * from cfmast`, [], {
        //     resultSet: true,
        //     outFormat: oracledb.OUT_FORMAT_OBJECT
        // });
        result = await connection.execute(sqlString);
        console.log("resss = ", result);

        console.log("Successfully connected to Oracle Database");

        // Create a table
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}
// setTimeout(() => {
//     getOrderStatusFromOracleDb("2022-09-20", "0001000008");
// }, 100);

module.exports = {
    connection,
    getOrderStatusFromOracleDb
};

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const mysql2 = require('mysql2');

class DBConnection {
    constructor() {
        this.db = mysql2.createPool({
            host: process.env.DB_SQL_HOST,
            user: process.env.DB_SQL_USER,
            password: process.env.DB_SQL_PASS,
            database: process.env.DB_SQL_NAME
        });

        this.checkConnection();
    }

    checkConnection() {
        this.db.getConnection((error, connection) => {
            if (error) {
                if (error.code === 'PROTOCOL_CONNECTION_LOST') {
                    console.error('Database connection was closed.');
                }

                if (error.code === 'ER_CON_COUNT_ERROR') {
                    console.error('Database has too many connections.');
                }

                if (error.code === 'ECONNREFUSED') {
                    console.error('Database connection was refused.')
                }
            }

            if (connection) {
                console.log('Connected to the MySQL database.');
                connection.release();
            }

            return;
        });
    }


    query = async (sql, values) => {
        return new Promise((resolve, reject) => {
            const callback = (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve(result);
            }

            // Call prepare and query
            this.db.execute(sql, values, callback);
        }).catch(error => {
            const mysqlErrorList = Object.keys(HttpStatusCodes);

            // Convert the mysql errors to http status codes.
            error.status = mysqlErrorList.includes(error.code) ? HttpStatusCodes[error.code] : error.status;

            throw error;
        });
    }
}

// Enum Object of Http Status Codes
const HttpStatusCodes = Object.freeze({
    ER_TRUNCATED_WRONG_VALUE_FOR_FIELD: 422,
    ER_DUP_ENTRY: 409
});

module.exports = new DBConnection().query;
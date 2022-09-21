require('dotenv').config();
const mysql = require('mysql2');

// Connect to the database
const db = mysql.createConnection(
    {
        host: process.env.HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    console.log(`Connected to the ${process.env.DB_NAME} database.`)
)

module.exports = db;
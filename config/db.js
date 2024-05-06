/*
    Author: Gregory Smith
    Date: May 6, 2024
    Description: Responsible for initializing a PostgresQL connection to be used by models
*/

require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false // Disable SSL certificate validation for self-signed certificates
    }
});

module.exports = pool;

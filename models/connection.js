const mysql = require('mysql2/promise');

require('dotenv').config();

const connection = mysql.createPool({
  password: process.env.MYSQL_PASSWORD,
  user: process.env.MYSQL_USER,
  host: process.env.MYSQL_HOST,
  database: 'StoreManager',
});

module.exports = connection;
